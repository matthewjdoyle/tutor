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
      // subtitle="Quantum Physicist & Specialist Maths/Physics Tutor"
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
            <p className="">PhD in Physics | Maths, Physics & Coding Specialist</p>
            {/* Affiliation Logos */}
            <div className="mt-6 flex flex-col items-center space-y-4">
              <img src="universityLogos/Bristol.png" alt="University of Bristol" className="w-28 h-auto object-contain" />
              <img src="universityLogos/Manchester.png" alt="University of Manchester" className="w-28 h-auto object-contain" />
              <img src="Luminary_Logo.png" alt="Luminary Education" className="w-28 h-auto object-contain" />
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-text-secondary mb-4 leading-relaxed">
              I'm a quantum-fluid physicist whose published research on superfluid turbulence sits at the crossroads of
              experiment, simulation and high-performance computing. Since the beginning of 2025 I've helped students turn
              daunting equations into insights and guided learners to top grades worldwide.
            </p>
            <p className="text-text-secondary mb-4 leading-relaxed">
              I earned a First-Class MSci in Physics from the University&nbsp;of&nbsp;Bristol and a PhD from the
              University&nbsp;of&nbsp;Manchester, where I taught undergraduate physics and coding. Today I partner with
              Luminary&nbsp;Education to deliver bespoke online tuition that builds confidence, curiosity and real
              problem-solving power.
            </p>
            <p className="text-text-secondary mb-4 leading-relaxed">
              Beyond academia I keep a balanced life: weekend football, guitar sessions, the occasional strategy game,
              sketch-book experiments and regular travel. These interests give me fresh perspectives and often spark
              engaging analogies that make complex ideas more approachable.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button variant="primary" onClick={() => navigate('/services')}>
                Services <ChevronRightIcon />
              </Button>
              <Button
                  variant="outline"
                  href="https://www.matthewd0yle.com"
                  target="_blank"
              >
                  Learn More <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-1.5" />
              </Button>
              <Button variant="primary" onClick={() => navigate('/contact')}>
                Contact Me <ChevronRightIcon />
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
