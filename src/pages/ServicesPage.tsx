import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { FaqItem } from '../components/common/FaqItem';
import { ChevronRightIcon } from '../assets/icons';
import { PencilIcon } from '../assets/icons';
import { TUTOR_NAME, courseSections } from '../data';
import { faqData } from '../data/servicesPageData';
import { examBoardLogos } from '../data/examBoardsData';
import { HowItWorksTimeline } from '../components/common/HowItWorksTimeline';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-mesh min-h-screen">
      <div className="absolute inset-0 bg-pattern-waves opacity-10" />
              {/* Page Header */}
        <header className="bg-gradient-hero py-16 sm:py-24 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="flex items-center justify-center gap-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-primary tracking-tight">
            <PencilIcon className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary drop-shadow-md" />
            Academic Services
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-primary max-w-2xl mx-auto">
            Personalized, one-on-one online tutoring in Maths, Physics, and Computer Science. I focus on building deep understanding, exam technique, and academic confidence for students at all levels.
          </p>
        </div>
      </header>

              {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* How It Works & Exam Prep Sections */}
        <div className="max-w-4xl mx-auto space-y-20">
          <HowItWorksTimeline />
          
          <div className="card-elevated rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Exam Preparation</h2>
            <p className="text-text-secondary mb-4 leading-relaxed">
              Preparing for exams can be a particularly stressful experience as they require not just a high level of subject knowledge, but also practice of exam technique. Our tutors help to make preparing for exams a more enjoyable experience, which ultimately results in greater efficiency of revision and subsequently higher grades.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We provide support to students in all subjects and for all exam boards at GCSE, IGCSE and A-level. We also have specialist tutors who work with students to prepare for IB examinations.
            </p>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-text-primary mb-4">We cover all major exam boards:</h3>
              <div className="flex flex-wrap gap-6 items-center">
                {examBoardLogos.map((board) => (
                  <img key={board.name} src={board.logoUrl} alt={board.name} className="h-10 object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Offerings Section */}
        <Section 
          title="Available Courses" 
          subtitle={`Comprehensive online tutoring by ${TUTOR_NAME} across multiple curricula and levels.`}
          className="pt-20"
        >
          <div className="card-elevated rounded-2xl p-8 shadow-lg">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* UK and UK/EU Column */}
              <div className="lg:col-span-2 space-y-8">
                {courseSections.filter(section => section.region === 'UK' || section.region === 'UK/EU').map((section) => (
                  <div key={section.region} className="card-floating rounded-xl p-6 transition-shadow hover:shadow-md">
                    <h3 className="text-2xl font-heading font-bold text-brand-primary mb-6 border-b border-neutral-border pb-4">
                      {section.region}
                    </h3>
                    <div className="space-y-5">
                      {section.levels.map((level) => (
                        <div key={level.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                          <h4 className="text-lg font-semibold text-text-primary mb-2">
                            {level.name}
                          </h4>
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
              
              {/* USA/World Column */}
              <div className="lg:col-span-1">
                {courseSections.filter(section => section.region === 'USA/World').map((section) => (
                  <div key={section.region} className="card-floating rounded-xl p-6 transition-shadow hover:shadow-md h-fit">
                    <h3 className="text-2xl font-heading font-bold text-brand-primary mb-6 border-b border-neutral-border pb-4">
                      {section.region}
                    </h3>
                    <div className="space-y-5">
                      {section.levels.map((level) => (
                        <div key={level.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                          <h4 className="text-lg font-semibold text-text-primary mb-2">
                            {level.name}
                          </h4>
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
            
            {/* Custom Course Enquiry */}
            <div className="mt-8 p-6 bg-gradient-to-r from-brand-accent/10 to-brand-primary/10 border border-brand-accent/30 rounded-xl">
              <div className="text-center">
                <h4 className="text-lg font-heading font-semibold text-brand-primary mb-2">
                  Don't see your course listed?
                </h4>
                <p className="text-text-secondary mb-4">
                  I may still be able to help! Please enquire to see if I can accommodate your specific learning needs.
                </p>
                <Button variant="primary" onClick={() => navigate('/contact')} className="inline-flex items-center">
                  Enquire About Custom Tutoring <ChevronRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Pricing & FAQ Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mt-20">
          
          {/* Pricing Section (Left) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Tutoring Rates</h2>
              <div className="card-elevated border-2 border-primary-500/20 rounded-2xl p-6 shadow-lg space-y-4">
                {/* GBP Price */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white rounded-lg p-5 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-heading font-bold mb-1">£45</div>
                  <div className="text-sm font-medium opacity-90">per hour</div>
                </div>
                
                {/* EUR & USD Prices */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-brand-secondary to-brand-secondary/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-heading font-bold">€55</div>
                    <div className="text-xs opacity-90">per hour</div>
                  </div>
                  <div className="bg-gradient-to-br from-brand-primary-alt to-brand-primary-alt/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-heading font-bold">$60</div>
                    <div className="text-xs opacity-90">per hour</div>
                  </div>
                </div>
                
                {/* Discount Section */}
                <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/30 rounded-lg p-4 mt-4">
                  <div className="text-center">
                    <div className="font-heading font-bold text-brand-accent mb-1">
                      Save 20% on Bulk Sessions
                    </div>
                    <div className="text-sm text-text-secondary">
                      Book 12+ hours for a discount.
                    </div>
                    <div className="mt-2 text-xs text-text-muted">
                      e.g. 12 hours £540 → <span className="font-bold text-brand-accent">£432</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section (Right) */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-24 bg-gradient-to-r from-brand-primary to-brand-secondary p-10 sm:p-12 rounded-2xl text-center shadow-xl">
          <h3 className="text-3xl font-heading font-semibold text-white mb-4">Ready to Excel?</h3>
          <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            All tutorials are delivered online via interactive platforms, ensuring a flexible and engaging learning experience. Get tailored support, exam preparation, and concept clarification from an expert.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/contact')} 
            className="!bg-white !text-brand-primary hover:!bg-gray-100 hover:!text-brand-secondary !border-2 !border-white/30 !shadow-xl hover:!shadow-2xl !font-semibold transform hover:scale-105 transition-all duration-200"
          >
            Book Your First Session <ChevronRightIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
