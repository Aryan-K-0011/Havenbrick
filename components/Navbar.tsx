import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 hidden md:flex justify-center pt-6`}>
        <div className={`
          flex items-center gap-12 px-8 py-4 rounded-full transition-all duration-500
          ${scrolled ? 'bg-brand-surface/90 backdrop-blur-xl border border-brand-border shadow-lg translate-y-0' : 'bg-transparent border-transparent translate-y-2'}
        `}>
          <Link to="/" className="flex items-center gap-2 group">
            <Building2 size={20} className="text-brand-accent" />
            <span className={`font-serif font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-brand-primary' : 'text-brand-primary md:text-white md:mix-blend-difference'}`}>HAVENBRICK</span>
          </Link>

          <div className="flex items-center gap-8">
            {['Home', 'Listings', 'About', 'Journal', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-brand-accent ${scrolled ? 'text-brand-secondary' : 'text-white/80'}`}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className={`w-px h-4 ${scrolled ? 'bg-brand-border' : 'bg-white/20'}`}></div>

          <div className="flex items-center gap-4">
             <Search size={18} className={`cursor-pointer transition-colors hover:text-brand-accent ${scrolled ? 'text-brand-primary' : 'text-white'}`} />
             <Link to="/listings" className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${scrolled ? 'bg-brand-primary text-white hover:bg-brand-accent' : 'bg-white text-brand-primary hover:bg-brand-accent hover:text-white'}`}>
                Find Home
             </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed w-full z-50 md:hidden bg-brand-surface/90 backdrop-blur-md border-b border-brand-border px-6 py-4 flex justify-between items-center transition-transform">
         <Link to="/" className="flex items-center gap-2">
            <Building2 size={20} className="text-brand-accent" />
            <span className="font-serif font-bold text-xl text-brand-primary">HAVENBRICK</span>
         </Link>
         <button onClick={() => setIsOpen(!isOpen)} className="text-brand-primary p-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-brand-bg transition-all duration-500 md:hidden pt-24 px-6 flex flex-col items-center justify-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-center">
           {['Home', 'Listings', 'About', 'Journal', 'Contact'].map((item, index) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className={`text-3xl font-serif text-brand-primary hover:text-brand-accent transition-transform duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: `${index * 100}ms`}}
              >
                {item}
              </Link>
            ))}
        </div>
        <div className={`mt-12 flex gap-6 ${isOpen ? 'opacity-100 transition-opacity duration-1000 delay-500' : 'opacity-0'}`}>
            {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-xs uppercase tracking-widest text-brand-secondary">{social}</a>
            ))}
        </div>
      </div>
    </>
  );
};
