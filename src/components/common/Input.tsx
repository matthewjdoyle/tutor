import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  rows?: number;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  type: 'textarea';
}

type CombinedProps = InputProps | TextareaProps;

export const Input: React.FC<CombinedProps> = ({ label, id, className, type, ...props }) => {
  const baseClassName = `block w-full px-4 py-2.5 bg-neutral-surface border border-neutral-border rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-150 ${className || ''}`;

  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={baseClassName}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={baseClassName}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};
