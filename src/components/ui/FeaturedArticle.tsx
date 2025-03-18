import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
interface FeaturedArticleProps {
  title: string;
  subtitle: string;
  image: string;
  category: string;
  slug: string;
  large?: boolean;
}
const FeaturedArticle = ({
  title,
  subtitle,
  image,
  category,
  slug,
  large = false
}: FeaturedArticleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1
    });
    if (articleRef.current) {
      observer.observe(articleRef.current);
    }
    return () => {
      if (articleRef.current) {
        observer.unobserve(articleRef.current);
      }
    };
  }, []);
  return <div ref={articleRef} className={`animate-on-scroll ${isVisible ? 'animate-visible' : ''}`}>
      <Link to={`/article/${slug}`} className="block no-underline">
        <article className="relative group py-[10px] bg-inherit rounded-none">
          <div className="relative overflow-hidden">
            <div className={`aspect-w-16 aspect-h-9 ${large ? 'md:aspect-w-16 md:aspect-h-7' : ''}`}>
              <img src={image} alt={title} className="article-image object-cover" />
            </div>
          </div>
          
          <div className="mt-3 md:mt-4">
            <div className="mb-2">
              <span className="font-sans text-xs uppercase tracking-wider text-blog-accent font-semibold">
                {category}
              </span>
            </div>
            
            <h2 className={`font-serif font-bold group-hover:text-blog-link transition-colors ${large ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} mb-2`}>
              {title}
            </h2>
            
            <p className={`font-serif text-gray-600 ${large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
              {subtitle}
            </p>
          </div>
        </article>
      </Link>
    </div>;
};
export default FeaturedArticle;