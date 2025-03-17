import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeaturedArticle from '../components/ui/FeaturedArticle';
import ArticleCard from '../components/ui/ArticleCard';
import SectionTitle from '../components/ui/SectionTitle';

// Empty article state interface
interface Article {
  title: string;
  subtitle: string;
  image: string;
  category: string;
  slug: string;
}

const Index = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading (this would be replaced with actual API calls)
    setIsLoading(true);
    
    // This timeout simulates an API call
    const timer = setTimeout(() => {
      // In a real app, you would fetch articles from an API
      setArticles([]);
      setIsLoading(false);
    }, 500);
    
    // Add intersection observer for animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      clearTimeout(timer);
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [category]);

  const sectionTitle = category ? 
    category.charAt(0).toUpperCase() + category.slice(1) : 
    "Latest Articles";

  return (
    <>
      {/* Main content area starts directly without Navbar (now in MainLayout) */}
      {isLoading ? (
        <div className="grid-container flex justify-center items-center py-16">
          <div className="w-12 h-12 border-4 border-t-blog-accent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {articles.length === 0 ? (
            <div className="grid-container text-center py-16">
              <h2 className="font-serif font-bold text-3xl mb-4">No Articles Yet</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                There are currently no articles to display.
                {category ? ` Be the first to write about ${category}!` : ''}
              </p>
            </div>
          ) : (
            <>
              {/* Featured section would go here when articles exist */}
              <section className="grid-container mb-16">
                <SectionTitle title={sectionTitle} withLine={true} />
                <div className="space-y-8">
                  {articles.map((article, index) => (
                    <ArticleCard
                      key={index}
                      title={article.title}
                      subtitle={article.subtitle}
                      image={article.image}
                      category={article.category}
                      slug={article.slug}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
          
          {/* Newsletter section - keep this regardless of article count */}
          <section className="bg-gray-100 py-16 mb-16">
            <div className="grid-container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
                  Stay Informed
                </h2>
                <p className="font-serif text-lg md:text-xl text-gray-600 mb-8">
                  Get the latest insights on design, typography, and visual culture delivered to your inbox weekly.
                </p>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 focus:border-blog-link outline-none font-serif"
                  />
                  <button className="bg-blog-text text-white px-6 py-3 font-sans font-medium text-sm uppercase tracking-wider hover:bg-opacity-80 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {/* No footer here as it's now in MainLayout */}
    </>
  );
};

export default Index;
