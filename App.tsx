import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { PropertyDetails } from './pages/PropertyDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Journal } from './pages/Journal';
import { Admin } from './pages/Admin';
import { AIAssistant } from './components/AIAssistant';
import { DataProvider } from './context/DataContext';

const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen text-slate-800 font-sans">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <AIAssistant />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
