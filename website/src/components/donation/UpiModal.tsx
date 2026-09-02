import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, QrCode } from '@phosphor-icons/react';

interface UpiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpiModal: React.FC<UpiModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const upiId = 'notdgx@upi';
  const upiUri = 'upi://pay?pa=notdgx@upi&pn=notdgx&cu=INR';

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 220,
      margin: 1,
      color: {
        dark: '#ffffff',
        light: '#101010'
      }
    })
      .then(setQrDataUrl)
      .catch((err) => console.error('Failed to generate UPI QR:', err));
  }, [upiUri]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upi-modal-title"
    >
      <div
        ref={modalRef}
        style={{
          width: 'calc(100vw - 32px)',
          maxWidth: '380px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-hairline-strong)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.9)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            color: 'var(--color-mute)',
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-surface-elevated)'
          }}
          aria-label="Close donation modal"
        >
          <X size={18} />
        </button>

        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-ink)',
            marginBottom: '12px'
          }}
        >
          <QrCode size={22} />
        </div>

        <h2 id="upi-modal-title" style={{ fontSize: '1.2rem', color: 'var(--color-ink)', marginBottom: '4px' }}>
          Support numpy-learning
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-mute)', marginBottom: '16px' }}>
          Scan with any UPI app to donate directly
        </p>

        {/* QR Code */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%'
          }}
        >
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="UPI QR Code"
              style={{
                width: 'min(190px, 50vw)',
                height: 'auto',
                aspectRatio: '1',
                display: 'block',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          ) : (
            <div style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-stone)' }}>
              Generating QR...
            </div>
          )}
        </div>

        {/* UPI ID Copy Field */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '8px',
            flexWrap: 'wrap'
          }}
        >
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-ink)' }}>
            {upiId}
          </code>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : 'var(--color-surface-elevated)',
              color: copied ? '#4ade80' : 'var(--color-ink)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            aria-label="Copy UPI ID"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <span style={{ fontSize: '11px', color: 'var(--color-ash)' }}>
          Accepted: GPay, PhonePe, Paytm, BHIM, CRED
        </span>
      </div>
    </div>
  );
};
