import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, User, Quote } from 'lucide-react';
import { ARTICLES, Article } from '../journalData';
import { ArticleDrawer } from '../components/ArticleDrawer';

const TESTIMONIALS = [
    {
      quote: "Havenbrick didn't just find us a house; they secured a legacy. The discretion and architectural pedigree they provided were unmatched in the market.",
      author: "Jonathan R.",
      role: "CEO, Tech Ventures",
      location: "Acquired in Tribeca, NY"
    },
    {
      quote: "I have worked with brokers in London, Hong Kong, and Dubai. The team at Havenbrick operates on a different level. Their 'Private Office' access is the real deal.",
      author: "Elena V.",
      role: "Art Collector",
      location: "Acquired in Mayfair, London"
    },
    {
      quote: "Selling a historical estate requires a specific narrative. Havenbrick told the story of our home so beautifully that we broke the neighborhood record.",
      author: "The Kensington Family",
      role: "Sellers",
      location: "Sold in Boston, MA"
    }
];

export const Journal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(ARTICLES.map(a => a.category)))];
  
  const filteredArticles = activeCategory === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  const featuredArticle = ARTICLES[0];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary pt-24 md:pt-32 pb-20">
      
      {/* 1. Page Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
         <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-fade-in-up">The Journal</span>
         <h1 className="text-5xl md:text-8xl font-serif mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Market & <br/> Perspectives</h1>
         <p className="text-brand-secondary font-light text-base md:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
             Curated insights on architectural trends, global real estate markets, and the art of living well.
         </p>
      </div>

      {/* 2. Featured Article */}
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-32">
          <div 
            onClick={() => setSelectedArticle(featuredArticle)}
            className="relative h-[50vh] md:h-[70vh] w-full group overflow-hidden cursor-pointer rounded-sm"
          >
              <img src={featuredArticle.image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-16 text-white max-w-4xl">
                  <div className="flex items-center gap-4 mb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      <span className="bg-brand-accent text-white px-3 py-1">Editor's Pick</span>
                      <span>{featuredArticle.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-6xl font-serif mb-4 md:mb-6 leading-tight group-hover:text-brand-accent transition-colors">
                      {featuredArticle.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-1 w-fit hover:border-brand-accent hover:text-brand-accent transition-all">
                      Read Full Story <ArrowRight size={16} />
                  </div>
              </div>
          </div>
      </div>

      {/* 3. Article Filter & Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-brand-border pb-6 gap-6">
              <div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6">Latest Insights</h3>
                  <div className="flex gap-2 flex-wrap">
                      {categories.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                activeCategory === cat 
                                ? 'bg-brand-primary text-white border-brand-primary' 
                                : 'bg-white text-brand-secondary border-brand-border hover:border-brand-primary'
                            }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-primary whitespace-nowrap">View Archive</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredArticles.map((article) => (
                  <div 
                    key={article.id} 
                    className="group cursor-pointer flex flex-col h-full"
                    onClick={() => setSelectedArticle(article)}
                  >
                      <div className="overflow-hidden mb-6 aspect-[3/2] rounded-sm relative">
                          <img src={article.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                              {article.category}
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-brand-secondary text-[10px] uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {article.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> {article.readTime}</span>
                      </div>

                      <h4 className="text-2xl font-serif mb-3 group-hover:text-brand-accent transition-colors leading-tight">
                          {article.title}
                      </h4>
                      
                      <p className="text-brand-secondary text-sm font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                          {article.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-brand-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center">
                                  <User size={12} className="text-brand-secondary" />
                              </div>
                              <span className="text-xs font-medium text-brand-primary">{article.author}</span>
                          </div>
                          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors">
                              Read Article <ArrowRight size={12} />
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 4. Client Voices (Testimonials) */}
      <div className="bg-brand-primary text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-10 left-10 text-[10rem] md:text-[20rem] font-serif leading-none opacity-10">"</div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-12 md:mb-20">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Client Voices</span>
                  <h2 className="text-4xl md:text-5xl font-serif">Stories of Success</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {TESTIMONIALS.map((t, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-sm hover:bg-white/10 transition-colors duration-500 relative group flex flex-col">
                          <Quote className="text-brand-accent mb-6 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
                          <p className="text-base md:text-lg font-light leading-relaxed mb-8 italic text-white/90 flex-grow">
                              "{t.quote}"
                          </p>
                          <div className="pt-8 border-t border-white/10">
                              <h5 className="font-serif text-lg md:text-xl text-white">{t.author}</h5>
                              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">{t.role}</p>
                              <p className="text-[10px] text-white/50 uppercase tracking-wider">{t.location}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 5. Newsletter */}
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Join the Inner Circle</h2>
          <p className="text-brand-secondary font-light mb-10 text-sm md:text-base">
              Receive our monthly "Market Watch" report and priority access to off-market listings.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-white border border-brand-border px-6 py-4 rounded-sm focus:outline-none focus:border-brand-accent font-serif text-lg"
              />
              <button className="bg-brand-primary text-white px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-brand-accent transition-colors">
                  Subscribe
              </button>
          </div>
      </div>

      <ArticleDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} />

    </div>
  );
};
