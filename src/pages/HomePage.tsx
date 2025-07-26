import React, { useRef, useState, useEffect } from 'react';
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
  const servicesCarouselRef = useRef<HTMLDivElement | null>(null);
  const productsCarouselRef = useRef<HTMLDivElement | null>(null);
  const testimonialsCarouselRef = useRef<HTMLDivElement | null>(null);

  // Scroll position states
  const [servicesScrollState, setServicesScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
  const [productsScrollState, setProductsScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
  const [testimonialsScrollState, setTestimonialsScrollState] = useState({ canScrollLeft: false, canScrollRight: false });

  const checkScrollPosition = (element: HTMLDivElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = element;
    // Add a small tolerance to prevent floating point inaccuracies
    const tolerance = 2;
    return {
      canScrollLeft: scrollLeft > tolerance,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - tolerance,
    };
  };

  const updateScrollState = (ref: React.RefObject<HTMLDivElement | null>, setState: React.Dispatch<React.SetStateAction<{ canScrollLeft: boolean; canScrollRight: boolean }>>) => {
    if (ref.current) {
      setState(checkScrollPosition(ref.current));
    }
  };

  useEffect(() => {
    const carouselRefs = [
      { ref: servicesCarouselRef, handler: () => updateScrollState(servicesCarouselRef, setServicesScrollState) },
      { ref: productsCarouselRef, handler: () => updateScrollState(productsCarouselRef, setProductsScrollState) },
      { ref: testimonialsCarouselRef, handler: () => updateScrollState(testimonialsCarouselRef, setTestimonialsScrollState) },
    ];

    const resizeObserver = new ResizeObserver(() => {
      for (const item of carouselRefs) {
        item.handler();
      }
    });

    const elements: (HTMLDivElement | null)[] = [];

    carouselRefs.forEach(item => {
      const el = item.ref.current;
      if (el) {
        el.addEventListener('scroll', item.handler);
        resizeObserver.observe(el);
        elements.push(el);
        // Initial check
        item.handler();
      }
    });

    return () => {
      elements.forEach((el, index) => {
        if (el) {
          el.removeEventListener('scroll', carouselRefs[index].handler);
          resizeObserver.unobserve(el);
        }
      });
    };
  }, []);

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
      <section className="min-h-screen flex items-center justify-center bg-gradient-mesh text-center relative overflow-hidden">
        {/* Beautiful Background Pattern */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto opacity-0 animate-[fadeZoom_1s_ease-out_forwards]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tighter mb-6 leading-tight">
              <span className="block text-black leading-tight">
                Dr. Matt Doyle
              </span>
              <span className="block mt-1 sm:mt-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-textShimmer" style={{'--shimmer-duration': '5s'} as React.CSSProperties}>
                Online Tutor for Maths, Physics & Computer Science
              </span>
            </h1>
            {/* <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary opacity-90 leading-relaxed">
              Expert online tutoring by {TUTOR_NAME} for UK & USA education systems in Maths, Physics, and Computer Science. Achieve your academic goals with personalized guidance.
            </p> */}
            <div className="mt-10 flex flex-col items-center gap-4">
              {/* Primary Theme Button - Top of triangle (most prominent) */}
              <button
                onClick={() => navigate('/services')}
                className="hero-button hero-button-primary w-full sm:w-auto px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 border-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary-500)',
                  color: 'var(--color-primary-600)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-500)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'var(--color-primary-600)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-primary-600)';
                  e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                }}
              >
                Explore Services
              </button>

              {/* Bottom row of triangle */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* Secondary Theme Button */}
                <button
                  onClick={() => navigate('/learning-resources')}
                  className="hero-button hero-button-secondary w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{
                    borderColor: 'var(--color-secondary-500)',
                    color: 'var(--color-secondary-600)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary-500)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--color-secondary-600)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-secondary-600)';
                    e.currentTarget.style.borderColor = 'var(--color-secondary-500)';
                  }}
                >
                  Free Resources
                </button>

                {/* Accent Theme Button */}
                <button
                  onClick={() => navigate('/study-tips')}
                  className="hero-button hero-button-accent w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    borderColor: 'var(--color-accent-500)',
                    color: 'var(--color-accent-600)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-500)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--color-accent-600)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent-600)';
                    e.currentTarget.style.borderColor = 'var(--color-accent-500)';
                  }}
                >
                  <RobotIcon className="w-5 h-5" />
                  AI Study Tools
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gradient overlay for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none z-30"></div>
      </section>

      {/* About Preview - Beautiful gradient background */}
      <AnimatedSection animationClass="animate-slide-in-left opacity-100 translate-x-0">
        <div className="bg-gradient-to-br from-primary-50/30 via-surface-primary/80 to-secondary-50/30 backdrop-blur-sm py-20 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16 relative">
          <div className="absolute inset-0 bg-pattern-waves opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-100/20 to-transparent" />
          <Section title="" subtitle="" className="relative z-10">
            <div className="max-w-6xl mx-auto card-elevated p-3 sm:p-6 lg:p-8 rounded-xl hover:shadow-xl transition-shadow duration-300">
              {/* Image and title/text aligned */}
              <div className="flex flex-row items-start gap-2 sm:gap-6 lg:gap-12 min-w-0">
                {/* Image on the left */}
                <div className="flex-shrink-0 w-auto">
                  <div className="relative">
                    <img 
                      src="portrait.JPEG" 
                      alt={TUTOR_NAME} 
                      className="w-24 h-24 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl object-cover border-4 border-brand-primary/30 shadow-2xl transform hover:scale-105 transition-all duration-500 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" 
                      style={{animationDelay:'0.1s'}}
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-3xl blur-xl opacity-50"></div>
                  </div>
                </div>
                
                {/* Title, subtitle, paragraph text and button on the right */}
                <div className="flex-1 min-w-0 text-left">
                  {/* Title and subtitle */}
                  <div className="mb-3 sm:mb-6 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" style={{animationDelay:'0.15s'}}>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-1 sm:mb-2 leading-tight">
                      Meet {TUTOR_NAME}
                    </h2>
                    <p className="text-sm sm:text-lg text-text-secondary opacity-90 leading-snug">
                      Your Dedicated Maths, Physics & Coding Expert
                    </p>
                  </div>
                  
                  <p className="text-xs sm:text-base lg:text-lg text-text-secondary mb-4 sm:mb-8 leading-relaxed opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" style={{animationDelay:'0.25s'}}>
                    With a PhD and years of experience teaching students across the UK and USA, {TUTOR_NAME} offers a unique blend of deep subject knowledge and tailored teaching strategies to help you succeed in Maths, Physics, and Computer Science.
                  </p>
                  
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => navigate('/about')}
                    className="text-xs sm:text-sm transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 animate-[fadeSlideUp_0.8s_ease-out_forwards]" style={{animationDelay:'0.4s'}}
                  >
                    <span className="hidden sm:inline">Learn More About Dr. Doyle</span>
                    <span className="sm:hidden">Learn More</span>
                    <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </AnimatedSection>
      
      {/* Services Overview - Beautiful gradient background */}
      <AnimatedSection animationClass="animate-slide-in-right opacity-100 translate-x-0">
        <div className="bg-gradient-to-bl from-secondary-50/40 via-surface-elevated/90 to-accent-50/30 backdrop-blur-sm py-20 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-secondary-100/20 to-transparent" />
                  <Section 
          title="Available Courses" 
          subtitle={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4">
              <span>Support for UK and worldwide students.</span>
              <Button 
                variant="primary" 
                onClick={() => navigate('/services')}
                className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Services <ChevronRightIcon />
              </Button>
            </div>
          }
          className="relative z-10" titleClassName="text-3xl sm:text-4xl"
        >
            <div className="relative flex items-center">
              {/* Left Scroll Button */}
              {servicesScrollState.canScrollLeft && (
                <button 
                  onClick={() => scrollCarousel(servicesCarouselRef, 'left')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0 p-2 bg-surface-elevated/80 hover:bg-surface-elevated border border-border-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                  aria-label="Scroll services left"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
                </button>
              )}

              <div className="flex-1 relative min-w-0">
                {/* Left fade overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-secondary-50/40 via-surface-elevated/90 to-transparent z-10 pointer-events-none"></div>
              <div 
                ref={servicesCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory space-x-3 sm:space-x-4 pb-6 hide-scrollbar scrolling-touch px-4 sm:px-6"
              >
                {courseSections.flatMap((section, sectionIndex) => [
                  // Add curriculum header
                  <div 
                    key={`header-${section.region}`}
                    className="snap-start flex-shrink-0 w-[100px] sm:w-[120px] flex items-center justify-center"
                  >
                    <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border-2 border-brand-primary/30 rounded-lg p-3 sm:p-4 h-full flex items-center justify-center text-center">
                      <h3 className="text-xs sm:text-sm font-heading font-bold text-brand-primary leading-tight">
                        {section.region}
                      </h3>
                    </div>
                  </div>,
                  // Add courses for this section
                  ...section.levels.map((level, levelIndex) => (
                    <div 
                      key={level.id} 
                      className="snap-center flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] transition-shadow duration-300 ease-in-out"
                      style={{ animationDelay: `${(sectionIndex * 10 + levelIndex) * 100}ms` }}
                    >
                      <div className="card-elevated rounded-lg hover:border-primary-500/50 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden h-full">
                        {level.imageUrl && (
                          <div className="h-24 sm:h-28 overflow-hidden rounded-t-lg">
                            <img 
                              src={level.imageUrl} 
                              alt={level.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-3 sm:p-4 flex flex-col flex-grow">
                          <h3 className="text-sm sm:text-base font-heading font-bold text-brand-primary mb-2 leading-tight">
                            {level.name}
                          </h3>
                          {level.subjects.length > 0 && (
                            <div className="text-xs text-text-secondary mb-2 leading-tight">
                              <span className="font-medium">Subjects: </span>
                              <span className="text-xs">{level.subjects.slice(0, 2).join(', ')}{level.subjects.length > 2 ? '...' : ''}</span>
                            </div>
                          )}
                          {level.subCourses && (
                            <div className="text-xs text-text-secondary mb-2 leading-tight">
                              <span className="font-medium">{level.subCourses.length} courses available</span>
                            </div>
                          )}
                          {level.examBoards && (
                            <div className="text-xs text-text-muted italic mt-auto pt-1 border-t border-gray-100/50 leading-tight">
                              {level.examBoards.slice(0, 2).join(', ')}{level.examBoards.length > 2 ? '...' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ]).flat()}
              </div>
              {/* Right fade overlay */}
              <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-secondary-50/40 via-surface-elevated/90 to-transparent z-10 pointer-events-none"></div>
              </div>

              {/* Right Scroll Button */}
              {servicesScrollState.canScrollRight && (
                <button 
                  onClick={() => scrollCarousel(servicesCarouselRef, 'right')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0 p-2 bg-surface-elevated/80 hover:bg-surface-elevated border border-border-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                  aria-label="Scroll services right"
                >
                  <ChevronRightIcon className="w-6 h-6 text-text-primary" />
                </button>
              )}
            </div>
          </Section>
        </div>
      </AnimatedSection>

      {/* Store Preview / Learning Resources Preview - Beautiful gradient background */}
      <AnimatedSection animationClass="animate-slide-in-left opacity-100 translate-x-0">
        <div className="bg-gradient-to-tr from-accent-50/30 via-surface-primary/90 to-primary-50/40 backdrop-blur-sm py-20 transition-all duration-700 ease-in-out mt-12 sm:mt-16 mb-12 sm:mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-100/15 to-transparent" />
          <Section
            title="Learning Resources"
            subtitle={
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4">
                <span>To use alongside your school work and help with revision.</span>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/learning-resources')}
                  className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All Resources <ChevronRightIcon />
                </Button>
              </div>
            }
            className="relative z-10"
            titleClassName="text-3xl sm:text-4xl"
          >
            <div className="relative flex items-center">
              {/* Left Scroll Button */}
              {productsScrollState.canScrollLeft && (
                <button 
                  onClick={() => scrollCarousel(productsCarouselRef, 'left')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0 p-2 bg-surface-elevated/80 hover:bg-surface-elevated border border-border-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                  aria-label="Scroll products left"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
                </button>
              )}

              <div className="flex-1 relative min-w-0">
                {/* Left fade overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-surface-primary/90 to-transparent z-10 pointer-events-none"></div>
              <div 
                ref={productsCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory space-x-6 sm:space-x-8 pb-6 hide-scrollbar scrolling-touch px-4 sm:px-6"
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
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-surface-primary/90 to-transparent z-10 pointer-events-none"></div>
              </div>

              {/* Right Scroll Button */}
              {productsScrollState.canScrollRight && (
                <button 
                  onClick={() => scrollCarousel(productsCarouselRef, 'right')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0 p-2 bg-surface-elevated/80 hover:bg-surface-elevated border border-border-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                  aria-label="Scroll products right"
                >
                  <ChevronRightIcon className="w-6 h-6 text-text-primary" />
                </button>
              )}
            </div>
            {/* Button moved into subtitle above */}
          </Section>
        </div>
      </AnimatedSection>

      {/* Testimonials - Beautiful gradient background */}
      <AnimatedSection animationClass="animate-slide-in-right opacity-100 translate-x-0">
        <div className="bg-gradient-to-tl from-secondary-50/35 via-surface-elevated/85 to-primary-50/30 backdrop-blur-sm py-20 transition-all duration-700 ease-in-out mt-12 sm:mt-16 relative">
          <div className="absolute inset-0 bg-pattern-waves opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-secondary-100/25 to-transparent" />
          <Section 
            title="Student Testimonials" 
            className="relative z-10" titleClassName="text-3xl sm:text-4xl"
          >
            <div className="relative flex items-center">
              {/* Left Scroll Button */}
              {testimonialsScrollState.canScrollLeft && (
                <button 
                  onClick={() => scrollCarousel(testimonialsCarouselRef, 'left')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0 p-2 bg-surface-elevated/80 hover:bg-surface-elevated border border-border-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                  aria-label="Scroll testimonials left"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
                </button>
              )}

              <div className="flex-1 relative min-w-0">
                {/* Left fade overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-surface-elevated/90 to-transparent z-10 pointer-events-none"></div>
              <div 
                ref={testimonialsCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory space-x-6 sm:space-x-8 pb-6 hide-scrollbar scrolling-touch px-4 sm:px-6"
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
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-surface-elevated/90 to-transparent z-10 pointer-events-none"></div>
              </div>

              {/* Right Scroll Button */}
              {testimonialsScrollState.canScrollRight && (
                <button 
                  onClick={() => scrollCarousel(testimonialsCarouselRef, 'right')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0 p-2 bg-surface-elevated/80 hover:bg-surface-elevated border border-border-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                  aria-label="Scroll testimonials right"
                >
                  <ChevronRightIcon className="w-6 h-6 text-text-primary" />
                </button>
              )}
            </div>
          </Section>
        </div>
      </AnimatedSection>
    </div>
  );
};
