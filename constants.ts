import { PropertyDetails } from './types';

export const PROPERTIES: PropertyDetails[] = [
  {
    id: '1',
    title: 'The Obsidian Penthouse',
    address: '101 Skyline Blvd, New York, NY',
    price: 45000000,
    type: 'sale',
    category: 'residential',
    beds: 4,
    baths: 4.5,
    sqft: 6200,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600',
    description: 'A floating glass sanctuary above Manhattan. Features a 2,000 sqft wraparound terrace and private elevator access.',
    extendedDescription: `Perched atop one of the city's most illustrious architectural triumphs, The Obsidian Penthouse redefines vertical living. This isn't merely an apartment; it is a command center for the modern titan. 

    Upon exiting your private elevator, you are greeted by a gallery-style foyer clad in rift-cut white oak and Noir Saint Laurent marble. The Great Room, spanning 80 feet of linear frontage, offers unobstructed, cinematic views of Central Park and the Hudson River through 14-foot floor-to-ceiling Starphire glass.
    
    The chef's kitchen is a masterpiece of minimalism, featuring custom Dada cabinetry, Gaggenau 400 series appliances, and a sculptural Calacatta Borghini marble island. The primary suite is a wing unto itself, complete with dual dressing rooms and a spa bath featuring a monolithic stone tub carved from a single block of quartzite.`,
    features: ['Panoramic City Views', '2,000sf Terrace', 'Private Elevator', 'Smart Home Lutron', '24/7 White Glove Concierge', 'Wine Cellar'],
    specs: {
      yearBuilt: '2022',
      lotSize: 'N/A',
      hoa: '$8,400/mo',
      parking: '4 Spaces (Deeded)',
      exposure: 'North, East, West',
      zoning: 'Residential'
    },
    agent: {
      name: 'Sarah Jenkins',
      phone: '(212) 555-0199',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200'
    }
  },
  {
    id: '2',
    title: 'Villa Serenity',
    address: '45 Quiet Lane, Malibu, CA',
    price: 18500000,
    type: 'sale',
    category: 'residential',
    beds: 5,
    baths: 6,
    sqft: 8400,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600',
    description: 'A brutalist-inspired concrete masterpiece softening into the Pacific coastline. Includes infinity edge pool and private beach access.',
    extendedDescription: `Where the Santa Monica Mountains meet the Pacific Ocean, Villa Serenity stands as a testament to organic modernism. Designed by world-renowned architect Tadao Ando-inspired principles, the home utilizes poured-in-place concrete, teak, and glass to create a fortress of solitude that is completely open to nature.

    The blurred line between indoor and outdoor living is achieved through automated Vitrocsa glass walls that vanish into pockets, transforming the main living area into an open-air pavilion. The infinity pool appears to spill directly into the ocean horizon.
    
    A lower entertainment level includes a Dolby Atmos screening room, a temperature-controlled wine cave holding 1,500 bottles, and a wellness center with a dry sauna and cold plunge.`,
    features: ['Infinity Pool', 'Private Beach Stairs', 'Wellness Center', 'Wine Cave', 'Screening Room', 'Gated Entry'],
    specs: {
      yearBuilt: '2019',
      lotSize: '2.4 Acres',
      hoa: 'N/A',
      parking: '6 Car Garage',
      exposure: 'South West',
      zoning: 'Residential'
    },
    agent: {
      name: 'Michael Ross',
      phone: '(310) 555-0123',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200'
    }
  },
  {
    id: '3',
    title: 'The Beacon Hill Estate',
    address: '78 Cobble St, Boston, MA',
    price: 12900000,
    type: 'sale',
    category: 'residential',
    beds: 6,
    baths: 5.5,
    sqft: 6500,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1600',
    description: 'A rare double-width brownstone dating back to 1840. Impeccably restored with original moldings, 8 fireplaces, and a hidden garden.',
    extendedDescription: `History whispers from the walls of this rare, double-width townhouse in the heart of Beacon Hill. Dating back to 1840, the property has undergone a meticulous 3-year restoration that honors its heritage while introducing modern luxury infrastructure.

    Original details include 12-foot ceilings, crown moldings, and eight working fireplaces with original marble mantels. The parlor level features a grand formal living room and library connected by pocket doors. 
    
    Hidden behind the classic brick façade is a modern elevator serving all five levels, a radiant heated garden patio with lush landscaping, and a rooftop deck offering rare glimpses of the Charles River.`,
    features: ['Original Moldings', '8 Fireplaces', 'Elevator', 'Private Walled Garden', 'Rooftop Deck', 'Au Pair Suite'],
    specs: {
      yearBuilt: '1840',
      lotSize: '0.15 Acres',
      hoa: 'N/A',
      parking: '2 Garage Spaces',
      exposure: 'South',
      zoning: 'Historic Residential'
    },
    agent: {
      name: 'Emily Chen',
      phone: '(617) 555-0145',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200'
    }
  },
  {
    id: '4',
    title: 'The Foundry Lofts',
    address: '22 Industrial Ave, Chicago, IL',
    price: 8500,
    type: 'rent',
    category: 'residential',
    beds: 2,
    baths: 2,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600',
    description: 'Raw industrial authenticity meets refined living. 16ft timber ceilings, exposed brick, and a massive steel-framed window wall.',
    extendedDescription: `Located in the historic West Loop, The Foundry Lofts offer an authentic industrial living experience that is increasingly rare. This corner unit was originally a printing press floor in the 1920s.
    
    The space is defined by its dramatic 16-foot timber ceilings and massive concrete columns. A 40-foot wall of original steel-framed factory windows floods the space with northern light. The open-concept kitchen features matte black cabinetry and a professional grade Wolf range.
    
    A custom steel staircase leads to a mezzanine loft, perfect for a home office or creative studio.`,
    features: ['16ft Timber Ceilings', 'Exposed Brick', 'Mezzanine Level', 'Chef\'s Kitchen', 'Freight Elevator', 'Heated Concrete Floors'],
    specs: {
      yearBuilt: '1924 (Renovated 2021)',
      lotSize: 'N/A',
      hoa: '$450/mo (Tenant pays)',
      parking: '1 Gated Spot',
      exposure: 'North',
      zoning: 'Live/Work'
    },
    agent: {
      name: 'David Miller',
      phone: '(312) 555-0178',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
    }
  },
  {
    id: '5',
    title: 'Silicon Heights Campus',
    address: '500 Innovation Dr, Austin, TX',
    price: 42000000,
    type: 'sale',
    category: 'commercial',
    beds: 0,
    baths: 12,
    sqft: 45000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600',
    description: 'A trophy Class-A office headquarters designed for the future of work. LEED Platinum certified with biophilic design elements.',
    extendedDescription: `Silicon Heights represents the future of the workplace. This standalone corporate headquarters offers 45,000 square feet of flexible, column-free workspace designed to foster collaboration and innovation.
    
    The building achieves LEED Platinum certification, utilizing passive cooling, solar arrays, and rainwater harvesting. The interior features a central atrium with a living green wall that spans three stories, improving air quality and acoustics.
    
    Amenities include a full-service cafeteria, a fitness center with locker rooms, and a rooftop event space capable of hosting 300 guests.`,
    features: ['LEED Platinum', 'Living Green Wall', 'Rooftop Event Space', 'Solar Array', 'Fiber Optic Backbone', 'Secure Server Room'],
    specs: {
      yearBuilt: '2023',
      lotSize: '5 Acres',
      hoa: '$12,000/mo',
      parking: '150 Spaces',
      exposure: '360 Views',
      zoning: 'Commercial Office'
    },
    agent: {
      name: 'Robert Stark',
      phone: '(512) 555-0111',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200'
    }
  },
  {
    id: '6',
    title: 'Dune House',
    address: '88 Ocean View, Charleston, SC',
    price: 15000,
    type: 'rent',
    category: 'residential',
    beds: 4,
    baths: 4.5,
    sqft: 3800,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600',
    description: 'Luxury coastal living redefined. Direct boardwalk access, wrap-around porches, and interiors by a celebrated local designer.',
    extendedDescription: `The Dune House is a celebration of Southern coastal charm, elevated to the highest standard of luxury. Situated directly on the dunes with private boardwalk access to the beach, this home captures the essence of sea island living.
    
    The inverted floor plan maximizes ocean views from the main living areas on the top floor. Shiplap walls, white oak floors, and a color palette inspired by sea glass create a soothing atmosphere. 
    
    The wrap-around porches add an additional 1,500 square feet of living space, perfect for sunset cocktails or watching the dolphins play in the surf.`,
    features: ['Direct Beach Access', 'Wrap-around Porch', 'Inverted Floor Plan', 'Outdoor Shower', 'Elevator', 'Designer Furnished'],
    specs: {
      yearBuilt: '2018',
      lotSize: '0.5 Acres',
      hoa: 'N/A',
      parking: 'Under Home',
      exposure: 'East',
      zoning: 'Residential'
    },
    agent: {
      name: 'Jessica Lee',
      phone: '(843) 555-0167',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200'
    }
  }
];