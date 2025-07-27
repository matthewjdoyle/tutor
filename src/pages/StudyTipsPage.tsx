import React, { useState, ChangeEvent, HTMLAttributes, ReactNode, DetailedHTMLProps, HTMLProps } from 'react';
import ReactMarkdown, { ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LightBulbIcon, RobotIcon } from '../assets/icons';
import { ThinkingNeuralAnimation } from '../components/common/ThinkingNeuralAnimation';
import { breakdownProblem, generateRevisionTimetable } from '../services/geminiService';
import { InteractiveTimeSelector } from '../components/common/InteractiveTimeSelector';
import { TimetableGrid } from '../components/common/TimetableGrid';

const withMinimumDelay = async <T,>(promise: Promise<T>, minDelayMs: number = 2000): Promise<T> => {
  const startTime = Date.now();
  const result = await promise;
  const elapsedTime = Date.now() - startTime;
  const remainingDelay = Math.max(0, minDelayMs - elapsedTime);
  
  if (remainingDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingDelay));
  }
  
  return result;
};



type CodeComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & ExtraProps & {
  inline?: boolean;
  children?: ReactNode;
};

type PreComponentProps = DetailedHTMLProps<HTMLProps<HTMLPreElement>, HTMLPreElement> & ExtraProps;

