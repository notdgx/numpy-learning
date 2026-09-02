import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  YoutubeLogo,
  InstagramLogo,
  XLogo,
  GithubLogo,
  ArrowSquareOut,
  QrCode,
  Copy,
  Check,
  CaretDown,
  CaretUp
} from '@phosphor-icons/react';

interface LinksDropdownProps {
  onOpenDonate?: () => void;
}

export const LinksDropdown: React.FC<LinksDropdownProps> = () => {
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isUpiExpanded, setIsUpiExpanded] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const linksCloseTimerRef = useRef<number | null>(null);
  const upiCloseTimerRef = useRef<number | null>(null);

  const upiId = 'notdgx@upi';
  const upiUri = 'upi://pay?pa=notdgx@upi&pn=notdgx&cu=INR';

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 200,
      margin: 0,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
      .then(setQrDataUrl)
      .catch((err) => console.error('Failed to generate UPI QR:', err));
  }, [upiUri]);

  const handleLinksMouseEnter = () => {
    if (linksCloseTimerRef.current) {
      clearTimeout(linksCloseTimerRef.current);
      linksCloseTimerRef.current = null;
    }
    setIsLinksOpen(true);
  };

  const handleLinksMouseLeave = () => {
    linksCloseTimerRef.current = window.setTimeout(() => {
      setIsLinksOpen(false);
      setIsUpiExpanded(false);
    }, 180);
  };

  const handleUpiMouseEnter = () => {
    if (upiCloseTimerRef.current) {
      clearTimeout(upiCloseTimerRef.current);
      upiCloseTimerRef.current = null;
    }
    setIsUpiExpanded(true);
  };

  const handleUpiMouseLeave = () => {
    upiCloseTimerRef.current = window.setTimeout(() => {
      setIsUpiExpanded(false);
    }, 180);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isUpiExpanded) {
        setIsUpiExpanded(false);
      } else {
        setIsLinksOpen(false);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsLinksOpen((prev) => !prev);
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const profiles = [
    { icon: <YoutubeLogo size={18} />, username: 'notdgx', url: 'https://www.youtube.com/@notdgx' },
    { icon: <YoutubeLogo size={18} />, username: 'howdgx', url: 'https://www.youtube.com/@howdgx' },
    { icon: <InstagramLogo size={18} />, username: 'notdgx', url: 'https://www.instagram.com/notdgx' },
    { icon: <InstagramLogo size={18} />, username: 'howdgx', url: 'https://www.instagram.com/howdgx' },
    { icon: <XLogo size={18} />, username: 'notdgxsh', url: 'https://x.com/notdgxsh' },
    { icon: <GithubLogo size={18} />, username: 'notdgx', url: 'https://github.com/notdgx/' }
  ];

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 490,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: isLinksOpen && isUpiExpanded ? 1 : 0,
          visibility: isLinksOpen && isUpiExpanded ? 'visible' : 'hidden',
          pointerEvents: isLinksOpen && isUpiExpanded ? 'auto' : 'none',
          transition: 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), visibility 450ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={() => {
          setIsUpiExpanded(false);
          setIsLinksOpen(false);
        }}
        aria-hidden="true"
      />

      <div
        style={{ position: 'relative', display: 'inline-block', zIndex: 501 }}
        onMouseEnter={handleLinksMouseEnter}
        onMouseLeave={handleLinksMouseLeave}
      >
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            color: isLinksOpen ? 'var(--color-on-dark)' : 'var(--color-body)',
            backgroundColor: isLinksOpen ? 'var(--color-surface-elevated)' : 'transparent',
            fontSize: '14px',
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all 0.15s ease'
          }}
          aria-expanded={isLinksOpen}
          aria-haspopup="menu"
          onKeyDown={handleKeyDown}
        >
          <span>Links</span>
          {isLinksOpen ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
        </button>

        <div
          style={{
            position: 'absolute',
            top: 'calc(100% - 2px)',
            left: '50%',
            transform: isLinksOpen ? 'translate(-50%, 0)' : 'translate(-50%, -6px)',
            opacity: isLinksOpen ? 1 : 0,
            visibility: isLinksOpen ? 'visible' : 'hidden',
            pointerEvents: isLinksOpen ? 'auto' : 'none',
            width: '290px',
            backgroundColor: '#0c0c0c',
            border: '1px solid var(--color-hairline)',
            borderRadius: '14px',
            padding: '14px',
            boxShadow: '0 24px 56px rgba(0, 0, 0, 0.95)',
            zIndex: 502,
            transition: 'opacity 200ms cubic-bezier(0.16, 1, 0.3, 1), transform 200ms cubic-bezier(0.16, 1, 0.3, 1), visibility 200ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          role="menu"
        >
          <div style={{ position: 'absolute', top: '-10px', left: 0, right: 0, height: '10px' }} />

          <div style={{ padding: '0 4px 8px 4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-mute)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              GROUPED PROFILES
            </span>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--color-hairline)', marginBottom: '8px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {profiles.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13.5px',
                  color: 'var(--color-ink)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-card)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--color-mute)', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{item.username}</span>
                </div>
                <ArrowSquareOut size={14} color="var(--color-stone)" />
              </a>
            ))}
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--color-hairline)', margin: '10px 0' }} />

          <div
            onMouseEnter={handleUpiMouseEnter}
            onMouseLeave={handleUpiMouseLeave}
            style={{ width: '100%' }}
          >
            <button
              type="button"
              onClick={() => setIsUpiExpanded((prev) => !prev)}
              onFocus={handleUpiMouseEnter}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: isUpiExpanded ? 'var(--color-surface-card)' : 'var(--color-surface-elevated)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              aria-expanded={isUpiExpanded}
              aria-controls="upi-slide-down-panel"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-ink)', fontSize: '13.5px', fontWeight: 600 }}>
                <QrCode size={18} />
                <span>Donate via UPI</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: isUpiExpanded ? 'var(--color-on-dark)' : 'var(--color-mute)',
                  padding: '2px 6px',
                  backgroundColor: isUpiExpanded ? 'var(--color-surface-elevated)' : 'var(--color-surface-card)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: '4px',
                  transition: 'all 0.18s ease'
                }}
              >
                QR
              </span>
            </button>

            <div
              id="upi-slide-down-panel"
              style={{
                display: 'grid',
                gridTemplateRows: isUpiExpanded ? '1fr' : '0fr',
                opacity: isUpiExpanded ? 1 : 0,
                transform: isUpiExpanded ? 'translateY(0)' : 'translateY(-8px)',
                marginTop: isUpiExpanded ? '10px' : '0px',
                pointerEvents: isUpiExpanded ? 'auto' : 'none',
                visibility: isUpiExpanded ? 'visible' : 'hidden',
                transition: 'grid-template-rows 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), margin-top 500ms cubic-bezier(0.16, 1, 0.3, 1), visibility 500ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    backgroundColor: '#101010',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-ink)' }}>
                      <QrCode size={16} color="var(--color-mute)" />
                      <span>Scan with any UPI App</span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'var(--color-mute)',
                        padding: '2px 6px',
                        backgroundColor: 'var(--color-surface-card)',
                        border: '1px solid var(--color-hairline)',
                        borderRadius: '4px'
                      }}
                    >
                      INR
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '10px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="UPI QR Code"
                        style={{
                          width: '180px',
                          height: '180px',
                          display: 'block'
                        }}
                      />
                    ) : (
                      <div style={{ width: '180px', height: '180px', backgroundColor: '#ffffff' }} />
                    )}
                  </div>

                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      backgroundColor: 'var(--color-surface-card)',
                      border: '1px solid var(--color-hairline)',
                      borderRadius: '6px',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9.5px',
                          color: 'var(--color-ash)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        UPI ID
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12.5px',
                          color: 'var(--color-ink)',
                          fontWeight: 500
                        }}
                      >
                        {upiId}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : 'var(--color-surface-elevated)',
                        color: copied ? '#4ade80' : 'var(--color-ink)',
                        border: '1px solid var(--color-hairline)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      aria-label="Copy UPI ID"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <p
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--color-mute)',
                      textAlign: 'center',
                      lineHeight: 1.4,
                      margin: 0
                    }}
                  >
                    Direct payment via BHIM, GPay, PhonePe, Paytm, or any UPI client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
