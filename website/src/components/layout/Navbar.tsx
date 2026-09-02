import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  GithubLogo,
  Star,
  House,
  BookOpen,
  Code,
  Lightbulb,
  LinkSimple,
  Heart,
  ArrowRight
} from '@phosphor-icons/react';
import { LinksDropdown } from './LinksDropdown';

interface NavbarProps {
  onOpenDonate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/', icon: <House size={20} />, desc: 'Overview & knowledge base' },
    { label: 'Notes', path: '/notes', icon: <BookOpen size={20} />, desc: 'Structured NumPy theory notes' },
    { label: 'Projects', path: '/projects', icon: <Code size={20} />, desc: 'Vectorized algorithms & tools' },
    { label: 'Practice', path: '/practice', icon: <Lightbulb size={20} />, desc: 'Interactive Jupyter notebooks' },
    { label: 'Links', path: '/links', icon: <LinkSimple size={20} />, desc: 'NumPy ecosystem & community' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 500,
          height: 'var(--navbar-height)',
          backgroundColor: 'rgba(5, 5, 5, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-hairline)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 'var(--max-content-width)',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Left: Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', minWidth: 0 }}>
            <Link to="/" className="site-title nav-site-title" aria-label="numpy-learning homepage">
              numpy-learning
            </Link>

            {/* Desktop Nav Links (Slice first 4, Links is handled by LinksDropdown) */}
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '4px'
              }}
              className="desktop-nav"
            >
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: isActive(link.path) ? 'var(--color-on-dark)' : 'var(--color-body)',
                    backgroundColor: isActive(link.path) ? 'var(--color-surface-elevated)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <LinksDropdown onOpenDonate={onOpenDonate} />
            </nav>
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* GitHub Star Badge */}
            <a
              href="https://github.com/notdgx/numpy-learning"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github-star"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                color: 'var(--color-ink)',
                transition: 'border-color 0.15s ease'
              }}
              aria-label="GitHub Repository"
            >
              <GithubLogo size={16} />
              <span className="star-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: 'var(--color-mute)', fontSize: '12px' }}>
                <Star size={12} weight="fill" color="var(--color-mute)" />
                <span>Star</span>
              </span>
            </a>

            {/* Donate CTA */}
            <button
              onClick={onOpenDonate}
              className="btn-primary nav-donate-btn"
              style={{ height: '32px', padding: '0 14px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span>Donate</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '32px',
                padding: 0,
                color: 'var(--color-ink)',
                backgroundColor: mobileMenuOpen ? 'var(--color-surface-card)' : 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
              className="mobile-menu-btn"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3.5" y1="6" x2="20.5" y2="6" />
                  <line x1="3.5" y1="12" x2="20.5" y2="12" />
                  <line x1="3.5" y1="18" x2="20.5" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Rendered via Portal to document.body */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="mobile-nav-portal"
          style={{
            position: 'fixed',
            top: 'var(--navbar-height, 56px)',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: 'calc(100dvh - var(--navbar-height, 56px))',
            backgroundColor: 'rgba(8, 8, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 16px 28px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px 6px' }}>
              Navigation Menu
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: active ? 'var(--color-surface-elevated)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid',
                    borderColor: active ? 'var(--color-hairline-strong)' : 'var(--color-hairline)',
                    transition: 'all 0.15s ease',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: active ? 'var(--color-surface-card)' : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: active ? '#4ade80' : 'var(--color-ink)',
                        flexShrink: 0
                      }}
                    >
                      {link.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: active ? 'var(--color-on-dark)' : 'var(--color-ink)' }}>
                        {link.label}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {link.desc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} color={active ? 'var(--color-ink)' : 'var(--color-stone)'} style={{ flexShrink: 0, marginLeft: '8px' }} />
                </Link>
              );
            })}
          </div>

          {/* Bottom Action Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-hairline)' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              style={{
                width: '100%',
                height: '46px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '14.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Heart size={18} weight="fill" color="#f472b6" />
              <span>Donate via UPI</span>
            </button>

            <a
              href="https://github.com/notdgx/numpy-learning"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                width: '100%',
                height: '44px',
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-ink)',
                fontSize: '13.5px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              <GithubLogo size={18} />
              <span>Star on GitHub (notdgx/numpy-learning)</span>
            </a>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav-portal {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .nav-site-title {
            font-size: 17px !important;
          }
          .nav-github-star .star-label {
            display: none !important;
          }
          .nav-github-star {
            padding: 6px 8px !important;
          }
          .nav-donate-btn {
            padding: 0 10px !important;
            font-size: 12.5px !important;
          }
        }
      `}</style>
    </>
  );
};
