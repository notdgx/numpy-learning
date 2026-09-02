import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CaretDown, CaretRight, BookOpen, SidebarSimple, X } from '@phosphor-icons/react';
import { TopicMetadata } from '../../types/content';

interface TopicSidebarProps {
  topics: TopicMetadata[];
  isOpen: boolean;
  onToggle: () => void;
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({
  topics,
  isOpen,
  onToggle
}) => {
  const location = useLocation();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isNoteActive = (route: string) => {
    return location.pathname.toLowerCase() === route.toLowerCase();
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNoteClick = () => {
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      <div
        className={`topic-sidebar-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      {!isOpen && (
        <button
          onClick={onToggle}
          className="topic-sidebar-floating-btn"
          style={{
            position: 'fixed',
            left: '16px',
            bottom: '24px',
            zIndex: 400,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: '#161616',
            border: '1px solid var(--color-hairline-strong)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-on-dark)',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.85)',
            cursor: 'pointer'
          }}
          aria-label="Open topic roadmap"
        >
          <SidebarSimple size={17} weight="bold" />
          <span>Topics</span>
        </button>
      )}

      <aside
        className={`topic-sidebar-aside ${isOpen ? 'is-open' : 'is-closed'}`}
        aria-label="Topic navigation"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--color-hairline-soft)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-ink)', fontWeight: 600, fontSize: '14px' }}>
            <BookOpen size={18} color="var(--color-mute)" />
            <span>NumPy Learning</span>
          </div>
          <button
            onClick={onToggle}
            style={{
              padding: '6px',
              color: 'var(--color-mute)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-surface-card)'
            }}
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <X size={16} className="sidebar-close-icon" />
            <SidebarSimple size={16} className="sidebar-hide-icon" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
          {topics.map((topic) => (
            <div key={topic.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 8px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: 'var(--color-mute)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                <span>{topic.title}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '4px' }}>
                {topic.subtopics.map((subtopic) => {
                  const isCollapsed = !!collapsedSections[subtopic.id];

                  return (
                    <div key={subtopic.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        type="button"
                        onClick={() => toggleSection(subtopic.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '7px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--color-ink)',
                          backgroundColor: 'transparent',
                          textAlign: 'left',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {subtopic.title}
                        </span>
                        {isCollapsed ? (
                          <CaretRight size={12} color="var(--color-stone)" />
                        ) : (
                          <CaretDown size={12} color="var(--color-stone)" />
                        )}
                      </button>

                      {!isCollapsed && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            paddingLeft: '14px',
                            borderLeft: '1px solid var(--color-hairline)',
                            marginLeft: '12px',
                            marginTop: '2px',
                            marginBottom: '6px'
                          }}
                        >
                          {subtopic.notes.map((note) => {
                            const active = isNoteActive(note.route);

                            return (
                              <Link
                                key={note.id}
                                to={note.route}
                                onClick={handleNoteClick}
                                style={{
                                  display: 'block',
                                  padding: '7px 10px',
                                  borderRadius: 'var(--radius-xs)',
                                  fontSize: '13px',
                                  color: active ? 'var(--color-on-dark)' : 'var(--color-body)',
                                  backgroundColor: active ? 'var(--color-surface-card)' : 'transparent',
                                  fontWeight: active ? 500 : 400,
                                  borderLeft: active ? '2px solid var(--color-primary)' : '2px solid transparent',
                                  transition: 'all 0.15s ease',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {note.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <style>{`
        @media (min-width: 1024px) {
          .topic-sidebar-backdrop {
            display: none !important;
          }
          .sidebar-close-icon {
            display: none !important;
          }
          .sidebar-hide-icon {
            display: block !important;
          }
          .topic-sidebar-aside {
            width: var(--sidebar-width);
            flex-shrink: 0;
            height: calc(100vh - var(--navbar-height));
            position: sticky;
            top: var(--navbar-height);
            overflow-y: auto;
            border-right: 1px solid var(--color-hairline);
            background-color: var(--color-canvas);
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .topic-sidebar-aside.is-closed {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .sidebar-close-icon {
            display: block !important;
          }
          .sidebar-hide-icon {
            display: none !important;
          }
          .topic-sidebar-backdrop {
            position: fixed;
            inset: 0;
            z-index: 590;
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 250ms ease, visibility 250ms ease;
          }
          .topic-sidebar-backdrop.is-open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }

          .topic-sidebar-aside {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: min(320px, 85vw);
            z-index: 600;
            background-color: #0c0c0c;
            border-right: 1px solid var(--color-hairline-strong);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.9);
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            transform: translateX(-100%);
            transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          .topic-sidebar-aside.is-open {
            transform: translateX(0);
          }
          .topic-sidebar-aside.is-closed {
            transform: translateX(-100%);
            pointer-events: none;
          }
        }
      `}</style>
    </>
  );
};
