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
import { generateMotivationalQuote, solvePhysicsProblem, generateRevisionTimetable } from '../services/geminiService';
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
  const [selectedOption, setSelectedOption] = useState<'quote' | 'physics' | 'timetable' | null>(null);
  
  // State for Physics Solver
  const [physicsProblem, setPhysicsProblem] = useState<string>('');
  
  // State for Timetable Generator
  const [exams, setExams] = useState<Exam[]>(defaultExams);
  const [taskInputs, setTaskInputs] = useState<string[]>(['']);
  const [startDate, setStartDate] = useState(getTodaysDate());
  const [hoursPerWeek, setHoursPerWeek] = useState('10');
  const [studyTimes, setStudyTimes] = useState<StudyTimes>({});
  const [timetable, setTimetable] = useState<any>(null);

  // Common State
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateQuote = async () => {
    setIsLoading(true);
    setError('');
    setResult('');
    try {
      const quote = await withMinimumDelay(generateMotivationalQuote(), 3000);
      setResult(quote);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolvePhysics = async () => {
    if (!physicsProblem.trim()) {
      setError('Please enter a physics problem.');
      setResult('');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult('');
    try {
      const solution = await withMinimumDelay(solvePhysicsProblem(physicsProblem), 3000);
      setResult(solution);
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
    setPhysicsProblem('');
    setResult('');
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
      title="AI Study Assistant" 
      subtitle="Choose an AI-powered study tool to get started."
      className="mt-12 sm:mt-16"
    >
      <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="flex justify-center mb-8">
          <RobotIcon className="w-10 h-10 text-brand-primary opacity-80" />
        </div>
        
        {!selectedOption && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-surface p-6 rounded-xl border border-neutral-border hover:border-brand-primary/50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOption('quote')}>
              <div className="text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">Motivational Quote</h3>
                <p className="text-text-secondary mb-4">Get a boost of motivation.</p>
                <Button variant="primary" className="w-full">Generate</Button>
              </div>
            </div>

            <div className="bg-neutral-surface p-6 rounded-xl border border-neutral-border hover:border-brand-secondary/50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOption('physics')}>
              <div className="text-center">
                <div className="text-4xl mb-4">⚛️</div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">Physics Problem Solver</h3>
                <p className="text-text-secondary mb-4">Solve complex problems.</p>
                <Button variant="secondary" className="w-full">Solve</Button>
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

        {selectedOption === 'quote' && (
          <div className="bg-neutral-surface p-8 rounded-xl border border-neutral-border">
            <div className="text-center">
              <h3 className="text-2xl font-heading font-semibold text-brand-primary mb-4">💪 Motivational Quote Generator</h3>
              <p className="text-text-secondary mb-6">Need some motivation? Get an inspiring quote!</p>
              {isLoading ? <ThinkingNeuralAnimation /> : (
                <div className="space-y-4">
                  <Button onClick={handleGenerateQuote} variant="primary" size="lg" className="w-full">
                    <LightBulbIcon className="w-5 h-5 mr-2" />
                    Generate Quote
                  </Button>
                  <Button onClick={resetToOptions} variant="outline" className="w-full">← Back</Button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedOption === 'physics' && (
          <div className="bg-neutral-surface p-8 rounded-xl border border-neutral-border">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-heading font-semibold text-brand-secondary mb-4">⚛️ Physics Problem Solver</h3>
              <p className="text-text-secondary">Enter a physics problem for a step-by-step solution.</p>
            </div>
            {isLoading ? <ThinkingNeuralAnimation /> : (
              <div className="space-y-6">
                <Input
                  label="Enter your physics problem:"
                  id="physics-problem"
                  type="textarea"
                  value={physicsProblem}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPhysicsProblem(e.target.value)} 
                  placeholder="e.g., A ball is thrown upward with an initial velocity of 20 m/s..."
                  rows={4}
                />
                <div className="flex space-x-4">
                  <Button onClick={handleSolvePhysics} disabled={!physicsProblem.trim()} variant="secondary" className="flex-1">Solve Problem</Button>
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
                        <button type="button" onClick={() => handleRemoveExam(index)} className="text-red-500 hover:text-red-700 font-semibold transition-colors justify-self-center md:justify-self-end">Remove Exam</button>
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
                            <button type="button" onClick={() => handleRemoveTask(index, taskIndex)} className="text-red-500 hover:text-red-700 text-sm p-1">✕</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => handleAddTask(index)} className="text-sm text-brand-primary hover:text-brand-primary-dark transition-colors">+ Add task</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddExam} className="mt-2 text-brand-primary font-semibold hover:text-brand-primary-dark transition-colors">+ Add Another Exam</button>
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
        
        {result && !isLoading && selectedOption !== 'timetable' && (
          <div className="mt-8 p-6 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/30 rounded-lg animate-fade-in-up prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
            <h4 className="text-lg font-heading font-semibold text-brand-primary mb-4 flex items-center">
              <LightBulbIcon className="w-6 h-6 mr-2"/>
              {selectedOption === 'quote' ? 'Your Motivational Quote:' : 'Solution:'}
            </h4>
            <div className="text-text-primary leading-relaxed">
              {selectedOption === 'quote' ? (
                <blockquote className="text-lg italic text-center border-l-4 border-brand-primary pl-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                </blockquote>
              ) : (
                <div className="bg-neutral-bg p-4 rounded border text-left">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-heading mt-4 mb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-heading mt-3 mb-1" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-heading mt-2 mb-1" {...props} />,
                      pre: ({node, ...props}: PreComponentProps) => <pre className="bg-neutral-muted-bg p-3 rounded-md overflow-x-auto my-2" {...props} />,
                      code: ({node, inline, children, ...props}: CodeComponentProps) => 
                        inline ? (
                          <code className="bg-neutral-muted-bg px-1 rounded-sm text-sm" {...props}>{children}</code>
                        ) : (
                          <code className="font-mono text-sm" {...props}>{children}</code>
                        )
                    }} 
                  >
                    {result}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <Button onClick={resetToOptions} variant="outline" size="sm">Try Another Option</Button>
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