import emailjs from '@emailjs/browser';

// Environment variables should be defined in a .env file prefixed with VITE_ so Vite exposes them to the client
// See .env.example for required variables and setup instructions

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const isConfigured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;
const isDevelopment = import.meta.env.DEV;

if (!isConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[emailService] EmailJS environment variables are not configured.\n' +
    'Please copy .env.example to .env and add your EmailJS credentials.\n' +
    'Visit https://www.emailjs.com/ to set up EmailJS.\n' +
    (isDevelopment ? 'In development mode, emails will be logged to console.' : 'Emails will not be sent.')
  );
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormPayload) => {
  // The keys in the template params must match the variable names used in your EmailJS template.
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
  };

  if (!isConfigured) {
    if (isDevelopment) {
      // In development mode, log the email data to console instead of failing
      // eslint-disable-next-line no-console
      console.log(
        '📧 [DEV MODE] Contact form submitted with the following data:\n',
        JSON.stringify(templateParams, null, 2),
        '\n\nTo actually send emails, configure EmailJS by copying .env.example to .env and adding your credentials.'
      );
      
      // Simulate a successful email send with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Promise.resolve('dev-mode-success');
    } else {
      throw new Error(
        'EmailJS is not configured. Please set up EmailJS environment variables. ' +
        'See .env.example for setup instructions.'
      );
    }
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}; 