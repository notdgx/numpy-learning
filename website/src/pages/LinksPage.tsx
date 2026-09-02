import React from 'react';
import {
  YoutubeLogo,
  InstagramLogo,
  XLogo,
  GithubLogo,
  EnvelopeSimple,
  ArrowSquareOut,
  Book,
  Code
} from '@phosphor-icons/react';

export const LinksPage: React.FC = () => {
  const resourceCategories = [
    {
      title: 'Creator & Social Links',
      description: 'Official profiles and community channels for notdgx.',
      items: [
        {
          name: 'notdgx on GitHub',
          handle: '@notdgx',
          url: 'https://github.com/notdgx/',
          icon: <GithubLogo size={22} />,
          desc: 'Open-source repositories, developer tools, and projects.'
        },
        {
          name: 'notdgx on YouTube',
          handle: '@notdgx',
          url: 'https://www.youtube.com/@notdgx',
          icon: <YoutubeLogo size={22} />,
          desc: 'Technical tutorials, deep dives, and programming demonstrations.'
        },
        {
          name: 'howdgx on YouTube',
          handle: '@howdgx',
          url: 'https://www.youtube.com/@howdgx',
          icon: <YoutubeLogo size={22} />,
          desc: 'Behind the scenes, developer logs, and technical explorations.'
        },
        {
          name: 'notdgx on Instagram',
          handle: '@notdgx',
          url: 'https://www.instagram.com/notdgx',
          icon: <InstagramLogo size={22} />,
          desc: 'Visual notes, programming snippets, and developer updates.'
        },
        {
          name: 'howdgx on Instagram',
          handle: '@howdgx',
          url: 'https://www.instagram.com/howdgx',
          icon: <InstagramLogo size={22} />,
          desc: 'Tech lifestyle, workspace setups, and behind-the-scenes logs.'
        },
        {
          name: 'notdgx on X (Twitter)',
          handle: '@notdgxsh',
          url: 'https://x.com/notdgxsh',
          icon: <XLogo size={22} />,
          desc: 'Thoughts on software architecture, numerical computing, and tooling.'
        },
        {
          name: 'Contact & Support Email',
          handle: 'howdgx@gmail.com',
          url: 'mailto:howdgx@gmail.com',
          icon: <EnvelopeSimple size={22} />,
          desc: 'Direct email inquiries for feedback, collaborations, or questions.'
        }
      ]
    },
    {
      title: 'NumPy Ecosystem & Scientific Python',
      description: 'Official documentation and standards.',
      items: [
        {
          name: 'Official NumPy Documentation',
          handle: 'numpy.org/doc/stable',
          url: 'https://numpy.org/doc/stable/',
          icon: <Book size={22} />,
          desc: 'Complete official standard user guide, reference manual, and API documentation.'
        },
        {
          name: 'NumPy GitHub Repository',
          handle: 'github.com/numpy/numpy',
          url: 'https://github.com/numpy/numpy',
          icon: <Code size={22} />,
          desc: 'The fundamental package for scientific computing with Python.'
        }
      ]
    }
  ];

  return (
    <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto', padding: 'clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px) 80px', width: '100%', overflowX: 'hidden' }}>
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Directory
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', color: 'var(--color-ink)', marginTop: '4px', marginBottom: '8px' }}>
          Resources & Links
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--color-mute)', maxWidth: '650px', lineHeight: 1.6 }}>
          Curated directory of creator channels, community profiles, official NumPy documentation, and source repositories.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {resourceCategories.map((cat, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.4rem)', color: 'var(--color-ink)', marginBottom: '4px' }}>
                {cat.title}
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--color-mute)' }}>
                {cat.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '14px' }}>
              {cat.items.map((item, itemIdx) => (
                <a
                  key={itemIdx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    padding: '16px 18px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--color-surface-card)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-ink)',
                          flexShrink: 0
                        }}
                      >
                        {item.icon}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h3 style={{ fontSize: '14px', color: 'var(--color-ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </h3>
                        <span style={{ fontSize: '11.5px', color: 'var(--color-mute)', fontFamily: 'var(--font-mono)' }}>
                          {item.handle}
                        </span>
                      </div>
                    </div>
                    <ArrowSquareOut size={16} color="var(--color-mute)" style={{ flexShrink: 0, marginLeft: '8px' }} />
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--color-mute)', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
