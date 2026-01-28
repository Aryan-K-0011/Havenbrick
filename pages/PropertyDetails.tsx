import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, MapPin, Shield, ArrowLeft, X, Phone, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, addInquiry } = useData();
  const property = properties.find(p => p.id === id);

  const [modalType, setModalType] = useState<'inquire' | 'tour' | 'agent' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => window.scrollTo(0, 0), [id]);

  if (!property) return <div className="min-h-screen flex items-center justify-center">Property Not Found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'inquire' || modalType === 'tour') {
      addInquiry({
        type: modalType === 'inquire' ? 'General Inquiry' : 'Private Tour',
        propertyTitle: property.title,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setModalType(null);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-brand-primary">
      
      {/* 1. Immersive Hero */}
      <div className="relative h-[60vh] md:h-[85vh] w-full">
        <img src={property.image} className="w-full h-full object-cover" alt={property.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute top-24 left-6 md:top-28 md:left-20 z-10">
            <Link to="/listings" className="group flex items-center gap-2 text-white/80 hover:text-brand-accent transition-colors mb-6">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Collection</span>
            </Link>
        </div>

        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-20 text-white max-w-4xl pr-6">
            <span className="px-3 py-1 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest mb-4 inline-block rounded-sm">
                {property.type === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-8xl font-serif mb-4 leading-none drop-shadow-2xl">{property.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                <p className="font-serif text-2xl md:text-4xl italic text-brand-accent">${property.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm tracking-widest uppercase">
                    <MapPin size={14} />
                    {property.address}
                </div>
            </div>
        </div>
      </div>

      {/* 2. At a Glance Bar */}
      <div className="border-b border-brand-border bg-white sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-6 md:gap-16 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                  <div className="shrink-0">
                      <span className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Bedrooms</span>
                      <span className="text-xl md:text-2xl font-serif">{property.beds}</span>
                  </div>
                  <div className="shrink-0">
                      <span className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Bathrooms</span>
                      <span className="text-xl md:text-2xl font-serif">{property.baths}</span>
                  </div>
                  <div className="shrink-0">
                      <span className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Interior</span>
                      <span className="text-xl md:text-2xl font-serif">{property.sqft.toLocaleString()} <span className="text-sm text-brand-secondary font-sans">sqft</span></span>
                  </div>
                  <div className="hidden md:block shrink-0">
                      <span className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Reference</span>
                      <span className="text-xl md:text-2xl font-serif">#{property.id.padStart(4, '0')}</span>
                  </div>
              </div>
              <button 
                onClick={() => setModalType('inquire')}
                className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors rounded-sm shadow-md"
              >
                  Inquire
              </button>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
         {/* Main Content (Left) */}
         <div className="lg:col-span-8 order-2 lg:order-1">
            
            {/* The Story */}
            <div className="mb-12 md:mb-16">
                <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 block">The Residence</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 text-brand-primary">A Masterpiece of Design</h2>
                <div className="prose prose-lg max-w-none font-light leading-relaxed text-brand-secondary/90 whitespace-pre-line text-sm md:text-base">
                    <p className="first-letter:text-5xl md:first-letter:text-6xl first-letter:float-left first-letter:mr-4 first-letter:text-brand-primary first-letter:font-serif">
                        {property.extendedDescription}
                    </p>
                </div>
            </div>

            {/* Amenities Grid */}
            <div className="mb-12 md:mb-16 border-t border-brand-border pt-8 md:pt-12">
                <h3 className="text-xl md:text-2xl font-serif mb-6 md:mb-8">Amenities & Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-y-6 md:gap-x-4">
                    {property.features.map(f => (
                        <div key={f} className="flex items-start gap-3">
                            <CheckCircle size={18} className="text-brand-accent mt-0.5 shrink-0" />
                            <span className="text-sm text-brand-secondary uppercase tracking-wider">{f}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specifications Table */}
            <div className="mb-12 md:mb-16 border-t border-brand-border pt-8 md:pt-12">
                <h3 className="text-xl md:text-2xl font-serif mb-6 md:mb-8">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 bg-brand-soft p-6 md:p-8 rounded-lg border border-brand-border">
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Year Built</span>
                        <span className="text-base md:text-lg font-serif">{property.specs?.yearBuilt || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Lot Size</span>
                        <span className="text-base md:text-lg font-serif">{property.specs?.lotSize || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Zoning</span>
                        <span className="text-base md:text-lg font-serif">{property.specs?.zoning || 'Residential'}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Parking</span>
                        <span className="text-base md:text-lg font-serif">{property.specs?.parking || 'Garage'}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">HOA Fees</span>
                        <span className="text-base md:text-lg font-serif">{property.specs?.hoa || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-1">Exposure</span>
                        <span className="text-base md:text-lg font-serif">{property.specs?.exposure || 'Various'}</span>
                    </div>
                </div>
            </div>

         </div>

         {/* Sticky Sidebar (Right) */}
         <div className="lg:col-span-4 order-1 lg:order-2">
             <div className="sticky top-24 md:top-40 space-y-6 md:space-y-8">
                 
                 {/* Agent Card */}
                 <div className="p-6 md:p-8 border border-brand-border bg-white rounded-lg shadow-xl shadow-brand-primary/5">
                     <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8 border-b border-brand-border pb-6 md:pb-8">
                         <img src={property.agent.image} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-brand-border" />
                         <div>
                             <p className="font-serif text-xl md:text-2xl text-brand-primary">{property.agent.name}</p>
                             <p className="text-[10px] md:text-xs uppercase tracking-widest text-brand-accent mb-2">Senior Partner</p>
                             <div className="flex items-center gap-2 text-[10px] md:text-xs text-brand-secondary">
                                 <Shield size={12} className="text-green-600" />
                                 <span>Verified Broker</span>
                             </div>
                         </div>
                     </div>
                     
                     <div className="space-y-4">
                        <button 
                            onClick={() => setModalType('tour')}
                            className="w-full py-3 md:py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors rounded-sm shadow-md"
                        >
                            Schedule Private Tour
                        </button>
                        <button 
                            onClick={() => setModalType('agent')}
                            className="w-full py-3 md:py-4 border border-brand-border text-brand-primary font-bold uppercase tracking-widest text-xs hover:bg-brand-soft transition-colors rounded-sm"
                        >
                            Contact Agent
                        </button>
                     </div>
                     <p className="text-center text-[8px] md:text-[10px] text-brand-secondary mt-6 leading-relaxed">
                         By inquiring, you agree to Havenbrick's Terms of Service and Privacy Policy.
                     </p>
                 </div>

                 {/* Download Brochure */}
                 <div className="bg-brand-primary p-6 md:p-8 rounded-lg text-white text-center hidden md:block">
                     <h4 className="font-serif text-2xl mb-2">Digital Brochure</h4>
                     <p className="text-white/60 text-sm mb-6 font-light">Get the complete floor plans and high-res gallery sent to your inbox.</p>
                     <button className="text-xs font-bold uppercase tracking-widest border-b border-brand-accent pb-1 text-brand-accent hover:text-white hover:border-white transition-colors">
                         Download PDF
                     </button>
                 </div>

             </div>
         </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalType(null)}></div>
            <div className="relative bg-brand-bg w-full max-w-md p-6 md:p-8 rounded-lg shadow-2xl animate-fade-in-up">
                <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-brand-secondary hover:text-brand-primary"><X size={20} /></button>
                
                {modalType === 'agent' ? (
                    <div className="text-center">
                        <img src={property.agent.image} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 border-2 border-brand-accent" />
                        <h3 className="text-2xl font-serif text-brand-primary mb-2">{property.agent.name}</h3>
                        <p className="text-brand-secondary text-sm mb-6">Senior Partner</p>
                        <div className="space-y-4">
                             <a href={`tel:${property.agent.phone}`} className="flex items-center justify-center gap-3 w-full py-3 bg-brand-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
                                 <Phone size={16} /> Call {property.agent.phone}
                             </a>
                             <a href="mailto:agent@havenbrick.com" className="flex items-center justify-center gap-3 w-full py-3 border border-brand-border text-brand-primary text-sm font-bold uppercase tracking-widest hover:bg-brand-soft transition-colors">
                                 <Mail size={16} /> Email Agent
                             </a>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-2xl font-serif text-brand-primary mb-2">
                            {modalType === 'tour' ? 'Schedule Private Tour' : 'Inquire about Residence'}
                        </h3>
                        <p className="text-xs text-brand-secondary uppercase tracking-widest mb-6">{property.title}</p>
                        
                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-6 text-center rounded-lg">
                                <CheckCircle size={40} className="mx-auto mb-3" />
                                <h4 className="font-bold mb-1">Request Received</h4>
                                <p className="text-sm">Our concierge will contact you shortly to confirm details.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="w-full p-3 bg-white border border-brand-border rounded-sm focus:border-brand-accent outline-none font-serif"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                                <input 
                                    required 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full p-3 bg-white border border-brand-border rounded-sm focus:border-brand-accent outline-none font-serif"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                                <input 
                                    required 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    className="w-full p-3 bg-white border border-brand-border rounded-sm focus:border-brand-accent outline-none font-serif"
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                />
                                <textarea 
                                    placeholder={modalType === 'tour' ? "Preferred dates/times for viewing..." : "I'm interested in this property because..."}
                                    className="w-full p-3 bg-white border border-brand-border rounded-sm focus:border-brand-accent outline-none font-serif h-24 resize-none"
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                                <button type="submit" className="w-full py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors shadow-lg mt-2">
                                    Send Request
                                </button>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
      )}

    </div>
  );
};
