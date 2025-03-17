
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation categories - used across the component
  const categories = ['Politics', 'Business', 'Opinion', 'Technology', 'Science', 'Health', 'Arts'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left section with hamburger menu */}
          <div className="w-1/3 flex justify-start">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Center section with logo */}
          <div className="w-1/3 flex justify-center">
            <Link to="/" className="no-underline">
              <h1 className="text-2xl font-broadway tracking-tight">THE THOUGHT</h1>
            </Link>
          </div>
          
          {/* Right section with search and user */}
          <div className="w-1/3 flex justify-end items-center space-x-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="User account"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
        
        {/* Secondary Navigation */}
        <nav className="hidden md:flex justify-center mt-2 border-t border-b border-gray-200 py-2">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className={`navigation-item font-sans text-sm font-medium ${location.pathname === '/' ? 'font-bold text-blog-accent' : ''}`}>
                Home
              </Link>
            </li>
            
            {isAuthenticated && (
              <li>
                <Link to="/dashboard" className={`navigation-item font-sans text-sm font-medium ${location.pathname === '/dashboard' ? 'font-bold text-blog-accent' : ''}`}>
                  Dashboard
                </Link>
              </li>
            )}
            
            {categories.map((item) => (
              <li key={item}>
                <Link 
                  to={`/section/${item.toLowerCase()}`} 
                  className={`navigation-item font-sans text-sm font-medium ${
                    location.pathname === `/section/${item.toLowerCase()}` ? 'font-bold text-blog-accent' : ''
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Slide-in menu */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full overflow-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-broadway font-bold">Sections</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav>
            <ul className="space-y-6">
              <li className="border-b border-gray-100 pb-3">
                <Link
                  to="/"
                  className="font-playfair text-xl font-medium hover:text-blog-link transition-colors no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              
              {isAuthenticated && (
                <li className="border-b border-gray-100 pb-3">
                  <Link
                    to="/dashboard"
                    className="font-playfair text-xl font-medium hover:text-blog-link transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              
              {categories.concat(['Living', 'Sports', 'Books', 'Food', 'Travel', 'Magazine']).map((item) => (
                <li key={item} className="border-b border-gray-100 pb-3">
                  <Link
                    to={`/section/${item.toLowerCase()}`}
                    className="font-playfair text-xl font-medium hover:text-blog-link transition-colors no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Search overlay */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-opacity duration-300 ${
        searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-playfair font-bold">Search</h2>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full border-b-2 border-gray-200 focus:border-blog-link py-3 px-2 text-xl outline-none font-playfair"
                autoFocus
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
