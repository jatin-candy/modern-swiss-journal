import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateArticle, useUpdateArticle, useGetArticleBySlug } from "@/hooks/useArticles";
import type { Article } from "@/lib/supabase";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { QuillEditor } from "@/components/ui/QuillEditor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categories = [
  "Design",
  "Typography",
  "Technology",
  "Politics",
  "Culture",
  "Business",
  "Science",
];

// Form validation schema
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subtitle: z.string().optional(),
  content: z.string().min(50, "Content must be at least 50 characters"),
  pullQuote: z.string().optional(),
  author: z.string().min(2, "Author name is required"),
  date: z.string(),
  category: z.string(),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  imageCaption: z.string().optional(),
  tags: z.string().optional(),
  seoDescription: z.string().max(160, "SEO description should be under 160 characters").optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

// Mock article for edit mode
const mockArticle = {
  id: 1,
  title: "The Renaissance of Swiss Design in Digital Interfaces",
  subtitle: "How minimalist principles are shaping the future of user experience",
  content: "In the ever-evolving landscape of digital design, we're witnessing a remarkable renaissance of Swiss Design principles. This resurgence isn't merely aesthetic nostalgia; it's a functional response to our increasingly complex digital environments...",
  pullQuote: "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects.",
  author: "Jatin Dangi",
  date: "2023-10-15",
  category: "Design",
  featuredImage: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
  imageCaption: "Swiss design principles applied to a modern digital interface. Photo: Unsplash",
  tags: "design, swiss, minimalism, digital",
  status: "published",
  seoDescription: "Explore how Swiss design principles are making a comeback in modern digital interfaces and improving user experiences through minimalism and clarity.",
};

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewArticle = id === "new";
  
  // Editor sections
  const [activeSection, setActiveSection] = useState<"content" | "metadata">("content");
  // Preview mode toggle
  const [previewMode, setPreviewMode] = useState(false);
  
  // Setup form with validation
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      pullQuote: "",
      author: "Jatin Dangi", // Default author
      date: new Date().toISOString().split("T")[0], // Today's date
      category: "Design",
      featuredImage: "",
      imageCaption: "",
      tags: "",
      seoDescription: "",
    }
  });

  useEffect(() => {
    // If editing existing article, load article data
    if (!isNewArticle && id && id !== 'new') {
      // In a real implementation, fetch from API based on id
      // For now, use mock data
      form.reset({
        title: mockArticle.title,
        subtitle: mockArticle.subtitle,
        content: mockArticle.content,
        pullQuote: mockArticle.pullQuote,
        author: mockArticle.author,
        date: mockArticle.date,
        category: mockArticle.category,
        featuredImage: mockArticle.featuredImage,
        imageCaption: mockArticle.imageCaption,
        tags: mockArticle.tags,
        seoDescription: mockArticle.seoDescription,
      });
    }
  }, [isNewArticle, id, form]);
  
  // Text formatting is handled by Quill editor
  
  // Get mutation hooks
  const { mutateAsync: createArticle } = useCreateArticle();
  const { mutateAsync: updateArticle } = useUpdateArticle();
  const { data: existingArticle } = useGetArticleBySlug(id || '');

  useEffect(() => {
    // If editing existing article and we have data, load it
    if (!isNewArticle && existingArticle) {
      form.reset({
        title: existingArticle.title,
        subtitle: existingArticle.subtitle || "",
        content: existingArticle.content,
        pullQuote: existingArticle.pullQuote || "",
        author: existingArticle.author,
        date: existingArticle.date || new Date().toISOString().split("T")[0],
        category: existingArticle.category,
        featuredImage: existingArticle.featuredImage || "",
        imageCaption: existingArticle.imageCaption || "",
        tags: existingArticle.tags || "",
        seoDescription: existingArticle.seoDescription || "",
      });
    }
  }, [isNewArticle, existingArticle, form]);

  // Helper function to create URL-friendly slugs
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleSaveDraft = async () => {
    try {
      const formData = form.getValues();
      const article = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        status: "draft" as const,
        slug: createSlug(formData.title),
        // Optional fields
        subtitle: formData.subtitle || null,
        pullQuote: formData.pullQuote || null,
        date: formData.date || null,
        featuredImage: formData.featuredImage || null,
        imageCaption: formData.imageCaption || null,
        tags: formData.tags || null,
        seoDescription: formData.seoDescription || null,
      };

      if (isNewArticle) {
        await createArticle(article);
      } else {
        await updateArticle({ ...article, id: existingArticle?.id || 0 });
      }

      toast({
        title: "Draft saved",
        description: "Your article has been saved as a draft.",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handlePublish = async (formData: ArticleFormValues) => {
    try {
      const article = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        status: "published" as const,
        slug: createSlug(formData.title),
        // Optional fields
        subtitle: formData.subtitle || null,
        pullQuote: formData.pullQuote || null,
        date: formData.date || null,
        featuredImage: formData.featuredImage || null,
        imageCaption: formData.imageCaption || null,
        tags: formData.tags || null,
        seoDescription: formData.seoDescription || null,
      };

      if (isNewArticle) {
        await createArticle(article);
      } else {
        await updateArticle({ ...article, id: existingArticle?.id || 0 });
      }

      toast({
        title: "Article published",
        description: "Your article has been published successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error('Error publishing:', error);
      toast({
        title: "Error",
        description: "Failed to publish article. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Text formatting is now handled by Quill
  
  return (
    <div className="min-h-screen bg-blog-background">
      {/* Editor Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={togglePreviewMode}
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save Draft
            </Button>
            
            <Button
              onClick={form.handleSubmit(handlePublish)}
              className="flex items-center gap-2 bg-blog-accent hover:bg-red-700"
            >
              <Upload size={16} />
              Publish
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm">
          {previewMode ? (
            <div className="article-preview p-8">
              {/* Article Preview */}
              <div className="mb-12 text-center">
                {form.getValues("featuredImage") && (
                  <div className="mb-6">
                    <img 
                      src={form.getValues("featuredImage")} 
                      alt={form.getValues("title")} 
                      className="w-full h-[400px] object-cover object-center"
                    />
                    {form.getValues("imageCaption") && (
                      <p className="text-sm text-gray-500 italic mt-2 text-center">
                        {form.getValues("imageCaption")}
                      </p>
                    )}
                  </div>
                )}
                
                <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">
                  {form.getValues("title") || "Untitled Article"}
                </h1>
                
                {form.getValues("subtitle") && (
                  <p className="font-serif text-gray-600 text-xl md:text-2xl italic mb-6">
                    {form.getValues("subtitle")}
                  </p>
                )}
                
                <div className="flex items-center justify-center space-x-4 text-gray-600">
                  <span className="font-serif">By {form.getValues("author")}</span>
                  <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="font-serif">{new Date(form.getValues("date")).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              
              {/* Article content */}
              <div className="prose prose-lg max-w-none font-serif">
                <div 
                  dangerouslySetInnerHTML={{
                    __html: form.getValues("content")
                  }}
                  className="ql-editor first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2"
                />
                
                {form.getValues("pullQuote") && (
                  <blockquote className="border-l-4 border-gray-300 pl-4 my-8 italic text-xl md:text-2xl text-gray-700">
                    {form.getValues("pullQuote")}
                  </blockquote>
                )}
              </div>
            </div>
          ) : (
            <div className="editor-form p-6">
              <div className="mb-6 border-b border-gray-200">
                <div className="flex gap-4 mb-[-1px]">
                  <button
                    className={`py-2 px-4 font-medium ${
                      activeSection === "content" 
                        ? "border-b-2 border-blog-accent text-blog-accent" 
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveSection("content")}
                  >
                    Content
                  </button>
                  <button
                    className={`py-2 px-4 font-medium ${
                      activeSection === "metadata" 
                        ? "border-b-2 border-blog-accent text-blog-accent" 
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveSection("metadata")}
                  >
                    Metadata
                  </button>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePublish)} className="space-y-6">
                  {activeSection === "content" && (
                    <div className="space-y-6">
                      {/* Main Content */}
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <div className="min-h-[400px] border rounded-md">
                                <QuillEditor
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Use the toolbar above for formatting. The first letter will be automatically styled as a drop cap in the published article.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Pull Quote */}
                      <FormField
                        control={form.control}
                        name="pullQuote"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pull Quote</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Add a notable quote that will be highlighted in the article..." 
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This quote will be highlighted in the article.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {activeSection === "metadata" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Title */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter article title"
                                className="font-serif text-xl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Subtitle */}
                      <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter article subtitle"
                                className="font-serif"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Featured Image */}
                      <FormField
                        control={form.control}
                        name="featuredImage"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Featured Image URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the URL for your article's featured image.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Image Caption */}
                      <FormField
                        control={form.control}
                        name="imageCaption"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Image Caption</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Caption for the featured image" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Category */}
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Author */}
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                              <Input placeholder="Author name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Date */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Tags */}
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="design, technology, trends" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Separate tags with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* SEO Description */}
                      <FormField
                        control={form.control}
                        name="seoDescription"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>SEO Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter SEO description"
                                className="h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Recommended: 150-160 characters for optimal SEO performance.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </form>
              </Form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ArticleEditor;
