export default function GlassCard({ children, className = '', hover = true, tone = 'light' }) {
  const toneClass = tone === 'dark' ? 'glass-card-dark' : 'glass-card';

  return (
    <div className={`
      ${toneClass}
      rounded-3xl
      ${hover ? 'hover:-translate-y-2' : ''}
      transition-all duration-[400ms] ease-out
      ${className}
    `}>
      {children}
    </div>
  );
}
