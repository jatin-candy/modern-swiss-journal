
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle, LogOut, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useGetUserArticles } from "@/hooks/useArticles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const { data: articles = [], isLoading, isError } = useGetUserArticles();
  const [deleteArticleId, setDeleteArticleId] = useState<number | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNewArticle = () => {
    navigate("/editor/new");
  };

  const handleEditArticle = (id: number) => {
    navigate(`/editor/${id}`);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  const handleDeleteClick = (id: number) => {
    setDeleteArticleId(id);
  };
  
  const confirmDelete = async () => {
    if (!deleteArticleId) return;
    
    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", deleteArticleId);
        
      if (error) throw error;
      
      toast({
        title: "Article deleted",
        description: "The article has been deleted successfully.",
      });
      
      // Refresh the article list (this will be handled by React Query)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteArticleId(null);
    }
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
          ) : isError ? (
            <div className="text-center py-12">
              <p className="font-serif text-gray-500 mb-4">
                Error loading your articles. Please try again.
              </p>
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditArticle(article.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteClick(article.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
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
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteArticleId !== null} onOpenChange={() => setDeleteArticleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
