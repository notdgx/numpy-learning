import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, MagnifyingGlass, ArrowRight, Notebook, BookOpen } from '@phosphor-icons/react';
import { getAllPracticeItems } from '../services/contentService';

export const PracticePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const practiceItems = getAllPracticeItems();

  const filtered = practiceItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.metadata.title.toLowerCase().includes(q) ||
      item.metadata.topicTitle.toLowerCase().includes(q) ||
      item.metadata.subtopicTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto', padding: 'clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px) 80px', width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Interactive Exercises
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', color: 'var(--color-ink)', marginTop: '4px', marginBottom: '8px' }}>
          NumPy Practice & Notebooks
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--color-mute)', maxWidth: '650px', lineHeight: 1.6 }}>
          Hands-on Jupyter Notebooks and structured numerical coding sessions. Every practice session is connected directly to its corresponding theory note.
        </p>

        {/* Search */}
        <div style={{ marginTop: '20px', position: 'relative', maxWidth: '520px', width: '100%' }}>
          <MagnifyingGlass
            size={18}
            color="var(--color-mute)"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search practice notebooks..."
            style={{
              width: '100%',
              height: '44px',
              padding: '0 16px 0 42px',
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-on-dark)',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.15s ease'
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-hairline-strong)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-hairline)')}
            aria-label="Search practice notebooks"
          />
        </div>
      </div>

      {/* Grid of Practice Items */}
      {filtered.length === 0 ? (
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-hairline)' }}>
          <Lightbulb size={40} color="var(--color-stone)" style={{ margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--color-mute)', fontSize: '14px' }}>No practice items found matching your query.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map((item) => (
            <div
              key={item.metadata.id}
              className="surface-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px', gap: '16px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Notebook size={18} color="var(--color-mute)" />
                    <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--color-mute)', textTransform: 'uppercase' }}>
                      Session {item.metadata.order.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-hairline)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    .{item.metadata.fileType}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-ink)', fontWeight: 600 }}>
                  {item.metadata.title}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--color-mute)', lineHeight: 1.5, margin: 0 }}>
                  Interactive code execution walkthrough covering array creation, indexing, slicing, and mathematical operations.
                </p>

                {item.metadata.noteRoute && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-body)', marginTop: '4px' }}>
                    <BookOpen size={14} color="var(--color-mute)" />
                    <span>Connected to: {item.metadata.noteTitle || 'Theory Note'}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <Link
                  to={item.metadata.route}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'space-between' }}
                >
                  <span>Open Notebook</span>
                  <ArrowRight size={14} />
                </Link>
                {item.metadata.noteRoute && (
                  <Link
                    to={item.metadata.noteRoute}
                    className="btn-secondary"
                    title="View Theory Note"
                    style={{ padding: '0 12px' }}
                  >
                    <BookOpen size={16} color="var(--color-mute)" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
