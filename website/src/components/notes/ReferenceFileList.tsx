import React, { useState } from 'react';
import { FileCode, Eye } from '@phosphor-icons/react';
import { ReferenceFile } from '../../types/content';
import { getReferenceFileContent } from '../../services/contentService';
import { CodeViewerModal } from './CodeViewerModal';

interface ReferenceFileListProps {
  references: ReferenceFile[];
}

export const ReferenceFileList: React.FC<ReferenceFileListProps> = ({ references }) => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  if (!references || references.length === 0) return null;

  const handleView = (ref: ReferenceFile) => {
    const code = getReferenceFileContent(ref.sourcePath);
    setSelectedFile({ name: ref.name, content: code });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          REFERENCE FILES ({references.length})
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {references.map((ref) => (
            <button
              key={ref.name}
              type="button"
              onClick={() => handleView(ref)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-ink)',
                fontSize: '12.5px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-card)';
                e.currentTarget.style.borderColor = 'var(--color-hairline-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-elevated)';
                e.currentTarget.style.borderColor = 'var(--color-hairline)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <FileCode size={16} color="var(--color-mute)" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
                  {ref.name}
                </span>
              </div>
              <Eye size={14} color="var(--color-mute)" style={{ flexShrink: 0, marginLeft: '6px' }} />
            </button>
          ))}
        </div>
      </div>

      {selectedFile && (
        <CodeViewerModal
          filename={selectedFile.name}
          code={selectedFile.content}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
};
