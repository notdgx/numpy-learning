import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import { Heading } from '../types/content';

/**
 * Slugifies text into a deterministic, URL-safe anchor ID
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Strips YAML frontmatter from markdown text
 */
export function stripFrontmatter(text: string): string {
  if (text.startsWith('---')) {
    const end = text.indexOf('---', 3);
    if (end !== -1) {
      return text.slice(end + 3).trimStart();
    }
  }
  return text;
}

/**
 * Extracts headings from markdown body while strictly ignoring headings inside code fences
 */
export function extractHeadings(markdown: string): Heading[] {
  const body = stripFrontmatter(markdown);
  const headings: Heading[] = [];
  const lines = body.split('\n');
  const usedSlugs = new Map<string, number>();

  let inFence = false;
  let fenceChar = '';

  for (const line of lines) {
    const trimmed = line.trim();

    const fenceMatch = trimmed.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      const char = fenceMatch[1][0];
      if (!inFence) {
        inFence = true;
        fenceChar = char;
      } else if (fenceChar === char) {
        fenceChar = false as unknown as string;
        inFence = false;
      }
      continue;
    }

    if (inFence) continue;

    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_~=]/g, '')
        .replace(/#+$/, '')
        .trim();

      if (!rawText) continue;

      const baseSlug = slugify(rawText) || 'section';
      const count = usedSlugs.get(baseSlug) || 0;
      usedSlugs.set(baseSlug, count + 1);

      const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
      headings.push({ id, text: rawText, level });
    }
  }

  return headings;
}

/**
 * Escapes HTML entities
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Syntax highlights code using Prism.js with safe fallback
 */
export function highlightCode(code: string, language = 'python'): string {
  const lang = language.toLowerCase();
  const grammar = Prism.languages[lang] || Prism.languages.python || Prism.languages.text;
  try {
    return Prism.highlight(code, grammar, lang);
  } catch {
    return escapeHtml(code);
  }
}

/**
 * Parses markdown into styled HTML with custom heading anchors and Prism-highlighted code blocks
 */
export function renderMarkdownToHtml(markdown: string): string {
  const body = stripFrontmatter(markdown);
  const lines = body.split('\n');
  const usedSlugs = new Map<string, number>();

  let html = '';
  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer: string[] = [];
  let inList: 'ul' | 'ol' | null = null;
  let inTable = false;
  let tableRows: string[] = [];

  const closeList = () => {
    if (inList) {
      html += inList === 'ul' ? '</ul>\n' : '</ol>\n';
      inList = null;
    }
  };

  const closeTable = () => {
    if (inTable) {
      html += '<div class="table-container">\n<table>\n';
      let isHeader = true;
      for (const row of tableRows) {
        const cells = row
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        
        if (cells.every((c) => /^:?-+:?$/.test(c))) {
          isHeader = false;
          continue;
        }

        html += '  <tr>\n';
        const tag = isHeader ? 'th' : 'td';
        for (const cell of cells) {
          html += `    <${tag}>${renderInlineFormatting(cell)}</${tag}>\n`;
        }
        html += '  </tr>\n';
      }
      html += '</table>\n</div>\n';
      inTable = false;
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code Block Fence
    const fenceMatch = trimmed.match(/^```(\w*)/);
    if (fenceMatch) {
      if (!inCodeBlock) {
        closeList();
        closeTable();
        inCodeBlock = true;
        codeLang = fenceMatch[1] || 'text';
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        const rawCode = codeBuffer.join('\n');
        const highlighted = highlightCode(rawCode, codeLang);
        const encodedRaw = encodeURIComponent(rawCode);

        html += `<div class="code-block-wrapper" style="position: relative; margin: 1.5rem 0; border: 1px solid var(--color-hairline); border-radius: var(--radius-md); background: var(--color-surface); overflow: hidden;">
  <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 14px; background: var(--color-surface-elevated); border-bottom: 1px solid var(--color-hairline); font-family: var(--font-mono); font-size: 12px; color: var(--color-mute);">
    <span style="text-transform: uppercase; font-weight: 600;">${codeLang || 'CODE'}</span>
    <button class="copy-code-btn" data-code="${encodedRaw}" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; font-size: 12px; color: var(--color-body); background: var(--color-surface-card); border: 1px solid var(--color-hairline); border-radius: var(--radius-xs); cursor: pointer;" aria-label="Copy code">
      <span>Copy</span>
    </button>
  </div>
  <pre class="language-${codeLang}" style="margin: 0; padding: 1rem 1.25rem; overflow-x: auto; background: transparent;"><code class="language-${codeLang}">${highlighted}</code></pre>
</div>\n`;
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // 2. Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      closeList();
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      closeTable();
    }

    // 3. Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const rawText = headingMatch[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_~=]/g, '')
        .replace(/#+$/, '')
        .trim();

      const baseSlug = slugify(rawText) || 'heading';
      const count = usedSlugs.get(baseSlug) || 0;
      usedSlugs.set(baseSlug, count + 1);
      const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

      const content = renderInlineFormatting(headingMatch[2].replace(/#+$/, '').trim());
      html += `<h${level} id="${id}" style="scroll-margin-top: 5rem;">${content}</h${level}>\n`;
      continue;
    }

    // 4. Horizontal Rules
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      closeList();
      html += '<hr />\n';
      continue;
    }

    // 5. Blockquotes
    if (trimmed.startsWith('>')) {
      closeList();
      const quoteContent = renderInlineFormatting(trimmed.replace(/^>\s*/, ''));
      html += `<blockquote><p>${quoteContent}</p></blockquote>\n`;
      continue;
    }

    // 6. Unordered Lists
    const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (inList !== 'ul') {
        closeList();
        html += '<ul>\n';
        inList = 'ul';
      }
      html += `  <li>${renderInlineFormatting(ulMatch[2])}</li>\n`;
      continue;
    }

    // 7. Ordered Lists
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (olMatch) {
      if (inList !== 'ol') {
        closeList();
        html += '<ol>\n';
        inList = 'ol';
      }
      html += `  <li>${renderInlineFormatting(olMatch[2])}</li>\n`;
      continue;
    }

    if (trimmed !== '') {
      closeList();
    }

    // 8. Paragraphs
    if (trimmed === '') {
      continue;
    }

    html += `<p>${renderInlineFormatting(line)}</p>\n`;
  }

  closeList();
  closeTable();

  return html;
}

/**
 * Parses inline markdown tags (bold, italic, inline code, highlights, links)
 */
export function renderInlineFormatting(text: string): string {
  let res = escapeHtml(text);
  res = res.replace(/==(.*?)==/g, '<mark>$1</mark>');
  res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  res = res.replace(/__(.*?)__/g, '<strong>$1</strong>');
  res = res.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  res = res.replace(/_([^_]+)_/g, '<em>$1</em>');
  res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return res;
}
