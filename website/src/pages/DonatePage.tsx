import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Copy, Check, Heart, ShieldCheck } from '@phosphor-icons/react';

export const DonatePage: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const upiId = 'notdgx@upi';
  const upiUri = 'upi://pay?pa=notdgx@upi&pn=notdgx&cu=INR';

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 260,
      margin: 1,
      color: {
        dark: '#ffffff',
        light: '#101010'
      }
    })
      .then(setQrDataUrl)
      .catch((err) => console.error('Failed to generate UPI QR:', err));
  }, [upiUri]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px) 80px', width: '100%', overflowX: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-elevated)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-ink)',
            marginBottom: '16px'
          }}
        >
          <Heart size={24} color="#f472b6" weight="fill" />
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', color: 'var(--color-ink)', marginBottom: '8px' }}>
          Support numpy-learning
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--color-mute)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
          This project is an open, high-quality technical repository developed to provide deep NumPy numerical computing knowledge for developers worldwide.
        </p>
      </div>

      <div
        className="surface-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(24px, 4vw, 36px) clamp(16px, 3vw, 24px)',
          maxWidth: '480px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-ink)', fontSize: '15px', fontWeight: 600 }}>
          <QrCode size={20} />
          <span>UPI Instant Payment</span>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '20px',
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
              style={{ width: 'min(220px, 60vw)', height: 'auto', aspectRatio: '1', display: 'block', borderRadius: 'var(--radius-sm)' }}
            />
          ) : (
            <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-mute)' }}>
              Generating QR...
            </div>
          )}
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: 'var(--color-surface-card)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '14px',
            flexWrap: 'wrap'
          }}
        >
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px', color: 'var(--color-ink)' }}>
            {upiId}
          </code>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
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
            <span>{copied ? 'Copied!' : 'Copy ID'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-ash)', fontSize: '12px', textAlign: 'center', justifyContent: 'center' }}>
          <ShieldCheck size={16} style={{ flexShrink: 0 }} />
          <span>Zero fee direct payment via GPay, PhonePe, Paytm, or BHIM.</span>
        </div>
      </div>
    </div>
  );
};
