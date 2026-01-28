import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Waves, Landmark, Shield, Key, TrendingUp, Mountain } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { useData } from '../context/DataContext';
import { ArticleDrawer } from '../components/ArticleDrawer';
import { ARTICLES, Article } from '../journalData';

export const Home: React.FC = () => {
  const { properties } = useData();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-white overflow-x-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
            className="w-full h-full object-cover animate-slow-pan"
            alt="Hero Background"
           />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto mt-20">
            <h1 className="text-[18vw] md:text-[12vw] leading-[0.8] font-serif text-white mb-6 md:mb-8 animate-fade-in-up tracking-tighter drop-shadow-lg">
                HAVENBRICK
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-4 text-white">
                    <span className="h-px w-8 md:w-12 bg-white"></span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Est. 2010</span>
                </div>
                <p className="text-white/90 max-w-xs md:max-w-lg text-center md:text-left text-base md:text-lg font-light leading-relaxed drop-shadow-md">
                    Curating the world's most exceptional properties. <br className="hidden md:block"/>
                    Where architecture meets legacy.
                </p>
                <Link to="/listings" className="group flex items-center gap-4 px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white hover:text-brand-primary transition-all duration-500 text-white">
                    <span className="uppercase text-[10px] md:text-xs font-bold tracking-[0.2em]">Explore Collection</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>

        <div className="absolute bottom-8 md:bottom-12 animate-bounce text-white/80 flex flex-col items-center gap-2">
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} md:size={20} strokeWidth={1} />
        </div>
      </section>

      {/* 2. Trust Strip */}
      <div className="border-b border-brand-border bg-white overflow-hidden py-6 md:py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-brand-secondary/40 uppercase tracking-widest text-[10px] md:text-xs font-bold">
            <span className="hidden md:block">As seen in</span>
            <div className="flex gap-8 md:gap-24 overflow-x-auto no-scrollbar w-full md:w-auto">
                {['Wall Street Journal', 'Architectural Digest', 'Vogue Living', 'Forbes', 'The New York Times'].map((brand, i) => (
                    <span key={i} className="whitespace-nowrap hover:text-brand-primary transition-colors duration-300 cursor-default">{brand}</span>
                ))}
            </div>
        </div>
      </div>

      {/* 3. The Philosophy (Editorial Layout) */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="reveal">
                <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 block">The Philosophy</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-primary leading-[1.1] mb-6 md:mb-8">
                    Not just a residence. <br/>
                    <span className="italic text-brand-secondary">A statement.</span>
                </h2>
                <div className="h-px w-16 md:w-24 bg-brand-accent mb-6 md:mb-8"></div>
                <p className="text-brand-secondary text-base md:text-lg leading-loose font-light mb-8 md:mb-10">
                    In a world of mass production, Havenbrick stands for the unique. We believe that a home should be as distinct as its owner. Our portfolio is strictly limited to properties that offer architectural significance, historical weight, or unparalleled location.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-2xl md:text-3xl font-serif text-brand-primary mb-2">100%</h4>
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-brand-secondary">Vetted Listings</p>
                    </div>
                    <div>
                        <h4 className="text-2xl md:text-3xl font-serif text-brand-primary mb-2">$4.2B</h4>
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-brand-secondary">Value Sold</p>
                    </div>
                </div>
            </div>
            <div className="relative reveal mt-8 lg:mt-0">
                <div className="absolute -inset-4 border border-brand-accent/20 z-0"></div>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" />
            </div>
         </div>
      </section>

      {/* 4. Lifestyle Collections (New Feature) */}
      <section className="py-16 md:py-20 bg-brand-soft border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 reveal">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-primary">Curated Lifestyles</h2>
                <Link to="/listings" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors">View All Categories</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { title: "Waterfront", icon: Waves, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" },
                    { title: "Skyline", icon: Landmark, img: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800" },
                    { title: "Alpine", icon: Mountain, img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800" },
                    { title: "Estates", icon: Shield, img: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800" }
                ].map((item, idx) => (
                    <div key={idx} className="group relative h-64 md:h-96 overflow-hidden cursor-pointer reveal rounded-sm shadow-sm hover:shadow-xl transition-all duration-500" style={{transitionDelay: `${idx * 0.1}s`}}>
                        <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <item.icon className="text-white mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform md:translate-y-4 md:group-hover:translate-y-0" size={24} />
                            <h3 className="text-xl md:text-2xl font-serif text-white">{item.title}</h3>
                            <div className="w-12 h-px bg-white mt-2 md:w-0 md:group-hover:w-12 transition-all duration-500"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. Featured Properties */}
      <section className="py-20 md:py-32 relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12 md:mb-20 reveal">
                <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">The Collection</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-primary">Latest Acquisitions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.slice(0,3).map((property, idx) => (
                    <div key={property.id} className={`reveal`} style={{transitionDelay: `${idx * 0.1}s`}}>
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>

            <div className="mt-16 md:mt-20 text-center reveal">
                <Link to="/listings" className="inline-flex items-center gap-2 border border-brand-primary text-brand-primary px-8 py-3 md:px-10 md:py-4 hover:bg-brand-primary hover:text-white transition-all duration-300 uppercase text-[10px] md:text-xs font-bold tracking-[0.2em]">
                    View Entire Portfolio
                </Link>
            </div>
         </div>
      </section>

      {/* 6. The Private Office (Darker Section for Contrast) */}
      <section className="py-20 md:py-32 bg-brand-primary relative overflow-hidden text-white">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 reveal">
                    <div className="flex items-center gap-3 mb-6">
                        <Key className="text-brand-accent" size={20} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">The Private Office</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 md:mb-8 leading-tight">
                        Off-Market <br/> Opportunities
                    </h2>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                        For the most discerning clients, discretion is paramount. Our Private Office handles significant transactions entirely off-market. 
                        Access our "Black Book" of unlisted trophy assets, available only to vetted clientele.
                    </p>
                    <ul className="space-y-4 mb-10">
                        {['Complete Anonymity', 'Exclusive Access', 'Bespoke Acquisition Strategy'].map(item => (
                            <li key={item} className="flex items-center gap-4 text-white/80 text-xs md:text-sm uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/contact" className="text-brand-accent border-b border-brand-accent pb-1 uppercase text-xs font-bold tracking-[0.2em] hover:text-white hover:border-white transition-colors">
                        Request Private Access
                    </Link>
                </div>
                
                <div className="lg:col-span-7 relative reveal mt-8 lg:mt-0">
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800" className="w-full h-48 md:h-80 object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 rounded-sm" />
                        <img src="https://d1di04ifehjy6m.cloudfront.net/media/filer_public/41/c0/41c0dd4e-b6bd-4bd3-9353-2f39f587e2cc/understanding_the_meaning_and_types_of_real_estate.png" className="w-full h-48 md:h-80 object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 rounded-sm translate-y-8 md:translate-y-12" />
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* 7. Cinematic Video Section */}
      <section className="h-[50vh] md:h-[80vh] relative flex items-center justify-center overflow-hidden bg-black">
        <video 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src="https://assets.mixkit.co/videos/12877/12877-720.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-4 shadow-sm">The Art of Living</h2>
            <p className="uppercase tracking-widest text-[10px] md:text-xs font-bold">Experience the Atmosphere</p>
        </div>
      </section>

      {/* 8. Market Journal */}
      <section className="py-20 md:py-32 px-6 bg-brand-bg">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-brand-border pb-6 md:pb-8 reveal">
                <div>
                    <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-2 block">The Journal</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-brand-primary">Market Insights</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-brand-secondary text-xs uppercase tracking-widest">
                    <TrendingUp size={16} className="text-green-600" />
                    <span>Luxury Index: +4.2% YOY</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {ARTICLES.slice(0, 3).map((article, i) => (
                    <div 
                      key={article.id} 
                      onClick={() => setSelectedArticle(article)}
                      className="group cursor-pointer reveal block" 
                      style={{transitionDelay: `${i * 0.1}s`}}
                    >
                        <div className="overflow-hidden mb-6 aspect-[3/2] rounded-sm">
                            <img src={article.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                        </div>
                        <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-2 block">{article.date}</span>
                        <h3 className="text-xl font-serif text-brand-primary group-hover:text-brand-accent transition-colors">{article.title}</h3>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-secondary group-hover:text-brand-primary transition-colors">
                            Read Article <ArrowRight size={12} />
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      <ArticleDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
