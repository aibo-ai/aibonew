export default function SectionLabel({ text, dark, centered, noRule }) {
  return (
    <div
      className={`flex items-center gap-2 ${centered ? 'justify-center' : ''}`}
      style={{ marginBottom: 16 }}
    >
      {!noRule && (
        <span
          style={{
            display: 'block',
            width: 20,
            height: 2,
            borderRadius: 2,
            background: 'var(--purple)',
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: dark ? '#A07AF0' : 'var(--purple-dark)',
        }}
      >
        {text}
      </span>
    </div>
  );
}
