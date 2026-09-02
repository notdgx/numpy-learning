import React, { useEffect, useState } from 'react';
import { ListBullets } from '@phosphor-icons/react';
import { Heading } from '../../types/content';

interface TableOfContentsProps {
  headings: Heading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--color-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}
      >
        <ListBullets size={15} />
        <span>On this page</span>
      </div>

      <nav aria-label="Table of Contents" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {headings.map((h) => {
          const isActive = activeId === h.id;
          const indent = Math.max(0, (h.level - 1) * 12);

          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => handleHeadingClick(e, h.id)}
              style={{
                display: 'block',
                padding: '4px 8px',
                paddingLeft: `${8 + indent}px`,
                fontSize: '13px',
                color: isActive ? 'var(--color-on-dark)' : 'var(--color-mute)',
                fontWeight: isActive ? 500 : 400,
                borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                borderRadius: '0 var(--radius-xs) var(--radius-xs) 0',
                transition: 'all 0.15s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
