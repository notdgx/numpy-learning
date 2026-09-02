import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, WarningCircle, ListBullets, CaretDown, CaretUp } from '@phosphor-icons/react';
import { getNoteByRoute, getTopicTree, getAdjacentNotes } from '../services/contentService';
import { renderMarkdownToHtml } from '../utils/markdown';
import { TopicSidebar } from '../components/notes/TopicSidebar';
import { Breadcrumbs } from '../components/notes/Breadcrumbs';
import { TableOfContents } from '../components/notes/TableOfContents';
import { ReferenceFileList } from '../components/notes/ReferenceFileList';
import { PracticeLinkCard } from '../components/notes/PracticeLinkCard';
import { PrevNextNav } from '../components/notes/PrevNextNav';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export const NoteDetailPage: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const noteDoc = getNoteByRoute(location.pathname);
  const topics = getTopicTree();
  const { prev, next } = noteDoc ? getAdjacentNotes(noteDoc.metadata.route) : { prev: null, next: null };

  useEffect(() => {
    const handleCopyClick = async (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.copy-code-btn') as HTMLButtonElement | null;
      if (!target) return;

      const encoded = target.getAttribute('data-code');
      if (!encoded) return;

      const raw = decodeURIComponent(encoded);
      try {
        await navigator.clipboard.writeText(raw);
        const span = target.querySelector('span');
        if (span) {
          span.textContent = 'Copied!';
          setTimeout(() => {
            span.textContent = 'Copy';
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy code snippet:', err);
      }
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, [noteDoc]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  if (!noteDoc) {
    return (
      <div style={{ maxWidth: '640px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="surface-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 24px' }}>
          <WarningCircle size={44} color="var(--color-ash)" />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-ink)' }}>Note Unavailable</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-mute)', lineHeight: 1.6 }}>
            The note for route &ldquo;<code>{location.pathname}</code>&rdquo; could not be loaded from repository metadata.
          </p>
          <Link to="/notes" className="btn-primary" style={{ marginTop: '8px' }}>
            <ArrowLeft size={16} />
            <span>Return to Notes</span>
          </Link>
        </div>
      </div>
    );
  }

  const renderedHtml = renderMarkdownToHtml(noteDoc.rawContent);

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - var(--navbar-height))' }}>
        {/* Left: Topic Tree Sidebar */}
        <TopicSidebar
          topics={topics}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Center: Main Markdown Document */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: '36px 40px 80px',
            maxWidth: '900px',
            margin: '0 auto',
            overflowX: 'hidden'
          }}
          className="note-main-content"
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            topicTitle={noteDoc.topicTitle}
            subtopicTitle={noteDoc.subtopicTitle}
            noteTitle={noteDoc.metadata.title}
          />

          {/* Title & Metadata Header */}
          <header style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--color-hairline)' }}>
            <h1 className="note-detail-title" style={{ fontSize: '2.4rem', color: 'var(--color-ink)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              {noteDoc.metadata.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: 'var(--color-mute)', flexWrap: 'wrap' }}>
              {noteDoc.metadata.date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} color="var(--color-stone)" />
                  <span>{noteDoc.metadata.date}</span>
                </div>
              )}
              {noteDoc.metadata.time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} color="var(--color-stone)" />
                  <span>{noteDoc.metadata.time}</span>
                </div>
              )}
              <div style={{ color: 'var(--color-ash)', fontSize: '11px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
                {noteDoc.metadata.sourcePath}
              </div>
            </div>
          </header>

          {/* Mobile-Only Collapsible Table of Contents & References */}
          {noteDoc.metadata.headings.length > 0 && (
            <div className="mobile-toc-container">
              <button
                type="button"
                onClick={() => setMobileTocOpen((prev) => !prev)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: mobileTocOpen ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
                  color: 'var(--color-ink)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                aria-expanded={mobileTocOpen}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ListBullets size={16} color="var(--color-mute)" />
                  <span>On this page ({noteDoc.metadata.headings.length} sections)</span>
                </div>
                {mobileTocOpen ? <CaretUp size={14} /> : <CaretDown size={14} />}
              </button>

              {mobileTocOpen && (
                <div
                  style={{
                    padding: '14px',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-hairline)',
                    borderTop: 'none',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                    marginBottom: '16px'
                  }}
                >
                  <TableOfContents headings={noteDoc.metadata.headings} />
                  {noteDoc.metadata.practiceRoute && (
                    <PracticeLinkCard
                      practiceRoute={noteDoc.metadata.practiceRoute}
                      practiceTitle={noteDoc.metadata.practiceTitle}
                      practiceType={noteDoc.metadata.practiceType}
                    />
                  )}
                  {noteDoc.metadata.references.length > 0 && (
                    <ReferenceFileList references={noteDoc.metadata.references} />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Rendered Markdown Body */}
          <article
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />

          {/* Prev/Next Navigation */}
          <PrevNextNav prev={prev} next={next} />
        </main>

        {/* Right: Overview / Table of Contents & References */}
        <aside
          style={{
            width: 'var(--toc-width)',
            flexShrink: 0,
            height: 'calc(100vh - var(--navbar-height))',
            position: 'sticky',
            top: 'var(--navbar-height)',
            overflowY: 'auto',
            padding: '36px 20px',
            borderLeft: '1px solid var(--color-hairline)',
            backgroundColor: 'var(--color-canvas)',
            display: 'none'
          }}
          className="toc-sidebar"
          aria-label="Document overview"
        >
          <TableOfContents headings={noteDoc.metadata.headings} />
          {noteDoc.metadata.practiceRoute && (
            <PracticeLinkCard
              practiceRoute={noteDoc.metadata.practiceRoute}
              practiceTitle={noteDoc.metadata.practiceTitle}
              practiceType={noteDoc.metadata.practiceType}
            />
          )}
          <ReferenceFileList references={noteDoc.metadata.references} />
        </aside>

        <style>{`
          .mobile-toc-container {
            display: none;
            margin-bottom: 24px;
          }
          @media (min-width: 1100px) {
            .toc-sidebar {
              display: block !important;
            }
          }
          @media (max-width: 1099px) {
            .mobile-toc-container {
              display: block !important;
            }
          }
          @media (max-width: 768px) {
            .note-main-content {
              padding: 20px 16px 64px !important;
            }
            .note-detail-title {
              font-size: 1.85rem !important;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};
