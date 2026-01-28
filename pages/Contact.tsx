import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary pt-24 md:pt-32 pb-20">
      
      {/* 1. Intro */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
          <h1 className="text-5xl md:text-8xl font-serif mb-6 md:mb-8">Begin the <br/> Conversation</h1>
          <p className="text-brand-secondary text-lg md:text-xl font-light max-w-2xl leading-relaxed">
             Whether you are looking to acquire a significant asset or divest from one, our Private Office is at your disposal. We operate with strict confidentiality.
           </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Direct Lines & Locations */}
        <div className="lg:col-span-5 space-y-12 md:space-y-16">
           
           {/* Departments */}
           <div className="space-y-6 md:space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-border pb-4">Department Direct Lines</h3>
              
              <div className="group">
                  <h4 className="text-xl md:text-2xl font-serif group-hover:text-brand-accent transition-colors">Acquisitions</h4>
                  <p className="text-sm text-brand-secondary mt-1">For buyers and investors</p>
                  <p className="mt-2 font-medium">acquisitions@havenbrick.com</p>
              </div>

              <div className="group">
                  <h4 className="text-xl md:text-2xl font-serif group-hover:text-brand-accent transition-colors">The Private Office</h4>
                  <p className="text-sm text-brand-secondary mt-1">Off-market transactions</p>
                  <p className="mt-2 font-medium">private@havenbrick.com</p>
              </div>

              <div className="group">
                  <h4 className="text-xl md:text-2xl font-serif group-hover:text-brand-accent transition-colors">Press & Media</h4>
                  <p className="text-sm text-brand-secondary mt-1">Inquiries and features</p>
                  <p className="mt-2 font-medium">press@havenbrick.com</p>
              </div>
           </div>

           {/* Flagship Locations */}
           <div className="space-y-6 md:space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent border-b border-brand-border pb-4">Our Flagships</h3>
              
              <div className="grid grid-cols-2 gap-8">
                  <div>
                      <h5 className="font-bold uppercase text-xs tracking-wider mb-2">New York</h5>
                      <p className="text-sm text-brand-secondary leading-relaxed">
                          101 Park Avenue<br/>
                          Penthouse Suite<br/>
                          New York, NY 10178
                      </p>
                  </div>
                  <div>
                      <h5 className="font-bold uppercase text-xs tracking-wider mb-2">London</h5>
                      <p className="text-sm text-brand-secondary leading-relaxed">
                          14 Mayfair Place<br/>
                          Mayfair<br/>
                          London W1J 8AJ
                      </p>
                  </div>
                  <div>
                      <h5 className="font-bold uppercase text-xs tracking-wider mb-2">Dubai</h5>
                      <p className="text-sm text-brand-secondary leading-relaxed">
                          Boulevard Plaza 1<br/>
                          Downtown Dubai<br/>
                          UAE
                      </p>
                  </div>
              </div>
           </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-14 border border-brand-border rounded-sm shadow-2xl shadow-brand-primary/5 sticky top-32">
               <div className="flex justify-between items-center mb-8 md:mb-10">
                   <h3 className="text-2xl md:text-3xl font-serif">Secure Inquiry</h3>
                   <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                       <Clock size={12} />
                       <span>Avg Response: 2 Hrs</span>
                   </div>
               </div>

               <form className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2 group">
                          <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-focus-within:text-brand-accent transition-colors">First Name</label>
                          <input type="text" className="w-full bg-transparent border-b border-brand-border py-2 md:py-3 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors font-serif text-base md:text-lg" placeholder="Jane" />
                      </div>
                      <div className="space-y-2 group">
                          <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-focus-within:text-brand-accent transition-colors">Last Name</label>
                          <input type="text" className="w-full bg-transparent border-b border-brand-border py-2 md:py-3 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors font-serif text-base md:text-lg" placeholder="Doe" />
                      </div>
                  </div>

                  <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-focus-within:text-brand-accent transition-colors">Email Address</label>
                      <input type="email" className="w-full bg-transparent border-b border-brand-border py-2 md:py-3 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors font-serif text-base md:text-lg" placeholder="jane@example.com" />
                  </div>

                  <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-focus-within:text-brand-accent transition-colors">Interest</label>
                      <select className="w-full bg-transparent border-b border-brand-border py-2 md:py-3 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors font-serif text-base md:text-lg appearance-none rounded-none">
                          <option>Buying a Property</option>
                          <option>Selling a Property</option>
                          <option>Media Inquiry</option>
                          <option>Other</option>
                      </select>
                  </div>

                  <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary group-focus-within:text-brand-accent transition-colors">Message</label>
                      <textarea rows={4} className="w-full bg-transparent border-b border-brand-border py-2 md:py-3 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors font-serif text-base md:text-lg resize-none" placeholder="Tell us about your requirements..."></textarea>
                  </div>
                  
                  <button className="w-full py-4 md:py-5 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors flex justify-between px-6 md:px-8 items-center group rounded-sm shadow-lg mt-6 md:mt-8">
                      <span>Send Secure Message</span>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </form>
            </div>
        </div>

      </div>
    </div>
  );
};
