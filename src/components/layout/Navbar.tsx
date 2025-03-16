
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
              <h1 className="text-2xl font-serif font-bold tracking-tight">THE JOURNAL</h1>
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
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="User account"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Secondary Navigation */}
        <nav className="hidden md:flex justify-center mt-2 border-t border-b border-gray-200 py-2">
          <ul className="flex space-x-8">
            {['World', 'U.S.', 'Politics', 'Business', 'Opinion', 'Technology', 'Science', 'Health', 'Arts'].map((item) => (
              <li key={item}>
                <Link to={`/section/${item.toLowerCase()}`} className="navigation-item font-sans text-sm font-medium">
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
            <h2 className="text-xl font-serif font-bold">Sections</h2>
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
              {['Home', 'World', 'U.S.', 'Politics', 'Business', 'Opinion', 'Technology', 'Science', 'Health', 'Arts', 'Living', 'Sports', 'Books', 'Food', 'Travel', 'Magazine', 'For You'].map((item) => (
                <li key={item} className="border-b border-gray-100 pb-3">
                  <Link
                    to={item === 'Home' ? '/' : `/section/${item.toLowerCase()}`}
                    className="font-serif text-xl font-medium hover:text-blog-link transition-colors no-underline"
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
            <h2 className="text-xl font-serif font-bold">Search</h2>
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
                className="w-full border-b-2 border-gray-200 focus:border-blog-link py-3 px-2 text-xl outline-none font-serif"
                autoFocus
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="mt-8">
              <h3 className="font-sans text-sm uppercase tracking-wider text-blog-muted mb-4">TRENDING SEARCHES</h3>
              <ul className="space-y-4">
                {['Climate Change', 'Artificial Intelligence', 'Global Economy', 'Health Care', 'Election'].map((item) => (
                  <li key={item}>
                    <button 
                      className="text-blog-link hover:underline font-serif text-lg"
                      onClick={() => {
                        setSearchOpen(false);
                        // Handle search here
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
