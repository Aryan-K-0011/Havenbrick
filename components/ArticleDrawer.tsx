import React, { useEffect } from 'react';
import { Share2, Bookmark, X, User, Hash } from 'lucide-react';
import { Article } from '../journalData';

interface ArticleDrawerProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleDrawer: React.FC<ArticleDrawerProps> = ({ article, onClose }) => {
  
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [article]);

  if (!article) return null;

  return (
    <>
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>
            
            {/* Drawer */}
            <div className="relative w-full md:w-[600px] lg:w-[800px] h-full bg-brand-bg shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-brand-border bg-white z-10 shrink-0">
                    <div className="flex gap-2 md:gap-4">
                        <button className="p-2 hover:bg-brand-soft rounded-full transition-colors text-brand-secondary" title="Share">
                            <Share2 size={18} className="md:w-5 md:h-5" />
                        </button>
                        <button className="p-2 hover:bg-brand-soft rounded-full transition-colors text-brand-secondary" title="Save">
                            <Bookmark size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-brand-soft rounded-full transition-colors text-brand-primary"
                    >
                        <X size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Drawer Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-brand-bg">
                    {/* Hero Image */}
                    <div className="h-[250px] md:h-[400px] w-full relative shrink-0">
                        <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12 max-w-2xl pr-6">
                            <span className="bg-brand-accent text-white px-2 py-1 md:px-3 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-4 inline-block rounded-sm">
                                {article.category}
                            </span>
                            <h1 className="text-2xl md:text-5xl font-serif text-brand-primary leading-tight shadow-sm drop-shadow-md">
                                {article.title}
                            </h1>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="px-6 py-8 md:px-12 md:py-12 max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 mb-8 md:mb-12 border-b border-brand-border pb-6 md:pb-8">
                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-soft flex items-center justify-center border border-brand-border text-brand-secondary">
                                 <User size={16} className="md:w-5 md:h-5" />
                             </div>
                             <div>
                                 <p className="font-serif text-base md:text-lg text-brand-primary">{article.author}</p>
                                 <div className="flex gap-4 text-[10px] md:text-xs text-brand-secondary uppercase tracking-wider">
                                     <span>{article.date}</span>
                                     <span>•</span>
                                     <span>{article.readTime}</span>
                                 </div>
                             </div>
                        </div>

                        <div className="prose prose-sm md:prose-lg prose-headings:font-serif prose-headings:text-brand-primary prose-p:text-brand-secondary prose-p:font-light prose-blockquote:border-brand-accent max-w-none">
                            {article.content}
                        </div>

                        {/* Tags */}
                        <div className="mt-12 md:mt-16 pt-8 border-t border-brand-border">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">Related Topics</h4>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-brand-soft text-brand-primary text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1">
                                        <Hash size={10} className="md:w-3 md:h-3 text-brand-accent" /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <style>{`
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        .animate-slide-in-right {
            animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
};
