interface ObfuscatedEmailProps {
  email: string;
  className?: string;
  asLink?: boolean;
  children?: React.ReactNode;
}

/**
 * Component to display email addresses with HTML entity encoding
 * to help protect against spam bots while keeping it readable for users
 */
export function ObfuscatedEmail({ email, className, asLink = false, children }: ObfuscatedEmailProps) {
  // Convert email to HTML entities
  const obfuscatedEmail = email
    .replace(/@/g, '&#64;')
    .replace(/\./g, '&#46;');

  if (asLink) {
    return (
      <a 
        href={`mailto:${email}`}
        className={className}
      >
        {children || <span dangerouslySetInnerHTML={{ __html: obfuscatedEmail }} />}
      </a>
    );
  }

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: obfuscatedEmail }} 
    />
  );
}
