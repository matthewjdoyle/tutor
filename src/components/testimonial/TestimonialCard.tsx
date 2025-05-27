import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  imageUrl: string;
}
export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, location, imageUrl }) => (
  <div className="bg-neutral-surface p-6 sm:p-8 rounded-xl flex flex-col items-center text-center animate-fade-in-up border border-neutral-border transition-colors duration-300">
    <img src={imageUrl} alt={name} className="w-24 h-24 rounded-xl mb-5 object-cover border-2 border-brand-primary/40" />
    <p className="text-text-secondary italic mb-5 text-base leading-relaxed">"{quote}"</p>
    <h4 className="font-heading font-semibold text-lg text-text-primary">{name}</h4>
    <p className="text-sm text-brand-secondary">{location}</p>
  </div>
);
