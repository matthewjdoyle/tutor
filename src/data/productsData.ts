import { Product } from '../types';

export const storeProductsData: Product[] = [
  {
    id: 'prod1',
    name: 'A-Level Maths Revision Guide',
    description: 'Comprehensive notes and practice questions for A-Level Maths.',
    price: '£19.99',
    numericPrice: 19.99,
    imageUrl: 'https://picsum.photos/seed/mathguide/400/300',
    category: 'Maths',
    isFree: false,
  },
  {
    id: 'prod2',
    name: 'AP Physics C Mechanics Workbook',
    description: 'Challenging problems with detailed solutions for AP Physics C: Mechanics.',
    price: '$24.99',
    numericPrice: 24.99,
    imageUrl: 'https://picsum.photos/seed/physicsprod/400/300',
    category: 'Physics',
    isFree: false,
  },
  {
    id: 'prod3',
    name: 'GCSE Statistics Cheat Sheet Pack',
    description: 'Key formulas and concepts for GCSE Statistics success.',
    price: '£7.50',
    numericPrice: 7.50,
    imageUrl: 'https://picsum.photos/seed/statspack/400/300',
    category: 'Maths',
    isFree: false,
  },
  {
    id: 'prod4',
    name: 'SAT Math Prep Course Access',
    description: 'Full online course with video lessons and practice tests for SAT Math.',
    price: '$49.00',
    numericPrice: 49.00,
    imageUrl: 'https://picsum.photos/seed/satmathcourse/400/300',
    category: 'Maths',
    isFree: false,
  },
  {
    id: 'prod5',
    name: 'University Physics Problem Set Collection',
    description: 'A curated collection of advanced physics problems for university students.',
    price: '$35.00',
    numericPrice: 35.00,
    imageUrl: 'https://picsum.photos/seed/uniphysics/400/300',
    category: 'Physics',
    isFree: false,
  }
];

export const freeResourcesData: Product[] = [
  {
    id: 'free1',
    name: 'Calculus Basics Worksheet',
    description: 'An introductory worksheet covering differentiation and integration fundamentals.',
    imageUrl: 'https://picsum.photos/seed/calculusfree/400/300',
    category: 'Maths',
    isFree: true,
  },
  {
    id: 'free2',
    name: 'Newton\'s Laws Explained',
    description: 'A concise summary of Newton\'s Laws of Motion with examples.',
    imageUrl: 'https://picsum.photos/seed/newtonfree/400/300',
    category: 'Physics',
    isFree: true,
  },
  {
    id: 'free3',
    name: 'Effective Study Techniques PDF',
    description: 'Tips and strategies for maximizing your learning efficiency.',
    imageUrl: 'https://picsum.photos/seed/studyfree/400/300',
    category: 'General',
    isFree: true,
  },
];
