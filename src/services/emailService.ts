import emailjs from '@emailjs/browser';

// Environment variables should be defined in a .env file prefixed with VITE_ so Vite exposes them to the client
// VITE_EMAILJS_SERVICE_ID=<your_service_id>
// VITE_EMAILJS_TEMPLATE_ID=<your_template_id>
// VITE_EMAILJS_PUBLIC_KEY=<your_public_key>

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  // eslint-disable-next-line no-console
  console.warn('[emailService] EmailJS environment variables are not set. Emails will not be sent.');
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormPayload) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Email service not configured.');
  }

  // The keys in the template params must match the variable names used in your EmailJS template.
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}; 