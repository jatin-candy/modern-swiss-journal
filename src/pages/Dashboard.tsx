
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle, Edit, Eye, Trash2, LogOut } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Mock article data for now - will be replaced with actual data store
const initialArticles = [
  {
    id: 1,
    title: "The Renaissance of Swiss Design in Digital Interfaces",
    status: "published",
    date: "2023-10-15",
    category: "Design",
    slug: "renaissance-swiss-design",
  },
  {
    id: 2,
    title: "The Mathematics of Perfect Typography",
    status: "draft",
    date: "2023-10-12",
    category: "Typography",
    slug: "mathematics-perfect-typography",
  },
];

const Dashboard = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading articles from storage
    const timer = setTimeout(() => {
      // In a real implementation, we'd fetch articles from localStorage or an API
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNewArticle = () => {
    // Navigate to article editor with new article flag
    navigate("/editor/new");
  };

  const handleEditArticle = (id: number) => {
    // Navigate to article editor with article ID
    navigate(`/editor/${id}`);
  };

  const handleViewArticle = (slug: string) => {
    // Open the article in a new tab
    window.open(`/article/${slug}`, "_blank");
  };

  const handleDeleteArticle = (id: number) => {
    // Mock deletion - in real app would delete from storage
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "Article deleted",
      description: "The article has been removed.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-blog-background">
      {/* Dashboard Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="grid-container flex items-center justify-between py-4">
          <h1 className="font-serif font-bold text-2xl">Jatin's Journal Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
            <Button 
              onClick={handleNewArticle}
              className="flex items-center gap-2 bg-blog-accent hover:bg-red-700"
            >
              <PlusCircle size={16} />
              New Article
            </Button>
          </div>
        </div>
      </header>
      
      <main className="grid-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-serif font-bold text-xl mb-6">Your Articles</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-t-2 border-b-2 border-blog-accent rounded-full animate-spin"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-gray-500 mb-4">
                You haven't created any articles yet.
              </p>
              <Button 
                onClick={handleNewArticle}
                className="bg-blog-accent hover:bg-red-700"
              >
                Create Your First Article
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          article.status === "published" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {article.status === "published" && (
                          <Button
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewArticle(article.slug)}
                            title="View"
                          >
                            <Eye size={16} />
                          </Button>
                        )}
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditArticle(article.id)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteArticle(article.id)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
