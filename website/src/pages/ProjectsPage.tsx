import React from 'react';
import { Code } from '@phosphor-icons/react';
import { EmptyState } from '../components/common/EmptyState';

export const ProjectsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto', padding: 'clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px) 80px', width: '100%', overflowX: 'hidden' }}>
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Portfolio
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', color: 'var(--color-ink)', marginTop: '4px', marginBottom: '8px' }}>
          NumPy Projects
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--color-mute)', maxWidth: '650px', lineHeight: 1.6 }}>
          Hands-on numerical computing implementations, image transformation engines, custom ufuncs, and vectorized algorithms.
        </p>
      </div>

      <EmptyState
        title="Projects Pipeline Expanding"
        description="Active project implementations and vectorized numerical pipelines will be indexed here directly from repository source files."
        actionText="Explore NumPy Notes"
        onAction={() => window.location.assign('/notes')}
        icon={<Code size={48} weight="thin" color="var(--color-stone)" />}
      />
    </div>
  );
};
