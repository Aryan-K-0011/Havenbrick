import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PropertyDetails, Inquiry } from '../types';
import { PROPERTIES } from '../constants';

interface DataContextType {
  properties: PropertyDetails[];
  inquiries: Inquiry[];
  addProperty: (property: PropertyDetails) => void;
  updateProperty: (id: string, updated: Partial<PropertyDetails>) => void;
  deleteProperty: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or fallback to default PROPERTIES
  const [properties, setProperties] = useState<PropertyDetails[]>(() => {
    const saved = localStorage.getItem('havenbrick_properties');
    return saved ? JSON.parse(saved) : PROPERTIES;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('havenbrick_inquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: '101',
        type: 'General Inquiry',
        propertyTitle: 'The Obsidian Penthouse',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '555-0199',
        message: 'Is this still available?',
        date: new Date().toLocaleDateString(),
        status: 'New'
      }
    ];
  });

  // Sync with LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('havenbrick_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('havenbrick_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addProperty = (property: PropertyDetails) => {
    setProperties(prev => [property, ...prev]);
  };

  const updateProperty = (id: string, updated: Partial<PropertyDetails>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const addInquiry = (data: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  return (
    <DataContext.Provider value={{ properties, inquiries, addProperty, updateProperty, deleteProperty, addInquiry }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
