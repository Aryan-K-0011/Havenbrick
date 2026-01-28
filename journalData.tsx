import React from 'react';

export interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  content: React.ReactNode;
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Architecture",
    title: "The Renaissance of Brutalism in Coastal Modernism",
    excerpt: "How raw concrete and organic forms are redefining luxury beachside living in Malibu and beyond.",
    author: "Sophia Laurent",
    date: "Oct 24, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600",
    tags: ["Design", "Coastal", "Architecture"],
    content: (
      <>
        <p className="lead text-xl font-light leading-relaxed mb-6">
          There is a profound silence in concrete. Unlike the frantic visual noise of traditional luxury—ornate moldings, gilded fixtures—brutalism offers a sanctuary of texture and light.
        </p>
        <p className="mb-6">
          In Malibu's Carbon Beach, a new wave of architectural residences is emerging. These homes reject the white-box modernism of the early 2000s in favor of materials that age, weather, and breathe. Poured-in-place concrete, once reserved for bunkers and civic centers, has found its softening agent: the Pacific Ocean.
        </p>
        <h3 className="text-2xl font-serif mb-4 text-brand-primary">The Materiality of Silence</h3>
        <p className="mb-6">
          Leading architects like Tadao Ando and Olson Kundig have long championed this interplay. The rough, tactile surface of board-formed concrete catches the shifting coastal light in ways that drywall simply cannot. It anchors the home to the earth, providing a psychological sense of permanence in an environment defined by the fluidity of water.
        </p>
        <blockquote className="border-l-2 border-brand-accent pl-6 italic text-brand-secondary text-lg my-8">
          "Luxury is no longer about adding. It is about stripping away until only the essential remains. Concrete forces us to be honest."
        </blockquote>
        <p>
          At Havenbrick, we are seeing a 40% increase in inquiries for 'architecturally significant' properties that utilize these raw materials. The buyer profile has shifted. They are no longer looking for a palace; they are looking for a fortress of solitude.
        </p>
      </>
    )
  },
  {
    id: 2,
    category: "Market Watch",
    title: "Investment Forecast: The Shift to Secondary Cities",
    excerpt: "Why ultra-high-net-worth portfolios are increasingly diversifying into Nashville, Austin, and Charleston.",
    author: "James Caldwell",
    date: "Oct 18, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
    tags: ["Investment", "Market", "Trends"],
    content: (
      <>
        <p className="lead text-xl font-light leading-relaxed mb-6">
          The era of the 'Mega-City' monopoly is ending. While New York and London remain the gold standard for asset preservation, growth is moving elsewhere.
        </p>
        <p className="mb-6">
          Smart capital is fluid. In Q3 2024, we observed a distinct migration of wealth into what we term 'Lifestyle Sovereignty Zones'. These are cities like Austin, Nashville, and Charleston—places that offer high-culture amenities without the friction of high-density urban living.
        </p>
        <h3 className="text-2xl font-serif mb-4 text-brand-primary">The Yield Curve</h3>
        <p className="mb-6">
          The math is compelling. A $10M acquisition in Manhattan gets you a 3,000 sqft pied-à-terre. In Nashville, that same capital deploys into a 2-acre estate with equestrian facilities and significant land appreciation potential.
        </p>
        <p>
          However, the key is micro-location. In these secondary markets, the 'prime' areas are incredibly concentrated. Buying the wrong street in Charleston is a mistake that liquidity cannot fix. This is where local intelligence becomes the most valuable asset in the portfolio.
        </p>
      </>
    )
  },
  {
    id: 3,
    category: "Design",
    title: "Biophilic Interiors: Bringing the Outdoors In",
    excerpt: "From living walls to natural ventilation, exploring the wellness-centric design trends of 2025.",
    author: "Eleanor Sterling",
    date: "Oct 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600",
    tags: ["Wellness", "Interiors", "Green"],
    content: (
      <>
        <p className="lead text-xl font-light leading-relaxed mb-6">
          We spend 90% of our lives indoors. The home of the future acknowledges this not by trapping us, but by dissolving the walls that separate us from nature.
        </p>
        <p className="mb-6">
          Biophilia is more than just putting a plant in the corner. It is a fundamental architectural philosophy that mimics natural environments. We are seeing a surge in 'Living Walls'—vertical gardens integrated directly into the HVAC systems to naturally purify air.
        </p>
        <h3 className="text-2xl font-serif mb-4 text-brand-primary">Circadian Lighting</h3>
        <p className="mb-6">
          The most requested feature in 2024 renovations? Ketra lighting systems. These smart fixtures adjust their color temperature in sync with the solar day, supporting the body's natural circadian rhythm.
        </p>
        <p>
          Combined with retractable glass walls and indoor-outdoor transition spaces, the modern luxury home is becoming a wellness engine. It actively contributes to the health of its occupants.
        </p>
      </>
    )
  },
  {
    id: 4,
    category: "Market Watch",
    title: "The Art of the Off-Market Deal",
    excerpt: "Why the best properties never hit Zillow, and how to access the 'Shadow Inventory'.",
    author: "Eleanor Sterling",
    date: "Sep 22, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600",
    tags: ["Strategy", "Buying", "Exclusive"],
    content: (
      <>
        <p className="lead text-xl font-light leading-relaxed mb-6">
          In the upper echelons of real estate, privacy is the ultimate commodity. Public listings are often seen as a last resort.
        </p>
        <p className="mb-6">
          The 'Shadow Inventory' refers to properties that are for sale but effectively invisible. They are traded in whispered conversations between family offices and specialized brokers. Why? Because high-profile sellers do not want the intrusion of open houses or the speculation of the press.
        </p>
        <p>
          Accessing this inventory requires more than money; it requires reputation. Sellers need to know that the buyer is vetted, serious, and discreet. This is the primary function of the Havenbrick Private Office.
        </p>
      </>
    )
  }
];
