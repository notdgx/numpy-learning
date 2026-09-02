import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, ArrowRight, Notebook } from '@phosphor-icons/react';

interface PracticeLinkCardProps {
  practiceRoute: string;
  practiceTitle?: string | null;
  practiceType?: string | null;
}

export const PracticeLinkCard: React.FC<PracticeLinkCardProps> = ({
  practiceRoute,
  practiceTitle,
  practiceType
}) => {
  const isIpynb = practiceType === 'ipynb';

  return (
    <div
      style={{
        marginTop: '24px',
        padding: '14px',
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isIpynb ? <Notebook size={18} color="var(--color-mute)" /> : <Lightbulb size={18} color="var(--color-mute)" />}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}
        >
          CONNECTED PRACTICE
        </span>
      </div>

      <p style={{ fontSize: '12.5px', color: 'var(--color-body)', lineHeight: 1.5, margin: 0 }}>
        Apply concepts from this theory note in the corresponding {isIpynb ? 'Jupyter notebook' : 'practice challenge'}.
      </p>

      <Link
        to={practiceRoute}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          backgroundColor: 'var(--color-surface-card)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-on-dark)',
          fontSize: '13px',
          fontWeight: 500,
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-hairline-strong)';
          e.currentTarget.style.backgroundColor = 'var(--color-surface)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-hairline)';
          e.currentTarget.style.backgroundColor = 'var(--color-surface-card)';
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {practiceTitle || 'Open Practice Notebook'}
        </span>
        <ArrowRight size={14} color="var(--color-mute)" style={{ flexShrink: 0 }} />
      </Link>
    </div>
  );
};
