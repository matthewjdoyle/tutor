import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
export const TextArea: React.FC<TextAreaProps> = ({ label, id, className, ...props }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>}
      <textarea
        id={id}
        className={`block w-full px-4 py-2.5 bg-neutral-surface border border-neutral-border rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-150 ${className}`}
        rows={4}
        {...props}
      />
    </div>
  );
};
