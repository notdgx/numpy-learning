import React from 'react';
import { Link } from 'react-router-dom';
import { CaretRight, House } from '@phosphor-icons/react';

interface BreadcrumbsProps {
  topicTitle: string;
  subtopicTitle: string;
  noteTitle: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  topicTitle,
  subtopicTitle,
  noteTitle
}) => {
  return (
    <nav
      aria-label="Breadcrumbs"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12.5px',
        color: 'var(--color-mute)',
        marginBottom: '20px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-mute)' }} aria-label="Home">
        <House size={14} />
      </Link>
      <CaretRight size={12} color="var(--color-stone)" />
      <Link to="/notes" style={{ color: 'var(--color-mute)' }}>
        Notes
      </Link>
      <CaretRight size={12} color="var(--color-stone)" />
      <span>{topicTitle}</span>
      <CaretRight size={12} color="var(--color-stone)" />
      <span>{subtopicTitle}</span>
      <CaretRight size={12} color="var(--color-stone)" />
      <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>{noteTitle}</span>
    </nav>
  );
};
