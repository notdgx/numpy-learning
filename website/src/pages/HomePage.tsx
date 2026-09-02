import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, Lightbulb, LinkSimple, Star, CheckCircle } from '@phosphor-icons/react';
import { RibbonFieldBackground } from '../components/animations/RibbonFieldBackground';
import { getTopicTree, getStats } from '../services/contentService';

interface HomePageProps {
  heroHue?: number;
  onOpenDonate: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ heroHue = 0 }) => {
  const topics = getTopicTree();
  const stats = getStats();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION with RibbonField WebGL */}
      <section
        className="home-hero-section"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(440px, 50vw, 680px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(48px, 8vw, 72px) 16px',
          borderBottom: '1px solid var(--color-hairline)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-canvas)'
        }}
      >
        <RibbonFieldBackground hue={heroHue} speed={1.0} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--color-hairline-strong)',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-ink)',
              backdropFilter: 'blur(8px)',
              maxWidth: '100%'
            }}
          >
            <CheckCircle size={14} color="#4ade80" style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Structured NumPy 2.0+ Knowledge Base
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(2.1rem, 6.5vw, 3.75rem)',
              color: 'var(--color-on-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
            }}
          >
            numpy-learning
          </h1>

          {/* Subtitle - Short & Concise */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)',
              color: 'var(--color-body)',
              lineHeight: 1.6,
              maxWidth: '580px',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)'
            }}
          >
            A structured, in-depth technical knowledge repository covering NumPy array computing, memory models, and vectorized operations.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
            <Link to="/notes" className="btn-primary hero-btn" style={{ height: '42px', padding: '0 22px', fontSize: '14.5px' }}>
              <span>Explore Notes</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/notdgx/numpy-learning"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hero-btn"
              style={{ height: '42px', padding: '0 20px', fontSize: '14.5px' }}
            >
              <span>View on GitHub</span>
              <Star size={16} />
            </a>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--color-hairline-soft)',
              color: 'var(--color-mute)',
              fontSize: '13px',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <strong style={{ color: 'var(--color-ink)', fontSize: '15px' }}>{stats.notes}</strong> Active Notes
            </div>
            <div>
              <strong style={{ color: 'var(--color-ink)', fontSize: '15px' }}>{stats.subtopics}</strong> Subtopics
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEARNING MODULES / TOPICS */}
      <section style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto', padding: 'clamp(48px, 6vw, 72px) clamp(16px, 3vw, 24px)', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Curriculum Overview
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.85rem)', color: 'var(--color-ink)', marginTop: '4px' }}>
              Structured Learning Topics
            </h2>
          </div>
          <Link to="/notes" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'var(--color-ink)' }}>
            <span>Browse complete roadmap</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="surface-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px', padding: '20px' }}
            >
              <div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-ink)',
                    marginBottom: '14px'
                  }}
                >
                  <BookOpen size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-ink)', marginBottom: '8px' }}>
                  {topic.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--color-mute)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Foundational NumPy concepts, internal array representation, C execution mechanics, and multidimensional striding.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {topic.subtopics.map((st) => (
                    <div key={st.id} style={{ fontSize: '13px', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--color-stone)' }}>•</span>
                      <span>{st.title} ({st.notes.length} notes)</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={topic.subtopics[0]?.notes[0]?.route || '/notes'}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Start Topic</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROJECTS & PRACTICE PREVIEW */}
      <section style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)', padding: 'clamp(48px, 6vw, 72px) clamp(16px, 3vw, 24px)' }}>
        <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            {/* Projects Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink)' }}>
                <Code size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-ink)' }}>Hands-on Projects</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--color-mute)', lineHeight: 1.6 }}>
                Real-world scripts, numerical algorithms, and architectural implementations designed to apply core NumPy theory in production environments.
              </p>
              <Link to="/projects" className="btn-secondary" style={{ width: 'fit-content', marginTop: '6px' }}>
                <span>View Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Practice Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink)' }}>
                <Lightbulb size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-ink)' }}>Interview & Practice Questions</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--color-mute)', lineHeight: 1.6 }}>
                Curated technical questions, intermediate-to-advanced challenges, and annotated notebook walkthroughs.
              </p>
              <Link to="/practice" className="btn-secondary" style={{ width: 'fit-content', marginTop: '6px' }}>
                <span>Explore Practice</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED RESOURCES PREVIEW */}
      <section style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto', padding: 'clamp(48px, 6vw, 72px) clamp(16px, 3vw, 24px)', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Ecosystem
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.85rem)', color: 'var(--color-ink)', marginTop: '4px', marginBottom: '8px' }}>
            External Resources & Links
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}>
            Curated channels, official documentation, social accounts, and repository tools.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <a
            href="https://numpy.org/doc/stable/"
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px' }}
          >
            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--color-ink)' }}>Official NumPy Docs</h4>
              <span style={{ fontSize: '12px', color: 'var(--color-mute)' }}>numpy.org/doc</span>
            </div>
            <LinkSimple size={18} color="var(--color-mute)" />
          </a>

          <a
            href="https://github.com/notdgx/"
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px' }}
          >
            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--color-ink)' }}>notdgx GitHub</h4>
              <span style={{ fontSize: '12px', color: 'var(--color-mute)' }}>github.com/notdgx</span>
            </div>
            <LinkSimple size={18} color="var(--color-mute)" />
          </a>

          <a
            href="https://www.youtube.com/@notdgx"
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px' }}
          >
            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--color-ink)' }}>notdgx YouTube</h4>
              <span style={{ fontSize: '12px', color: 'var(--color-mute)' }}>youtube.com/@notdgx</span>
            </div>
            <LinkSimple size={18} color="var(--color-mute)" />
          </a>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .home-hero-section {
            aspect-ratio: 16 / 9 !important;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-group {
            flex-direction: column !important;
          }
          .hero-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
