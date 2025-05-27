import React from 'react';

interface FooterProps {
  tutorName: string;
}
export const Footer: React.FC<FooterProps> = ({ tutorName }) => (
  <footer className="bg-neutral-muted-bg border-t border-neutral-border mt-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="flex justify-center space-x-6 mb-6">
        {/* Placeholder for social icons */}
        <a href="#" className="text-text-muted hover:text-brand-primary transition-colors"><span className="sr-only">Facebook</span>FB</a>
        <a href="#" className="text-text-muted hover:text-brand-primary transition-colors"><span className="sr-only">Twitter</span>TW</a>
        <a href="#" className="text-text-muted hover:text-brand-primary transition-colors"><span className="sr-only">LinkedIn</span>LI</a>
      </div>
      <p className="text-sm text-text-muted">
        &copy; {new Date().getFullYear()} {tutorName}. All rights reserved.
      </p>
      <p className="text-xs text-text-muted opacity-75 mt-2">
        Expert online Maths, Physics & Coding tutoring for UK & USA systems.
      </p>
    </div>
  </footer>
);
