import { Product } from '../types';

export const storeProductsData: Product[] = [
  // {
  //   id: 'prod1',
  //   name: 'A-Level Maths Revision Guide',
  //   description: 'Comprehensive notes and practice questions for A-Level Maths.',
  //   price: '£19.99',
  //   numericPrice: 19.99,
  //   imageUrl: 'https://picsum.photos/seed/mathguide/400/300',
  //   category: 'Maths',
  //   isFree: false,
  // },
  // {
  //   id: 'prod2',
  //   name: 'AP Physics C Mechanics Workbook',
  //   description: 'Challenging problems with detailed solutions for AP Physics C: Mechanics.',
  //   price: '$24.99',
  //   numericPrice: 24.99,
  //   imageUrl: 'https://picsum.photos/seed/physicsprod/400/300',
  //   category: 'Physics',
  //   isFree: false,
  // },
  // {
  //   id: 'prod3',
  //   name: 'GCSE Statistics Cheat Sheet Pack',
  //   description: 'Key formulas and concepts for GCSE Statistics success.',
  //   price: '£7.50',
  //   numericPrice: 7.50,
  //   imageUrl: 'https://picsum.photos/seed/statspack/400/300',
  //   category: 'Maths',
  //   isFree: false,
  // },
  // {
  //   id: 'prod4',
  //   name: 'SAT Math Prep Course Access',
  //   description: 'Full online course with video lessons and practice tests for SAT Math.',
  //   price: '$49.00',
  //   numericPrice: 49.00,
  //   imageUrl: 'https://picsum.photos/seed/satmathcourse/400/300',
  //   category: 'Maths',
  //   isFree: false,
  // },
  // {
  //   id: 'prod5',
  //   name: 'University Physics Problem Set Collection',
  //   description: 'A curated collection of advanced physics problems for university students.',
  //   price: '$35.00',
  //   numericPrice: 35.00,
  //   imageUrl: 'https://picsum.photos/seed/uniphysics/400/300',
  //   category: 'Physics',
  //   isFree: false,
  // }
];

export const freeResourcesData: Product[] = [
  {
    id: 'free1',
    name: 'AP Calculus AB Cheat Sheet',
    description: 'Comprehensive reference sheet covering all essential formulas and concepts for AP Calculus AB.',
    imageUrl: 'learningResources/APCalculusAB_CheatSheet.png',
    pdfUrl: 'learningResources/APCalculusAB_CheatSheet.pdf',
    category: 'Maths',
    isFree: true,
  },
  {
    id: 'free2',
    name: 'AP Calculus BC Cheat Sheet',
    description: 'Advanced reference sheet for AP Calculus BC including series, parametric equations, and polar coordinates.',
    imageUrl: 'learningResources/APCalculusBC_CheatSheet_Preview.png',
    pdfUrl: 'learningResources/APCalculusBC_CheatSheet.pdf',
    category: 'Maths',
    isFree: true,
  },
  {
    id: 'free3',
    name: 'SAT Math Cheat Sheet',
    description: 'Essential formulas and quick reference guide for SAT Math sections covering algebra, geometry, and data analysis.',
    imageUrl: 'learningResources/SAT_Math_CheatSheet_Preview.png',
    pdfUrl: 'learningResources/SAT_Math_CheatSheet.pdf',
    category: 'Maths',
    isFree: true,
  },
];
