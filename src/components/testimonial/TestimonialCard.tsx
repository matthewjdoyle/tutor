import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  course: string;
  location: string;
  imageUrl: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, course, location, imageUrl }) => (
  <div className="bg-neutral-surface p-6 sm:p-8 rounded-xl flex flex-col items-center text-center animate-fade-in-up border border-neutral-border transition-all duration-300 hover:shadow-lg hover:border-brand-primary/30">
    <div className="relative mb-6">
      <img src={imageUrl} alt={name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-brand-primary/20 shadow-md" />
    </div>
    
    <div className="relative mb-6">
      <svg className="absolute -top-2 -left-2 w-6 h-6 text-brand-primary/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
      <p className="text-text-secondary italic text-sm sm:text-base leading-relaxed px-4">"{quote}"</p>
    </div>
    
    <div className="space-y-2">
      <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary tracking-wide">
        {name}
      </h4>
      <p className="text-sm font-semibold text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">
        {course}
      </p>
      <p className="text-xs text-brand-secondary font-medium uppercase tracking-wider">
        {location}
      </p>
    </div>
  </div>
);
