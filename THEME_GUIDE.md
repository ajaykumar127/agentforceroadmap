# 🎨 Professional Theme Guide

## Overview

The Agentforce Roadmap portal has been refreshed with a modern, professional design system inspired by enterprise-grade applications. The new theme emphasizes clarity, accessibility, and a polished corporate aesthetic.

---

## 🎯 Design Philosophy

### Professional & Corporate
- Clean, sophisticated color palette
- Subtle gradients and refined shadows
- Consistent spacing and typography
- Enterprise-ready appearance

### User-Centric
- High contrast for readability
- Clear visual hierarchy
- Smooth animations and transitions
- Intuitive interactive elements

### Modern & Polished
- Contemporary design patterns
- Refined micro-interactions
- Professional color theory
- Accessible and inclusive

---

## 🎨 Color Palette

### Primary Colors
```css
--primary-color: #0070d2    /* Salesforce Blue - Main brand color */
--primary-dark: #00396b     /* Dark Blue - Rich, professional */
--primary-light: #1b96ff    /* Light Blue - Highlights */
--secondary-color: #0a1f44  /* Navy - Deep, authoritative */
--accent-color: #16325c     /* Slate Blue - Supporting accent */
--accent-light: #5eb4ff     /* Sky Blue - Light accents */
```

### Status Colors
```css
--success-color: #04844b    /* Forest Green - Success states */
--success-light: #e3f8ef    /* Mint - Success backgrounds */
--warning-color: #fe9339    /* Orange - Warnings */
--warning-light: #fff4e8    /* Peach - Warning backgrounds */
--info-color: #0070d2       /* Blue - Information */
--info-light: #e8f4fd       /* Sky - Info backgrounds */
--danger-color: #c23934     /* Red - Errors & dangers */
```

### Neutral Colors
```css
--bg-primary: #ffffff       /* Pure White - Main background */
--bg-secondary: #f4f6f9     /* Light Gray - Secondary backgrounds */
--bg-tertiary: #eceff4      /* Soft Gray - Tertiary backgrounds */
--bg-dark: #16325c          /* Dark Slate - Dark backgrounds */
```

### Text Colors
```css
--text-primary: #181818     /* Almost Black - Primary text */
--text-secondary: #3e3e3c   /* Dark Gray - Secondary text */
--text-tertiary: #706e6b    /* Medium Gray - Tertiary text */
--text-light: #959492       /* Light Gray - Subtle text */
--text-inverse: #ffffff     /* White - Text on dark backgrounds */
```

### Border Colors
```css
--border-color: #dddbda     /* Light Gray - Standard borders */
--border-light: #ecebea     /* Very Light Gray - Subtle borders */
--border-dark: #c9c7c5      /* Medium Gray - Prominent borders */
```

---

## 🌟 Key Design Elements

### Shadows (Layered & Soft)
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)                         /* Subtle elevation */
--shadow-md: 0 2px 4px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.05)    /* Card elevation */
--shadow-lg: 0 4px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.08)    /* Prominent elevation */
--shadow-xl: 0 8px 16px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.1)    /* Modal/overlay elevation */
```

### Border Radius
```css
--radius-sm: 4px      /* Buttons, small elements */
--radius-md: 8px      /* Cards, inputs */
--radius-lg: 12px     /* Large cards, containers */
--radius-xl: 16px     /* Modals, major containers */
```

### Spacing Scale
```css
--spacing-xs: 0.25rem    /* 4px - Minimal spacing */
--spacing-sm: 0.5rem     /* 8px - Small spacing */
--spacing-md: 1rem       /* 16px - Standard spacing */
--spacing-lg: 1.5rem     /* 24px - Large spacing */
--spacing-xl: 2rem       /* 32px - Extra large spacing */
--spacing-2xl: 3rem      /* 48px - Section spacing */
```

---

## 📐 Typography

### Font Stack
```css
font-family: 'Salesforce Sans', 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Secondary headings
- **Semibold**: 600 - UI elements, buttons
- **Bold**: 700 - Primary headings, emphasis

