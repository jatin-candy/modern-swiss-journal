
import { Link } from 'react-router-dom';
import { Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="no-underline">
              <h2 className="text-3xl font-broadway font-bold mb-4">THE THOUGHT</h2>
            </Link>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://placehold.co/100x100?text=JD" 
                  alt="Jatin Dangi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-playfair italic text-sm text-gray-500">
                - Jatin Dangi
              </p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider mb-4">About Me</h3>
            <div className="font-playfair text-base text-gray-600 space-y-4">
              <p className="leading-relaxed">
                I'm a Computer Science & Biology major, passionate about the intersection of digital health and modern biological complex systems. When I'm not coding or in the lab, you'll find me on the football field or designing websites.
              </p>
              <p className="leading-relaxed">
                I specialize in software engineering, system design, and optimizing large-scale SaaS platforms. Currently, I'm planning a solo trip to Japan—a journey I've been anticipating for a while.
              </p>
              <p className="leading-relaxed">
                Those who know me would say I'm funny and outgoing, yet I deeply appreciate solitude. I embrace emptiness and have never feared boredom—it's often where my best ideas come to life.
              </p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider mb-4">Features & News</h3>
            <ul className="space-y-3">
              {['Latest Articles', 'Japan Journey', 'Tech Projects', 'Biology Research', 'Design Portfolio'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="font-playfair text-gray-600 hover:text-blog-link text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider mt-8 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/jatindangi07" className="text-gray-500 hover:text-blog-link transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://github.com/jatindangi1206" className="text-gray-500 hover:text-blog-link transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/jatin-dangi" className="text-gray-500 hover:text-blog-link transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-sans text-sm text-gray-500">
              © {new Date().getFullYear()} Jatin Dangi. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
