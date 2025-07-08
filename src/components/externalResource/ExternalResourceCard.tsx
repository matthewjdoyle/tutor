import React from 'react';
import { ExternalLearningResource } from '../../types';
import { Button } from '../common/Button';
import { ArrowTopRightOnSquareIcon } from '../../assets/icons';

interface ExternalResourceCardProps {
  resource: ExternalLearningResource;
}

export const ExternalResourceCard: React.FC<ExternalResourceCardProps> = ({ resource }) => {
  // Render icon based on whether it's a string (image path) or React component
  const renderIcon = () => {
    if (typeof resource.icon === 'string') {
      return (
        <img 
          src={resource.icon} 
          alt={`${resource.name} logo`}
          className="h-6 w-6 sm:h-7 sm:w-7 mr-3 flex-shrink-0 object-contain"
        />
      );
    } else {
      const IconComponent = resource.icon;
      return <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-brand-primary mr-3 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-neutral-surface p-4 sm:p-5 rounded-xl border border-neutral-border hover:border-brand-primary/40 transition-all duration-300 flex flex-row items-center group hover:shadow-lg">
      {/* Left part: Icon + Text (takes available space) */}
      <div className="flex items-center flex-1 min-w-0 mr-4"> {/* mr-4 provides space before the button */}
        {renderIcon()}
        <div className="min-w-0"> {/* This wrapper is crucial for truncation to work with flex items */}
          <h3 className="text-md sm:text-lg font-heading font-semibold text-text-primary group-hover:text-brand-primary transition-colors truncate">
            {resource.name}
          </h3>
          <p className="text-xs text-brand-secondary font-medium uppercase tracking-wide truncate">
            {resource.audience}
          </p>
        </div>
      </div>

      {/* Right part: Button */}
      <div className="flex-shrink-0"> {/* Ensures button doesn't shrink */}
        <Button
          variant="outline"
          size="sm"
          href={resource.url}
          target="_blank"
          className="group-hover:border-brand-secondary group-hover:text-brand-secondary whitespace-nowrap" // whitespace-nowrap prevents button text wrapping
        >
          Visit Site <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
