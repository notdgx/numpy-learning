import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, BookOpen, ArrowRight, FileText } from '@phosphor-icons/react';
import { getTopicTree, searchNotes } from '../services/contentService';

export const NotesExplorerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const topics = getTopicTree();

  const searchResults = searchQuery.trim() ? searchNotes(searchQuery) : [];

  return (
    <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto', padding: 'clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px) 80px', width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Curriculum
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', color: 'var(--color-ink)', marginTop: '4px', marginBottom: '8px' }}>
          NumPy Learning Notes
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--color-mute)', maxWidth: '650px', lineHeight: 1.6 }}>
          Explore structured notes on NumPy array memory structures, striding, vectorized mathematics, indexing, and multi-dimensional manipulations.
        </p>

        {/* Search Bar */}
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
            placeholder="Search notes, array operations, or concepts..."
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
            aria-label="Search notes"
          />
        </div>
      </div>

      {/* Search Results if query exists */}
      {searchQuery.trim() ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-mute)' }}>
            Found {searchResults.length} matching result{searchResults.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
          </div>

          {searchResults.length === 0 ? (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-hairline)' }}>
              <p style={{ color: 'var(--color-mute)', fontSize: '14px' }}>No notes found matching your search term.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
              {searchResults.map(({ note, matchType, snippet }) => (
                <Link
                  key={note.metadata.id}
                  to={note.metadata.route}
                  className="surface-card"
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 18px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.topicTitle} → {note.subtopicTitle}
                    </span>
                    <span style={{ fontSize: '11px', padding: '2px 6px', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-xs)', color: 'var(--color-mute)', flexShrink: 0 }}>
                      {matchType}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '15px', color: 'var(--color-ink)', fontWeight: 500 }}>
                    {note.metadata.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-mute)', lineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {snippet}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Full Topic Roadmap */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {topics.map((topic) => (
            <div key={topic.id} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--color-hairline)' }}>
                <BookOpen size={22} color="var(--color-ink)" />
                <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.45rem)', color: 'var(--color-ink)' }}>
                  {topic.title}
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
                {topic.subtopics.map((subtopic) => (
                  <div
                    key={subtopic.id}
                    className="surface-card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '18px' }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: '4px' }}>
                        {subtopic.title}
                      </h3>
                      <span style={{ fontSize: '12px', color: 'var(--color-mute)' }}>
                        {subtopic.notes.length} note{subtopic.notes.length === 1 ? '' : 's'} in this module
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {subtopic.notes.map((note) => (
                        <Link
                          key={note.id}
                          to={note.route}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            backgroundColor: 'var(--color-surface-card)',
                            border: '1px solid var(--color-hairline)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-ink)',
                            fontSize: '13px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-hairline-strong)';
                            e.currentTarget.style.backgroundColor = 'var(--color-surface-elevated)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-hairline)';
                            e.currentTarget.style.backgroundColor = 'var(--color-surface-card)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                            <FileText size={15} color="var(--color-mute)" style={{ flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{note.title}</span>
                          </div>
                          <ArrowRight size={12} color="var(--color-stone)" style={{ flexShrink: 0, marginLeft: '8px' }} />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
