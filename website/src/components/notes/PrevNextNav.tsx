import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { NoteDocument } from '../../types/content';

interface PrevNextNavProps {
  prev: NoteDocument | null;
  next: NoteDocument | null;
}

export const PrevNextNav: React.FC<PrevNextNavProps> = ({ prev, next }) => {
  if (!prev && !next) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid var(--color-hairline)'
      }}
    >
      {prev ? (
        <Link
          to={prev.metadata.route}
          className="surface-card"
          style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--color-mute)', textTransform: 'uppercase' }}>
            <ArrowLeft size={13} />
            <span>Previous</span>
          </div>
          <span style={{ fontSize: '14px', color: 'var(--color-ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {prev.metadata.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          to={next.metadata.route}
          className="surface-card"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', padding: '14px 16px', textAlign: 'right' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--color-mute)', textTransform: 'uppercase' }}>
            <span>Next</span>
            <ArrowRight size={13} />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--color-ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {next.metadata.title}
          </span>
        </Link>
      )}
    </div>
  );
};
