import React, { useState, useEffect } from 'react';
import { CogIcon } from '../../assets/icons';

type Theme = 'ocean' | 'sunset' | 'forest' | 'midnight' | 'cherry' | 'autumn' | 'arctic' | 'cosmic' | 'coral' | 'lavender' | 'earth' | 'neon' | 'plasma' | 'viridis' | 'inferno' | 'magma' | 'cividis' | 'turbo' | 'coolwarm' | 'spectral';

interface ThemeOption {
  id: Theme;
  name: string;
  description: string;
  colors: string[];
  category: 'General' | 'Scientific';
}

const themes: ThemeOption[] = [
  // General Themes
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blues and teals',
    colors: ['#0ea5e9', '#3b82f6', '#14b8a6'],
    category: 'General'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm oranges and reds',
    colors: ['#f97316', '#ef4444', '#ec4899'],
    category: 'General'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural greens',
    colors: ['#22c55e', '#10b981', '#84cc16'],
    category: 'General'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep purples and blues',
    colors: ['#a855f7', '#6366f1', '#3b82f6'],
    category: 'General'
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    description: 'Soft pinks and roses',
    colors: ['#f472b6', '#ec4899', '#be185d'],
    category: 'General'
  },
  {
    id: 'autumn',
    name: 'Autumn',
    description: 'Warm browns and golds',
    colors: ['#d97706', '#dc2626', '#b45309'],
    category: 'General'
  },
  {
    id: 'arctic',
    name: 'Arctic',
    description: 'Cool whites and icy blues',
    colors: ['#0284c7', '#0369a1', '#075985'],
    category: 'General'
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    description: 'Deep space purples',
    colors: ['#7c3aed', '#5b21b6', '#4c1d95'],
    category: 'General'
  },
  {
    id: 'coral',
    name: 'Coral',
    description: 'Warm coral and salmon',
    colors: ['#f97316', '#ea580c', '#c2410c'],
    category: 'General'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Soft purples and blues',
    colors: ['#8b5cf6', '#7c3aed', '#6366f1'],
    category: 'General'
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Natural earth tones',
    colors: ['#92400e', '#78350f', '#451a03'],
    category: 'General'
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Bright electric colors',
    colors: ['#06b6d4', '#10b981', '#84cc16'],
    category: 'General'
  },
  // Scientific Themes
  {
    id: 'plasma',
    name: 'Plasma',
    description: 'Purple to pink to yellow',
    colors: ['#0d0887', '#cc4778', '#f0f921'],
    category: 'Scientific'
  },
  {
    id: 'viridis',
    name: 'Viridis',
    description: 'Purple to blue to green to yellow',
    colors: ['#440154', '#21908c', '#fde725'],
    category: 'Scientific'
  },
  {
    id: 'inferno',
    name: 'Inferno',
    description: 'Black to red to yellow',
    colors: ['#000004', '#bb3754', '#fcffa4'],
    category: 'Scientific'
  },
  {
    id: 'magma',
    name: 'Magma',
    description: 'Black to purple to white',
    colors: ['#000004', '#b63679', '#fbfcbf'],
    category: 'Scientific'
  },
  {
    id: 'cividis',
    name: 'Cividis',
    description: 'Colorblind-friendly blue to yellow',
    colors: ['#00224e', '#7e4e90', '#ffea46'],
    category: 'Scientific'
  },
  {
    id: 'turbo',
    name: 'Turbo',
    description: 'Rainbow spectrum colormap',
    colors: ['#30123b', '#4777ef', '#1ae4b6'],
    category: 'Scientific'
  },
  {
    id: 'coolwarm',
    name: 'Coolwarm',
    description: 'Blue to white to red',
    colors: ['#3b4cc0', '#b5b3b3', '#dc143c'],
    category: 'Scientific'
  },
  {
    id: 'spectral',
    name: 'Spectral',
    description: 'Red to yellow to blue',
    colors: ['#d53e4f', '#fee08b', '#3288bd'],
    category: 'Scientific'
  }
];

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('ocean');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    if (theme === 'ocean') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  const currentThemeOption = themes.find(t => t.id === currentTheme)!;
  const generalThemes = themes.filter(t => t.category === 'General');
  const scientificThemes = themes.filter(t => t.category === 'Scientific');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-primary border border-border-primary hover:bg-surface-secondary transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Change theme"
      >
        <CogIcon className="w-4 h-4 text-text-secondary" />
        <span className="text-sm font-medium text-text-secondary hidden sm:inline">
          {currentThemeOption.name}
        </span>
        <div className="flex gap-1">
          {currentThemeOption.colors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full border border-border-muted"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme Menu */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-surface-elevated border border-border-primary rounded-xl shadow-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-border-muted sticky top-0 bg-surface-elevated">
              <h3 className="text-sm font-semibold text-text-primary">Choose Theme</h3>
              <p className="text-xs text-text-muted">Switch between color schemes</p>
            </div>
            
            <div className="p-2">
              {/* General Themes */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 px-1">General</h4>
                <div className="grid grid-cols-1 gap-1">
                  {generalThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        currentTheme === theme.id
                          ? 'bg-primary-50 border border-primary-200 shadow-sm'
                          : 'hover:bg-surface-secondary border border-transparent'
                      }`}
                    >
                      <div className="flex gap-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border-muted shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary">
                          {theme.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          {theme.description}
                        </div>
                      </div>
                      
                      {currentTheme === theme.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scientific Themes */}
              <div>
                <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 px-1">Scientific</h4>
                <div className="grid grid-cols-1 gap-1">
                  {scientificThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        currentTheme === theme.id
                          ? 'bg-primary-50 border border-primary-200 shadow-sm'
                          : 'hover:bg-surface-secondary border border-transparent'
                      }`}
                    >
                      <div className="flex gap-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border-muted shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary">
                          {theme.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          {theme.description}
                        </div>
                      </div>
                      
                      {currentTheme === theme.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 