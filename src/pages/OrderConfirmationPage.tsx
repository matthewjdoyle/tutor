import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ChevronRightIcon } from '../assets/icons';

export const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber || `ORD-${Date.now()}`;

  return (
    <Section title="Thank You For Your Order!" subtitle={`Your order #${orderNumber} has been placed successfully.`}>
      <div className="max-w-lg mx-auto text-center bg-neutral-surface p-8 sm:p-12 rounded-xl border border-neutral-border">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p className="text-text-secondary mb-4 leading-relaxed">
          We've received your order. For digital items, access instructions or download links would typically be provided here or sent via email.
        </p>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Thank you for choosing Dr. Doyle's Tutoring resources!
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/learning-resources')}>
          Explore More Resources <ChevronRightIcon />
        </Button>
      </div>
    </Section>
  );
};
