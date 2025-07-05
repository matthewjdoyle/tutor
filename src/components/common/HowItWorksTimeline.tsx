import React, { useState } from 'react';
import { howItWorksSteps } from '../../data/servicesPageData';

export const HowItWorksTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStep = howItWorksSteps[activeIndex];

  const handleNext = () => {
    if (activeIndex < howItWorksSteps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-border p-6 sm:p-8 shadow-sm">
      <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6 text-center">How It Works</h2>
      
      {/* Step indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {howItWorksSteps.map((_, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setActiveIndex(index)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-500 ease-out transform hover:scale-105 ${
                  activeIndex === index 
                    ? 'bg-brand-primary text-white scale-110 shadow-lg ring-4 ring-brand-primary/20' 
                    : activeIndex > index
                    ? 'bg-brand-primary/20 text-brand-primary hover:bg-brand-primary/30 hover:scale-105'
                    : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300 hover:scale-105'
                }`}
              >
                {index + 1}
              </button>
              {index < howItWorksSteps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 transition-all duration-500 ease-out ${
                  activeIndex > index ? 'bg-brand-primary shadow-sm' : 'bg-neutral-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current step content */}
      <div className="text-center min-h-[120px] flex flex-col justify-center relative overflow-hidden">
        <div 
          key={activeIndex} 
          className="animate-[fadeSlideUp_0.5s_ease-out_forwards] opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-3 transform transition-all duration-300">
              Step {currentStep.step}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text-primary mb-4 transform transition-all duration-300">
            {currentStep.title}
          </h3>
          <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto transform transition-all duration-300">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevious}
          disabled={activeIndex === 0}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out transform ${
            activeIndex === 0
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-50'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 hover:scale-105 hover:shadow-md'
          }`}
        >
          ← Previous
        </button>
        
        <span className="text-sm text-neutral-500 transition-opacity duration-300">
          {activeIndex + 1} of {howItWorksSteps.length}
        </span>
        
        <button
          onClick={handleNext}
          disabled={activeIndex === howItWorksSteps.length - 1}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out transform ${
            activeIndex === howItWorksSteps.length - 1
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-50'
              : 'bg-brand-primary text-white hover:bg-brand-primary/90 hover:scale-105 shadow-md hover:shadow-lg'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}; 