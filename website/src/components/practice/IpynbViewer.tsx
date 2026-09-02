import React, { useEffect } from 'react';
import { Copy, Terminal, Code } from '@phosphor-icons/react';
import { parseIpynb, extractSource, formatOutputText } from '../../utils/ipynb';
import { renderMarkdownToHtml, highlightCode } from '../../utils/markdown';

interface IpynbViewerProps {
  rawContent: string;
}

export const IpynbViewer: React.FC<IpynbViewerProps> = ({ rawContent }) => {
  const notebook = parseIpynb(rawContent);

  useEffect(() => {
    const handleCopyClick = async (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.copy-code-btn') as HTMLButtonElement | null;
      if (!target) return;

      const encoded = target.getAttribute('data-code');
      if (!encoded) return;

      const raw = decodeURIComponent(encoded);
      try {
        await navigator.clipboard.writeText(raw);
        const span = target.querySelector('span');
        if (span) {
          span.textContent = 'Copied!';
          setTimeout(() => {
            span.textContent = 'Copy';
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy code snippet:', err);
      }
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, []);

  if (!notebook || !notebook.cells || notebook.cells.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
        <p style={{ color: 'var(--color-mute)' }}>No cells found in this notebook.</p>
      </div>
    );
  }

  return (
    <div className="ipynb-container">
      {notebook.cells.map((cell, idx) => {
        const source = extractSource(cell.source);

        if (cell.cell_type === 'markdown') {
          const html = renderMarkdownToHtml(source);
          return (
            <div
              key={cell.id || idx}
              className="ipynb-cell ipynb-markdown-cell"
              style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)' }}
            >
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          );
        }

        if (cell.cell_type === 'code') {
          const highlighted = highlightCode(source, 'python');
          const encoded = encodeURIComponent(source);
          const execCount = cell.execution_count != null ? cell.execution_count : ' ';

          return (
            <div key={cell.id || idx} className="ipynb-cell ipynb-code-cell">
              {/* Cell Header */}
              <div className="ipynb-cell-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code size={14} color="var(--color-mute)" />
                  <span className="ipynb-exec-count">[{execCount}]</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-mute)' }}>Python Cell</span>
                </div>
                <button
                  type="button"
                  className="copy-code-btn"
                  data-code={encoded}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    fontSize: '11.5px',
                    color: 'var(--color-body)',
                    backgroundColor: 'var(--color-surface-card)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer'
                  }}
                  aria-label="Copy cell source"
                >
                  <Copy size={12} />
                  <span>Copy</span>
                </button>
              </div>

              {/* Code Body */}
              <pre className="language-python" style={{ margin: 0, padding: '14px 18px', backgroundColor: 'transparent' }}>
                <code
                  className="language-python"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </pre>

              {/* Outputs */}
              {cell.outputs && cell.outputs.length > 0 && (
                <div className="ipynb-output-container">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '11px', color: 'var(--color-mute)' }}>
                    <Terminal size={13} color="var(--color-mute)" />
                    <span>Output</span>
                  </div>
                  {cell.outputs.map((out, outIdx) => {
                    const formatted = formatOutputText(out);
                    if (!formatted) return null;
                    return (
                      <div key={outIdx} style={{ lineHeight: 1.5, fontSize: '12.5px' }}>
                        {formatted}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
