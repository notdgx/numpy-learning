import React, { useEffect } from 'react';
import { X, Copy, Check } from '@phosphor-icons/react';
import { highlightCode } from '../../utils/markdown';

interface CodeViewerModalProps {
  filename: string;
  code: string;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ filename, code, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const highlighted = highlightCode(code, 'python');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Source code: ${filename}`}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '85vh',
          backgroundColor: '#0c0c0c',
          border: '1px solid var(--color-hairline-strong)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: 'var(--color-surface-elevated)',
            borderBottom: '1px solid var(--color-hairline)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>
            {filename}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCopy}
              className="btn-secondary"
              style={{ height: '28px', padding: '0 10px', fontSize: '12px' }}
            >
              {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '4px',
                color: 'var(--color-mute)',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-surface-card)'
              }}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, backgroundColor: '#050505' }}>
          <pre className="language-python" style={{ margin: 0, padding: 0, background: 'transparent' }}>
            <code
              className="language-python"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};
