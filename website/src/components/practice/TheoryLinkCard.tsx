import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from '@phosphor-icons/react';

interface TheoryLinkCardProps {
  noteRoute: string;
  noteTitle?: string | null;
}

export const TheoryLinkCard: React.FC<TheoryLinkCardProps> = ({ noteRoute, noteTitle }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BookOpen size={20} color="var(--color-mute)" style={{ flexShrink: 0 }} />
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            CONNECTED THEORY NOTE
          </span>
          <h4 style={{ fontSize: '14.5px', color: 'var(--color-ink)', margin: 0, fontWeight: 500 }}>
            {noteTitle || 'View Corresponding Theory'}
          </h4>
        </div>
      </div>

      <Link
        to={noteRoute}
        className="btn-primary"
        style={{ height: '34px', padding: '0 14px', fontSize: '13px' }}
      >
        <ArrowLeft size={14} />
        <span>Read Theory Notes</span>
      </Link>
    </div>
  );
};