type Exam = {
  subject: string;
  date: string;
  tasks: string[];
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["Morning (9am-12pm)", "Afternoon (1pm-5pm)", "Evening (6pm-9pm)"];

type StudyTimes = {
  [day: string]: string[];
};

const getTodaysDate = () => new Date().toISOString().split('T')[0];

const firstExamDateObj = new Date();
firstExamDateObj.setMonth(firstExamDateObj.getMonth() + 1);

const secondExamDateObj = new Date(firstExamDateObj);
secondExamDateObj.setDate(secondExamDateObj.getDate() + 2);

const formatDateForInput = (date: Date) => date.toISOString().split('T')[0];

const defaultExams: Exam[] = [
  {
    subject: 'Maths',
    date: formatDateForInput(firstExamDateObj),
    tasks: [
      'Revise Algebra fundamentals',
      'Practice differentiation questions',
      'Complete a past paper (2022)',
    ],
  },
  {
    subject: 'Physics',
    date: formatDateForInput(secondExamDateObj),
    tasks: [],
  }
];



export const StudyTipsPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'physics' | 'timetable' | null>(null);
  
  // State for Problem Breakdown
  const [problemInput, setProblemInput] = useState<string>('');
  
  // State for Timetable Generator
  const [exams, setExams] = useState<Exam[]>(defaultExams);
  const [taskInputs, setTaskInputs] = useState<string[]>(['']);
  const [startDate, setStartDate] = useState(getTodaysDate());
  const [hoursPerWeek, setHoursPerWeek] = useState('10');
  const [studyTimes, setStudyTimes] = useState<StudyTimes>({});
  const [timetable, setTimetable] = useState<any>(null);

  // Common State
  const [result, setResult] = useState<string>('');
  const [problemBreakdown, setProblemBreakdown] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');



  const handleBreakdownProblem = async () => {
    if (!problemInput.trim()) {
      setError('Please enter a problem to solve.');
      setProblemBreakdown(null);
      return;
    }
    setIsLoading(true);
    setError('');
    setProblemBreakdown(null);
    try {
      const breakdown = await withMinimumDelay(breakdownProblem(problemInput), 3000);
      setProblemBreakdown(breakdown);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimetable = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimetable(null);
    setError('');

    try {
      const generatedTimetable = await withMinimumDelay(
        generateRevisionTimetable(exams, startDate, Number(hoursPerWeek), studyTimes)
      );
      setTimetable(generatedTimetable);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred while generating the timetable.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddExam = () => {
    setExams([...exams, { subject: '', date: '', tasks: [] }]);
    setTaskInputs([...taskInputs, '']);
  };

  const handleExamChange = (index: number, field: 'subject' | 'date', value: string) => {
    const newExams = [...exams];
    newExams[index][field] = value;
    setExams(newExams);
  };
  const handleRemoveExam = (index: number) => {
    setExams(exams.filter((_, i) => i !== index));
    setTaskInputs(taskInputs.filter((_, i) => i !== index));
  };

  const handleTaskChange = (examIndex: number, taskIndex: number, value: string) => {
    const newExams = [...exams];
    newExams[examIndex].tasks[taskIndex] = value;
    setExams(newExams);
  };

  const handleAddTask = (examIndex: number) => {
    const newExams = [...exams];
    newExams[examIndex].tasks.push('');
    setExams(newExams);
  };

  const handleRemoveTask = (examIndex: number, taskIndex: number) => {
    const newExams = [...exams];
    newExams[examIndex].tasks = newExams[examIndex].tasks.filter((_, i) => i !== taskIndex);
    setExams(newExams);
  };

  const resetToOptions = () => {
    setSelectedOption(null);
    setProblemInput('');
    setResult('');
    setProblemBreakdown(null);
    setError('');
    setExams(defaultExams);
    setTaskInputs(['']);
    setStartDate(getTodaysDate());
    setHoursPerWeek('10');
    setStudyTimes({});
    setTimetable(null);
  };

  return (
    <Section 
      title="AI Tools" 
      className="mt-12 sm:mt-16"
    >
      <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="flex justify-center mb-8">
          <RobotIcon className="w-10 h-10 text-brand-primary opacity-80" />
        </div>
        
        {!selectedOption && (
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-neutral-surface p-6 rounded-xl border border-neutral-border hover:border-brand-secondary/50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOption('physics')}>
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">Problem Breakdown</h3>
                <p className="text-text-secondary mb-4">Step-by-step solutions.</p>
                <Button variant="secondary" className="w-full">Break Down</Button>
              </div>
            </div>

            <div className="bg-neutral-surface p-6 rounded-xl border border-neutral-border hover:border-brand-accent/50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOption('timetable')}>
              <div className="text-center">
                <div className="text-4xl mb-4">🗓️</div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">Revision Timetable</h3>
                <p className="text-text-secondary mb-4">Create a personalized plan.</p>
                <Button variant="accent" className="w-full">Create</Button>
              </div>
            </div>
          </div>
        )}



        {selectedOption === 'physics' && (
          <div className="bg-neutral-surface p-8 rounded-xl border border-neutral-border">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-heading font-semibold text-brand-secondary mb-4">🔍 Problem Breakdown</h3>
              <p className="text-text-secondary">Enter a physics or mathematics problem for a structured step-by-step solution.</p>
            </div>
            {isLoading ? <ThinkingNeuralAnimation /> : (
              <div className="space-y-6">
                <Input
                  label="Enter your problem:"
                  id="problem-input"
                  type="textarea"
                  value={problemInput}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setProblemInput(e.target.value)} 
                  placeholder="e.g., A ball is thrown upward with an initial velocity of 20 m/s..."
                  rows={4}
                />
                <div className="flex space-x-4">
                  <Button onClick={handleBreakdownProblem} disabled={!problemInput.trim()} variant="secondary" className="flex-1">Break Down Problem</Button>
                  <Button onClick={resetToOptions} variant="outline" className="flex-1">← Back</Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {selectedOption === 'timetable' && (
           <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-border">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-heading font-semibold text-brand-accent mb-4">🗓️ AI Revision Timetable Generator</h3>
              <p className="text-text-secondary">Enter your exam details to generate a personalized study plan.</p>
            </div>
            {isLoading ? <ThinkingNeuralAnimation /> : (
              <form onSubmit={handleGenerateTimetable} className="space-y-8">
                <div>
                  <h2 className="text-xl font-heading font-bold text-brand-primary mb-4">Your Exams & Tasks</h2>
                  {exams.map((exam, index) => (
                    <div key={index} className="mb-4 p-4 rounded-lg bg-gray-50 border">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <Input placeholder="Subject (e.g., Physics)" value={exam.subject} onChange={(e) => handleExamChange(index, 'subject', e.target.value)} required className="md:col-span-1" />
                        <Input type="date" value={exam.date} onChange={(e) => handleExamChange(index, 'date', e.target.value)} required className="md:col-span-1" />
                        <button type="button" onClick={() => handleRemoveExam(index)} className="hero-button px-3 py-1 rounded-lg font-medium text-sm border-2 border-red-500 text-red-600 bg-transparent hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 justify-self-center md:justify-self-end">Remove Exam</button>
                      </div>
                      <div className="mt-4 pl-2">
                        <h4 className="text-sm font-semibold text-text-secondary mb-2">Specific tasks for {exam.subject || 'this subject'}:</h4>
                        {exam.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center gap-2 mb-2">
                            <Input 
                              value={task} 
                              onChange={(e) => handleTaskChange(index, taskIndex, e.target.value)} 
                              placeholder="e.g., Complete past paper 2021" 
                              className="flex-grow"
                            />
                            <button type="button" onClick={() => handleRemoveTask(index, taskIndex)} className="hero-button px-2 py-1 rounded-md text-sm border border-red-500 text-red-600 bg-transparent hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105">✕</button>
                          </div>
                        ))}
                                                  <button type="button" onClick={() => handleAddTask(index)} className="hero-button themed-button-primary px-3 py-1 rounded-lg text-sm border-2 transition-all duration-300 transform hover:scale-105">+ Add task</button>
                      </div>
                    </div>
                  ))}
                                      <button type="button" onClick={handleAddExam} className="hero-button themed-button-secondary mt-2 px-4 py-2 rounded-lg font-medium border-2 transition-all duration-300 transform hover:scale-105">+ Add Another Exam</button>
                </div>
  
                <div>
                  <h2 className="text-xl font-heading font-bold text-brand-primary mb-4">Study Preferences</h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Input label="Revision Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    <Input label="Hours Per Week to Study" type="number" placeholder="e.g., 10" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} required />
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-3">Preferred Study Times</h3>
                  <InteractiveTimeSelector studyTimes={studyTimes} onChange={setStudyTimes} />
                </div>
  
                <div className="flex space-x-4 pt-4">
                  <Button type="submit" disabled={isLoading} variant="accent" className="flex-1">Create Timetable</Button>
                  <Button onClick={resetToOptions} variant="outline" className="flex-1">← Back</Button>
                </div>
              </form>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 text-center text-red-600 bg-red-100 border border-red-300 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {problemBreakdown && !isLoading && selectedOption === 'physics' && (
          <div id="problem-breakdown-results" className="mt-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-xl border border-gradient-to-r from-brand-primary/20 to-brand-secondary/20 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <LightBulbIcon className="w-6 h-6 text-white"/>
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold">{problemBreakdown.title}</h4>
                    <p className="text-white/80 text-sm">Step-by-step solution breakdown</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{problemBreakdown.steps?.length || 0}</div>
                    <div className="text-xs text-white/80">Steps</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Print Header - Only visible when printing */}
            <div className="hidden print:block bg-gray-100 p-4 border-b border-gray-300">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Problem Solution</h1>
                <p className="text-gray-600 text-sm">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Problem Statement */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50">
                <h5 className="text-lg font-semibold text-blue-900 mb-3">Problem Statement</h5>
                <p className="text-blue-800 leading-relaxed text-lg">{problemBreakdown.problem}</p>
              </div>

              {/* Given Information */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
                <h5 className="text-lg font-semibold text-green-900 mb-3">Given Information</h5>
                <ul className="space-y-2">
                  {problemBreakdown.given.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-green-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Find */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200/50">
                <h5 className="text-lg font-semibold text-purple-900 mb-3">What to Find</h5>
                <p className="text-purple-800 leading-relaxed">{problemBreakdown.find}</p>
              </div>

              {/* Principles/Formulas */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200/50">
                <h5 className="text-lg font-semibold text-orange-900 mb-3">Relevant Principles</h5>
                <ul className="space-y-3">
                  {problemBreakdown.principles.map((principle: string, index: number) => (
                    <li key={index} className="bg-white/50 p-3 rounded-lg border border-orange-200/30">
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          code: ({node, inline, children, ...props}: CodeComponentProps) => 
                            inline ? (
                              <code className="bg-orange-100 px-2 py-1 rounded-md text-sm font-mono text-orange-800" {...props}>{children}</code>
                            ) : (
                              <code className="font-mono text-sm bg-orange-100 p-2 rounded-md block" {...props}>{children}</code>
                            )
                        }}
                      >
                        {principle}
                      </ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Steps */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200/50">
                <h5 className="text-lg font-semibold text-indigo-900 mb-6">Solution Steps</h5>
                <div className="space-y-6">
                  {problemBreakdown.steps.map((step: any, index: number) => (
                    <div key={step.step} className="relative">
                      {/* Step Number Badge */}
                      <div className="absolute -left-3 top-0 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.step}
                      </div>
                      
                      {/* Step Content */}
                      <div className="ml-8 bg-white rounded-xl shadow-sm border border-indigo-200/50 overflow-hidden">
                        {/* Step Header */}
                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-4 border-b border-indigo-200/30">
                          <h6 className="font-semibold text-indigo-900 text-lg">Step {step.step}</h6>
                          <p className="text-indigo-700 mt-1 whitespace-pre-line">{step.description}</p>
                        </div>
                        
                        {/* Calculation */}
                        <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50">
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <ReactMarkdown 
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                              components={{
                                code: ({node, inline, children, ...props}: CodeComponentProps) => 
                                  inline ? (
                                    <code className="bg-indigo-100 px-2 py-1 rounded-md text-sm font-mono text-indigo-800" {...props}>{children}</code>
                                  ) : (
                                    <code className="font-mono text-sm bg-indigo-100 p-3 rounded-md block overflow-x-auto" {...props}>{children}</code>
                                  )
                              }}
                            >
                              {step.calculation}
                            </ReactMarkdown>
                          </div>
                        </div>
                        
                        {/* Result */}
                        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200/30">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="font-semibold text-green-800">Result: </span>
                            <span className="text-green-700 ml-1">{step.result}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Answer */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-300/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
                    ✓
                  </div>
                  <h5 className="text-xl font-bold text-emerald-900">Final Answer</h5>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      code: ({node, inline, children, ...props}: CodeComponentProps) => 
                        inline ? (
                          <code className="bg-emerald-100 px-2 py-1 rounded-md text-sm font-mono text-emerald-800" {...props}>{children}</code>
                        ) : (
                          <code className="font-mono text-sm bg-emerald-100 p-3 rounded-md block" {...props}>{children}</code>
                        )
                    }}
                  >
                    {problemBreakdown.finalAnswer}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Concept Explanation */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200/50">
                <h5 className="text-lg font-semibold text-slate-900 mb-3">Key Concept</h5>
                <p className="text-slate-700 leading-relaxed">{problemBreakdown.concept}</p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-8 py-6 border-t border-gray-200/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Problem solved with AI assistance</span>
                </div>
                <div className="flex gap-3">
                  <Button onClick={resetToOptions} variant="outline" size="sm" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white print-hidden">
                    Try Another Problem
                  </Button>
                  <Button onClick={() => window.print()} variant="primary" size="sm" className="print-hidden">
                    Print Solution
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {timetable && !isLoading && selectedOption === 'timetable' && (
          <div id="timetable-results" className="mt-12 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-neutral-border">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-brand-primary mb-2">{timetable.title}</h2>
              <p className="text-text-secondary text-sm">{timetable.summary}</p>
            </div>

            <div className="flex justify-center gap-4 mb-6 print-hidden">
                <Button onClick={() => window.print()} variant="primary">Print Timetable</Button>
                <Button onClick={resetToOptions} variant="outline" size="sm">Create New Timetable</Button>
            </div>
            
            {timetable.weeklySchedule?.map((week: any) => (
              <div key={week.week} className="mb-6 page-break">
                <h3 className="text-xl font-bold text-text-primary mb-3 border-b pb-2">Week {week.week} ({week.dates})</h3>
                <div className="space-y-4">
                  {week.dailySessions?.map((daySchedule: any) => (
                    <div key={daySchedule.day} className="p-3 rounded-lg bg-gray-50 border">
                      <h4 className="text-lg font-bold text-text-primary mb-2">{daySchedule.day}</h4>
                      {daySchedule.tasks?.length > 0 ? (
                        <ul className="space-y-2">
                          {daySchedule.tasks.map((task: any, index: number) => (
                            <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center p-2 bg-white rounded-md shadow-sm text-sm">
                              <span className="font-semibold text-brand-primary w-28 mb-1 sm:mb-0">{task.time}</span>
                              <span className="font-semibold text-text-primary flex-1 mb-1 sm:mb-0">{task.subject}</span>
                              <span className="text-text-secondary flex-1">{task.topic}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-text-muted text-sm">No study sessions planned.</p>
                      )}
                    </div>
                  ))}
                </div>
                <TimetableGrid schedule={week} />
              </div>
            ))}

             <div className="mt-6 text-center print-hidden">
              <Button onClick={resetToOptions} variant="outline" size="sm">Create New Timetable</Button>
            </div>
          </div>
        )}

      </div>
    </Section>
  );
};