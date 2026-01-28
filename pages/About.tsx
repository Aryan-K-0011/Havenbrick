import React from 'react';
import { Target, Users, Award, Globe, Briefcase } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary selection:bg-brand-accent selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 max-w-7xl mx-auto">
        <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 block animate-fade-in-up">The Institution</span>
        <h1 className="text-[12vw] md:text-[10vw] font-serif leading-[0.9] mb-8 md:mb-12 text-brand-primary animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Custodians of <br/> <span className="text-brand-secondary italic pl-8 md:pl-20">the Exceptional</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="hidden lg:block h-px bg-brand-border mt-6"></div>
            <p className="text-lg md:text-xl font-light leading-relaxed text-brand-secondary">
                Havenbrick Realty was founded on a singular premise: that a home is not merely a physical structure, but a canvas for life's most significant moments. We operate at the intersection of art, architecture, and finance, serving a clientele that demands nothing less than perfection.
            </p>
        </div>
      </section>

      {/* 2. Visual Break & Stats */}
      <div className="w-full relative">
        <div className="h-[50vh] md:h-[70vh] w-full overflow-hidden">
             <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670" className="w-full h-full object-cover grayscale opacity-90" />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-brand-primary text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                {[
                    { label: "Value Sold", value: "$4.2B+" },
                    { label: "Cities", value: "15" },
                    { label: "Years Active", value: "14" },
                    { label: "Private Deals", value: "65%" }
                ].map((stat, i) => (
                    <div key={i} className="border-l border-white/20 pl-4 md:pl-8">
                        <h4 className="text-3xl md:text-5xl font-serif mb-2 text-brand-accent">{stat.value}</h4>
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. The Partners */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">The Partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { name: "Eleanor Sterling", role: "Managing Partner", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" },
                { name: "James Caldwell", role: "Head of Acquisitions", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800" },
                { name: "Sophia Laurent", role: "Design Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800" }
            ].map((person, i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="overflow-hidden mb-6 aspect-[3/4] rounded-sm relative">
                        <img src={person.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <h3 className="text-2xl font-serif mb-1 group-hover:text-brand-accent transition-colors">{person.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">{person.role}</p>
                </div>
            ))}
        </div>
      </section>

      {/* 4. Core Values (Grid) */}
      <section className="bg-white border-t border-brand-border py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 md:mb-8 leading-tight">
                        Built on <br/> Discrete <br/> Excellence.
                    </h2>
                    <p className="text-brand-secondary font-light text-base md:text-lg leading-relaxed">
                        In an industry often defined by noise, we choose silence. Our most significant transactions never hit the public market. We safeguard the privacy of our clients with the same rigor as we evaluate the structural integrity of their investments.
                    </p>
                </div>
                <div className="space-y-12">
                    <div className="flex gap-6">
                        <div className="p-4 bg-brand-soft h-fit rounded-full"><Globe className="text-brand-accent" size={24}/></div>
                        <div>
                            <h4 className="text-xl font-serif mb-2">Global Reach, Local Depth</h4>
                            <p className="text-brand-secondary text-sm leading-relaxed">With offices in New York, London, and Singapore, our network transcends borders, connecting international capital with local treasures.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="p-4 bg-brand-soft h-fit rounded-full"><Briefcase className="text-brand-accent" size={24}/></div>
                        <div>
                            <h4 className="text-xl font-serif mb-2">Fiduciary Standard</h4>
                            <p className="text-brand-secondary text-sm leading-relaxed">We advise, we don't just sell. If a property doesn't align with your long-term portfolio goals, we will tell you to walk away.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="p-4 bg-brand-soft h-fit rounded-full"><Award className="text-brand-accent" size={24}/></div>
                        <div>
                            <h4 className="text-xl font-serif mb-2">Architectural Pedigree</h4>
                            <p className="text-brand-secondary text-sm leading-relaxed">We specialize in homes with names. From pre-war cooperatives to Pritzker-prize contemporary estates.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};
