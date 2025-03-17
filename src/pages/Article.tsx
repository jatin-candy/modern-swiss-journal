
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleCard from '../components/ui/ArticleCard';
import { Share2, Bookmark, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { useGetArticleBySlug } from '../hooks/useArticles';

const Article = () => {
  const { slug } = useParams();
  const { data: article, isLoading, isError } = useGetArticleBySlug(slug || '');
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsShareVisible(true);
      } else {
        setIsShareVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fetch related articles once we have the article data
  useEffect(() => {
    if (article) {
      // In a real implementation, fetch related articles based on category or tags
      // For now, we'll just simulate this
      async function fetchRelated() {
        const { data } = await supabase
          .from("articles")
          .select("*")
          .neq("id", article.id)
          .eq("category", article.category)
          .eq("status", "published")
          .limit(3);
          
        setRelatedArticles(data || []);
      }
      
      fetchRelated();
    }
  }, [article]);

  if (isLoading) {
    return (
      <main className="pt-28 md:pt-36">
        <div className="grid-container flex justify-center items-center py-16">
          <div className="w-12 h-12 border-4 border-t-blog-accent rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }
  
  if (isError || !article) {
    return (
      <main className="pt-28 md:pt-36">
        <div className="grid-container text-center py-16">
          <h2 className="font-serif font-bold text-3xl mb-4">Article Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="text-blog-accent hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  // Split content into paragraphs for rendering
  const contentParagraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <main className="pt-28 md:pt-36">
      <article className="grid-container">
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="mb-3">
            <span className="font-sans text-sm uppercase tracking-wider text-blog-accent font-semibold">
              {article.category}
            </span>
          </div>
          
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">
            {article.title}
          </h1>
          
          {article.subtitle && (
            <p className="font-serif text-gray-600 text-xl md:text-2xl italic mb-6">
              {article.subtitle}
            </p>
          )}
          
          <div className="flex items-center justify-center space-x-4 text-gray-600 mb-6">
            <span className="font-serif">By {article.author}</span>
            <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
            <span className="font-serif">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
            <span className="font-serif">{Math.ceil(article.content.length / 1500)} min read</span>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button className="text-gray-600 hover:text-blog-link flex items-center">
              <Share2 size={18} className="mr-2" />
              <span className="font-sans text-sm">Share</span>
            </button>
            <button className="text-gray-600 hover:text-blog-link flex items-center">
              <Bookmark size={18} className="mr-2" />
              <span className="font-sans text-sm">Save</span>
            </button>
          </div>
        </header>
        
        {/* Hero image */}
        {article.featuredImage && (
          <figure className="mb-12">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img 
                src={article.featuredImage} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="caption mt-2 text-center">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>
        )}
        
        {/* Article content */}
        <div className="grid-article mb-16">
          <aside className="hidden lg:block">
            {/* Left sidebar - empty or could have additional content */}
          </aside>
          
          <div className="article-content">
            {contentParagraphs.map((paragraph, index) => {
              if (index === 0) {
                // First paragraph with drop cap
                return (
                  <p key={index} className="first-letter mb-6">
                    {paragraph}
                  </p>
                );
              } else if (index === 3 && article.pullQuote) {
                // Add pull quote after the third paragraph
                return (
                  <div key={index}>
                    <p className="mb-6">{paragraph}</p>
                    <blockquote className="pull-quote">
                      {article.pullQuote}
                    </blockquote>
                  </div>
                );
              } else {
                // Regular paragraphs
                return (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                );
              }
            })}
            
            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="flex items-center justify-between flex-wrap">
                <div className="mb-4 md:mb-0">
                  <span className="font-sans text-sm text-gray-600">
                    Published {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-blog-link">
                    <Facebook size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-blog-link">
                    <Twitter size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-blog-link">
                    <Linkedin size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-blog-link">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <aside className="hidden lg:block relative">
            {/* Floating share buttons */}
            <div className={`sticky top-32 transition-opacity duration-300 ${
              isShareVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex flex-col items-center space-y-4">
                <div className="font-sans text-xs uppercase tracking-wider text-gray-500 mb-2">
                  SHARE
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Linkedin size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  <MessageCircle size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </aside>
        </div>
        
        {/* Related articles section */}
        {relatedArticles.length > 0 && (
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif font-bold text-2xl md:text-3xl mb-8 text-center">
                More Articles Like This
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    subtitle={article.subtitle}
                    image={article.featuredImage || 'https://placehold.co/800x450/e2e8f0/64748b?text=No+Image'}
                    category={article.category}
                    slug={article.slug}
                    isCompact={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
  );
};

export default Article;
