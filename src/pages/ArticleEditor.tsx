
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";

const categories = [
  "Design",
  "Typography",
  "Technology",
  "Politics",
  "Culture",
  "Business",
  "Science",
];

// Mock article for edit mode
const mockArticle = {
  id: 1,
  title: "The Renaissance of Swiss Design in Digital Interfaces",
  subtitle: "How minimalist principles are shaping the future of user experience",
  content: "In the ever-evolving landscape of digital design, we're witnessing a remarkable renaissance of Swiss Design principles. This resurgence isn't merely aesthetic nostalgia; it's a functional response to our increasingly complex digital environments...",
  author: "Jatin Dangi",
  date: "2023-10-15",
  category: "Design",
  tags: "design, swiss, minimalism, digital",
  status: "published",
  seoDescription: "Explore how Swiss design principles are making a comeback in modern digital interfaces and improving user experiences through minimalism and clarity.",
};

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewArticle = id === "new";
  
  // Article state
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    content: "",
    author: "Jatin Dangi", // Default author
    date: new Date().toISOString().split("T")[0], // Today's date
    category: "Design",
    tags: "",
    status: "draft",
    seoDescription: "",
  });
  
  // Preview mode toggle
  const [previewMode, setPreviewMode] = useState(false);
  
  useEffect(() => {
    // If editing existing article, load article data
    if (!isNewArticle) {
      // In a real implementation, fetch from localStorage or API
      // For now, use mock data
      setArticle(mockArticle);
    }
  }, [isNewArticle]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setArticle(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveDraft = () => {
    // Save article as draft
    // In a real implementation, save to localStorage or API
    toast({
      title: "Draft saved",
      description: "Your article has been saved as a draft.",
    });
  };
  
  const handlePublish = () => {
    // Publish article
    // In a real implementation, save to localStorage or API
    toast({
      title: "Article published",
      description: "Your article has been published successfully.",
    });
    navigate("/dashboard");
  };
  
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };
  
  return (
    <div className="min-h-screen bg-blog-background">
      {/* Editor Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="grid-container flex items-center justify-between py-4">
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
              onClick={handlePublish}
              className="flex items-center gap-2 bg-blog-accent hover:bg-red-700"
            >
              <Upload size={16} />
              Publish
            </Button>
          </div>
        </div>
      </header>
      
      <main className="grid-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {previewMode ? (
            <div className="article-preview">
              {/* Article Preview */}
              <div className="mb-12 text-center">
                <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">
                  {article.title || "Untitled Article"}
                </h1>
                
                {article.subtitle && (
                  <p className="font-serif text-gray-600 text-xl md:text-2xl italic mb-6">
                    {article.subtitle}
                  </p>
                )}
                
                <div className="flex items-center justify-center space-x-4 text-gray-600">
                  <span className="font-serif">By {article.author}</span>
                  <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="font-serif">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              
              {/* Article content */}
              <div className="prose prose-lg max-w-none font-serif">
                {article.content ? (
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
                    {article.content}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No content added yet...</p>
                )}
              </div>
            </div>
          ) : (
            <div className="editor-form space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleInputChange}
                    placeholder="Enter article title"
                    className="font-serif text-xl"
                  />
                </div>
                
                {/* Subtitle */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="subtitle" className="block text-sm font-medium">
                    Subtitle
                  </label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={article.subtitle}
                    onChange={handleInputChange}
                    placeholder="Enter article subtitle"
                    className="font-serif text-lg"
                  />
                </div>
                
                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={article.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <label htmlFor="tags" className="block text-sm font-medium">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    value={article.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                
                {/* Content */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="content" className="block text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    name="content"
                    value={article.content}
                    onChange={handleInputChange}
                    placeholder="Write your article content here..."
                    className="font-serif min-h-[400px]"
                  />
                  <p className="text-xs text-gray-500">
                    The first letter will be automatically styled as a drop cap in the published article.
                  </p>
                </div>
                
                {/* SEO Description */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="seoDescription" className="block text-sm font-medium">
                    SEO Description
                  </label>
                  <Textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={article.seoDescription}
                    onChange={handleInputChange}
                    placeholder="Enter SEO description for better search engine visibility"
                    className="h-24"
                  />
                  <p className="text-xs text-gray-500">
                    Recommended: 150-160 characters for optimal SEO performance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ArticleEditor;
