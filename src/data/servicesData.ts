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
    region: 'UK',
    levels: [
      {
        id: '11-plus',
        name: '11+',
        subjects: ['Maths'],
        description: 'Prepare for selective school entrance exams with focused maths tutoring.',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ks3',
        name: 'KS3',
        subjects: ['Maths', 'Sciences'],
        description: 'Build strong foundations in maths and sciences for ages 11-14.',
        imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'gcse',
        name: 'GCSE',
        subjects: ['Maths', 'Physics', 'Chemistry', 'Computing'],
        examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
        description: 'Master GCSE subjects with expert guidance and exam technique.',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'a-level',
        name: 'A-Level',
        subjects: ['Maths', 'Physics', 'Computer Science'],
        examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
        description: 'Excel in A-Level studies with advanced problem-solving skills.',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop&crop=center'
      }
    ]
  },
  {
    region: 'UK/EU',
    levels: [
      {
        id: 'igcse',
        name: 'iGCSE',
        subjects: ['Maths', 'Physics', 'Chemistry'],
        description: 'International GCSE preparation for global curriculum students.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ib-entrance',
        name: 'IB School Entrance Exams',
        subjects: ['Maths', 'Physics', 'Sciences'],
        description: 'Specialized preparation for International Baccalaureate school admissions.',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center'
      }
    ]
  },
  {
    region: 'USA/World',
    levels: [
      {
        id: 'sat-prep',
        name: 'Math SAT Preparation',
        subjects: [],
        description: 'Boost your SAT math scores with targeted practice and strategies.',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-precalc',
        name: 'AP Precalculus',
        subjects: [],
        description: 'Master advanced algebra and trigonometry for college readiness.',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-calc-ab',
        name: 'AP Calculus AB',
        subjects: [],
        description: 'Learn differential and integral calculus fundamentals.',
        imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-calc-bc',
        name: 'AP Calculus BC',
        subjects: [],
        description: 'Advanced calculus including series, parametric, and polar functions.',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-stats',
        name: 'AP Statistics',
        subjects: [],
        description: 'Explore data analysis, probability, and statistical inference.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-physics-1-2',
        name: 'AP Physics 1 & 2',
        subjects: [],
        description: 'Algebra-based physics covering mechanics, waves, and electricity.',
        imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-physics-c-mech',
        name: 'AP Physics C: Mechanics',
        subjects: [],
        description: 'Calculus-based mechanics for advanced physics students.',
        imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop&crop=center'
      },
      {
        id: 'ap-physics-c-em',
        name: 'AP Physics C: Electricity and Magnetism',
        subjects: [],
        description: 'Advanced electromagnetic theory using calculus methods.',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center'
      }
    ]
  }
];
