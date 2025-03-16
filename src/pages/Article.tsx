
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleCard from '../components/ui/ArticleCard';
import { Share2, Bookmark, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

// Mock article data
const articleData = {
  title: "The Renaissance of Swiss Design in Digital Interfaces",
  subtitle: "How minimalist principles are shaping the future of user experience",
  author: "Claire Montgomery",
  date: "October 15, 2023",
  readTime: "8 min read",
  category: "Design",
  heroImage: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
  heroCaption: "Swiss design principles applied to a modern digital interface. Photo: Unsplash",
  pullQuote: "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.",
  content: [
    "In the ever-evolving landscape of digital design, we're witnessing a remarkable renaissance of Swiss Design principles. This resurgence isn't merely aesthetic nostalgia; it's a functional response to our increasingly complex digital environments. The clarity, precision, and mathematical harmony that characterized the work of Josef Müller-Brockmann and his contemporaries have found new relevance in today's interfaces.",
    "The core principles of Swiss Design—rigorous grid systems, asymmetric layouts, and objective presentation—emerged in the post-war period as a response to the need for clear, universal communication. Today, as our digital spaces become more cluttered and attention spans more fragmented, these same principles offer a path toward more meaningful engagement.",
    "Grid systems, the backbone of Swiss Design, have been reimagined for responsive environments. The mathematical approach to space division now flexes and adapts across devices while maintaining proportion and hierarchy. This isn't simply about aesthetic consistency—it's about creating predictable information structures that reduce cognitive load.",
    "Typography, too, has returned to the disciplined approach championed by Swiss designers. The trend toward clean, hierarchical type systems prioritizes readability and information architecture over decorative elements. Sans-serif fonts dominate interfaces not just for their contemporary feel but for their clarity at various sizes—a critical consideration in responsive design.",
    "White space, perhaps the most underappreciated element of Swiss Design, has become a luxury in digital interfaces. As content demands increase, designers who resist the urge to fill every pixel find their interfaces not only more visually appealing but more functional. The breathing room around elements creates natural focus points and improves comprehension.",
    "Color usage follows the Swiss tradition of restraint. While not limited to the red and black palette of historical Swiss posters, today's interfaces benefit from limited, intentional color systems. Each hue serves a purpose—navigation, action, status—rather than decorative variety.",
    "Perhaps most importantly, Swiss Design's focus on honest presentation of information feels revolutionary in an era of dark patterns and manipulative interfaces. Designers are rediscovering that clarity isn't just user-friendly—it's ethical.",
    "As we move forward with increasingly complex technologies like augmented reality and artificial intelligence, the lessons of Swiss Design become even more valuable. When information exists in three dimensions or is generated algorithmically, strong visual systems aren't just helpful—they're essential for maintaining meaning and usability.",
    "The Swiss Design revival isn't about nostalgia or visual trends. It's about rediscovering timeless principles of human perception and applying them to new challenges. In embracing this approach, designers aren't looking backward—they're equipping themselves with tested methods for addressing the complexity ahead."
  ],
  images: [
    {
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
      caption: "White space creates natural hierarchy and improves readability in digital interfaces.",
      grid: true
    },
    {
      url: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
      caption: "Typography remains the foundation of effective digital communication.",
      grid: true
    },
    {
      url: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
      caption: "Grid systems create mathematical harmony across responsive layouts.",
      grid: true
    }
  ],
  relatedArticles: [
    {
      title: "The Mathematics of Perfect Typography",
      subtitle: "Exploring the golden ratio in editorial layouts",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Typography",
      slug: "mathematics-perfect-typography"
    },
    {
      title: "Grid Systems in the Age of Responsive Design",
      subtitle: "Mathematical approaches to fluid layouts",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Technology",
      slug: "grid-systems-responsive-design"
    },
    {
      title: "Josef Müller-Brockmann's Legacy in Digital Media",
      subtitle: "The continuing influence of the Swiss master",
      image: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
      category: "Trending",
      slug: "josef-muller-brockmann-legacy"
    }
  ]
};

const Article = () => {
  const { slug } = useParams();
  const [isShareVisible, setIsShareVisible] = useState(false);
  
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

  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36">
        <article className="grid-container">
          <header className="max-w-4xl mx-auto text-center mb-12">
            <div className="mb-3">
              <span className="font-sans text-sm uppercase tracking-wider text-blog-accent font-semibold">
                {articleData.category}
              </span>
            </div>
            
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">
              {articleData.title}
            </h1>
            
            <p className="font-serif text-gray-600 text-xl md:text-2xl italic mb-6">
              {articleData.subtitle}
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-gray-600 mb-6">
              <span className="font-serif">By {articleData.author}</span>
              <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
              <span className="font-serif">{articleData.date}</span>
              <span className="block w-1 h-1 rounded-full bg-gray-400"></span>
              <span className="font-serif">{articleData.readTime}</span>
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
          <figure className="mb-12">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img 
                src={articleData.heroImage} 
                alt={articleData.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="caption mt-2 text-center">
              {articleData.heroCaption}
            </figcaption>
          </figure>
          
          {/* Article content */}
          <div className="grid-article mb-16">
            <aside className="hidden lg:block">
              {/* Left sidebar - empty or could have additional content */}
            </aside>
            
            <div className="article-content">
              {articleData.content.map((paragraph, index) => {
                if (index === 0) {
                  // First paragraph with drop cap
                  return (
                    <p key={index} className="first-letter mb-6">
                      {paragraph}
                    </p>
                  );
                } else if (index === 3) {
                  // Add pull quote after the third paragraph
                  return (
                    <div key={index}>
                      <p className="mb-6">{paragraph}</p>
                      <blockquote className="pull-quote">
                        {articleData.pullQuote}
                      </blockquote>
                    </div>
                  );
                } else if (index === 6) {
                  // Add image grid after the sixth paragraph
                  return (
                    <div key={index}>
                      <p className="mb-6">{paragraph}</p>
                      <figure className="my-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {articleData.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="overflow-hidden">
                              <img 
                                src={image.url} 
                                alt={image.caption} 
                                className="article-image"
                              />
                              <figcaption className="caption">
                                {image.caption}
                              </figcaption>
                            </div>
                          ))}
                        </div>
                      </figure>
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
                      Published {articleData.date}
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
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif font-bold text-2xl md:text-3xl mb-8 text-center">
                More Articles Like This
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articleData.relatedArticles.map((article, index) => (
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
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Article;
