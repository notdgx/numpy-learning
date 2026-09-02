import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  YoutubeLogo,
  InstagramLogo,
  XLogo,
  GithubLogo,
  EnvelopeSimple
} from '@phosphor-icons/react';
import { EmeraldHorizonBackground } from '../animations/EmeraldHorizonBackground';

interface FooterProps {
  hue?: number;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ hue = -134, onOpenDonate }) => {
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [instagramOpen, setInstagramOpen] = useState(false);

  const youtubeTimerRef = useRef<number | null>(null);
  const instagramTimerRef = useRef<number | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (footerRef.current && !footerRef.current.contains(e.target as Node)) {
        setYoutubeOpen(false);
        setInstagramOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleYoutubeEnter = () => {
    if (youtubeTimerRef.current) {
      clearTimeout(youtubeTimerRef.current);
      youtubeTimerRef.current = null;
    }
    setYoutubeOpen(true);
  };

  const handleYoutubeLeave = () => {
    youtubeTimerRef.current = window.setTimeout(() => {
      setYoutubeOpen(false);
    }, 180);
  };

  const handleInstagramEnter = () => {
    if (instagramTimerRef.current) {
      clearTimeout(instagramTimerRef.current);
      instagramTimerRef.current = null;
    }
    setInstagramOpen(true);
  };

  const handleInstagramLeave = () => {
    instagramTimerRef.current = window.setTimeout(() => {
      setInstagramOpen(false);
    }, 180);
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-canvas)',
        borderTop: '1px solid var(--color-hairline)',
        overflow: 'hidden',
        padding: 'clamp(48px, 7vw, 64px) clamp(16px, 3vw, 24px) 40px',
        minHeight: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <EmeraldHorizonBackground hue={hue} speed={0.8} vignette={0} />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '32px',
            marginBottom: '40px'
          }}
        >
          {/* Col 1: Identity & Description */}
          <div>
            <Link to="/" className="site-title footer-text-shadow" style={{ fontSize: '20px', marginBottom: '10px' }}>
              numpy-learning
            </Link>
            <p
              className="footer-text-shadow"
              style={{
                color: 'var(--color-body)',
                fontSize: '13.5px',
                lineHeight: 1.6,
                maxWidth: '300px',
                marginTop: '8px'
              }}
            >
              A structured, production-quality NumPy knowledge base, interactive practice notebooks, and reference system maintained by notdgx.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4
              className="footer-text-shadow"
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-ink)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px'
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link to="/notes" className="footer-text-shadow" style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}>
                  Notes Explorer
                </Link>
              </li>
              <li>
                <Link to="/practice" className="footer-text-shadow" style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}>
                  Practice Notebooks
                </Link>
              </li>
              <li>
                <Link to="/projects" className="footer-text-shadow" style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/links" className="footer-text-shadow" style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}>
                  Resources & Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Community */}
          <div>
            <h4
              className="footer-text-shadow"
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-ink)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px'
              }}
            >
              Support & Community
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <button
                  type="button"
                  onClick={onOpenDonate}
                  className="footer-text-shadow"
                  style={{ fontSize: '13.5px', color: 'var(--color-mute)', textAlign: 'left' }}
                >
                  Donate via UPI
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/notdgx/numpy-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-text-shadow"
                  style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="mailto:howdgx@gmail.com"
                  className="footer-text-shadow"
                  style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}
                >
                  howdgx@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Grouped Social Icons */}
          <div>
            <h4
              className="footer-text-shadow"
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-ink)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px'
              }}
            >
              Social Platforms
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* YouTube Popover */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={handleYoutubeEnter}
                onMouseLeave={handleYoutubeLeave}
              >
                <button
                  type="button"
                  onClick={() => setYoutubeOpen((prev) => !prev)}
                  style={{
                    color: 'var(--color-ink)',
                    padding: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-hairline)',
                    cursor: 'pointer'
                  }}
                  aria-label="YouTube channels"
                >
                  <YoutubeLogo size={20} />
                </button>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 6px)',
                    left: '50%',
                    transform: youtubeOpen ? 'translate(-50%, 0)' : 'translate(-50%, 4px)',
                    opacity: youtubeOpen ? 1 : 0,
                    visibility: youtubeOpen ? 'visible' : 'hidden',
                    pointerEvents: youtubeOpen ? 'auto' : 'none',
                    backgroundColor: '#101010',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-md)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '110px',
                    zIndex: 20,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.9)',
                    transition: 'opacity 180ms ease, transform 180ms ease, visibility 180ms ease'
                  }}
                  onMouseEnter={handleYoutubeEnter}
                  onMouseLeave={handleYoutubeLeave}
                >
                  <div style={{ position: 'absolute', bottom: '-10px', left: 0, right: 0, height: '10px' }} />
                  <a
                    href="https://www.youtube.com/@notdgx"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', padding: '4px 8px', color: 'var(--color-ink)', borderRadius: 'var(--radius-xs)', transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-card)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    @notdgx
                  </a>
                  <a
                    href="https://www.youtube.com/@howdgx"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', padding: '4px 8px', color: 'var(--color-ink)', borderRadius: 'var(--radius-xs)', transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-card)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    @howdgx
                  </a>
                </div>
              </div>

              {/* Instagram Popover */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={handleInstagramEnter}
                onMouseLeave={handleInstagramLeave}
              >
                <button
                  type="button"
                  onClick={() => setInstagramOpen((prev) => !prev)}
                  style={{
                    color: 'var(--color-ink)',
                    padding: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-hairline)',
                    cursor: 'pointer'
                  }}
                  aria-label="Instagram profiles"
                >
                  <InstagramLogo size={20} />
                </button>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 6px)',
                    left: '50%',
                    transform: instagramOpen ? 'translate(-50%, 0)' : 'translate(-50%, 4px)',
                    opacity: instagramOpen ? 1 : 0,
                    visibility: instagramOpen ? 'visible' : 'hidden',
                    pointerEvents: instagramOpen ? 'auto' : 'none',
                    backgroundColor: '#101010',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-md)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '110px',
                    zIndex: 20,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.9)',
                    transition: 'opacity 180ms ease, transform 180ms ease, visibility 180ms ease'
                  }}
                  onMouseEnter={handleInstagramEnter}
                  onMouseLeave={handleInstagramLeave}
                >
                  <div style={{ position: 'absolute', bottom: '-10px', left: 0, right: 0, height: '10px' }} />
                  <a
                    href="https://www.instagram.com/notdgx"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', padding: '4px 8px', color: 'var(--color-ink)', borderRadius: 'var(--radius-xs)', transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-card)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    @notdgx
                  </a>
                  <a
                    href="https://www.instagram.com/howdgx"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', padding: '4px 8px', color: 'var(--color-ink)', borderRadius: 'var(--radius-xs)', transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-card)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    @howdgx
                  </a>
                </div>
              </div>

              {/* X / Twitter */}
              <a
                href="https://x.com/notdgxsh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-ink)',
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-hairline)'
                }}
                aria-label="X Profile"
              >
                <XLogo size={20} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/notdgx/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-ink)',
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-hairline)'
                }}
                aria-label="GitHub Profile"
              >
                <GithubLogo size={20} />
              </a>

              {/* Email */}
              <a
                href="mailto:howdgx@gmail.com"
                style={{
                  color: 'var(--color-ink)',
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-hairline)'
                }}
                aria-label="Send email"
              >
                <EnvelopeSimple size={20} />
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: '20px',
            borderTop: '1px solid var(--color-hairline-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12.5px',
            color: 'var(--color-mute)'
          }}
        >
          <span className="footer-text-shadow">
            &copy; 2026 notdgx. All rights reserved.
          </span>
          <span className="footer-text-shadow">
            Crafted for high-performance numerical computing & developer learning.
          </span>
        </div>
      </div>
    </footer>
  );
};
