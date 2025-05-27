import React from 'react';
import { SpinnerIcon } from './SpinnerIcon';

// Define base props shared by Button and Anchor styled as Button
type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

// Define props for HTML button element, extending base props
type HTMLButtonElementProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
  href?: undefined;
};

// Define props for HTML anchor element, extending base props
type HTMLAnchorElementProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
  href: string;
};

export type ButtonProps = HTMLButtonElementProps | HTMLAnchorElementProps;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '', // User-provided className for custom styling
    isLoading = false,
    ...rest // Contains href OR (type, disabled), plus other native attrs
  } = props;

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-bg transition-all duration-150 ease-in-out hover:-translate-y-px active:translate-y-0';
  
  const variantStylesDict = {
    primary: 'bg-brand-primary hover:bg-opacity-85 text-text-on-brand focus:ring-brand-primary',
    secondary: 'bg-brand-secondary hover:bg-opacity-85 text-text-on-brand focus:ring-brand-secondary',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-text-on-brand focus:ring-brand-primary',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizeStylesDict = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };
  
  const content = isLoading ? <SpinnerIcon /> : children;

  if (rest.href !== undefined) {
    // It's an Anchor
    const { href, target, rel, onClick, ...anchorSpecificProps } = rest as Omit<HTMLAnchorElementProps, keyof ButtonBaseProps>;
    
    const isBehaviorallyDisabled = isLoading;
    
    const finalClassName = `${baseStyles} ${variantStylesDict[variant]} ${sizeStylesDict[size]} ${className} ${isBehaviorallyDisabled ? 'opacity-60 cursor-not-allowed' : ''}`;

    return (
      <a
        href={isBehaviorallyDisabled ? undefined : href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={finalClassName}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (isBehaviorallyDisabled) {
            e.preventDefault();
            return;
          }
          if (onClick) {
            onClick(e);
          }
        }}
        aria-disabled={isBehaviorallyDisabled || undefined}
        {...anchorSpecificProps}
      >
        {content}
      </a>
    );
  } else { 
    // It's a Button
    const { type = 'button', disabled, onClick, ...buttonSpecificProps } = rest as Omit<HTMLButtonElementProps, keyof ButtonBaseProps>;

    const effectiveDisabled = disabled || isLoading;
    const finalClassName = `${baseStyles} ${variantStylesDict[variant]} ${sizeStylesDict[size]} ${className} ${effectiveDisabled ? 'opacity-60 cursor-not-allowed' : ''}`;
            
    return (
      <button
        type={type}
        disabled={effectiveDisabled}
        className={finalClassName}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (effectiveDisabled) {
            return; 
          }
          if (onClick) {
            onClick(e);
          }
        }}
        {...buttonSpecificProps}
      >
        {content}
      </button>
    );
  }
};
