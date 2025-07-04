import React from 'react';
import { SpinnerIcon } from './SpinnerIcon';

// Define base props shared by Button and Anchor styled as Button
type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'accent';
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

  const baseStyles = 'hero-button inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-98';
  
  const variantStylesDict = {
    primary: 'themed-button-primary',
    secondary: 'themed-button-secondary', 
    accent: 'themed-button-accent',
    outline: 'themed-button-accent', // Using accent for outline variant
    danger: 'border-red-500 text-red-600 bg-transparent hover:bg-red-500 hover:text-white focus:ring-red-500',
  };

  const sizeStylesDict = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base', 
    lg: 'px-8 py-4 text-lg',
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
