
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FeaturedArticle from '../components/ui/FeaturedArticle';
import ArticleCard from '../components/ui/ArticleCard';
import SectionTitle from '../components/ui/SectionTitle';

// Mock data for articles
const featuredArticle = {
  title: "The Renaissance of Swiss Design in Digital Interfaces",
  subtitle: "How minimalist principles are shaping the future of user experience",
  image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
  category: "Design",
  slug: "renaissance-swiss-design"
};

const secondaryArticles = [
  {
    title: "The Mathematics of Perfect Typography",
    subtitle: "Exploring the golden ratio in editorial layouts",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Typography",
    slug: "mathematics-perfect-typography"
  },
  {
    title: "White Space: The Silent Eloquence",
    subtitle: "Why leading designers are embracing emptiness",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Principles",
    slug: "white-space-silent-eloquence"
  }
];

const technologyArticles = [
  {
    title: "The New Era of Functional Iconography",
    subtitle: "How Swiss principles are informing digital symbols",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Technology",
    slug: "new-era-functional-iconography"
  },
  {
    title: "Grid Systems in the Age of Responsive Design",
    subtitle: "Mathematical approaches to fluid layouts",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Technology",
    slug: "grid-systems-responsive-design"
  },
  {
    title: "The Psychology of Sans-Serif Typography",
    subtitle: "Why tech companies embrace minimalist fonts",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Technology",
    slug: "psychology-sans-serif-typography"
  }
];

const politicsArticles = [
  {
    title: "The Politics of Visual Communication",
    subtitle: "How design shapes public discourse",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Politics",
    slug: "politics-visual-communication"
  },
  {
    title: "Information Design in the Post-Truth Era",
    subtitle: "Design ethics for today's media landscape",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Politics",
    slug: "information-design-post-truth"
  },
  {
    title: "Visual Narratives in Political Journalism",
    subtitle: "The evolution of editorial design",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Politics",
    slug: "visual-narratives-political-journalism"
  }
];

const trendingArticles = [
  {
    title: "Josef Müller-Brockmann's Legacy in Digital Media",
    subtitle: "The continuing influence of the Swiss master",
    image: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Trending",
    slug: "josef-muller-brockmann-legacy"
  },
  {
    title: "The Return to Modernist Principles",
    subtitle: "Clarity and purpose in contemporary design",
    image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Trending",
    slug: "return-modernist-principles"
  },
  {
    title: "Objective Design for Subjective Experiences",
    subtitle: "The paradox of emotion in Swiss design",
    image: "https://images.unsplash.com/photo-1611532736597-8bc68d77e182?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Trending",
    slug: "objective-design-subjective-experiences"
  },
  {
    title: "Asymmetric Balance in Editorial Design",
    subtitle: "Dynamic equilibrium on the page",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Trending",
    slug: "asymmetric-balance-editorial-design"
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
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
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36">
        {/* Hero section with featured article */}
        <section className="grid-container mb-16">
          <FeaturedArticle
            title={featuredArticle.title}
            subtitle={featuredArticle.subtitle}
            image={featuredArticle.image}
            category={featuredArticle.category}
            slug={featuredArticle.slug}
            large={true}
          />
        </section>
        
        {/* Secondary featured articles */}
        <section className="grid-container mb-16">
          <div className="grid-desktop">
            {secondaryArticles.map((article, index) => (
              <div key={index} className="col-span-1 md:col-span-3 lg:col-span-2.5">
                <FeaturedArticle
                  title={article.title}
                  subtitle={article.subtitle}
                  image={article.image}
                  category={article.category}
                  slug={article.slug}
                />
              </div>
            ))}
          </div>
        </section>
        
        {/* Trending section */}
        <section className="grid-container mb-16">
          <SectionTitle title="Trending" withLine={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trendingArticles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                subtitle={article.subtitle}
                image={article.image}
                category={article.category}
                slug={article.slug}
                isCompact={true}
              />
            ))}
          </div>
        </section>
        
        {/* Technology section */}
        <section className="grid-container mb-16">
          <SectionTitle title="Technology" withLine={true} />
          
          <div className="space-y-8">
            {technologyArticles.map((article, index) => (
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
        
        {/* Politics section */}
        <section className="grid-container mb-16">
          <SectionTitle title="Politics" withLine={true} />
          
          <div className="space-y-8">
            {politicsArticles.map((article, index) => (
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
        
        {/* Newsletter section */}
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
      </main>
      <Footer />
    </>
  );
};

export default Index;
