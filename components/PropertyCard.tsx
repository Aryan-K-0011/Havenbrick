import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group flex flex-col h-full bg-white border border-brand-border rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/property/${property.id}`}>
            <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-105"
            />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
             <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-md text-brand-primary shadow-sm rounded-sm`}>
                {property.type}
            </span>
        </div>

        {/* Price Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
             <span className="px-6 py-2 border border-white text-white uppercase text-xs font-bold tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                 View Details
             </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
             <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">{property.category}</span>
             <span className="text-brand-primary font-medium tracking-tight">${property.price.toLocaleString()}</span>
        </div>

        <h3 className="text-xl font-serif text-brand-primary mb-2 leading-tight group-hover:text-brand-accent transition-colors">
            <Link to={`/property/${property.id}`}>{property.title}</Link>
        </h3>
        
        <div className="flex items-center text-brand-secondary text-xs mb-4 pb-4 border-b border-brand-border/50">
            <MapPin size={12} className="mr-1 text-brand-secondary/70" />
            <span className="uppercase tracking-wider opacity-80">{property.address}</span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-brand-secondary/80 line-clamp-2 mb-6 font-light leading-relaxed">
            {property.description}
        </p>

        {/* Footer: Stats & Action */}
        <div className="mt-auto flex items-center justify-between">
             <div className="flex gap-4 text-brand-secondary text-xs font-medium opacity-80">
                 <span className="flex items-center gap-1"><Bed size={14} /> {property.beds}</span>
                 <span className="flex items-center gap-1"><Bath size={14} /> {property.baths}</span>
                 <span className="flex items-center gap-1"><Maximize size={14} /> {property.sqft}</span>
             </div>
             
             <Link to={`/property/${property.id}`} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary group-hover:text-brand-accent transition-colors">
                 View Residence <ArrowRight size={12} />
             </Link>
        </div>
      </div>
    </div>
  );
};
