import React, { useState, useEffect, ChangeEvent, HTMLAttributes, ReactNode, DetailedHTMLProps, HTMLProps } from 'react';
import ReactMarkdown, { ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css'; // Import KaTeX CSS

import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LightBulbIcon } from '../assets/icons';
import { ThinkingNeuralAnimation } from '../components/common/ThinkingNeuralAnimation';
import { generateMotivationalQuote, solvePhysicsProblem } from '../services/geminiService';

// Helper function to ensure minimum wait time
const withMinimumDelay = async <T,>(promise: Promise<T>, minDelayMs: number = 3000): Promise<T> => {
  const startTime = Date.now();
  const result = await promise;
  const elapsedTime = Date.now() - startTime;
  const remainingDelay = Math.max(0, minDelayMs - elapsedTime);
  
  if (remainingDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingDelay));
  }
  
  return result;
};

// Props for the custom <code> component
type CodeComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & ExtraProps & {
  inline?: boolean;
  children?: ReactNode;
};

// Props for the custom <pre> component
type PreComponentProps = DetailedHTMLProps<HTMLProps<HTMLPreElement>, HTMLPreElement> & ExtraProps;

export const StudyTipsPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'quote' | 'physics' | null>(null);
  const [physicsProblem, setPhysicsProblem] = useState<string>('');
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

  const resetToOptions = () => {
    setSelectedOption(null);
    setPhysicsProblem('');
    setResult('');
    setError('');
  };

  return (
    <Section 
      title="AI Study Assistant" 
      subtitle="Choose your AI-powered study tool!"
      className="mt-12 sm:mt-16"
    >
      <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
        
        {!selectedOption && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Motivational Quote Option */}
            <div className="bg-neutral-surface p-6 rounded-xl border border-neutral-border hover:border-brand-primary/50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOption('quote')}>
              <div className="text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Motivational Quote
                </h3>
                <p className="text-text-secondary mb-4">
                  Get an instant boost of motivation with a personalized study quote
                </p>
                <Button variant="primary" className="w-full">
                  Generate Quote
                </Button>
              </div>
            </div>

            {/* Physics Problem Solver Option */}
            <div className="bg-neutral-surface p-6 rounded-xl border border-neutral-border hover:border-brand-secondary/50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOption('physics')}>
              <div className="text-center">
                <div className="text-4xl mb-4">⚛️</div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Physics Problem Solver
                </h3>
                <p className="text-text-secondary mb-4">
                  Get step-by-step solutions to physics problems (with LaTeX equations!)
                </p>
                <Button variant="secondary" className="w-full">
                  Solve Problem
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Motivational Quote Interface */}
        {selectedOption === 'quote' && (
          <div className="bg-neutral-surface p-8 rounded-xl border border-neutral-border">
            <div className="text-center">
              <h3 className="text-2xl font-heading font-semibold text-brand-primary mb-4">
                💪 Motivational Quote Generator
              </h3>
              <p className="text-text-secondary mb-6">
                Need some motivation? Get an inspiring quote to boost your study session!
              </p>
              
              {isLoading && <ThinkingNeuralAnimation />}
              
              {!isLoading && (
                <div className="space-y-4">
                  <Button onClick={handleGenerateQuote} variant="primary" size="lg" className="w-full">
                    <LightBulbIcon className="w-5 h-5 mr-2" />
                    Generate Motivational Quote
                  </Button>
                  <Button onClick={resetToOptions} variant="outline" className="w-full">
                    ← Back to Options
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Physics Problem Solver Interface */}
        {selectedOption === 'physics' && (
          <div className="bg-neutral-surface p-8 rounded-xl border border-neutral-border">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-heading font-semibold text-brand-secondary mb-4">
                ⚛️ Physics Problem Solver
              </h3>
              <p className="text-text-secondary">
                Enter your physics problem and get a detailed step-by-step solution!
              </p>
            </div>
            
            {isLoading && <ThinkingNeuralAnimation />}
            
            {!isLoading && (
              <div className="space-y-6">
                <Input
                  label="Enter your physics problem:"
                  id="physics-problem"
                  type="textarea"
                  value={physicsProblem}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPhysicsProblem(e.target.value)} 
                  placeholder="e.g., A ball is thrown upward with an initial velocity of 20 m/s. How high will it go? You can use LaTeX like $v_f^2 = v_i^2 + 2ad$"
                  rows={4}
                />
                <div className="flex space-x-4">
                  <Button onClick={handleSolvePhysics} disabled={!physicsProblem.trim()} variant="secondary" className="flex-1">
                    Solve Problem
                  </Button>
                  <Button onClick={resetToOptions} variant="outline" className="flex-1">
                    ← Back to Options
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="mt-6 text-center text-red-600 bg-red-100 border border-red-300 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {/* Result Display */}
        {result && !isLoading && (
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
                          <code className="bg-neutral-muted-bg px-1 rounded-sm text-sm" {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className="font-mono text-sm" {...props}>
                            {children}
                          </code>
                        )
                    }} 
                  >
                    {result}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <Button onClick={resetToOptions} variant="outline" size="sm">
                Try Another Option
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-center text-xs text-text-muted mt-8">
        Powered by Gemini AI. Results are for educational guidance.
      </p>
    </Section>
  );
};