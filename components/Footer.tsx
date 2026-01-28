import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 === 3) {
      navigate('/admin');
      setClickCount(0);
    }
    // Reset count if not clicked rapidly
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <footer className="bg-brand-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
                <span className="font-serif text-3xl font-bold tracking-tight text-white">HAVENBRICK</span>
                <p className="mt-4 text-white/50 text-sm max-w-xs">
                    Curating the world's most exceptional properties. Where architecture meets legacy.
                </p>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent">Sitemap</h4>
                <div className="flex flex-col gap-2">
                    {['Home', 'Listings', 'About', 'Journal', 'Contact'].map(l => (
                        <Link key={l} to={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="text-sm text-white/70 hover:text-brand-accent transition-colors">{l}</Link>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent">Social</h4>
                <div className="flex flex-col gap-2">
                    {['Instagram', 'LinkedIn', 'Twitter'].map(l => (
                        <a key={l} href="#" className="text-sm text-white/70 hover:text-brand-accent transition-colors">{l}</a>
                    ))}
                </div>
            </div>
        </div>

        <div className="w-full">
            <h2 className="text-[12vw] font-serif leading-none text-white/5 select-none text-center">
                HAVENBRICK
            </h2>
        </div>
        
        <div className="flex justify-between items-center pt-8 border-t border-white/10 text-xs text-white/40 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()}</p>
            <p 
                onClick={handleSecretClick} 
                className="cursor-default select-none hover:text-white/60 transition-colors"
                title="ver 1.0.4"
            >
                Designed for Luxury
            </p>
        </div>
      </div>
    </footer>
  );
};
