import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PropertyDetails } from '../types';
import { Lock, Plus, Edit, Trash2, Home, Inbox, BarChart2, DollarSign, Users, Eye, LogOut, X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Admin: React.FC = () => {
  const { properties, inquiries, addProperty, updateProperty, deleteProperty } = useData();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'dashboard' | 'listings' | 'inquiries'>('dashboard');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyDetails | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Simple Auth Gate
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property: PropertyDetails) => {
    setEditingProperty(property);
    setImagePreview(property.image);
    setIsModalOpen(true);
  };

  const handleSubmitProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    // Determine Image: New Upload > Form URL > Existing Prop Image > Default
    const finalImage = imagePreview || (fd.get('image') as string) || editingProperty?.image || 'https://images.unsplash.com/photo-1600596542815-3ad19fb2a2b8?q=80&w=1600';

    const propertyData: PropertyDetails = {
        id: editingProperty ? editingProperty.id : Math.random().toString(36).substr(2, 9),
        title: fd.get('title') as string,
        address: fd.get('address') as string,
        price: Number(fd.get('price')),
        type: fd.get('type') as 'sale' | 'rent',
        category: fd.get('category') as 'residential' | 'commercial' | 'land',
        beds: Number(fd.get('beds')),
        baths: Number(fd.get('baths')),
        sqft: Number(fd.get('sqft')),
        image: finalImage,
        description: fd.get('description') as string,
        extendedDescription: fd.get('extendedDescription') as string,
        features: (fd.get('features') as string).split(',').map(s => s.trim()),
        specs: {
            yearBuilt: fd.get('yearBuilt') as string,
            lotSize: fd.get('lotSize') as string || 'N/A',
            hoa: fd.get('hoa') as string || 'N/A',
            parking: fd.get('parking') as string || 'N/A',
            exposure: fd.get('exposure') as string || 'N/A',
            zoning: fd.get('zoning') as string || 'N/A'
        },
        agent: {
            name: fd.get('agentName') as string,
            phone: fd.get('agentPhone') as string,
            image: fd.get('agentImage') as string || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200'
        }
    };
    
    if (editingProperty) {
        updateProperty(editingProperty.id, propertyData);
    } else {
        addProperty(propertyData);
    }

    setIsModalOpen(false);
    setEditingProperty(null);
    setImagePreview(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-brand-accent">
        <div className="w-full max-w-md p-8 border border-brand-accent/30 rounded-lg bg-white/5 backdrop-blur-md">
          <div className="flex justify-center mb-6">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-serif text-center text-white mb-2">Restricted Access</h1>
          <p className="text-center text-white/50 text-sm mb-8 uppercase tracking-widest">Authorized Personnel Only</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Passcode"
              className="w-full bg-black/50 border border-brand-accent/50 p-4 text-white text-center tracking-widest outline-none focus:border-brand-accent transition-colors rounded-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full bg-brand-accent text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors rounded-sm">
              Authenticate
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-white/30 hover:text-white uppercase tracking-widest">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Dashboard Stats Calculation ---
  const totalValue = properties.reduce((acc, curr) => acc + (curr.type === 'sale' ? curr.price : 0), 0);
  const totalInquiries = inquiries.length;
  const recentInquiries = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-brand-primary text-white flex flex-col fixed h-full z-20 overflow-y-auto">
        <div className="p-8 border-b border-white/10">
          <h2 className="font-serif text-2xl tracking-wide">HAVENBRICK</h2>
          <span className="text-[10px] uppercase tracking-widest text-brand-accent block mt-1">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${view === 'dashboard' ? 'bg-brand-accent text-black' : 'hover:bg-white/10 text-white/70'}`}>
            <BarChart2 size={18} /> Dashboard
          </button>
          <button onClick={() => setView('listings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${view === 'listings' ? 'bg-brand-accent text-black' : 'hover:bg-white/10 text-white/70'}`}>
            <Home size={18} /> Properties
          </button>
          <button onClick={() => setView('inquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${view === 'inquiries' ? 'bg-brand-accent text-black' : 'hover:bg-white/10 text-white/70'}`}>
            <Inbox size={18} /> Inquiries
            {recentInquiries > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{recentInquiries}</span>}
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white text-sm transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        
        {/* VIEW: DASHBOARD */}
        {view === 'dashboard' && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-serif text-brand-primary mb-8">Executive Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
               <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Home size={24} /></div>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Total Listings</span>
                  </div>
                  <p className="text-3xl font-serif text-slate-800">{properties.length}</p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={24} /></div>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Portfolio Value</span>
                  </div>
                  <p className="text-3xl font-serif text-slate-800">${(totalValue / 1000000).toFixed(1)}M</p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Inbox size={24} /></div>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Total Inquiries</span>
                  </div>
                  <p className="text-3xl font-serif text-slate-800">{totalInquiries}</p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Eye size={24} /></div>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Site Visits (30d)</span>
                  </div>
                  <p className="text-3xl font-serif text-slate-800">12.4K</p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-xl font-serif mb-6">Recent Activity</h3>
              <div className="space-y-4">
                 {inquiries.slice(0, 5).map(inq => (
                   <div key={inq.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-md border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-serif text-lg">
                          {inq.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-slate-800">{inq.userName} requested info on {inq.propertyTitle}</p>
                          <p className="text-xs text-slate-500">{inq.date}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${inq.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                        {inq.status}
                      </span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: INQUIRIES */}
        {view === 'inquiries' && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-serif text-brand-primary mb-8">Client Inquiries</h1>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Date</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Client</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Property</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Type</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Message</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-500">{inq.date}</td>
                      <td className="p-4">
                        <p className="font-medium text-slate-800">{inq.userName}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{inq.propertyTitle}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${inq.type.includes('Tour') ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {inq.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-500 max-w-xs truncate" title={inq.message}>{inq.message}</td>
                      <td className="p-4 text-sm text-slate-500">
                        <div className="flex flex-col">
                           <span>{inq.userEmail}</span>
                           <span>{inq.userPhone}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: LISTINGS */}
        {view === 'listings' && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-serif text-brand-primary">Property Management</h1>
               <button 
                onClick={openAddModal} 
                className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-brand-accent transition-colors shadow-lg"
               >
                 <Plus size={16} /> Add Property
               </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Image</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Title</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Price</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Type</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-4">
                        <img src={p.image} className="w-16 h-12 object-cover rounded-sm" />
                      </td>
                      <td className="p-4 font-medium text-slate-800">{p.title}</td>
                      <td className="p-4 text-slate-600">${p.price.toLocaleString()}</td>
                      <td className="p-4 uppercase text-xs font-bold text-slate-500">{p.type}</td>
                      <td className="p-4 flex gap-3">
                         <button 
                            onClick={() => openEditModal(p)}
                            className="text-blue-600 hover:text-blue-800" 
                            title="Edit"
                         >
                            <Edit size={16} />
                         </button>
                         <button onClick={() => deleteProperty(p.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
               </table>
            </div>

            {/* SHARED MODAL FOR ADDING AND EDITING */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                 <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                    
                    {/* Header */}
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h2 className="text-2xl font-serif text-brand-primary">
                            {editingProperty ? 'Edit Residence' : 'Add New Residence'}
                        </h2>
                        <button onClick={() => {setIsModalOpen(false); setImagePreview(null); setEditingProperty(null);}} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                    </div>

                    {/* Scrollable Form Content */}
                    <div className="flex-1 overflow-y-auto p-8 bg-slate-100">
                        <form id="propertyForm" onSubmit={handleSubmitProperty} className="space-y-8">
                            
                            {/* Section 1: Basic Information */}
                            <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-brand-accent rounded-full"></span> Basic Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                                        <input name="title" defaultValue={editingProperty?.title} required placeholder="e.g. The Obsidian Penthouse" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Price ($)</label>
                                        <input name="price" type="number" defaultValue={editingProperty?.price} required placeholder="45000000" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                                        <input name="address" defaultValue={editingProperty?.address} required placeholder="123 Luxury Blvd, New York, NY" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                                        <select name="type" defaultValue={editingProperty?.type} className="w-full p-3 border border-slate-300 rounded-sm bg-white focus:border-brand-accent outline-none">
                                            <option value="sale">For Sale</option>
                                            <option value="rent">For Rent</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                                        <select name="category" defaultValue={editingProperty?.category} className="w-full p-3 border border-slate-300 rounded-sm bg-white focus:border-brand-accent outline-none">
                                            <option value="residential">Residential</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="land">Land</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Property Details & Media */}
                            <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-brand-accent rounded-full"></span> Details & Media
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Beds</label>
                                        <input name="beds" type="number" step="0.5" defaultValue={editingProperty?.beds} required className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Baths</label>
                                        <input name="baths" type="number" step="0.5" defaultValue={editingProperty?.baths} required className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Sqft</label>
                                        <input name="sqft" type="number" defaultValue={editingProperty?.sqft} required className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Year Built</label>
                                        <input name="yearBuilt" defaultValue={editingProperty?.specs.yearBuilt} required placeholder="2024" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    
                                    {/* Dual Option Image Input */}
                                    <div className="col-span-2 md:col-span-4 space-y-4">
                                         <label className="text-xs font-bold text-slate-500 uppercase block">Property Visual</label>
                                         
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                             {/* Input Area */}
                                             <div className="space-y-4">
                                                 <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Option A: Upload File</p>
                                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                                            <p className="text-xs text-slate-500 font-medium">Click to upload image</p>
                                                            <p className="text-[10px] text-slate-400">SVG, PNG, JPG (Max 5MB)</p>
                                                        </div>
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                    </label>
                                                 </div>
                                                 
                                                 <div className="relative flex items-center gap-2">
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                    <span className="text-[10px] text-slate-400 uppercase">OR</span>
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                 </div>

                                                 <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Option B: Image URL</p>
                                                    <input 
                                                        name="image" 
                                                        type="url" 
                                                        defaultValue={editingProperty?.image.startsWith('http') ? editingProperty?.image : ''}
                                                        placeholder="https://source.unsplash.com/..." 
                                                        className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none text-sm" 
                                                        onChange={(e) => setImagePreview(e.target.value)}
                                                    />
                                                 </div>
                                             </div>

                                             {/* Preview Area */}
                                             <div className="h-full min-h-[200px] bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative flex items-center justify-center group">
                                                 {imagePreview ? (
                                                     <>
                                                        <img src={imagePreview} className="w-full h-full object-cover" />
                                                        <button 
                                                            type="button"
                                                            onClick={() => setImagePreview(null)}
                                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                     </>
                                                 ) : (
                                                     <div className="text-center text-slate-400">
                                                         <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                                                         <span className="text-xs">No image selected</span>
                                                     </div>
                                                 )}
                                             </div>
                                         </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Descriptions */}
                            <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-brand-accent rounded-full"></span> Marketing Copy
                                </h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Short Description (Card View)</label>
                                        <input name="description" defaultValue={editingProperty?.description} maxLength={150} required placeholder="A brief 1-sentence summary..." className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Extended Description (Detail View)</label>
                                        <textarea name="extendedDescription" defaultValue={editingProperty?.extendedDescription} rows={6} required placeholder="Full marketing description..." className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Features (Comma Separated)</label>
                                        <input name="features" defaultValue={editingProperty?.features.join(', ')} required placeholder="Infinity Pool, Smart Home, Wine Cellar, Private Elevator..." className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Specifications */}
                            <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-brand-accent rounded-full"></span> Technical Specs
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Lot Size</label>
                                        <input name="lotSize" defaultValue={editingProperty?.specs.lotSize} placeholder="e.g. 2.5 Acres" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">HOA Fees</label>
                                        <input name="hoa" defaultValue={editingProperty?.specs.hoa} placeholder="e.g. $1,200/mo" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Parking</label>
                                        <input name="parking" defaultValue={editingProperty?.specs.parking} placeholder="e.g. 4 Car Garage" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Exposure</label>
                                        <input name="exposure" defaultValue={editingProperty?.specs.exposure} placeholder="e.g. South West" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Zoning</label>
                                        <input name="zoning" defaultValue={editingProperty?.specs.zoning} placeholder="e.g. Residential" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 5: Agent Info */}
                            <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-brand-accent rounded-full"></span> Listing Agent
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Agent Name</label>
                                        <input name="agentName" defaultValue={editingProperty?.agent.name} required placeholder="Full Name" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Agent Phone</label>
                                        <input name="agentPhone" defaultValue={editingProperty?.agent.phone} required placeholder="(555) 000-0000" className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Agent Photo URL</label>
                                        <input name="agentImage" defaultValue={editingProperty?.agent.image} required placeholder="https://..." className="w-full p-3 border border-slate-300 rounded-sm focus:border-brand-accent outline-none" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-4">
                        <button 
                            type="button" 
                            onClick={() => {setIsModalOpen(false); setImagePreview(null); setEditingProperty(null);}} 
                            className="px-6 py-3 text-slate-500 font-bold uppercase text-xs tracking-widest hover:text-slate-700"
                        >
                            Cancel
                        </button>
                        <button 
                            form="propertyForm"
                            type="submit" 
                            className="px-8 py-3 bg-brand-primary text-white font-bold uppercase text-xs tracking-widest hover:bg-brand-accent transition-colors shadow-lg flex items-center gap-2"
                        >
                            <Save size={16} /> {editingProperty ? 'Update Listing' : 'Save Listing'}
                        </button>
                    </div>

                 </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
