export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  architecture?: {
    components: string[];
    workflow: string[];
  };
  metrics?: { label: string; value: string }[];
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    description?: string;
    tag?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  period: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  details?: string[];
  isCurrent?: boolean;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  description: string;
  skillsCovered: string[];
}
