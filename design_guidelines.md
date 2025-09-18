# Design Guidelines for Empty Project

## Design Approach
**Design System Approach**: Using modern minimal design principles with clean typography and purposeful spacing. This provides a flexible foundation that can be adapted for any future direction.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 16 45% 15% (Deep charcoal)
- Secondary: 220 9% 46% (Neutral gray)
- Background: 0 0% 98% (Off-white)
- Surface: 0 0% 100% (Pure white)

**Dark Mode:**
- Primary: 210 40% 85% (Light blue-gray)
- Secondary: 215 16% 65% (Warm gray)
- Background: 222 47% 11% (Deep navy)
- Surface: 217 33% 17% (Dark blue-gray)

### B. Typography
**Font Stack:** Inter (Google Fonts)
- Headings: font-semibold to font-bold (600-700)
- Body: font-normal (400)
- UI elements: font-medium (500)
- Sizes: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

### C. Layout System
**Spacing Units:** Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section margins: mb-8, mb-12, mb-16
- Element spacing: space-y-4, gap-6
- Container max-width: max-w-6xl

### D. Component Library

**Navigation:**
- Clean header with subtle border-b
- Logo/brand on left, navigation center/right
- Mobile hamburger menu with slide-out drawer
- Consistent hover states with opacity transitions

**Buttons:**
- Primary: Solid with primary color background
- Secondary: Outline style with transparent background
- Minimal: Text-only with hover underline
- Consistent padding: px-4 py-2 to px-6 py-3

**Cards:**
- Clean white/surface background with subtle shadow
- Rounded corners: rounded-lg
- Consistent padding: p-6
- Subtle border in light mode

**Forms:**
- Clean input fields with focus ring
- Consistent spacing between form elements
- Clear label hierarchy
- Proper error states with red accent

**Layout Components:**
- Centered containers with responsive breakpoints
- Grid layouts using CSS Grid or Flexbox
- Consistent section spacing
- Responsive design mobile-first approach

### E. Animations
**Minimal and Purposeful:**
- Subtle fade-in animations for page loads
- Smooth transitions for interactive elements (0.2s ease)
- Hover states with opacity or scale transforms
- No distracting or excessive animations

## Key Design Principles

1. **Clarity First:** Every element should have a clear purpose and hierarchy
2. **Generous Spacing:** Use whitespace effectively to create breathing room
3. **Consistent Patterns:** Maintain consistent spacing, typography, and interaction patterns
4. **Responsive Design:** Mobile-first approach with thoughtful breakpoints
5. **Accessibility:** Proper contrast ratios, focus states, and semantic HTML
6. **Scalability:** Design system that can grow with the project's needs

## Starting Layout Structure
- Simple header with navigation
- Main content area with centered container
- Optional sidebar for future features
- Clean footer with minimal information
- Responsive grid system for content organization

This foundation provides a professional, modern starting point that can be extended in any direction while maintaining design consistency and usability.