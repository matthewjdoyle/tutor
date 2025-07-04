import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { NavLinkItem } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { SiteLogoIcon, ShoppingCartIcon } from '../../assets/icons';

interface HeaderProps {
  tutorName: string;
  navLinks: NavLinkItem[];
  onNavLinkClick?: (path: string) => void;
}
export const Header: React.FC<HeaderProps> = ({ tutorName, navLinks, onNavLinkClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    if (onNavLinkClick) onNavLinkClick(path);
    setIsMobileMenuOpen(false);
    if (path === '/') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 shadow-lg backdrop-blur-md"
      style={{
        background: 'linear-gradient(to right, var(--color-primary-300), var(--color-secondary-300), var(--color-accent-300))',
        opacity: 0.95
      }}
    >
      {/* Darker background patterns and overlays using theme colors */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ backgroundImage: 'var(--pattern-dots)' }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, var(--color-primary-600), var(--color-secondary-600), var(--color-accent-600))',
          opacity: 0.15
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center group focus:outline-none" 
            onClick={() => handleLinkClick('/')}
          >
            <SiteLogoIcon className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-sm" />
            <h1 className={`ml-3 text-xl sm:text-2xl font-bold font-heading tracking-tight text-white group-hover:opacity-90 whitespace-nowrap drop-shadow-sm transition-all duration-300 ease-in-out ${
              isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}>
              {tutorName}
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            {cartItemCount > 0 && (
              <Link 
                to="/cart" 
                className="relative inline-flex items-center p-2 rounded-lg text-white hover:text-white transition-all duration-200 backdrop-blur-sm border border-transparent"
                style={{
                  '--hover-bg': 'rgba(255, 255, 255, 0.15)',
                  '--hover-border': 'rgba(255, 255, 255, 0.3)'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onClick={() => handleLinkClick('/cart')}
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-text-on-brand bg-brand-accent rounded-full shadow-md border border-white/30">
                    {cartItemCount}
                </span>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-all duration-200 backdrop-blur-sm border border-transparent"
              style={{
                '--hover-bg': 'rgba(255, 255, 255, 0.15)',
                '--hover-border': 'rgba(255, 255, 255, 0.3)'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div 
          className="absolute top-20 inset-x-0 backdrop-blur-md p-2 space-y-1 sm:px-3 rounded-b-lg shadow-xl"
          style={{
            background: 'linear-gradient(to bottom right, var(--color-primary-200), var(--color-secondary-200), var(--color-accent-200))',
            borderLeft: '1px solid var(--color-primary-400)',
            borderRight: '1px solid var(--color-primary-400)',
            borderBottom: '1px solid var(--color-primary-400)',
            opacity: 0.95
          }}
        >
          <div 
            className="absolute inset-0 opacity-15" 
            style={{ backgroundImage: 'var(--pattern-dots)' }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom right, var(--color-primary-600), var(--color-secondary-600), var(--color-accent-600))',
              opacity: 0.12
            }}
          />
          {navLinks.filter(link => link.label !== 'Cart').map((link) => ( 
            <RouterNavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base transition-all duration-200 flex items-center font-medium relative z-10
                ${isActive
                  ? 'bg-brand-primary text-text-on-brand shadow-md'
                  : 'text-white hover:text-white border border-transparent'
                }`
              }
              style={({ isActive }) => isActive ? {} : {
                '--hover-bg': 'rgba(255, 255, 255, 0.15)',
                '--hover-border': 'rgba(255, 255, 255, 0.3)'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains('bg-brand-primary')) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains('bg-brand-primary')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
              onClick={() => handleLinkClick(link.path)}
            >
              {link.icon && <link.icon className="w-5 h-5 mr-2"/>}
              {link.label}
            </RouterNavLink>
          ))}
        </div>
      )}
    </header>
  );
};
