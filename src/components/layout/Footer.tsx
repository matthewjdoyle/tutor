import React from 'react';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

interface FooterProps {
  tutorName: string;
}
export const Footer: React.FC<FooterProps> = ({ tutorName }) => (
  <footer 
    className="mt-16 relative shadow-lg backdrop-blur-md"
    style={{
      background: 'linear-gradient(to right, var(--color-primary-300), var(--color-secondary-300), var(--color-accent-300))',
      borderTop: '1px solid var(--color-primary-400)',
      opacity: 0.95
    }}
  >
    {/* Background patterns and overlays using theme colors */}
    <div 
      className="absolute inset-0 opacity-20" 
      style={{ backgroundImage: 'var(--pattern-dots)' }}
    />
    <div 
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to right, var(--color-primary-600), var(--color-secondary-600), var(--color-accent-600))',
        opacity: 0.15
      }}
    />
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
      <p className="text-sm text-white font-medium drop-shadow-sm">
        &copy; {new Date().getFullYear()} {tutorName}. All rights reserved.
      </p>
      <p className="text-xs text-white opacity-90 mt-2 drop-shadow-sm">
        Expert online Maths, Physics & Computer Science tutoring.
      </p>
    </div>
    <ThemeSwitcher />
  </footer>
);
