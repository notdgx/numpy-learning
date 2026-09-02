import { IpynbNotebook, IpynbCell, IpynbOutput } from '../types/content';

/**
 * Normalizes cell source array or string into a single string
 */
export function extractSource(source: string | string[] | undefined): string {
  if (!source) return '';
  if (Array.isArray(source)) {
    return source.join('');
  }
  return String(source);
}

/**
 * Extracts plain text or formatted string representation from an output node
 */
export function formatOutputText(output: IpynbOutput): string {
  if (output.text) {
    return Array.isArray(output.text) ? output.text.join('') : output.text;
  }
  if (output.data && output.data['text/plain']) {
    const plain = output.data['text/plain'];
    return Array.isArray(plain) ? plain.join('') : plain;
  }
  if (output.traceback && Array.isArray(output.traceback)) {
    // Strip terminal ANSI escape codes for clean browser rendering
    return output.traceback.join('\n').replace(/\u001b\[[0-9;]*m/g, '');
  }
  return '';
}

/**
 * Parses raw JSON string into typed IpynbNotebook
 */
export function parseIpynb(rawJson: string | object): IpynbNotebook | null {
  try {
    const data = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
    if (!data || !Array.isArray(data.cells)) {
      return null;
    }
    return data as IpynbNotebook;
  } catch (err) {
    console.error('Failed to parse ipynb JSON:', err);
    return null;
  }
}

/**
 * Checks if a cell has renderable execution output
 */
export function hasOutputs(cell: IpynbCell): boolean {
  return !!cell.outputs && cell.outputs.length > 0;
}
