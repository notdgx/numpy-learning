export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface ReferenceFile {
  name: string;
  sourcePath: string;
  order: number;
  referenceIndex: number;
  sha256: string;
  sizeBytes: number;
  content?: string;
}

export interface NoteMetadata {
  id: string;
  title: string;
  route: string;
  sourcePath: string;
  order: number;
  date: string;
  time: string;
  headings: Heading[];
  references: ReferenceFile[];
  sha256: string;
  sizeBytes: number;
  practiceRoute?: string | null;
  practiceTitle?: string | null;
  practiceSourcePath?: string | null;
  practiceType?: string | null;
}

export interface PracticeItemMetadata {
  id: string;
  title: string;
  route: string;
  sourcePath: string;
  order: number;
  fileType: 'ipynb' | 'md' | string;
  sha256: string;
  sizeBytes: number;
  topicTitle: string;
  subtopicTitle: string;
  topicSlug: string;
  subtopicSlug: string;
  noteRoute?: string | null;
  noteTitle?: string | null;
  noteSourcePath?: string | null;
}

export interface SubtopicMetadata {
  id: string;
  title: string;
  order: number;
  slug: string;
  notes: NoteMetadata[];
}

export interface TopicMetadata {
  id: string;
  title: string;
  order: number;
  slug: string;
  subtopics: SubtopicMetadata[];
}

export interface MetadataFile {
  schemaVersion: number;
  generatedAt: string;
  contentRoot: string;
  sections: {
    notes: {
      id: string;
      title: string;
      topics: TopicMetadata[];
    };
    practice: {
      id: string;
      title: string;
      items: PracticeItemMetadata[];
    };
  };
  stats: {
    topics: number;
    subtopics: number;
    notes: number;
    practiceItems: number;
    referenceFiles: number;
  };
}

export interface NoteDocument {
  metadata: NoteMetadata;
  rawContent: string;
  topicTitle: string;
  subtopicTitle: string;
  topicSlug: string;
  subtopicSlug: string;
}

export interface PracticeDocument {
  metadata: PracticeItemMetadata;
  rawContent: string;
}

// Jupyter Notebook AST definitions
export interface IpynbOutput {
  output_type: string;
  name?: string;
  text?: string | string[];
  data?: {
    'text/plain'?: string | string[];
    'text/html'?: string | string[];
    'image/png'?: string;
    [key: string]: unknown;
  };
  execution_count?: number | null;
  ename?: string;
  evalue?: string;
  traceback?: string[];
}

export interface IpynbCell {
  cell_type: 'code' | 'markdown' | 'raw';
  execution_count?: number | null;
  source: string | string[];
  outputs?: IpynbOutput[];
  metadata?: Record<string, unknown>;
  id?: string;
}

export interface IpynbNotebook {
  cells: IpynbCell[];
  metadata?: Record<string, unknown>;
  nbformat?: number;
  nbformat_minor?: number;
}
