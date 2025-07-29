import { NavLinkItem } from '../types';
import { ShoppingCartIcon, AcademicCapIcon, CalculatorIcon, BeakerIcon, CodeBracketIcon } from '../assets/icons'; // Ensure correct path to icons

export const TUTOR_NAME = "Dr. Matt Doyle";

export const navLinks: NavLinkItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Tutoring' },
  { path: '/learning-resources', label: 'Resources' },
  { path: '/study-tips', label: 'AI Tools' },
  { path: '/contact', label: 'Contact' },
  { path: '/cart', label: 'Cart', icon: ShoppingCartIcon },
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
    quote: "Dr. Doyle helped us understand AP Calculus in a way our textbooks could not. We had only 5 weeks to prepare for the BC exam and went from struggling to feeling confident!",
    name: "A. T. & T. O.", 
    course: "AP Calculus BC",
    location: "Almaty, Kazakhstan",
    imageUrl: "student-2.jpg"
  },
  {
    quote: "Before working with Matt, I was really struggling with physics concepts, especially quantum mechanics. His patient teaching style and ability to break down complex topics made all the difference.",
    name: "J. A.",
    course: "Physics 11 & 12",
    location: "British Columbia, Canada",
    imageUrl: "student-3.jpg"
  }
];
