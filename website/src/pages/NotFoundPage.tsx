import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, House } from '@phosphor-icons/react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: 'clamp(60px, 12vw, 100px) auto',
        padding: '0 16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '18px'
      }}
    >
      <div style={{ fontSize: 'clamp(3rem, 10vw, 4rem)', fontWeight: 700, color: 'var(--color-ash)', fontFamily: 'var(--font-mono)' }}>
        404
      </div>
      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', color: 'var(--color-ink)' }}>Page Not Found</h1>
      <p style={{ fontSize: '14.5px', color: 'var(--color-mute)', lineHeight: 1.6, maxWidth: '440px' }}>
        The page, note, or practice notebook you are looking for does not exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn-primary">
          <House size={16} />
          <span>Go to Home</span>
        </Link>
        <Link to="/notes" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Browse Notes</span>
        </Link>
      </div>
    </div>
  );
};
