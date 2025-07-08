import { NavLinkItem } from '../types';
import { ShoppingCartIcon, AcademicCapIcon, CalculatorIcon, BeakerIcon, CodeBracketIcon } from '../assets/icons'; // Ensure correct path to icons

export const TUTOR_NAME = "Dr. Matt Doyle";

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
    quote: "Thank you for your dedication whilst you yourself have been busy. You inspired me to learn how to enjoy studying, I would not be at the level I am now without you.",
    name: "S. L.",
    course: "A-Level Physics",
    location: "London, UK",
    imageUrl: "student-1.jpeg"
  },
  {
    quote: "The AP Calculus sessions were incredibly helpful.",
    name: "A. T. & T. O.",
    course: "AP Calculus BC",
    location: "Almaty, Khazakstan",
    imageUrl: "student-2.jpg"
  },
  {
    quote: "I highly recommend Dr. Doyle for anyone struggling with Maths. Patient, knowledgeable, and effective.",
    name: "F. A.",
    course: "Physics 11 & 12",
    location: "British Columbia, Canada",
    imageUrl: "student-3.jpg"
  }
];
