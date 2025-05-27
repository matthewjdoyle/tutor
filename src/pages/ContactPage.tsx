import React, { useState } from 'react';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { TextArea } from '../components/common/TextArea';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' }); 
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Section 
      title="Get In Touch" 
      subtitle="Have questions or want to book a session? Reach out!"
      className="mt-12 sm:mt-16"
    >
      <div className="max-w-2xl mx-auto bg-neutral-surface p-8 sm:p-10 rounded-xl border border-neutral-border mb-12 sm:mb-16">
        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md text-center animate-fade-in-up">
            Thank you for your message! Dr. Doyle will get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Your Name" type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
          <Input label="Your Email" type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
          <Input label="Subject" type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required />
          <TextArea label="Your Message" name="message" id="message" value={formData.message} onChange={handleChange} rows={5} required />
          <div>
            <Button type="submit" variant="primary" className="w-full" size="lg">
              Send Message
            </Button>
          </div>
        </form>
        <div className="mt-10 text-center text-text-muted">
          <p>Alternatively, you can email directly at: <a href="mailto:info@drmatthewdoyle.com" className="text-brand-primary hover:underline">info@drmatthewdoyle.com</a></p>
          <p className="text-xs mt-1">(This is a demo, form submission is simulated and data is logged to console.)</p>
        </div>
      </div>
    </Section>
  );
};
