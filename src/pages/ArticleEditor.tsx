
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; 
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Eye, Upload, Bold, Italic, Underline, List, ListOrdered, Quote, Link, Image, FileText, Type, ChevronDown } from "lucide-react";
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
  
  // Text formatting helpers
  const insertFormat = (format: string) => {
    const contentField = form.getValues("content");
    const textArea = document.getElementById("content") as HTMLTextAreaElement;
    
    if (!textArea) return;
    
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = contentField.substring(start, end);
    let formattedText = "";
    
    switch(format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        break;
      case "h1":
        formattedText = `\n# ${selectedText}\n`;
        break;
      case "h2":
        formattedText = `\n## ${selectedText}\n`;
        break;
      case "h3":
        formattedText = `\n### ${selectedText}\n`;
        break;
      case "ul":
        formattedText = `\n- ${selectedText}\n`;
        break;
      case "ol":
        formattedText = `\n1. ${selectedText}\n`;
        break;
      case "quote":
        formattedText = `\n> ${selectedText}\n`;
        break;
      case "link":
        formattedText = `[${selectedText}](url)`;
        break;
      case "image":
        formattedText = `![${selectedText || "Image description"}](image-url)`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = contentField.substring(0, start) + formattedText + contentField.substring(end);
    form.setValue("content", newContent);
    
    // Reset focus and selection
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  };
  
  const handleSaveDraft = () => {
    const articleData = form.getValues();
    // In a real implementation, save to localStorage or API
    console.log("Saving draft:", articleData);
    toast({
      title: "Draft saved",
      description: "Your article has been saved as a draft.",
    });
  };
  
  const handlePublish = (data: ArticleFormValues) => {
    // In a real implementation, publish to API
    console.log("Publishing article:", data);
    toast({
      title: "Article published",
      description: "Your article has been published successfully.",
    });
    navigate("/dashboard");
  };
  
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Format text for preview display
  const formatContentForPreview = (content: string) => {
    if (!content) return "";
    
    // Basic markdown-like formatting
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/__(.*?)__/g, '<u>$1</u>') // Underline
      .replace(/# (.*?)\n/g, '<h1>$1</h1>\n') // H1
      .replace(/## (.*?)\n/g, '<h2>$1</h2>\n') // H2
      .replace(/### (.*?)\n/g, '<h3>$1</h3>\n') // H3
      .replace(/> (.*?)\n/g, '<blockquote>$1</blockquote>\n') // Blockquote
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // Links
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />') // Images
      .replace(/- (.*?)\n/g, '<li>$1</li>\n') // List items
      .replace(/(\d+)\. (.*?)\n/g, '<li>$2</li>\n'); // Ordered list items
    
    // Convert new lines to paragraphs
    formatted = formatted.split('\n\n')
      .map(para => para ? `<p>${para}</p>` : '')
      .join('');
    
    return formatted;
  };
  
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
                    __html: formatContentForPreview(form.getValues("content")) 
                  }} 
                  className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2"
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
                      {/* Rich Text Editor Toolbar */}
                      <div className="bg-gray-50 p-2 rounded-md border border-gray-200 flex flex-wrap gap-1">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => insertFormat("bold")}
                        >
                          <Bold size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("italic")}
                        >
                          <Italic size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("underline")}
                        >
                          <Underline size={16} />
                        </Button>
                        
                        <div className="h-6 w-px bg-gray-300 mx-1"></div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <Type size={16} />
                              <span className="text-xs">Headings</span>
                              <ChevronDown size={12} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => insertFormat("h1")}>
                              <span className="text-xl font-bold">Heading 1</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => insertFormat("h2")}>
                              <span className="text-lg font-bold">Heading 2</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => insertFormat("h3")}>
                              <span className="text-md font-bold">Heading 3</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("ul")}
                        >
                          <List size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("ol")}
                        >
                          <ListOrdered size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("quote")}
                        >
                          <Quote size={16} />
                        </Button>
                        
                        <div className="h-6 w-px bg-gray-300 mx-1"></div>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("link")}
                        >
                          <Link size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => insertFormat("image")}
                        >
                          <Image size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            // Open file upload dialog
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              // In a real app, upload the file to a server
                              // and get URL, then insert it
                              toast({
                                title: "File upload",
                                description: "File upload would be processed here in a real implementation.",
                              });
                            };
                            input.click();
                          }}
                        >
                          <FileText size={16} />
                        </Button>
                      </div>
                      
                      {/* Main Content */}
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                id="content"
                                placeholder="Write your article content here..." 
                                className="font-serif text-base min-h-[400px] p-4 leading-relaxed"
                                fullHeight
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The first letter will be automatically styled as a drop cap in the published article.
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
