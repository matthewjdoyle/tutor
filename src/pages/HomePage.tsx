import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ServiceCard } from '../components/service/ServiceCard';
import { ProductCard } from '../components/product/ProductCard';
import { TestimonialCard } from '../components/testimonial/TestimonialCard';
import { ChevronRightIcon, ChevronLeftIcon, RobotIcon } from '../assets/icons';
import { TUTOR_NAME, servicesData, courseSections, storeProductsData, testimonials, freeResourcesData } from '../data';
import useIntersectionObserver from '../utils/useIntersectionObserver';
import { Product } from '../types';
import { AnimatedGeometricBackground } from '../components/common/AnimatedGeometricBackground';

// Helper component for animated sections
const AnimatedSection: React.FC<{ children: React.ReactNode; animationClass: string }> = ({ children, animationClass }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isIntersecting ? animationClass : 'opacity-0 translate-y-5'}`}>
      {children}
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const servicesCarouselRef = useRef<HTMLDivElement>(null);
  const productsCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth * 0.8; // Scroll by 80% of visible width
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Combine and sort learning resources for the carousel
  const allLearningResources: Product[] = [...storeProductsData, ...freeResourcesData];
  allLearningResources.sort((a, b) => {
    if (a.isFree && !b.isFree) return 1; 
    if (!a.isFree && b.isFree) return -1; 
    return a.name.localeCompare(b.name); 
  });

  return (
    <div className="animate-fade-in-up scroll-smooth">
      {/* Hero Section - Full viewport height */}
      <section className="min-h-screen flex items-center justify-center bg-neutral-bg text-center relative overflow-hidden">
        {/* Animated Geometric Background */}
        <AnimatedGeometricBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto opacity-0 animate-[fadeZoom_1s_ease-out_forwards]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tighter mb-6 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-br from-text-primary to-text-secondary/80 leading-tight">
                Unlock Your Potential in
              </span>
              <span className="block mt-1 sm:mt-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-textShimmer" style={{'--shimmer-duration': '5s'} as React.CSSProperties}>
                Maths, Physics & Coding
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary opacity-90 leading-relaxed">
              Expert online tutoring by {TUTOR_NAME} for UK & USA education systems in Maths, Physics, and Computer Science. Achieve your academic goals with personalized guidance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/services')} className="shadow-lg hover:shadow-xl w-full sm:w-auto">
                Explore Services
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/learning-resources')} className="w-full sm:w-auto">
                Free Resources
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/study-tips')} className="flex items-center gap-2 w-full sm:w-auto">
                <RobotIcon className="w-5 h-5" />
                AI Study Tools
              </Button>
            </div>
          </div>
        </div>
        
        {/* Gradient overlay for seamless transition to white sections */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-bg to-transparent pointer-events-none z-30"></div>
      </section>

      {/* About Preview - Standardized white background */}
      <AnimatedSection animationClass="animate-slide-in-left opacity-100 translate-x-0">
        <div className="bg-neutral-surface py-20 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16">
          <Section title={`Meet ${TUTOR_NAME}`} subtitle="Your Dedicated Maths, Physics & Coding Expert" className="relative z-10" titleClassName="text-3xl sm:text-4xl">
            <div className="max-w-4xl mx-auto text-center bg-neutral-surface p-6 sm:p-8 rounded-xl border border-neutral-border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative inline-block mb-8">
                <img 
                  src="https://picsum.photos/seed/doyle/200/200" 
                  alt={TUTOR_NAME} 
                  className="w-48 h-48 rounded-2xl object-cover mx-auto border-4 border-brand-primary/30 shadow-2xl transform hover:scale-105 transition-all duration-500 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" 
                  style={{animationDelay:'0.1s'}}
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-3xl blur-xl opacity-50"></div>
              </div>
              <p className="text-base sm:text-lg text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" style={{animationDelay:'0.25s'}}>
                With a PhD and years of experience teaching students across the UK and USA, {TUTOR_NAME} offers a unique blend of deep subject knowledge and tailored teaching strategies to help you succeed in Maths, Physics, and Computer Science.
              </p>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/about')}
                className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" style={{animationDelay:'0.4s'}}
              >
                Learn More About Dr. Doyle <ChevronRightIcon />
              </Button>
            </div>
          </Section>
        </div>
      </AnimatedSection>
      
      {/* Services Overview - Standardized white background with subtle border */}
      <AnimatedSection animationClass="animate-slide-in-right opacity-100 translate-x-0">
        <div className="bg-neutral-surface py-20 border-t border-neutral-border/30 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16">
          <Section 
            title="Our Tutoring Services" 
            subtitle="Specialized support for UK and USA curricula." 
            className="relative z-10" titleClassName="text-3xl sm:text-4xl"
          >
            <div className="relative group">
              {/* Left Scroll Button */}
              <button 
                onClick={() => scrollCarousel(servicesCarouselRef, 'left')}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-20 p-2 bg-neutral-surface/70 hover:bg-neutral-surface border border-neutral-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Scroll services left"
              >
                <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
              </button>

              {/* Left fade overlay */}
              <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-surface to-transparent z-10 pointer-events-none"></div>
              <div 
                ref={servicesCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory space-x-6 sm:space-x-8 pb-6 hide-scrollbar scrolling-touch px-2 sm:px-0"
              >
                {courseSections.flatMap(section => section.levels).map((level, index) => (
                  <div 
                    key={level.id} 
                    className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[40%] lg:w-[30%] transition-shadow duration-300 ease-in-out"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-xl border border-neutral-border hover:border-brand-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
                      {level.imageUrl && (
                        <div className="h-48 overflow-hidden rounded-t-xl">
                          <img 
                            src={level.imageUrl} 
                            alt={level.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-heading font-bold text-brand-primary mb-3">
                          {level.name}
                        </h3>
                        {level.subjects.length > 0 && (
                          <div className="text-sm text-text-secondary mb-3">
                            <span className="font-medium">Subjects: </span>
                            {level.subjects.join(', ')}
                          </div>
                        )}
                        {level.description && (
                          <p className="text-sm text-text-secondary mb-4 flex-grow leading-relaxed">
                            {level.description}
                          </p>
                        )}
                        {level.examBoards && (
                          <div className="text-xs text-text-muted italic mt-auto pt-2 border-t border-gray-100">
                            Exam boards: {level.examBoards.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right fade overlay */}
              <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-surface to-transparent z-10 pointer-events-none"></div>

              {/* Right Scroll Button */}
              <button 
                onClick={() => scrollCarousel(servicesCarouselRef, 'right')}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-20 p-2 bg-neutral-surface/70 hover:bg-neutral-surface border border-neutral-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Scroll services right"
              >
                <ChevronRightIcon className="w-6 h-6 text-text-primary" />
              </button>
            </div>
            <div className="text-center mt-10">
              <Button 
                variant="primary" 
                onClick={() => navigate('/services')}
                className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Services <ChevronRightIcon />
              </Button>
            </div>
          </Section>
        </div>
      </AnimatedSection>

      {/* Store Preview / Learning Resources Preview - Standardized white background */}
      <AnimatedSection animationClass="animate-slide-in-left opacity-100 translate-x-0">
        <div className="bg-neutral-surface py-20 border-t border-neutral-border/30 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16">
          <Section title="Digital Learning Materials" subtitle="High-quality resources to boost your studies." className="relative z-10" titleClassName="text-3xl sm:text-4xl">
            <div className="relative group">
              {/* Left Scroll Button */}
              <button 
                onClick={() => scrollCarousel(productsCarouselRef, 'left')}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-20 p-2 bg-neutral-surface/70 hover:bg-neutral-surface border border-neutral-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Scroll products left"
              >
                <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
              </button>

              {/* Left fade overlay */}
              <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-surface to-transparent z-10 pointer-events-none"></div>
              <div 
                ref={productsCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory space-x-6 sm:space-x-8 pb-6 hide-scrollbar scrolling-touch px-2 sm:px-0"
              >
                {allLearningResources.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[40%] lg:w-[30%] opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              {/* Right fade overlay */}
              <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-surface to-transparent z-10 pointer-events-none"></div>

              {/* Right Scroll Button */}
              <button 
                onClick={() => scrollCarousel(productsCarouselRef, 'right')}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-20 p-2 bg-neutral-surface/70 hover:bg-neutral-surface border border-neutral-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Scroll products right"
              >
                <ChevronRightIcon className="w-6 h-6 text-text-primary" />
              </button>
            </div>
            <div className="text-center mt-10">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/learning-resources')}
                className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Resources <ChevronRightIcon />
              </Button>
            </div>
          </Section>
        </div>
      </AnimatedSection>

      {/* Testimonials - Standardized white background */}
      <AnimatedSection animationClass="animate-slide-in-right opacity-100 translate-x-0">
        <div className="bg-neutral-surface py-20 border-t border-neutral-border/30 transition-all duration-700 ease-in-out mt-12 sm:mt-16">
          <Section 
            title="What Our Students Say" 
            subtitle="Success stories from learners like you." 
            className="relative z-10" titleClassName="text-3xl sm:text-4xl"
          >
            <div className="relative group">
              {/* Left Scroll Button */}
              <button 
                onClick={() => scrollCarousel(testimonialsCarouselRef, 'left')}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-20 p-2 bg-neutral-surface/70 hover:bg-neutral-surface border border-neutral-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Scroll testimonials left"
              >
                <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
              </button>

                {/* Left fade overlay */}
              <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-surface to-transparent z-10 pointer-events-none"></div>
              <div 
                ref={testimonialsCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory space-x-6 sm:space-x-8 pb-6 hide-scrollbar scrolling-touch px-2 sm:px-0"
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[40%] lg:w-[30%] transition-shadow duration-300 ease-in-out opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
              {/* Right fade overlay */}
              <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-surface to-transparent z-10 pointer-events-none"></div>

              {/* Right Scroll Button */}
              <button 
                onClick={() => scrollCarousel(testimonialsCarouselRef, 'right')}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-20 p-2 bg-neutral-surface/70 hover:bg-neutral-surface border border-neutral-border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                aria-label="Scroll testimonials right"
              >
                <ChevronRightIcon className="w-6 h-6 text-text-primary" />
              </button>
            </div>
          </Section>
        </div>
      </AnimatedSection>
    </div>
  );
};
