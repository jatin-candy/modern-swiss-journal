
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface ArticleCardProps {
  title: string;
  subtitle?: string;
  image: string;
  category: string;
  slug: string;
  isCompact?: boolean;
}

const ArticleCard = ({ title, subtitle, image, category, slug, isCompact = false }: ArticleCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`animate-on-scroll ${isVisible ? 'animate-visible' : ''} group`}
    >
      <Link to={`/article/${slug}`} className="block no-underline">
        <article className={`group ${isCompact ? '' : 'border-b border-gray-200 pb-6 mb-6'}`}>
          <div className={`grid ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
            <div className={`${isCompact ? 'col-span-1' : 'col-span-1 md:col-span-1'} overflow-hidden`}>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="article-image"
                />
              </div>
            </div>
            
            <div className={`${isCompact ? 'col-span-1' : 'col-span-1 md:col-span-2'}`}>
              <div className="mb-2">
                <span className="font-sans text-xs uppercase tracking-wider text-blog-accent font-semibold">
                  {category}
                </span>
              </div>
              
              <h3 className={`font-serif font-bold group-hover:text-blog-link transition-colors ${
                isCompact ? 'text-xl' : 'text-2xl md:text-3xl'
              } mb-2`}>
                {title}
              </h3>
              
              {subtitle && (
                <p className={`font-serif text-gray-600 ${
                  isCompact ? 'text-base line-clamp-2' : 'text-lg md:text-xl'
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default ArticleCard;
