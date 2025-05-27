import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { NavLinkItem } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { AcademicCapIcon, ShoppingCartIcon } from '../../assets/icons';

interface HeaderProps {
  tutorName: string;
  navLinks: NavLinkItem[];
  onNavLinkClick?: (path: string) => void;
}
export const Header: React.FC<HeaderProps> = ({ tutorName, navLinks, onNavLinkClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  const handleLinkClick = (path: string) => {
    if (onNavLinkClick) onNavLinkClick(path);
    setIsMobileMenuOpen(false);
    if (path === '/') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="bg-neutral-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center group focus:outline-none" 
            onClick={() => handleLinkClick('/')}
          >
            <AcademicCapIcon className="h-10 w-10 sm:h-11 sm:w-11 text-brand-primary group-hover:text-brand-secondary transition-colors" />
            <h1 className="ml-3 text-2xl sm:text-3xl font-bold font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:opacity-90 transition-opacity">
              {tutorName}
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isCartLink = link.label === 'Cart';
              return (
                <RouterNavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm transition-colors duration-150 flex items-center font-medium
                    ${isActive
                      ? 'bg-brand-primary text-text-on-brand'
                      : 'text-text-secondary hover:text-brand-primary hover:bg-neutral-muted-bg'
                    }
                    ${isCartLink ? 'relative' : ''}`
                  }
                  onClick={() => handleLinkClick(link.path)}
                >
                  {link.icon && <link.icon className={`w-5 h-5 ${isCartLink && cartItemCount > 0 ? 'mr-1.5' : 'mr-1.5'}`} />}
                  {link.label}
                  {isCartLink && cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-text-on-brand bg-brand-accent rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </RouterNavLink>
              );
            })}
          </nav>
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative inline-flex items-center p-2 mr-2 rounded-md text-text-muted hover:text-brand-primary hover:bg-neutral-muted-bg" onClick={() => handleLinkClick('/cart')}>
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-text-on-brand bg-brand-accent rounded-full">
                        {cartItemCount}
                    </span>
                )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-brand-primary hover:bg-neutral-muted-bg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
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
        <div className="md:hidden absolute top-20 inset-x-0 bg-neutral-surface/95 backdrop-blur-md p-2 space-y-1 sm:px-3 rounded-b-lg border-x border-b border-neutral-border">
          {navLinks.filter(link => link.label !== 'Cart').map((link) => ( 
            <RouterNavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base transition-colors duration-150 flex items-center font-medium
                ${isActive
                  ? 'bg-brand-primary text-text-on-brand'
                  : 'text-text-secondary hover:text-brand-primary hover:bg-neutral-muted-bg'
                }`
              }
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
