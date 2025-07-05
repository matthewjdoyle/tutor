import { Service, CourseSection } from '../types';
import { CalculatorIcon, BeakerIcon, AcademicCapIcon, CodeBracketIcon } from '../assets/icons';

export const servicesData: Service[] = [
  {
    id: 'maths-uk',
    title: 'Maths Tutoring (UK Curriculum)',
    description: 'Covering GCSE, A-Level Maths and Further Maths. Tailored to OCR, AQA, Edexcel exam boards.',
    icon: CalculatorIcon,
    targetSystem: 'UK',
  },
  {
    id: 'physics-uk',
    title: 'Physics Tutoring (UK Curriculum)',
    description: 'In-depth support for GCSE and A-Level Physics. Practical understanding and exam technique.',
    icon: BeakerIcon,
    targetSystem: 'UK',
  },
  {
    id: 'maths-usa',
    title: 'Maths Tutoring (USA System)',
    description: 'Guidance for SAT, ACT, AP Calculus, AP Statistics and High School Math courses.',
    icon: CalculatorIcon,
    targetSystem: 'USA',
  },
  {
    id: 'physics-usa',
    title: 'Physics Tutoring (USA System)',
    description: 'Support for AP Physics 1, 2, C: Mechanics, C: E&M, and High School Physics.',
    icon: BeakerIcon,
    targetSystem: 'USA',
  },
  {
    id: 'coding-python',
    title: 'Python Programming Tutoring',
    description: 'Learn Python from scratch or enhance your skills. Covers fundamentals, data structures, algorithms, and project-based learning. Suitable for beginners and intermediate learners.',
    icon: CodeBracketIcon,
    targetSystem: 'Both',
  },
  {
    id: 'coding-js',
    title: 'JavaScript Web Development Tutoring',
    description: 'Master JavaScript for front-end and back-end development. Explore ES6+, React, Node.js, and build interactive web applications.',
    icon: CodeBracketIcon,
    targetSystem: 'Both',
  },
  {
    id: 'cs-alevel',
    title: 'A-Level Computer Science Tutoring',
    description: 'Comprehensive support for A-Level Computer Science (UK curriculum). Covering theory, programming paradigms, and exam preparation.',
    icon: AcademicCapIcon, 
    targetSystem: 'UK',
  },
];

export const courseSections: CourseSection[] = [
  {
    region: 'UK Curriculum',
    levels: [
      {
        id: '11-plus',
        name: '11+ Entrance Exams',
        subjects: ['Maths'],
        description: 'Prepare for selective school entrance exams with focused maths tutoring.',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ks3',
        name: 'KS3 (Years 7-9)',
        subjects: ['Maths', 'Sciences'],
        description: 'Build strong foundations in maths and sciences for ages 11-14.',
        imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'gcse',
        name: 'GCSE (Years 10-11)',
        subjects: ['Maths', 'Physics', 'Chemistry', 'Computing'],
        examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
        description: 'Master GCSE subjects with expert guidance and exam technique.',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'a-level',
        name: 'A-Level (Years 12-13)',
        subjects: ['Maths', 'Further Maths', 'Physics', 'Computer Science'],
        examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
        description: 'Excel in A-Level studies with advanced problem-solving skills.',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop&crop=center'
      }
    ]
  },
  {
    region: 'International Curricula',
    levels: [
      {
        id: 'igcse',
        name: 'IGCSE (Ages 14-16)',
        subjects: ['Maths', 'Physics', 'Chemistry'],
        examBoards: ['Cambridge', 'Edexcel'],
        description: 'International GCSE preparation for global curriculum students.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ib-entrance',
        name: 'IB School Entrance',
        subjects: ['Maths', 'Physics', 'Sciences'],
        description: 'Specialized preparation for International Baccalaureate school admissions.',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center'
      }
    ]
  },
  {
    region: 'US Curriculum',
    levels: [
      {
        id: 'sat-prep',
        name: 'SAT Math Prep',
        subjects: ['Math'],
        description: 'Boost your SAT math scores with targeted practice and strategies.',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-mathematics',
        name: 'AP Mathematics',
        subjects: ['Math'],
        description: 'Comprehensive support for all AP Math courses from precalculus to advanced calculus.',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center',
        subCourses: [
          {
            id: 'ap-precalc',
            name: 'AP Precalculus',
            description: 'Master advanced algebra and trigonometry for college readiness.'
          },
          {
            id: 'ap-calc-ab',
            name: 'AP Calculus AB',
            description: 'Learn differential and integral calculus fundamentals.'
          },
          {
            id: 'ap-calc-bc',
            name: 'AP Calculus BC',
            description: 'Advanced calculus including series, parametric, and polar functions.'
          },
          {
            id: 'ap-stats',
            name: 'AP Statistics',
            description: 'Explore data analysis, probability, and statistical inference.'
          }
        ]
      },
      {
        id: 'ap-physics',
        name: 'AP Physics',
        subjects: ['Physics'],
        description: 'Expert tutoring for all AP Physics courses, from algebra-based to calculus-based.',
        imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop&crop=center',
        subCourses: [
          {
            id: 'ap-physics-1-2',
            name: 'AP Physics 1 & 2',
            description: 'Algebra-based physics covering mechanics, waves, and electricity.'
          },
          {
            id: 'ap-physics-c-mech',
            name: 'AP Physics C: Mechanics',
            description: 'Calculus-based mechanics for advanced physics students.'
          },
          {
            id: 'ap-physics-c-em',
            name: 'AP Physics C: E&M',
            description: 'Advanced electromagnetic theory using calculus methods.'
          }
        ]
      }
    ]
  }
];
