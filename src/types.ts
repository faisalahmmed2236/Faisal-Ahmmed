export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  image: string;
  resumeUrl?: string;
  typewriterWords?: string[];
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    facebook?: string;
  };
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: {
    engagementScore: number;
    sparklineData: { time: string; value: number }[];
  };
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  iconName: string; // Refers to a lucide-react icon
}

export interface AchievementData {
  id: string;
  title: string;
  year: string;
  description: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  feedback: string;
  image: string;
}

export interface SkillData {
  category: string;
  items: {
    name: string;
    level: number;
    icon?: string;
  }[];
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  techStack?: string[];
}

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface PortfolioData {
  profile: ProfileData;
  projects: ProjectData[];
  services: ServiceData[];
  achievements: AchievementData[];
  testimonials: TestimonialData[];
  skills?: SkillData[];
  experiences?: ExperienceData[];
  education?: EducationData[];
  ui?: Record<string, string>;
}
