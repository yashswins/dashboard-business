import Link from 'next/link';

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = ''
}) {
  const baseClasses = "px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ease-out";

  const variants = {
    primary: "bg-[#007AFF] text-white hover:bg-[#0051D5] hover:-translate-y-1 shadow-lg hover:shadow-xl",
    secondary: "bg-transparent text-[#007AFF] border-2 border-[#007AFF] hover:bg-[#007AFF]/10 hover:-translate-y-1"
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
