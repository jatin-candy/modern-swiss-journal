
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
  created_at: string | null;
  title: string;
  subtitle?: string | null;
  content: string;
  pullQuote?: string | null;
  author: string;
  date: string | null;
  category: string;
  featuredImage?: string | null;
  imageCaption?: string | null;
  tags?: string | null;
  status: string;  // Changed from '"draft" | "published"' to string to match DB
  seoDescription?: string | null;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
}
