import React from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}
export const Section: React.FC<SectionProps> = ({ title, subtitle, children, className = '', titleClassName = '' }) => (
  <section className={className}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className={`text-4xl sm:text-5xl font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary mb-6 leading-relaxed pb-2 ${titleClassName}`}>
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);