### Letter Spacing
- **Headings**: -0.02em to -0.03em (tighter for large text)
- **Body**: 0 (default)
- **Uppercase labels**: 0.02em to 0.03em (looser for readability)

---

## 🎭 Component Styling

### Buttons & Links

#### Primary Buttons
- **Background**: Linear gradient (primary → primary-dark)
- **Hover**: Lift effect with enhanced shadow
- **Padding**: 0.875rem × 1.5rem
- **Border Radius**: 8px (--radius-md)
- **Font Weight**: 600
- **Shadow**: --shadow-md

#### Secondary Buttons
- **Background**: White with border
- **Border**: 2px solid --border-color
- **Hover**: Border color changes to primary
- **Shadow**: --shadow-sm

### Cards

#### Standard Cards
- **Background**: White
- **Border**: 1px solid --border-light
- **Border Radius**: 12px (--radius-lg)
- **Padding**: --spacing-xl (2rem)
- **Shadow**: --shadow-sm
- **Hover**: --shadow-lg + translateY(-2px)

#### Feature Cards (Release Details)
- **Background**: --bg-secondary
- **Border-Left**: 4px solid --primary-color
- **Hover**: Transform translateX(8px) + background → white

### Badges

#### Status Badges
- **Border Radius**: 100px (pill shape)
- **Padding**: 0.375rem × 0.875rem
- **Font Size**: 0.8125rem
- **Font Weight**: 600
- **Text Transform**: uppercase
- **Letter Spacing**: 0.02em
- **Shadow**: --shadow-sm

**Colors**:
- **Completed/GA**: --success-light background + --success-color text
- **In Progress/Beta**: --warning-light background + --warning-color text
- **Planned/Pilot**: --info-light background + --info-color text

### Modals

#### Modal Overlay
- **Background**: rgba(22, 50, 92, 0.75) with backdrop blur
- **Animation**: fadeIn 0.2s

#### Modal Content
- **Border Radius**: --radius-xl (16px)
- **Shadow**: --shadow-xl
- **Border**: 1px solid --border-light
- **Animation**: slideUp 0.3s cubic-bezier

#### Modal Header
- **Background**: Linear gradient (--bg-secondary → white)
- **Border-Bottom**: 2px solid --border-light
- **Sticky**: Top positioned

---

## 🎬 Animations & Transitions

### Standard Timing Function
```css
cubic-bezier(0.4, 0, 0.2, 1)  /* Material Design standard easing */
```

### Transition Durations
- **Quick**: 0.2s - Hover states, simple color changes
- **Standard**: 0.3s - Most UI interactions
- **Smooth**: 0.4s - Complex animations
- **Slow**: 0.6s - Expandable sections

### Common Effects
- **Card Hover**: translateY(-2px to -6px) + shadow enhancement
- **Button Hover**: translateY(-2px) + shadow + gradient shift
- **Close Button**: rotate(90deg) on hover
- **Expand Toggle**: rotate(90deg) + background/color change

---

## 🎯 Layout Patterns

### Header
- **Background**: Linear gradient (primary → primary-dark)
- **Accent Line**: 3px gradient line at bottom (light blue)
- **Padding**: 1.75rem × 2rem
- **Z-index**: 200

### Controls Bar
- **Background**: White with backdrop-filter blur
- **Border-Bottom**: 2px solid --border-light
- **Position**: Sticky
- **Z-index**: 100
- **Shadow**: --shadow-sm

### View Toggle
- **Container**: --bg-secondary with 4px padding
- **Active State**: White background + primary color text
- **Border Radius**: --radius-md for container, --radius-sm for buttons

### Content Cards Grid
- **Grid**: repeat(auto-fit, minmax(320px, 1fr))
- **Gap**: --spacing-xl (2rem)
- **Max Width**: 1200-1400px

---

## 🎨 Gradient Usage

