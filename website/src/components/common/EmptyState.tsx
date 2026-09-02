import React from 'react';
import { FolderSimpleDashed } from '@phosphor-icons/react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      textAlign: 'center',
      background: 'var(--color-surface)',
      border: '1px dashed var(--color-hairline)',
      borderRadius: 'var(--radius-lg)',
      margin: '1.5rem 0'
    }}>
      <div style={{ color: 'var(--color-stone)', marginBottom: '1rem' }}>
        {icon || <FolderSimpleDashed size={48} weight="thin" />}
      </div>
      <h3 style={{ fontSize: '1.15rem', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--color-mute)', fontSize: '0.9rem', maxWidth: '440px', marginBottom: actionText ? '1.5rem' : '0' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn-secondary">
          {actionText}
        </button>
      )}
    </div>
  );
};
