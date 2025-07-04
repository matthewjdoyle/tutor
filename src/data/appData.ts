import { NavLinkItem } from '../types';
import { ShoppingCartIcon, AcademicCapIcon, CalculatorIcon, BeakerIcon, CodeBracketIcon } from '../assets/icons'; // Ensure correct path to icons

export const TUTOR_NAME = "Dr. Matthew Doyle";

export const navLinks: NavLinkItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/learning-resources', label: 'Learning Resources' },
  { path: '/study-tips', label: 'AI Study Tips' },
  { path: '/cart', label: 'Cart', icon: ShoppingCartIcon },
  { path: '/contact', label: 'Contact' },
];

export const testimonials = [
  {
    quote: "Dr. Doyle's tutoring transformed my understanding of A-Level Physics. I went from a C to an A*!",
    name: "Sarah K.",
    location: "London, UK",
    imageUrl: "student-1.jpeg"
  },
  {
    quote: "The AP Calculus sessions were incredibly helpful. Dr. Doyle explains complex topics very clearly.",
    name: "Mike P.",
    location: "California, USA",
    imageUrl: "student-2.jpg"
  },
  {
    quote: "I highly recommend Dr. Doyle for anyone struggling with Maths. Patient, knowledgeable, and effective.",
    name: "Emily R.",
    location: "Manchester, UK",
    imageUrl: "student-3.jpg"
  }
];
