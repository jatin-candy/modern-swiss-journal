
import { Link } from 'react-router-dom';
import { Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 mb-12">
          {/* About Me Section with larger image */}
          <div className="col-span-1 md:col-span-1.5 lg:col-span-1.5">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-56 h-72 rounded-lg overflow-hidden">
                <img
                  src="https://cdn.discordapp.com/attachments/973253556356399177/1351099156273565786/IMG_20221225_191730.jpg?ex=67d924a5&is=67d7d325&hm=3570b46015398c31145026ca4a1f7205784bca3c26fea8499cc93ff397321d5a&"
                  alt="Jatin Dangi"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-sans text-lg font-bold uppercase tracking-wider mb-4">About Me</h3>
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
            </div>
          </div>

          {/* Title and Features Section */}
          <div className="col-span-1">
            <Link to="/" className="no-underline block mb-6">
              <h2 className="text-4xl font-broadway font-bold">THE THOUGHT</h2>
            </Link>
            <div className="space-y-6">
              <div>
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider mb-4">Features & News</h3>
                <ul className="space-y-3">
                  {['Latest Articles', 'Japan Journey', 'Tech Projects', 'Biology Research', 'Design Portfolio'].map((item) => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="font-playfair text-gray-600 hover:text-blog-link text-base transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/jatindangi07" className="text-gray-500 hover:text-blog-link transition-colors hover:scale-110" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://github.com/jatindangi1206" className="text-gray-500 hover:text-blog-link transition-colors hover:scale-110" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="https://linkedin.com/in/jatin-dangi" className="text-gray-500 hover:text-blog-link transition-colors hover:scale-110" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
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
