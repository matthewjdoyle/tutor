# Theming Guide 🎨

This website now features a sophisticated theming system that allows easy switching between beautiful color schemes. Here's how to use and customize it.

## Available Themes

### 1. **Ocean** (Default)
- **Colors**: Cool blues and teals
- **Vibe**: Professional, calm, trustworthy
- **Use case**: Perfect for educational/professional content

### 2. **Sunset**
- **Colors**: Warm oranges, reds, and pinks
- **Vibe**: Energetic, creative, vibrant
- **Use case**: Great for creative or inspirational content

### 3. **Forest**
- **Colors**: Natural greens and earth tones
- **Vibe**: Fresh, natural, growth-oriented
- **Use case**: Ideal for environmental or growth-focused themes

### 4. **Midnight**
- **Colors**: Deep purples and blues
- **Vibe**: Sophisticated, elegant, premium
- **Use case**: Perfect for luxury or high-end services

## How to Switch Themes

### For Users
1. Look for the theme switcher in the top-right corner of the website
2. Click on it to see all available themes
3. Select your preferred theme
4. The theme preference is automatically saved in your browser

### For Developers

#### Programmatic Theme Switching
```javascript
// Set theme programmatically
document.documentElement.setAttribute('data-theme', 'sunset');

// Remove theme (revert to default Ocean)
document.documentElement.removeAttribute('data-theme');

// Save to localStorage
localStorage.setItem('theme', 'forest');
```

#### Check Current Theme
```javascript
const currentTheme = document.documentElement.getAttribute('data-theme') || 'ocean';
```

## Using the New Color System

### CSS Custom Properties
The new system uses CSS custom properties that automatically change based on the selected theme:

```css
/* Primary colors (adjust based on theme) */
color: var(--color-primary-500);
background: var(--color-primary-100);

/* Text colors */
color: var(--color-text-primary);
color: var(--color-text-secondary);
color: var(--color-text-muted);

/* Background gradients */
background: var(--color-bg-primary);
background: var(--gradient-mesh);
background: var(--gradient-hero);
```

### Tailwind Classes
Use the new semantic color classes in your components:

```jsx
// Primary colors
<div className="bg-primary-500 text-white">
<div className="text-primary-600 border-primary-200">

// Semantic backgrounds
<div className="bg-background-primary">
<div className="bg-surface-elevated">

// Text colors
<p className="text-text-primary">
<p className="text-text-secondary">
<p className="text-text-muted">
```

### Beautiful Background Utilities

#### Gradient Backgrounds
```jsx
<div className="bg-gradient-mesh">        {/* Animated mesh gradient */}
<div className="bg-gradient-hero">        {/* Hero section gradient */}
<div className="bg-gradient-section">     {/* Section background */}
```

#### Pattern Backgrounds
```jsx
<div className="bg-pattern-dots">         {/* Subtle dot pattern */}
<div className="bg-pattern-grid">         {/* Grid pattern */}
<div className="bg-pattern-waves">        {/* Wave pattern */}
```

#### Enhanced Cards
```jsx
<div className="card-elevated">           {/* Elevated card with blur */}
<div className="card-floating">           {/* Floating card with animation */}
<div className="glass">                   {/* Glass morphism effect */}
```

#### Text Gradients
```jsx
<h1 className="text-gradient-primary">    {/* Primary gradient text */}
<h2 className="text-gradient-secondary">  {/* Secondary gradient text */}
<span className="text-gradient-accent">   {/* Accent gradient text */}
```

## Creating New Themes

### 1. Define Theme Colors
Add a new theme section in `src/index.css`:

```css
[data-theme="your-theme-name"] {
  /* Primary Colors */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  /* ... define all color variations */
  
  /* Background Colors */
  --color-bg-primary: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  
  /* Gradients */
  --gradient-mesh: radial-gradient(/* your gradient */);
  
  /* Patterns */
  --pattern-dots: radial-gradient(/* your pattern */);
}
```

### 2. Add Theme to Switcher
Update `src/components/common/ThemeSwitcher.tsx`:

```javascript
const themes: ThemeOption[] = [
  // ... existing themes
  {
    id: 'your-theme-name',
    name: 'Your Theme',
    description: 'Theme description',
    colors: ['#color1', '#color2', '#color3']
  }
];
```

## Best Practices

### Do ✅
- Use semantic color classes (`text-primary`, `bg-surface-primary`)
- Use the new background utilities (`bg-gradient-mesh`, `card-elevated`)
- Test your components with all themes
- Use CSS custom properties for consistent theming

### Don't ❌
- Use hardcoded colors (`bg-blue-500`)
- Mix old and new color systems
- Forget to test theme transitions
- Override theme colors with inline styles

## Legacy Support

The new system maintains backward compatibility with existing color classes:
- `brand-primary` → `var(--color-primary-500)`
- `neutral-bg` → `var(--color-bg-primary)`
- `text-primary` → `var(--color-text-primary)`

## Performance Notes

- Theme switching is instant with CSS custom properties
- All themes are loaded in CSS (no additional HTTP requests)
- Smooth transitions are built-in (0.3s ease)
- LocalStorage persistence for user preferences

## Customization Tips

1. **Subtle animations**: All new cards have subtle float animations
2. **Backdrop blur**: Use glass morphism for modern effects
3. **Pattern overlays**: Layer patterns with low opacity for texture
4. **Gradient mesh**: Perfect for hero sections and large backgrounds

---

🎨 **Happy Theming!** Your website now has a beautiful, flexible color system that adapts to any mood or brand requirement. 