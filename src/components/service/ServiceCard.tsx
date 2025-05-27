import React from 'react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}
export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <div className="bg-neutral-surface p-8 rounded-xl border border-neutral-border transition-colors duration-300">
    <div className="flex items-center text-brand-primary mb-4">
      <service.icon className="h-10 w-10 mr-4 flex-shrink-0" />
      <h3 className="text-2xl font-heading font-semibold text-text-primary">{service.title}</h3>
    </div>
    <p className="text-text-secondary mb-4">{service.description}</p>
    <div className="text-sm text-brand-secondary font-medium">
      Curriculum/Focus: {service.targetSystem}
    </div>
  </div>
);
