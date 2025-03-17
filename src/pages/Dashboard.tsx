
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle, LogOut } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading articles from storage
    const timer = setTimeout(() => {
      // In a real implementation, we'd fetch articles from localStorage or an API
      // For now, initialize with an empty array instead of mock data
      setArticles([]);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNewArticle = () => {
    // Navigate to article editor with new article flag
    navigate("/editor/new");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-blog-background pt-0">
      {/* Dashboard Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="grid-container flex items-center justify-between py-4">
          <h1 className="font-serif font-bold text-2xl">Your Dashboard</h1>
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
            // Table would display here if articles existed
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
                {/* Articles would be displayed here - left empty as per requirement */}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
