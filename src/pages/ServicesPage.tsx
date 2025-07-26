import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { FaqItem } from '../components/common/FaqItem';
import TimezoneWorkingHours from '../components/common/TimezoneWorkingHours';
import { ChevronRightIcon } from '../assets/icons';
import { PencilIcon } from '../assets/icons';
import { TUTOR_NAME, courseSections } from '../data';
import { faqData } from '../data/servicesPageData';
import { examBoardLogos } from '../data/examBoardsData';
import { HowItWorksTimeline } from '../components/common/HowItWorksTimeline';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  // Combine static FAQs with working hours FAQ that includes interactive timezone conversion
  const faqs = [...faqData, {
    question: 'What are your typical working hours?',
    answer: <TimezoneWorkingHours />
  }];

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
            Personalised, one-on-one online tutoring in Maths, Physics, and Computer Science. I focus on building deep understanding, exam technique, and academic confidence for students at all levels.
          </p>
        </div>
      </header>

              {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* How It Works & Exam Prep Sections */}
        <div className="max-w-4xl mx-auto space-y-20">
          <HowItWorksTimeline />
          
          {/* Exam Preparation section moved below */}
        </div>

        {/* Course Offerings Section */}
        <Section 
          title="Available Courses" 
          subtitle={`Comprehensive online tutoring by ${TUTOR_NAME} across multiple curricula and levels.`}
          className="pt-20"
        >
          <div className="card-elevated rounded-2xl p-8 shadow-lg">
            <div className="space-y-8">
              {courseSections.map((section, index) => (
                <div key={section.region} className="rounded-xl overflow-hidden">
                  <div
                    className="card-elevated rounded-xl p-6"
                    style={{ background: index % 3 === 0 ? 'rgba(14,165,233,0.15)' : index % 3 === 1 ? 'rgba(59,130,246,0.15)' : 'rgba(20,184,166,0.15)' }}
                  >
                  <h3 className="text-2xl font-heading font-bold text-brand-primary mb-6 border-b border-neutral-border pb-4">
                    {section.region}
                  </h3>
                                     <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {section.levels.map((level) => (
                       <div key={level.id} className="bg-white border border-border-muted rounded-lg p-4">
                         <h4 className="text-lg font-semibold text-text-primary mb-2">
                           {level.name}
                         </h4>
                         {level.subjects.length > 0 && (
                           <div className="text-sm text-text-secondary mb-2">
                             <span className="font-medium">Subjects:</span> {level.subjects.join(', ')}
                           </div>
                         )}
                         {level.examBoards && (
                           <div className="text-xs text-text-muted italic mb-2">
                             Exam boards: {level.examBoards.join(', ')}
                           </div>
                         )}
                         {level.subCourses && (
                           <div className="mt-3 pt-3 border-t border-border-muted">
                             <div className="text-xs font-medium text-text-secondary mb-2">Available courses:</div>
                             <ul className="space-y-1">
                               {level.subCourses.map((subCourse) => (
                                 <li key={subCourse.id} className="text-xs text-text-secondary">
                                   • {subCourse.name}
                                 </li>
                               ))}
                             </ul>
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                  </div>
                </div>
              ))}
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

        {/* Exam Preparation Section */}
        <div className="card-elevated rounded-2xl p-8 shadow-lg mt-20">
          <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Exam Preparation</h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Exam season doesn't have to be overwhelming. My sessions focus on the exact assessment objectives for your exam board, pairing clear explanations with plenty of timed practice so you know precisely what the examiner wants.
          </p>
          <p className="text-text-secondary leading-relaxed">
            I'll provide high-quality, exam-specific notes and question sets written just for you, and point you towards the best past-paper banks, videos and interactive resources I’ve vetted over years of tutoring.
          </p>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">We cover all major exam boards:</h3>
            <div className="flex flex-wrap gap-6 items-center">
              {examBoardLogos.map((board) => (
                <img
                  key={board.name}
                  src={board.logoUrl}
                  alt={board.name}
                  className="h-10 object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ))}
            </div>
          </div>
        </div>

        {/* General Tutoring Section */}
        <div className="card-elevated rounded-2xl p-8 shadow-lg mt-20">
          <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">General Tutoring</h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Whether you’re building fundamental skills or aiming for A* performance, my general tutoring sessions provide the structure, motivation, and expert guidance you need to succeed. Each lesson is fully customised to match your learning style and goals, turning tricky topics into clear, memorable ideas.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>Diagnostic first lesson to map strengths and gaps</li>
            <li>Personalised study plan with clear, measurable milestones</li>
            <li>Interactive digital whiteboards and real-time quizzes</li>
            <li>Weekly homework with detailed, constructive feedback</li>
            <li>24/7 support between lessons via shared docs &amp; chat</li>
            <li>Enrichment pathways for gifted students keen to push beyond the standard curriculum</li>
            <li>Expert supervision for independent research, coding projects and EPQ-style coursework</li>
            <li>Curriculum-bridging support for international students moving into the UK GCSE or A-Level system</li>
          </ul>
          <div className="mt-8 text-center">
            <Button variant="primary" onClick={() => navigate('/contact')} className="inline-flex items-center">
              Start Your Journey <ChevronRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Pricing & FAQ Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mt-20">
          
          {/* Pricing Section (Left) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Tutoring Rates</h2>
              <div className="card-elevated border-2 border-primary-500/20 rounded-2xl p-6 shadow-lg space-y-4">
                {/* GBP Price */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white rounded-lg p-5 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-heading font-bold mb-1">£50</div>
                  <div className="text-sm font-medium opacity-90">per hour</div>
                </div>
                
                {/* EUR & USD Prices */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-brand-secondary to-brand-secondary/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-heading font-bold">€57</div>
                    <div className="text-xs opacity-90">per hour</div>
                  </div>
                  <div className="bg-gradient-to-br from-brand-primary-alt to-brand-primary-alt/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-heading font-bold">$67</div>
                    <div className="text-xs opacity-90">per hour</div>
                  </div>
                  <div className="bg-gradient-to-br from-brand-accent to-brand-accent/80 text-white rounded-lg p-4 text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-heading font-bold">¥482</div>
                    <div className="text-xs opacity-90">per hour</div>
                  </div>
                </div>
                
                {/* Discount Section */}
                <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/30 rounded-lg p-4 mt-4">
                  <div className="text-center">
                    <div className="font-heading font-bold text-brand-accent mb-1">
                      Save 10% on Bulk Sessions
                    </div>
                    <div className="text-sm text-text-secondary">
                      Book 12+ hours at once for a discount.
                    </div>
                    <div className="mt-2 text-xs text-text-muted">
                      e.g. 12 hours £600 → <span className="font-bold text-brand-accent">£540</span>
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
              {faqs.map((faq, index) => (
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