### Primary Gradients
```css
/* Headers, Primary Buttons */
background: linear-gradient(135deg, #0070d2 0%, #00396b 100%);

/* Hover States */
background: linear-gradient(135deg, #1b96ff 0%, #0070d2 100%);
```

### Accent Gradients
```css
/* Secondary Elements, External Links */
background: linear-gradient(135deg, #16325c 0%, #0a1f44 100%);

/* Subtle Backgrounds */
background: linear-gradient(135deg, #f4f6f9 0%, #eceff4 100%);
```

### Info Backgrounds
```css
/* Availability Sections, Info Cards */
background: linear-gradient(135deg, #e8f4fd 0%, #f4f6f9 100%);
```

---

## ♿ Accessibility Features

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Important UI elements meet AAA standards where possible
- Status colors have sufficient contrast on light backgrounds

### Focus States
- **Outline**: 3px ring in primary color with 10% opacity
- **Border**: Changes to primary color
- **Shadow**: 0 0 0 3px rgba(0, 112, 210, 0.1)

### Interactive Elements
- Minimum touch target: 40px × 40px
- Clear hover states on all clickable elements
- Visual feedback for all interactions

---

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px - Full layout
- **Tablet**: 481px - 768px - Adjusted spacing
- **Mobile**: ≤ 480px - Stacked layout

### Mobile Optimizations
- **Padding**: Reduced to 1rem
- **Font Sizes**: Slightly smaller headings
- **Grid**: Stacks to single column
- **Buttons**: Full width where appropriate

---

## 🔧 Implementation Notes

### CSS Variables
All colors, spacing, and design tokens are defined as CSS variables in `:root` for:
- Easy theme customization
- Consistent application
- Maintainability
- Dark mode support (future)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- Backdrop filters (with graceful degradation)

### Performance
- Hardware-accelerated transforms
- Efficient animations (transform, opacity)
- Minimal repaints/reflows
- Optimized shadows

---

## 🚀 Future Enhancements

### Potential Additions
1. **Dark Mode**: Using CSS variables for easy theme switching
2. **High Contrast Mode**: For enhanced accessibility
3. **Custom Themes**: Per-user or per-team color schemes
4. **Motion Preferences**: Respect prefers-reduced-motion
5. **Print Styles**: Optimized for documentation printing

---

## 📚 Usage Examples

### Creating a Primary Button
```html
<button class="prd-link">
    📄 View Documentation →
</button>
```

### Creating a Card
```html
<div class="feature-card">
    <div class="feature-header">
        <h3>Feature Title</h3>
        <span class="feature-status ga">GA</span>
    </div>
    <p class="feature-description">Description text</p>
</div>
```

### Creating a Badge
```html
<span class="status-badge completed">
    ✓ Completed
</span>
```

---

## 🎯 Best Practices

### Do's ✅
- Use CSS variables for all colors
- Maintain consistent spacing with spacing variables
- Use gradients sparingly for primary elements
- Provide clear hover states
- Use semantic HTML
- Test on multiple devices/browsers

### Don'ts ❌
- Don't hardcode colors
- Don't mix spacing values (use variables)
- Don't overuse animations
- Don't sacrifice accessibility for aesthetics
- Don't use excessive shadows
- Don't ignore mobile responsiveness

---

## 📞 Support & Maintenance

### Testing Checklist
- [ ] All colors meet contrast requirements
- [ ] Interactive elements have clear focus states
- [ ] Animations are smooth (60fps)
- [ ] Mobile layout works correctly
- [ ] Cards align properly in grid
- [ ] Gradients display correctly
- [ ] Shadows are visible but not overwhelming

### Common Customizations
1. **Change Primary Color**: Update `--primary-color` and related variables
2. **Adjust Spacing**: Modify spacing variables
3. **Change Border Radius**: Update radius variables
4. **Modify Shadows**: Adjust shadow definitions

---

**Last Updated**: November 12, 2025  
**Version**: 3.0 - Professional Theme  
**Design System**: Salesforce-inspired Corporate Design

