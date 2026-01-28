export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'residential' | 'commercial' | 'land';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  description: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    image: string;
  };
}

export interface PropertyDetails extends Property {
  extendedDescription: string;
  specs: {
    yearBuilt: string;
    lotSize: string;
    hoa: string;
    parking: string;
    exposure: string;
    zoning: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface FilterState {
  type: 'all' | 'sale' | 'rent';
  category: 'all' | 'residential' | 'commercial';
  minPrice: number;
  maxPrice: number;
}

export interface Inquiry {
  id: string;
  type: 'General Inquiry' | 'Private Tour';
  propertyTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message?: string;
  date: string;
  status: 'New' | 'Contacted';
}
