import React, { useState } from 'react';
import { ChevronRightIcon } from '../../assets/icons';

interface FaqItemProps {
  question: string;
  answer: string;
}

export const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-border">
      <button
        className="w-full text-left py-4 pr-4 pl-0 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-text-primary">{question}</span>
        <ChevronRightIcon
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-text-secondary leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}; 