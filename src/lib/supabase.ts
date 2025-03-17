
import { createClient } from "@supabase/supabase-js";
import { supabase as supabaseClient } from "@/integrations/supabase/client";

// These environment variables should be set in your Vercel project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Use the supabase client from the integrations folder
export const supabase = supabaseClient;

// Types for our database tables
export interface Article {
  id: number;
  created_at: string;
  title: string;
  subtitle?: string;
  content: string;
  pullQuote?: string;
  author: string;
  date: string;
  category: string;
  featuredImage?: string;
  imageCaption?: string;
  tags?: string;
  status: 'draft' | 'published';
  seoDescription?: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
}
