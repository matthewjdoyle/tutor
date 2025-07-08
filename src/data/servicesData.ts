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
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 'ks3',
        name: 'KS3 (Years 7-9)',
        subjects: ['Maths', 'Sciences'],
        description: 'Build strong foundations in maths and sciences for ages 11-14.',
        imageUrl: 'ks3-rocket.svg'
      },
      {
        id: 'gcse',
        name: 'GCSE (Years 10-11)',
        subjects: ['Maths', 'Physics', 'Chemistry', 'Computing'],
        examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
        description: 'Master GCSE subjects with expert guidance and exam technique.',
        imageUrl: 'https://images.unsplash.com/photo-1631259352434-03735f12e3e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 'a-level',
        name: 'A-Level (Years 12-13)',
        subjects: ['Maths', 'Further Maths', 'Physics', 'Computer Science'],
        examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
        description: 'Excel in A-Level studies with advanced problem-solving skills.',
        imageUrl: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
        imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/009/269/011/small/abstract-blue-dynamic-flowing-lines-light-design-sound-wave-background-illustration-of-music-technology-concept-vector.jpg'
      },
      {
        id: 'ib-entrance',
        name: 'IB School Entrance',
        subjects: ['Maths', 'Physics', 'Sciences'],
        description: 'Specialized preparation for International Baccalaureate school admissions.',
        imageUrl: 'data:image/jpeg;base64,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'
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
        imageUrl: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
