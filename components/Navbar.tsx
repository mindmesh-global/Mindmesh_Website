'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, HelpCircle, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
           
            </div>
            <span className="text-xl font-bold text-white ">MindMesh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#pricing"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              Docs
            </Link>
            <Link
              href="#community"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              Community
            </Link>
            <Link
              href="#company"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              Company
            </Link>
            <Link
              href="#more"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              More
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CTA Button */}
            <Link
              href="/download"
              className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
            >
              Get started - free
            </Link>

            {/* Action Icons */}
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </button>
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <HelpCircle size={20} strokeWidth={2.5} />
            </button>
            <button className="relative p-2 text-white hover:text-gray-300 transition-colors">
              <Calendar size={20} strokeWidth={2.5} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <User size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="#pricing"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#docs"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="#community"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                href="#company"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Company
              </Link>
              <Link
                href="#more"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                More
              </Link>
              <Link
                href="/download"
                className="block px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-center shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get started - free
              </Link>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <button className="p-2 text-white hover:text-gray-300 transition-colors">
                  <Search size={20} strokeWidth={2.5} />
                </button>
                <button className="p-2 text-white hover:text-gray-300 transition-colors">
                  <HelpCircle size={20} strokeWidth={2.5} />
                </button>
                <button className="relative p-2 text-white hover:text-gray-300 transition-colors">
                  <Calendar size={20} strokeWidth={2.5} />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
                <button className="p-2 text-white hover:text-gray-300 transition-colors">
                  <User size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

