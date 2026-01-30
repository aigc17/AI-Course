export interface Chapter {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: number;
  rating: number;
  students: number;
  category: 'LLM' | 'Computer Vision' | 'Generative AI' | 'Data Science';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  chapters: Chapter[];
}

export type ViewState = 'HOME' | 'CATALOG' | 'PLAYER';
