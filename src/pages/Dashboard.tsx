
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2, Eye, Trash2, LogOut } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  status: "draft" | "published";
  lastModified: string;
}

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    // Load articles from localStorage
    const savedArticles = localStorage.getItem("cms_articles");
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);
  
  const handleNewArticle = () => {
    navigate("/editor/new");
  };
  
  const handleEditArticle = (id: string) => {
    navigate(`/editor/${id}`);
  };
  
  const handleViewArticle = (id: string) => {
    navigate(`/article/${id}`);
  };
  
  const handleDeleteArticle = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem("cms_articles", JSON.stringify(updatedArticles));
    }
  };

  return (
    <div className="min-h-screen bg-blog-background pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif font-bold text-3xl">Content Dashboard</h1>
            <div className="flex gap-4">
              <Button onClick={handleNewArticle} className="flex items-center gap-2 bg-blog-accent hover:bg-red-700 text-white">
                <PlusCircle size={18} /> New Article
              </Button>
              <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                <LogOut size={18} /> Sign Out
              </Button>
            </div>
          </div>

          <div className="mb-10">
            <SectionTitle title="Your Articles" withLine />
            
            {articles.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="font-serif text-gray-600 mb-4">You haven't created any articles yet.</p>
                <Button onClick={handleNewArticle} variant="outline" className="flex items-center gap-2">
                  <PlusCircle size={18} /> Create Your First Article
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-sans text-sm font-bold uppercase tracking-wider">Title</th>
                      <th className="px-4 py-3 text-left font-sans text-sm font-bold uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left font-sans text-sm font-bold uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left font-sans text-sm font-bold uppercase tracking-wider">Last Modified</th>
                      <th className="px-4 py-3 text-right font-sans text-sm font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4 font-serif">{article.title}</td>
                        <td className="px-4 py-4">
                          <span className={`font-sans text-xs px-2 py-1 rounded-full ${
                            article.status === "published" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {article.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-sans text-sm text-gray-600">{article.date}</td>
                        <td className="px-4 py-4 font-sans text-sm text-gray-600">{article.lastModified}</td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditArticle(article.id)}
                              className="text-gray-600 hover:text-blog-link"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewArticle(article.id)}
                              className="text-gray-600 hover:text-blog-link"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-gray-600 hover:text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
