import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Waves, Landmark, Castle, X } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { useData } from '../context/DataContext';
import { FilterState } from '../types';

export const Listings: React.FC = () => {
  const { properties } = useData();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: 50000000,
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesType = filters.type === 'all' || property.type === filters.type;
      const matchesCategory = filters.category === 'all' || property.category === filters.category;
      const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term ||
                            property.title.toLowerCase().includes(term) || 
                            property.address.toLowerCase().includes(term) ||
                            property.description.toLowerCase().includes(term) ||
                            property.extendedDescription?.toLowerCase().includes(term) ||
                            property.features.some(f => f.toLowerCase().includes(term));
                            
      return matchesType && matchesCategory && matchesPrice && matchesSearch;
    });
  }, [filters, searchTerm, properties]);

  const toggleSearch = (term: string) => {
    if (searchTerm.toLowerCase() === term.toLowerCase()) {
      setSearchTerm('');
    } else {
      setSearchTerm(term);
    }
  };

  const isActive = (term: string) => searchTerm.toLowerCase() === term.toLowerCase();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary pt-24 pb-20">
      
      {/* 1. Collections Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
             <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Curated Portfolios</span>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 md:mb-6">Lifestyle Collections</h1>
             <p className="text-brand-secondary font-light text-base md:text-lg">
                 We don't just list homes; we curate lifestyles. Explore our three distinct portfolios designed for the modern connoisseur.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Collection 1 */}
              <div 
                onClick={() => toggleSearch('Waterfront')}
                className={`group relative h-[300px] md:h-[400px] overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${isActive('Waterfront') ? 'ring-4 ring-brand-accent shadow-2xl scale-[1.02]' : 'hover:scale-[1.02]'}`}
              >
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className={`absolute inset-0 transition-colors ${isActive('Waterfront') ? 'bg-black/20' : 'bg-black/40 group-hover:bg-black/50'}`}></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
                      <div className="flex justify-between items-end">
                          <div>
                            <Waves className="mb-3 md:mb-4 text-brand-accent" size={28} />
                            <h3 className="text-2xl md:text-3xl font-serif mb-2">The Waterfront Edit</h3>
                          </div>
                          {isActive('Waterfront') && <div className="mb-4 bg-brand-accent rounded-full p-1"><X size={16} /></div>}
                      </div>
                      
                      <p className={`text-white/80 text-xs md:text-sm font-light leading-relaxed mb-4 md:mb-6 transition-all duration-500 ${isActive('Waterfront') ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 transform md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100'}`}>
                          Properties that engage with the water. From Malibu cliffs to Hamptons dunes, discover homes where the horizon is your artwork.
                      </p>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-white pb-1">
                          {isActive('Waterfront') ? 'Clear Filter' : 'View Collection'}
                      </span>
                  </div>
              </div>

              {/* Collection 2 */}
              <div 
                onClick={() => toggleSearch('Skyline')}
                className={`group relative h-[300px] md:h-[400px] overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${isActive('Skyline') ? 'ring-4 ring-brand-accent shadow-2xl scale-[1.02]' : 'hover:scale-[1.02]'}`}
              >
                  <img src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className={`absolute inset-0 transition-colors ${isActive('Skyline') ? 'bg-black/20' : 'bg-black/40 group-hover:bg-black/50'}`}></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
                      <div className="flex justify-between items-end">
                          <div>
                             <Landmark className="mb-3 md:mb-4 text-brand-accent" size={28} />
                             <h3 className="text-2xl md:text-3xl font-serif mb-2">Skyline Sanctuaries</h3>
                          </div>
                          {isActive('Skyline') && <div className="mb-4 bg-brand-accent rounded-full p-1"><X size={16} /></div>}
                      </div>
                      <p className={`text-white/80 text-xs md:text-sm font-light leading-relaxed mb-4 md:mb-6 transition-all duration-500 ${isActive('Skyline') ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 transform md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100'}`}>
                          Vertical living mastered. Penthouses and high-floor residences offering command over the city grid and unparalleled service.
                      </p>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-white pb-1">
                          {isActive('Skyline') ? 'Clear Filter' : 'View Collection'}
                      </span>
                  </div>
              </div>

              {/* Collection 3 */}
              <div 
                onClick={() => toggleSearch('Estate')}
                className={`group relative h-[300px] md:h-[400px] overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${isActive('Estate') ? 'ring-4 ring-brand-accent shadow-2xl scale-[1.02]' : 'hover:scale-[1.02]'}`}
              >
                  <img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className={`absolute inset-0 transition-colors ${isActive('Estate') ? 'bg-black/20' : 'bg-black/40 group-hover:bg-black/50'}`}></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
                      <div className="flex justify-between items-end">
                          <div>
                            <Castle className="mb-3 md:mb-4 text-brand-accent" size={28} />
                            <h3 className="text-2xl md:text-3xl font-serif mb-2">Historic & Estates</h3>
                          </div>
                          {isActive('Estate') && <div className="mb-4 bg-brand-accent rounded-full p-1"><X size={16} /></div>}
                      </div>
                      <p className={`text-white/80 text-xs md:text-sm font-light leading-relaxed mb-4 md:mb-6 transition-all duration-500 ${isActive('Estate') ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 transform md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100'}`}>
                          Homes with a lineage. Restored brownstones, country manors, and properties that hold a significant place in history.
                      </p>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-white pb-1">
                          {isActive('Estate') ? 'Clear Filter' : 'View Collection'}
                      </span>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Search & Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-brand-bg/95 backdrop-blur-md py-4 md:py-6 border-y border-brand-border mb-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-96 group">
              <input
                type="text"
                placeholder="Search by location, style, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-brand-border text-brand-primary text-sm px-4 py-3 pl-10 pr-10 rounded-full focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-secondary/50 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary group-focus-within:text-brand-accent transition-colors" size={16} />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-secondary hover:text-brand-primary transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
               {['all', 'sale', 'rent'].map((opt) => (
                   <button
                    key={opt}
                    onClick={() => setFilters({...filters, type: opt as any})}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                        filters.type === opt 
                        ? 'bg-brand-primary text-white border-brand-primary' 
                        : 'bg-white text-brand-secondary border-brand-border hover:border-brand-primary'
                    }`}
                   >
                    {opt === 'all' ? 'All Status' : opt}
                   </button>
               ))}
            </div>
        </div>
      </div>

      {/* 3. Results Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
        </div>
        
        {filteredProperties.length === 0 && (
            <div className="py-20 md:py-32 text-center text-brand-secondary">
                <p className="font-serif text-2xl md:text-3xl italic mb-4 opacity-50">No residences found.</p>
                <p className="text-sm mb-6 opacity-70">We couldn't find any properties matching "{searchTerm}".</p>
                <button 
                    onClick={() => {
                        setFilters({type: 'all', category: 'all', minPrice: 0, maxPrice: 50000000});
                        setSearchTerm('');
                    }}
                    className="text-brand-accent uppercase text-xs font-bold tracking-widest border-b border-brand-accent pb-1"
                >
                    Reset Collection
                </button>
            </div>
        )}
      </div>
    </div>
  );
};