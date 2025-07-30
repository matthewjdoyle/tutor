# Setup

### Environment Variables

This project requires environment variables for external services:

1. **EmailJS Configuration** (for contact form):
   - Copy `.env.example` to `.env`
   - Get your EmailJS credentials from https://www.emailjs.com/
   - Add your service ID, template ID, and public key to the `.env` file

2. **Gemini AI Configuration** (for AI features):
   - Add your Gemini API key to the `.env` file

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

**Note:** In development mode, the contact form will log submissions to the console when EmailJS is not configured, allowing you to test the form functionality without setting up EmailJS.