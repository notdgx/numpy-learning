import rawMetadata from '../../../notes/metadata.json';
import {
  MetadataFile,
  NoteDocument,
  PracticeDocument,
  TopicMetadata,
  PracticeItemMetadata
} from '../types/content';

const metadata = rawMetadata as unknown as MetadataFile;

// Eagerly glob all markdown files from notes/
const markdownFiles = import.meta.glob('../../../notes/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

// Eagerly glob all python reference files from notes/
const pythonFiles = import.meta.glob('../../../notes/**/*.py', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

// Eagerly glob all practice notebooks and markdown files
const practiceNotebooks = import.meta.glob('../../../practice/**/*.ipynb', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const practiceMarkdowns = import.meta.glob('../../../practice/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

/**
 * Normalizes a route string for comparison (stripping leading/trailing slashes, lowercasing)
 */
export function normalizeRoute(route: string): string {
  let clean = route.trim().toLowerCase();
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean;
}

/**
 * Resolves raw markdown content by matching note.sourcePath
 */
function findMarkdownContent(sourcePath: string): string {
  const normalizedTarget = '/' + sourcePath.replace(/^\/+/, '');
  for (const [key, content] of Object.entries(markdownFiles)) {
    if (key.toLowerCase() === normalizedTarget.toLowerCase() || key.endsWith(sourcePath)) {
      return content;
    }
  }
  const filename = sourcePath.split('/').pop();
  if (filename) {
    for (const [key, content] of Object.entries(markdownFiles)) {
      if (key.endsWith('/' + filename)) {
        return content;
      }
    }
  }
  return '';
}

/**
 * Resolves practice content (.ipynb raw JSON or .md string)
 */
function findPracticeContent(sourcePath: string, fileType: string): string {
  const normalizedTarget = '/' + sourcePath.replace(/^\/+/, '');
  const pool = fileType === 'ipynb' ? practiceNotebooks : practiceMarkdowns;

  for (const [key, content] of Object.entries(pool)) {
    if (key.toLowerCase() === normalizedTarget.toLowerCase() || key.endsWith(sourcePath)) {
      return content;
    }
  }
  const filename = sourcePath.split('/').pop();
  if (filename) {
    for (const [key, content] of Object.entries(pool)) {
      if (key.endsWith('/' + filename)) {
        return content;
      }
    }
  }
  return '';
}

/**
 * Resolves python reference file content by name
 */
export function getReferenceFileContent(sourcePath: string): string {
  const normalizedTarget = '/' + sourcePath.replace(/^\/+/, '');
  for (const [key, content] of Object.entries(pythonFiles)) {
    if (key.toLowerCase() === normalizedTarget.toLowerCase() || key.endsWith(sourcePath)) {
      return content;
    }
  }
  return '';
}

/**
 * Returns the entire topic tree metadata
 */
export function getTopicTree(): TopicMetadata[] {
  return metadata?.sections?.notes?.topics || [];
}

/**
 * Returns all notes in a flat list with topic context
 */
export function getAllNotes(): NoteDocument[] {
  const list: NoteDocument[] = [];
  const topics = getTopicTree();

  for (const topic of topics) {
    for (const subtopic of topic.subtopics) {
      for (const note of subtopic.notes) {
        const raw = findMarkdownContent(note.sourcePath);
        list.push({
          metadata: note,
          rawContent: raw,
          topicTitle: topic.title,
          subtopicTitle: subtopic.title,
          topicSlug: topic.slug,
          subtopicSlug: subtopic.slug
        });
      }
    }
  }

  return list;
}

/**
 * Finds a note by route
 */
export function getNoteByRoute(route: string): NoteDocument | null {
  const target = normalizeRoute(route);
  const all = getAllNotes();

  const exact = all.find((n) => normalizeRoute(n.metadata.route) === target);
  if (exact) return exact;

  const slug = target.split('/').pop();
  if (slug) {
    const slugMatch = all.find((n) => {
      const noteSlug = n.metadata.route.split('/').pop();
      return noteSlug === slug;
    });
    if (slugMatch) return slugMatch;
  }

  const idMatch = all.find((n) => n.metadata.id === route);
  if (idMatch) return idMatch;

  return null;
}

/**
 * Returns adjacent notes for sequential reading
 */
export function getAdjacentNotes(currentRoute: string): { prev: NoteDocument | null; next: NoteDocument | null } {
  const all = getAllNotes();
  const index = all.findIndex((n) => normalizeRoute(n.metadata.route) === normalizeRoute(currentRoute));

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null
  };
}

/**
 * Returns all practice items metadata with loaded content
 */
export function getAllPracticeItems(): PracticeDocument[] {
  const items: PracticeItemMetadata[] = metadata?.sections?.practice?.items || [];
  return items.map((item) => {
    const raw = findPracticeContent(item.sourcePath, item.fileType);
    return {
      metadata: item,
      rawContent: raw
    };
  });
}

/**
 * Finds a practice item by route
 */
export function getPracticeByRoute(route: string): PracticeDocument | null {
  const target = normalizeRoute(route);
  const all = getAllPracticeItems();

  const exact = all.find((p) => normalizeRoute(p.metadata.route) === target);
  if (exact) return exact;

  const slug = target.split('/').pop();
  if (slug) {
    const slugMatch = all.find((p) => {
      const pSlug = p.metadata.route.split('/').pop();
      return pSlug === slug;
    });
    if (slugMatch) return slugMatch;
  }

  const idMatch = all.find((p) => p.metadata.id === route);
  if (idMatch) return idMatch;

  return null;
}

/**
 * Returns adjacent practice items
 */
export function getAdjacentPractice(currentRoute: string): { prev: PracticeDocument | null; next: PracticeDocument | null } {
  const all = getAllPracticeItems();
  const index = all.findIndex((p) => normalizeRoute(p.metadata.route) === normalizeRoute(currentRoute));

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null
  };
}

/**
 * Full-text search across notes
 */
export function searchNotes(query: string): Array<{
  note: NoteDocument;
  matchType: 'title' | 'heading' | 'topic' | 'content';
  snippet: string;
}> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: Array<{
    note: NoteDocument;
    matchType: 'title' | 'heading' | 'topic' | 'content';
    snippet: string;
  }> = [];

  const all = getAllNotes();

  for (const doc of all) {
    if (doc.metadata.title.toLowerCase().includes(q)) {
      results.push({
        note: doc,
        matchType: 'title',
        snippet: doc.metadata.title
      });
      continue;
    }

    if (doc.topicTitle.toLowerCase().includes(q) || doc.subtopicTitle.toLowerCase().includes(q)) {
      results.push({
        note: doc,
        matchType: 'topic',
        snippet: `${doc.topicTitle} → ${doc.subtopicTitle}`
      });
      continue;
    }

    const matchingHeading = doc.metadata.headings.find((h) => h.text.toLowerCase().includes(q));
    if (matchingHeading) {
      results.push({
        note: doc,
        matchType: 'heading',
        snippet: matchingHeading.text
      });
      continue;
    }

    const contentLower = doc.rawContent.toLowerCase();
    const pos = contentLower.indexOf(q);
    if (pos !== -1) {
      const start = Math.max(0, pos - 40);
      const end = Math.min(doc.rawContent.length, pos + q.length + 40);
      const snippet = '...' + doc.rawContent.slice(start, end).replace(/\n/g, ' ') + '...';
      results.push({
        note: doc,
        matchType: 'content',
        snippet
      });
    }
  }

  return results;
}

/**
 * Returns repository metadata stats
 */
export function getStats() {
  return metadata?.stats || {
    topics: 0,
    subtopics: 0,
    notes: 0,
    practiceItems: 0,
    referenceFiles: 0
  };
}
