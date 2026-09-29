export default function SectionLabel({ text, dark, amber, centered, noRule }) {
  const ruleColor = amber ? 'var(--acc)' : 'var(--purple)';
  const textColor = amber ? (dark ? 'var(--acc)' : 'var(--dark)') : (dark ? '#A07AF0' : 'var(--purple-dark)');
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
            background: ruleColor,
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
          color: textColor,
        }}
      >
        {text}
      </span>
    </div>
  );
}
