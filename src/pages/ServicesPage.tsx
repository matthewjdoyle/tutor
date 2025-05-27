import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ChevronRightIcon } from '../assets/icons';
import { TUTOR_NAME, courseSections } from '../data';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Section 
      title="Available Courses" 
      subtitle={`Comprehensive online tutoring by ${TUTOR_NAME} across multiple curricula and levels.`}
      className="mt-12 sm:mt-16"
    >
      {/* Menu-style course layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {courseSections.slice(0, 2).map((section) => (
              <div key={section.region} className="bg-white rounded-lg border border-neutral-border p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-brand-primary mb-6 border-b border-neutral-border pb-3">
                  {section.region}
                </h2>
                <div className="space-y-4">
                  {section.levels.map((level) => (
                    <div key={level.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {level.name}
                      </h3>
                      {level.subjects.length > 0 && (
                        <div className="text-text-secondary mb-2">
                          {level.subjects.join(', ')}
                        </div>
                      )}
                      {level.examBoards && (
                        <div className="text-sm text-text-muted italic">
                          Exam boards: {level.examBoards.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {courseSections.slice(2).map((section) => (
              <div key={section.region} className="bg-white rounded-lg border border-neutral-border p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-brand-primary mb-6 border-b border-neutral-border pb-3">
                  {section.region}
                </h2>
                <div className="space-y-4">
                  {section.levels.map((level) => (
                    <div key={level.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {level.name}
                      </h3>
                      {level.subjects.length > 0 && (
                        <div className="text-text-secondary mb-2">
                          {level.subjects.join(', ')}
                        </div>
                      )}
                      {level.examBoards && (
                        <div className="text-sm text-text-muted italic">
                          Exam boards: {level.examBoards.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="bg-white border-2 border-brand-primary/20 rounded-xl p-6 mb-10 mt-16 shadow-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-heading font-bold text-text-primary mb-1">Tutoring Rates</h3>
          <p className="text-sm text-text-secondary">Professional online sessions</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* GBP Price */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-heading font-bold mb-1">£45</div>
            <div className="text-xs font-medium opacity-90">per hour</div>
          </div>
          
          {/* EUR Price */}
          <div className="bg-gradient-to-br from-brand-secondary to-brand-secondary/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-heading font-bold mb-1">€55</div>
            <div className="text-xs font-medium opacity-90">per hour</div>
          </div>
          
          {/* USD Price */}
          <div className="bg-gradient-to-br from-brand-primary-alt to-brand-primary-alt/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl font-heading font-bold mb-1">$60</div>
            <div className="text-xs font-medium opacity-90">per hour</div>
          </div>
        </div>
        
        {/* Discount Section */}
        <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/30 rounded-lg p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <div className="text-lg font-heading font-bold text-brand-accent mb-1">
                Save 20% on Bulk Sessions
              </div>
              <div className="text-sm text-text-secondary">
                Book 12+ hours for 20% discount
              </div>
            </div>
            <div className="bg-brand-accent text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
              20% OFF
            </div>
          </div>
          <div className="mt-3 text-center md:text-left">
            <div className="text-xs text-text-muted">
              Example: 12 hours £540 → <span className="font-bold text-brand-accent">£432 (save £108)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="mt-16 bg-neutral-muted-bg p-8 sm:p-10 rounded-lg border border-neutral-border text-center mb-12 sm:mb-16">
        <h3 className="text-3xl font-heading font-semibold text-text-primary mb-4">Ready to Excel?</h3>
        <p className="text-text-secondary mb-6 max-w-xl mx-auto leading-relaxed">
          All tutorials are delivered online via interactive platforms, ensuring a flexible and engaging learning experience. Get tailored support, exam preparation, and concept clarification from an expert.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
          Book Your First Session <ChevronRightIcon />
        </Button>
      </div>
    </Section>
  );
}
