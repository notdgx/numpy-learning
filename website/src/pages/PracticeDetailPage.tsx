import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, WarningCircle, Notebook, House, CaretRight } from '@phosphor-icons/react';
import { getPracticeByRoute, getAdjacentPractice } from '../services/contentService';
import { IpynbViewer } from '../components/practice/IpynbViewer';
import { TheoryLinkCard } from '../components/practice/TheoryLinkCard';
import { renderMarkdownToHtml } from '../utils/markdown';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export const PracticeDetailPage: React.FC = () => {
  const location = useLocation();
  const practiceDoc = getPracticeByRoute(location.pathname);
  const { prev, next } = practiceDoc ? getAdjacentPractice(practiceDoc.metadata.route) : { prev: null, next: null };

  if (!practiceDoc) {
    return (
      <div style={{ maxWidth: '640px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="surface-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 24px' }}>
          <WarningCircle size={44} color="var(--color-ash)" />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-ink)' }}>Practice Notebook Unavailable</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-mute)', lineHeight: 1.6 }}>
            The practice session for route &ldquo;<code>{location.pathname}</code>&rdquo; could not be loaded.
          </p>
          <Link to="/practice" className="btn-primary" style={{ marginTop: '8px' }}>
            <ArrowLeft size={16} />
            <span>Return to Practice</span>
          </Link>
        </div>
      </div>
    );
  }

  const isIpynb = practiceDoc.metadata.fileType === 'ipynb';

  return (
    <ErrorBoundary>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '36px clamp(16px, 3vw, 24px) 80px', width: '100%', overflowX: 'hidden' }}>
        {/* Breadcrumbs */}
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
            whiteSpace: 'nowrap'
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-mute)' }}>
            <House size={14} />
          </Link>
          <CaretRight size={12} color="var(--color-stone)" />
          <Link to="/practice" style={{ color: 'var(--color-mute)' }}>
            Practice
          </Link>
          <CaretRight size={12} color="var(--color-stone)" />
          <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>{practiceDoc.metadata.title}</span>
        </nav>

        {/* Title Header */}
        <header style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--color-hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Notebook size={22} color="var(--color-mute)" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PRACTICE SESSION {practiceDoc.metadata.order.toString().padStart(2, '0')}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: 'var(--color-ink)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            {practiceDoc.metadata.title}
          </h1>

          <div style={{ color: 'var(--color-ash)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            {practiceDoc.metadata.sourcePath}
          </div>
        </header>

        {/* Connected Theory Note Link Card */}
        {practiceDoc.metadata.noteRoute && (
          <TheoryLinkCard
            noteRoute={practiceDoc.metadata.noteRoute}
            noteTitle={practiceDoc.metadata.noteTitle}
          />
        )}

        {/* Practice Content: Jupyter Notebook (.ipynb) or Markdown (.md) */}
        {isIpynb ? (
          <IpynbViewer rawContent={practiceDoc.rawContent} />
        ) : (
          <article
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(practiceDoc.rawContent) }}
          />
        )}

        {/* Prev / Next Practice Navigation */}
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
                <span>Previous Practice</span>
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
                <span>Next Practice</span>
                <CaretRight size={13} />
              </div>
              <span style={{ fontSize: '14px', color: 'var(--color-ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {next.metadata.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};
