export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  cover_image_url: string;
};
