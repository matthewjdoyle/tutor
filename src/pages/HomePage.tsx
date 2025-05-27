import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ServiceCard } from '../components/service/ServiceCard';
import { ProductCard } from '../components/product/ProductCard';
import { TestimonialCard } from '../components/testimonial/TestimonialCard';
import { ChevronRightIcon, ChevronLeftIcon, LightBulbIcon } from '../assets/icons';
import { TUTOR_NAME, servicesData, courseSections, storeProductsData, testimonials, freeResourcesData } from '../data';
import useIntersectionObserver from '../utils/useIntersectionObserver';
import { Product } from '../types';

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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-bg via-neutral-surface to-neutral-bg text-center relative overflow-hidden transition-all duration-700 ease-in-out">
        {/* Enhanced Drifting Planets Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute rounded-full bg-gradient-to-br from-brand-primary-alt/30 to-brand-primary-alt/50 animate-drift blur-sm" 
            style={{
              width: '180px', height: '180px', top: '8%', left: '8%',
              '--drift-duration': '90s', 
              '--drift-start-x': '0px', '--drift-start-y': '0px', '--drift-start-opacity': '0.4',
              '--drift-end-x': '40px', '--drift-end-y': '60px', '--drift-end-opacity': '0.7', '--drift-end-scale': '1.2',
            } as React.CSSProperties}
          />
          <div
            className="absolute rounded-full bg-gradient-to-br from-brand-secondary-alt/25 to-brand-secondary-alt/40 animate-drift blur-sm" 
            style={{
              width: '120px', height: '120px', top: '60%', left: '78%',
              '--drift-duration': '110s', 
              '--drift-start-x': '0px', '--drift-start-y': '0px', '--drift-start-opacity': '0.3',
              '--drift-end-x': '-50px', '--drift-end-y': '-70px', '--drift-end-opacity': '0.6', '--drift-end-scale': '0.8',
            } as React.CSSProperties}
          />
          <div
            className="absolute rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-accent/35 animate-drift blur-sm" 
            style={{
              width: '90px', height: '90px', top: '15%', left: '82%',
              '--drift-duration': '76s', 
              '--drift-start-x': '0px', '--drift-start-y': '0px', '--drift-start-opacity': '0.5',
              '--drift-end-x': '30px', '--drift-end-y': '-40px', '--drift-end-opacity': '0.3', '--drift-end-scale': '1.1',
            } as React.CSSProperties}
          />
           <div
            className="absolute rounded-full bg-gradient-to-br from-sky-400/25 to-sky-500/40 animate-drift blur-sm" 
            style={{
              width: '240px', height: '240px', top: '45%', left: '20%',
              '--drift-duration': '130s', 
              '--drift-start-x': '0px', '--drift-start-y': '0px', '--drift-start-opacity': '0.2',
              '--drift-end-x': '-60px', '--drift-end-y': '30px', '--drift-end-opacity': '0.5', '--drift-end-scale': '1.05',
            } as React.CSSProperties}
          />
        </div>
        
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight mb-8 leading-tight">
            <span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-primary-alt animate-textShimmer" 
              style={{ backgroundSize: '300% 100%' }} 
            >
              Unlock Your Potential in
            </span>
            <span className="block text-text-primary mt-2 opacity-0 animate-fade-in-up-slight [animation-delay:400ms]">
              Maths, Physics & Coding
            </span>
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-xl sm:text-2xl text-text-secondary opacity-0 animate-fade-in-up-slight [animation-delay:700ms] leading-relaxed">
            Expert online tutoring by {TUTOR_NAME} for UK & USA education systems in Maths, Physics, and Computer Science. Achieve your academic goals with personalized guidance.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 opacity-0 animate-fade-in-up-slight [animation-delay:1000ms]">
            <Button variant="primary" size="lg" onClick={() => navigate('/services')} className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Services <ChevronRightIcon />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/learning-resources')} className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Resources <ChevronRightIcon />
            </Button>
          </div>
        </div>
        
        {/* Gradient overlay for seamless transition to white sections */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-surface pointer-events-none"></div>
      </section>

      {/* About Preview - Standardized white background */}
      <AnimatedSection animationClass="animate-slide-in-left opacity-100 translate-x-0">
        <div className="bg-neutral-surface py-20 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16">
          <Section title={`Meet ${TUTOR_NAME}`} subtitle="Your Dedicated Maths, Physics & Coding Expert" className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative inline-block mb-8">
                <img 
                  src="https://picsum.photos/seed/doyle/200/200" 
                  alt={TUTOR_NAME} 
                  className="w-48 h-48 rounded-2xl object-cover mx-auto border-4 border-brand-primary/30 shadow-2xl transform hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-3xl blur-xl opacity-50"></div>
              </div>
              <p className="text-xl sm:text-2xl text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
                With a PhD and years of experience teaching students across the UK and USA, {TUTOR_NAME} offers a unique blend of deep subject knowledge and tailored teaching strategies to help you succeed in Maths, Physics, and Computer Science.
              </p>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/about')}
                className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
            className="relative z-10"
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
                    <div className="bg-white rounded-lg border border-neutral-border shadow-sm h-full hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
                      {level.imageUrl && (
                        <div className="h-48 overflow-hidden">
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
          <Section title="Digital Learning Materials" subtitle="High-quality resources to boost your studies." className="relative z-10">
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

      {/* AI Study Tools Section - New */}
      <AnimatedSection animationClass="animate-slide-in-right opacity-100 translate-x-0">
        <div className="bg-neutral-surface py-20 border-t border-neutral-border/30 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16">
          <Section 
            title="Explore Our AI Study Tools" 
            subtitle="Get instant help and motivation with our smart learning companions."
            className="relative z-10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <LightBulbIcon className="w-16 h-16 text-brand-primary opacity-80" />
              </div>
              <p className="text-xl sm:text-2xl text-text-secondary mb-8 leading-relaxed">
                Need a quick motivational boost or help solving a tricky physics problem? Our AI tools are here to assist you with instant quotes and step-by-step solutions.
              </p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/study-tips')}
                className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try AI Study Tips <ChevronRightIcon />
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
            className="relative z-10"
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
