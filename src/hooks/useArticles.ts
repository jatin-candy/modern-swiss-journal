
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, Article } from "../lib/supabase";

// Helper function to transform database response to Article interface
const mapDbResponseToArticle = (data: any): Article => {
  return {
    id: data.id,
    created_at: data.created_at,
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    pullQuote: data.pullquote,
    author: data.author,
    date: data.date,
    category: data.category,
    featuredImage: data.featuredimage,
    imageCaption: data.imagecaption,
    tags: data.tags,
    status: data.status,
    seoDescription: data.seodescription,
    slug: data.slug
  };
};

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
      
      if (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
      
      console.log("Fetched published articles:", data);
      return data ? data.map(mapDbResponseToArticle) : [];
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
      
      if (error) {
        console.error("Error fetching article by slug:", error);
        throw error;
      }
      
      console.log("Fetched article by slug:", data);
      return data ? mapDbResponseToArticle(data) : null;
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
      
      if (error) {
        console.error("Error fetching user articles:", error);
        throw error;
      }
      
      console.log("Fetched user articles:", data);
      return data ? data.map(mapDbResponseToArticle) : [];
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: Omit<Article, "id" | "created_at">): Promise<Article> => {
      const slug = slugify(article.title);
      
      // Transform article data to match database column names
      const dbArticle = {
        title: article.title,
        subtitle: article.subtitle,
        content: article.content,
        pullquote: article.pullQuote,
        author: article.author,
        date: article.date,
        category: article.category,
        featuredimage: article.featuredImage,
        imagecaption: article.imageCaption,
        tags: article.tags,
        status: article.status,
        seodescription: article.seoDescription,
        slug
      };
      
      console.log("Creating article with data:", dbArticle);
      
      const { data, error } = await supabase
        .from("articles")
        .insert([dbArticle])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating article:", error);
        throw error;
      }
      
      console.log("Created article:", data);
      return mapDbResponseToArticle(data);
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
    mutationFn: async (article: Partial<Article> & { id?: number }): Promise<Article> => {
      // Check if this is a new article (id === undefined or id === 0)
      const isNewArticle = !article.id || article.id === 0;
      
      // If title is updated, update slug too
      let slug = article.slug;
      if (article.title) {
        slug = slugify(article.title);
      }
      
      // Transform article data to match database column names
      const dbArticle: any = {};
      if (article.title) dbArticle.title = article.title;
      if (article.subtitle !== undefined) dbArticle.subtitle = article.subtitle;
      if (article.content) dbArticle.content = article.content;
      if (article.pullQuote !== undefined) dbArticle.pullquote = article.pullQuote;
      if (article.author) dbArticle.author = article.author;
      if (article.date !== undefined) dbArticle.date = article.date;
      if (article.category) dbArticle.category = article.category;
      if (article.featuredImage !== undefined) dbArticle.featuredimage = article.featuredImage;
      if (article.imageCaption !== undefined) dbArticle.imagecaption = article.imageCaption;
      if (article.tags !== undefined) dbArticle.tags = article.tags;
      if (article.status) dbArticle.status = article.status;
      if (article.seoDescription !== undefined) dbArticle.seodescription = article.seoDescription;
      if (slug) dbArticle.slug = slug;
      
      // For new articles, use insert instead of update
      if (isNewArticle) {
        console.log("Creating new article with data:", dbArticle);
        
        const { data, error } = await supabase
          .from("articles")
          .insert([dbArticle])
          .select()
          .single();
        
        if (error) {
          console.error("Error creating article:", error);
          throw error;
        }
        
        console.log("Created article:", data);
        return mapDbResponseToArticle(data);
      } else {
        // For existing articles, use update
        console.log("Updating article with ID:", article.id, "and data:", dbArticle);
        
        const { data, error } = await supabase
          .from("articles")
          .update(dbArticle)
          .eq("id", article.id)
          .select()
          .single();
        
        if (error) {
          console.error("Error updating article:", error);
          throw error;
        }
        
        console.log("Updated article:", data);
        return mapDbResponseToArticle(data);
      }
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
