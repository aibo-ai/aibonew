import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            style={{ borderBottom: '1px solid var(--border-clr)' }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex items-center justify-between w-full"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '22px 0',
                gap: 16,
              }}
            >
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.q}
              </span>
              <span
                className="flex items-center justify-center"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: isOpen ? 'var(--purple)' : 'var(--off-white)',
                  color: isOpen ? '#fff' : 'var(--text-secondary)',
                  flexShrink: 0,
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s, background 0.2s',
                }}
              >
                <Plus size={14} />
              </span>
            </button>
            {isOpen && (
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 22px', maxWidth: 700 }}>
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
