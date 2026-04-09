import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Clock, MapPin, ChefHat, GlassWater, Utensils, UtensilsCrossed, Cake, Mail, Globe, MessageSquare } from 'lucide-react';
import { menuItems } from './data/menu';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Starters': return <Utensils className="w-5 h-5" />;
      case 'Main Course': return <UtensilsCrossed className="w-5 h-5" />;
      case 'Desserts': return <Cake className="w-5 h-5" />;
      case 'Drinks': return <GlassWater className="w-5 h-5" />;
      default: return <ChefHat className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-stone-800 font-sans">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className={`text-2xl font-serif font-bold tracking-tighter transition-colors ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
            LUMINA
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Menu', 'About', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-stone-200 hover:text-white'}`}
              >
                {link}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-stone-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-stone-900' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl py-6 md:hidden border-t"
            >
              <div className="flex flex-col items-center space-y-4">
                {['Home', 'Menu', 'About', 'Contact'].map((link) => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-stone-600 font-medium uppercase tracking-widest text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ backgroundImage: "url('/hero-bg.jpg')", filter: 'brightness(0.5)' }}
        />
        <div className="container mx-auto px-4 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif text-white mb-6"
          >
            Culinary Artistry
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light italic"
          >
            Experience a symphony of flavors crafted with the finest seasonal ingredients and passionate craftsmanship.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#menu" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-sm tracking-widest uppercase text-sm font-semibold transition-all duration-300"
            >
              Explore Menu
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-16 bg-white/40 mx-auto" />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-stone-900 text-stone-200">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <MapPin className="mb-4 text-amber-500" />
            <h3 className="uppercase tracking-widest text-sm font-bold mb-2">Location</h3>
            <p className="text-stone-400 font-light">123 Culinary Avenue, Food District<br />Gourmet City, GC 54321</p>
          </div>
          <div className="flex flex-col items-center border-stone-800 md:border-x px-4">
            <Clock className="mb-4 text-amber-500" />
            <h3 className="uppercase tracking-widest text-sm font-bold mb-2">Opening Hours</h3>
            <p className="text-stone-400 font-light">Mon - Thu: 5pm - 10pm<br />Fri - Sun: 12pm - 11pm</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="mb-4 text-amber-500" />
            <h3 className="uppercase tracking-widest text-sm font-bold mb-2">Reservations</h3>
            <p className="text-stone-400 font-light">+1 (555) 123-4567<br />reservations@lumina.com</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#fdfcf9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 uppercase tracking-[0.3em] text-sm font-bold">Discover</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Our Exquisite Menu</h2>
            <div className="w-24 h-[1px] bg-stone-300 mx-auto mb-12" />
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative pb-2 text-sm uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === category 
                      ? 'text-stone-900 font-bold' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col md:flex-row gap-6 group"
                >
                  {item.image && (
                    <div className="w-full md:w-40 h-40 shrink-0 overflow-hidden rounded-sm bg-stone-100">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline border-b border-dotted border-stone-300 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <h4 className="text-xl font-serif font-medium">{item.name}</h4>
                      </div>
                      <span className="text-amber-700 font-bold font-serif">{item.price}</span>
                    </div>
                    <p className="text-stone-500 font-light leading-relaxed italic">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-24 text-center">
            <p className="text-stone-400 italic mb-8">* Please inform your server about any allergies or dietary restrictions.</p>
            <button className="border border-stone-800 px-10 py-4 hover:bg-stone-800 hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
              Download PDF Menu
            </button>
          </div>
        </div>
      </section>

      {/* Featured Dish Section (Parallax-ish) */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover -z-10"
          style={{ backgroundImage: "url('/main.jpg')", filter: 'brightness(0.4)' }}
        />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 p-12 md:p-20">
            <span className="text-amber-400 uppercase tracking-widest text-sm mb-4 block">Chef's Special</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Miso-Glazed Atlantic Salmon</h2>
            <p className="text-stone-200 font-light mb-10 italic">
              "A delicate balance of sweet and savory, served with baby bok choy and jasmine rice."
            </p>
            <span className="text-2xl text-amber-400 font-serif">$28.00</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-900 pt-24 pb-12 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="text-3xl font-serif font-bold tracking-tighter mb-8 text-white">
                LUMINA
              </div>
              <p className="text-stone-400 font-light leading-relaxed mb-8">
                Crafting unforgettable dining experiences since 2010. Excellence in every plate, warmth in every service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition-colors"><Globe size={18} /></a>
                <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition-colors"><MessageSquare size={18} /></a>
                <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition-colors"><Mail size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-8 text-amber-500">Quick Links</h4>
              <ul className="space-y-4 text-stone-400 font-light">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Private Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-8 text-amber-500">Contact Us</h4>
              <ul className="space-y-4 text-stone-400 font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-1 text-stone-500" />
                  <span>123 Culinary Avenue, Food District, Gourmet City</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-stone-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <ChefHat size={18} className="shrink-0 text-stone-500" />
                  <span>info@lumina.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-8 text-amber-500">Newsletter</h4>
              <p className="text-stone-400 font-light mb-6">Subscribe to receive updates on seasonal menus and special events.</p>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-stone-800 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500 rounded-sm"
                />
                <button className="bg-amber-600 hover:bg-amber-700 text-white py-3 text-sm uppercase tracking-widest font-bold transition-colors rounded-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-800 text-center text-stone-500 text-xs font-light tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Lumina Restaurant Group. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
