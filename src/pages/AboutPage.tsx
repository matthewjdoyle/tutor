import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ChevronRightIcon, ArrowTopRightOnSquareIcon } from '../assets/icons';
import { TUTOR_NAME } from '../data';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Section 
      title={`About ${TUTOR_NAME}`} 
      subtitle="Passionate Educator, Experienced Tutor"
      className="mt-12 sm:mt-16"
    >
      <div className="max-w-4xl mx-auto bg-neutral-surface p-8 sm:p-12 rounded-xl border border-neutral-border mb-12 sm:mb-16">
        <div className="md:flex md:items-start md:space-x-10">
          <div className="md:w-1/3 text-center mb-8 md:mb-0 flex-shrink-0">
            <img 
              src="portrait.JPEG"
              alt={TUTOR_NAME} 
              className="w-48 h-48 sm:w-60 sm:h-60 rounded-xl object-cover mx-auto border-2 border-brand-primary/50" 
            />
            <h3 className="text-2xl font-heading font-semibold mt-6 text-text-primary">{TUTOR_NAME}</h3>
            <p className="text-brand-secondary">PhD, Maths, Physics & CS Specialist</p>
          </div>
          <div className="md:w-2/3">
            <h4 className="text-2xl font-heading font-semibold text-text-primary mb-4">My Teaching Philosophy</h4>
            <p className="text-text-secondary mb-4 leading-relaxed">
              "I believe that every student has the potential to excel in Maths, Physics, and Computer Science with the right guidance and support. My approach focuses on building a strong conceptual understanding, fostering critical thinking, and developing problem-solving skills. I strive to make learning engaging, relatable, and tailored to each student's individual needs and learning style."
            </p>
            <h4 className="text-2xl font-heading font-semibold text-text-primary mb-4 mt-8">Experience & Qualifications</h4>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>PhD in Theoretical Physics.</li>
              <li>Over 10 years of tutoring experience with UK (GCSE, A-Level) and USA (SAT, AP, High School) curricula in Maths, Physics, and Computer Science.</li>
              <li>Proven track record of helping students achieve top grades and gain confidence.</li>
              <li>Expertise in online teaching methodologies and digital learning tools.</li>
            </ul>
             <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button variant="primary" onClick={() => navigate('/contact')}>
                Schedule a Consult <ChevronRightIcon />
              </Button>
              <Button
                  variant="outline"
                  href="https://www.matthewd0yle.com"
                  target="_blank"
              >
                  Visit My Portfolio <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
