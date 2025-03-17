
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, Article } from "../lib/supabase";

export function useGetArticles(category?: string) {
  return useQuery({
    queryKey: ["articles", category],
    queryFn: async (): Promise<Article[]> => {
      let query = supabase.from("articles").select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      
      if (category) {
        query = query.eq("category", category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useGetArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useGetUserArticles() {
  return useQuery({
    queryKey: ["userArticles"],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: Omit<Article, "id" | "created_at">): Promise<Article> => {
      const slug = slugify(article.title);
      
      const { data, error } = await supabase
        .from("articles")
        .insert([{ ...article, slug }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["userArticles"] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: Partial<Article> & { id: number }): Promise<Article> => {
      // If title is updated, update slug too
      if (article.title) {
        article.slug = slugify(article.title);
      }
      
      const { data, error } = await supabase
        .from("articles")
        .update(article)
        .eq("id", article.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["userArticles"] });
      queryClient.invalidateQueries({ queryKey: ["article", data.slug] });
    },
  });
}

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
