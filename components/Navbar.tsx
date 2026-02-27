'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { OPEN_WINDOW_EVENT } from './Hero';
import { Menu, X, Search, HelpCircle, Calendar, User, ChevronDown, Linkedin, Instagram, Twitter, Youtube, Facebook, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WaitlistModal from './WaitlistModal';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter / X', href: '#', icon: Twitter },
  { name: 'YouTube', href: '#', icon: Youtube },
  { name: 'Facebook', href: '#', icon: Facebook },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMoreMobileOpen, setIsMoreMobileOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="flex items-center justify-between h-16 w-full">
          {/* Left group - Logo + Nav links (close together) */}
          <div className="flex items-center gap-6 lg:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold text-white">MindMesh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#changelog"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              Changelog
            </Link>
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
              href="#company"
              className="text-white hover:text-gray-300 transition-colors font-bold"
            >
              Company
            </Link>
            {/* More dropdown - Social + Customer Service */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onMouseEnter={() => setIsMoreOpen(true)}
                className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors font-bold"
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setIsMoreOpen(false)}
                    className="absolute top-full right-0 mt-1 w-56 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
                  >
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Social</p>
                    {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-white hover:bg-gray-700/80 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-gray-400" />
                        {name}
                      </a>
                    ))}
                    <div className="my-1 border-t border-gray-700" />
                    <Link
                      href="#customer-service"
                      className="flex items-center gap-3 px-4 py-2 text-white hover:bg-gray-700/80 transition-colors"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <Headphones className="w-4 h-4 text-gray-400" />
                      Customer Service
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          </div>

          {/* Right group - max distance from left */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* CTA Buttons first */}
            <button
              type="button"
              onClick={() => {
                if (pathname === '/') {
                  window.dispatchEvent(new CustomEvent(OPEN_WINDOW_EVENT, { detail: 'download' }));
                } else {
                  router.push('/?open=download');
                }
              }}
              className="px-4 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:translate-y-0.5 active:shadow-[0_2px_0_rgba(161,98,7,0.9)] transition-all shadow-[0_4px_0_0_rgba(161,98,7,0.95),0_6px_12px_rgba(180,83,9,0.4)]"
            >
              Download
            </button>

            {/* Join Waitlist - last */}
            <button
              type="button"
              onClick={() => setIsWaitlistOpen(true)}
              className="px-4 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:translate-y-0.5 active:shadow-[0_2px_0_rgba(161,98,7,0.9)] transition-all shadow-[0_4px_0_0_rgba(161,98,7,0.95),0_6px_12px_rgba(180,83,9,0.4)]"
            >
              Join Waitlist
            </button>

            {/* Icons - at the end */}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <Search size={18} strokeWidth={2} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <HelpCircle size={18} strokeWidth={2} />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <Calendar size={18} strokeWidth={2} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-black text-[10px] font-semibold rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <User size={18} strokeWidth={2} />
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
                href="#changelog"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Changelog
              </Link>
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
                href="#company"
                className="block text-white hover:text-gray-300 transition-colors font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Company
              </Link>
              {/* More - expandable: Social + Customer Service */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMoreMobileOpen(!isMoreMobileOpen)}
                  className="flex items-center justify-between w-full text-white hover:text-gray-300 transition-colors font-bold"
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMoreMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isMoreMobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 mt-2 space-y-1 border-l-2 border-gray-700"
                    >
                      <p className="pt-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Social</p>
                      {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 py-2 text-white hover:text-gray-300 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          {name}
                        </a>
                      ))}
                      <p className="pt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Support</p>
                      <Link
                        href="#customer-service"
                        className="flex items-center gap-3 py-2 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Headphones className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        Customer Service
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (pathname === '/') {
                    window.dispatchEvent(new CustomEvent(OPEN_WINDOW_EVENT, { detail: 'download' }));
                  } else {
                    router.push('/?open=download');
                  }
                }}
                className="block w-full mt-4 px-4 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:translate-y-0.5 active:shadow-[0_2px_0_rgba(161,98,7,0.9)] transition-all shadow-[0_4px_0_0_rgba(161,98,7,0.95),0_6px_12px_rgba(180,83,9,0.4)] text-center"
              >
                Download
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWaitlistOpen(true);
                }}
                className="block w-full mt-4 px-4 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:translate-y-0.5 active:shadow-[0_2px_0_rgba(161,98,7,0.9)] transition-all shadow-[0_4px_0_0_rgba(161,98,7,0.95),0_6px_12px_rgba(180,83,9,0.4)] text-center"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </nav>
  );
}

