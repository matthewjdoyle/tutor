import React, { useState, useEffect, useRef } from 'react';
import { howItWorksSteps } from '../../data/servicesPageData';

export const HowItWorksTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || stepRefs.current.length === 0) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.5;

      let newActiveIndex = -1;
      
      stepRefs.current.forEach((step, index) => {
        if (step && step.getBoundingClientRect().top < triggerPoint) {
          newActiveIndex = index;
        }
      });
      
      if(newActiveIndex !== -1) {
        setActiveIndex(newActiveIndex);

        const firstStep = stepRefs.current[0];
        const lastStep = stepRefs.current[stepRefs.current.length - 1];
        const activeStep = stepRefs.current[newActiveIndex];

        if (firstStep && lastStep && activeStep) {
          const firstStepTop = firstStep.offsetTop;
          const activeStepTop = activeStep.offsetTop;
          const progress = (activeStepTop - firstStepTop) / (lastStep.offsetTop - firstStepTop);
          const totalHeight = lastStep.offsetTop - firstStepTop;
          
          setLineHeight(Math.min(totalHeight, activeStepTop - firstStepTop + 20));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-white rounded-lg border border-neutral-border p-8 shadow-sm">
      <h2 className="text-3xl font-heading font-bold text-brand-primary mb-8 text-center">How It Works</h2>
      <div className="relative">
        <div className="absolute left-4 top-2 w-0.5 h-full bg-brand-primary/10" />
        <div 
          className="absolute left-4 top-2 w-0.5 bg-brand-primary transition-all duration-300 ease-out" 
          style={{ height: `${lineHeight}px` }}
        />
        
        <ol className="space-y-16">
          {howItWorksSteps.map((item, index) => (
            <li 
              key={item.step} 
              ref={el => stepRefs.current[index] = el}
              className="relative pl-12"
            >
              <div 
                className={`absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ease-in-out
                  ${activeIndex === index ? 'bg-brand-primary scale-110 ring-8 ring-brand-primary/20' : 'bg-neutral-border scale-90'}`}
              >
                <span className={`font-bold transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-text-secondary'}`}>
                  {item.step}
                </span>
              </div>
              <div 
                className={`transition-all duration-500 ease-out ${activeIndex >= index ? 'opacity-100 transform-none' : 'opacity-40 translate-y-3'}`}
              >
                <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}; 