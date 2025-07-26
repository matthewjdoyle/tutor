export interface Product {
  id: string;
  name: string;
  description: string;
  price?: string; // Optional for free resources
  numericPrice?: number; // Numeric price for calculations
  imageUrl: string;
  category: 'Maths' | 'Physics' | 'General';
  isFree: boolean;
  pdfUrl?: string; // Optional PDF URL for free downloadable resources
}

export interface Service {
  id:string;
  title: string;
  description: string;
  icon: React.ElementType; // For SVG icon component
  targetSystem: 'UK' | 'USA' | 'Both';
}

export interface CourseLevel {
  id: string;
  name: string;
  subjects: string[];
  examBoards?: string[];
  description?: string; // For homepage carousel only
  imageUrl?: string; // For homepage carousel images
  subCourses?: {
    id: string;
    name: string;
    description?: string;
  }[];
}

export interface CourseSection {
  region: string;
  levels: CourseLevel[];
}

export interface NavLinkItem {
  path: string;
  label: string;
  icon?: React.ElementType;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ExternalLearningResource {
  id: string;
  name: string;
  url: string;
  audience: string;
  icon: React.ElementType | string;
}
