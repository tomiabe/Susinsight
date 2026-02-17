import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-heading font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md";
  
  const variants = {
    // Green background, White text, Dark Green hover
    primary: "bg-brand-primary text-white hover:bg-brand-dark shadow-sm",
    
    // White background, Dark Green text, Dark Green hover (No Yellow) - Used for dark sections (Resources, Series)
    secondary: "bg-white text-brand-dark hover:bg-brand-dark hover:text-white shadow-sm",
    
    // Green border, Dark text, Green hover (No Yellow)
    outline: "border-2 border-brand-primary text-brand-dark hover:bg-brand-primary hover:text-white",
    
    // Link style
    link: "text-brand-primary hover:text-brand-dark underline-offset-4 hover:underline p-0 h-auto",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = variant === 'link' ? '' : sizes[size];

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-stone-100 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block px-2 py-1 text-xs font-heading font-bold tracking-wide uppercase text-brand-dark bg-brand-light rounded-sm mb-2">
    {children}
  </span>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light = false }) => (
  <div className="mb-8 md:mb-12">
    <h2 className={`text-2xl md:text-4xl font-heading font-bold mb-3 ${light ? 'text-white' : 'text-brand-dark'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl font-body max-w-3xl ${light ? 'text-stone-300' : 'text-stone-600'}`}>
        {subtitle}
      </p>
    )}
    {/* Underline bar */}
    <div className={`h-1 w-20 mt-4 ${light ? 'bg-brand-light' : 'bg-brand-primary'}`}></div>
  </div>
);

export const ReadMoreLink: React.FC<{ href?: string }> = ({ href = '#' }) => (
  <a href={href} className="inline-flex items-center text-brand-primary font-heading font-bold hover:text-brand-dark transition-colors mt-auto pt-4 group text-sm">
    Read More <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
  </a>
);