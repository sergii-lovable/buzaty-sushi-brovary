# Quickstart Guide: Fix Menu Design Issues

**Feature**: Fix Menu Design Issues  
**Date**: 2024-12-19  
**Phase**: 1 - Design & Contracts

## Overview

This quickstart guide provides step-by-step instructions for implementing the menu design improvements. The changes focus on increasing spacing between category tabs and product grid, and implementing responsive tab layout for small screens.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Code editor with TypeScript support
- Browser developer tools for testing responsive behavior

## Implementation Steps

### Step 1: Update TabsList Spacing

**File**: `src/components/Menu.tsx`

**Current Code**:
```tsx
<TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-8" role="tablist" aria-label="Категорії меню">
```

**Updated Code**:
```tsx
<TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-12" role="tablist" aria-label="Категорії меню">
```

**Change**: Update `mb-8` (32px) to `mb-12` (48px) for increased spacing.

### Step 2: Implement Responsive Tab Layout

**File**: `src/components/Menu.tsx`

**Current Code**:
```tsx
<TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-12" role="tablist" aria-label="Категорії меню">
```

**Updated Code**:
```tsx
<TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-12 md:grid-cols-5 sm:flex sm:overflow-x-auto sm:scroll-snap-x-mandatory sm:gap-2" role="tablist" aria-label="Категорії меню">
```

**Changes**:
- Add `md:grid-cols-5` for medium screens and up
- Add `sm:flex sm:overflow-x-auto` for small screens
- Add `sm:scroll-snap-x-mandatory` for smooth scrolling
- Add `sm:gap-2` for proper spacing between tabs

### Step 3: Update TabsTrigger for Responsive Behavior

**File**: `src/components/ui/tabs.tsx`

**Current Code**:
```tsx
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
```

**Updated Code**:
```tsx
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:min-w-[44px] sm:flex-shrink-0 sm:scroll-snap-align-start",
      className,
    )}
    {...props}
  />
));
```

**Changes**:
- Add `sm:min-w-[44px]` for minimum touch target size
- Add `sm:flex-shrink-0` to prevent tab compression
- Add `sm:scroll-snap-align-start` for scroll snap behavior

### Step 4: Add Custom CSS for Scroll Indicators

**File**: `src/index.css` (or create new CSS file)

**Add to existing CSS**:
```css
/* Responsive tab scrolling styles */
@media (max-width: 767px) {
  .tabs-scroll-container {
    position: relative;
  }
  
  .tabs-scroll-container::before,
  .tabs-scroll-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    pointer-events: none;
    z-index: 10;
  }
  
  .tabs-scroll-container::before {
    left: 0;
    background: linear-gradient(to right, hsl(var(--background)), transparent);
  }
  
  .tabs-scroll-container::after {
    right: 0;
    background: linear-gradient(to left, hsl(var(--background)), transparent);
  }
}
```

### Step 5: Update Menu Component with Scroll Container

**File**: `src/components/Menu.tsx`

**Updated Code**:
```tsx
<Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
  <div className="tabs-scroll-container">
    <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-12 md:grid-cols-5 sm:flex sm:overflow-x-auto sm:scroll-snap-x-mandatory sm:gap-2" role="tablist" aria-label="Категорії меню">
      <TabsTrigger value="all">ВСІ</TabsTrigger>
      <TabsTrigger value="rolls">ФІЛАДЕЛЬФІЯ МЕНЮ</TabsTrigger>
      <TabsTrigger value="sets">НАБОРИ / СЕТИ</TabsTrigger>
      <TabsTrigger value="zapecheni">ЗАПЕЧЕНІ РОЛИ</TabsTrigger>
      <TabsTrigger value="kalifornija">КАЛІФОРНІЯ МЕНЮ</TabsTrigger>
      <TabsTrigger value="krim-sushi">СУШІ / КРІМ-СУШІ</TabsTrigger>
      <TabsTrigger value="futo-maki">МАКІ / ФУТО-МАКІ</TabsTrigger>
      <TabsTrigger value="original">ОРИГІНАЛЬНІ / ЧІЗ РОЛИ</TabsTrigger>
      <TabsTrigger value="salat">САЛАТ ЧУКА</TabsTrigger>
      <TabsTrigger value="drinks">НАПОЇ</TabsTrigger>      
    </TabsList>
  </div>
  {/* Rest of component remains the same */}
</Tabs>
```

## Testing Instructions

### Step 1: Automated Visual Testing Setup

1. **Configure Playwright for Visual Testing**:
   ```bash
   # Update playwright.config.ts to enable mobile testing
   # Uncomment mobile device configurations
   # Add visual testing settings
   ```

2. **Create Visual Test Suite**:
   ```bash
   # Create tests/menu-design-fixes.spec.ts
   # Implement spacing validation tests
   # Add responsive behavior tests
   # Include accessibility compliance tests
   ```

3. **Run Baseline Tests**:
   ```bash
   npm run test
   # Capture current state screenshots
   # Establish baseline measurements
   ```

### Step 2: Manual Visual Testing

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Test Different Screen Sizes**:
   - Open browser developer tools
   - Test at 320px, 375px, 768px, and 1200px widths
   - Verify spacing between tabs and content
   - Check tab readability and touch targets

### Step 2: Responsive Behavior Testing

1. **Mobile Testing**:
   - Resize browser to 375px width
   - Verify horizontal scrolling works
   - Check that tabs maintain 44px minimum width
   - Test scroll snap behavior

2. **Touch Testing** (if on mobile device):
   - Test touch targets are easily tappable
   - Verify smooth scrolling with momentum
   - Check that tabs don't overlap

### Step 3: Accessibility Testing

1. **Keyboard Navigation**:
   - Use Tab key to navigate to tabs
   - Use Arrow keys to move between tabs
   - Verify focus indicators are visible
   - Test Enter/Space key activation

2. **Screen Reader Testing**:
   - Use screen reader to navigate tabs
   - Verify ARIA labels are announced
   - Check that tab states are communicated

### Step 4: Performance Testing

1. **Core Web Vitals**:
   - Run Lighthouse audit
   - Verify LCP ≤ 2.5s
   - Check CLS ≤ 0.1
   - Ensure INP ≤ 200ms

2. **Scroll Performance**:
   - Test smooth scrolling on mobile
   - Verify 60fps performance
   - Check for layout shifts

## Verification Checklist

### Automated Testing (Playwright)
- [ ] Spacing validation tests pass (48px minimum)
- [ ] Responsive layout tests pass (horizontal scrolling)
- [ ] Touch target tests pass (44px minimum)
- [ ] Text readability tests pass (8px character width)
- [ ] Visual regression tests pass (screenshot comparison)
- [ ] Performance tests pass (Core Web Vitals)

### Manual Verification
- [ ] 48px spacing between tabs and content (mb-12)
- [ ] Consistent spacing across all screen sizes
- [ ] Proper visual hierarchy maintained
- [ ] Horizontal scrolling on screens < 768px
- [ ] Grid layout maintained on desktop
- [ ] Smooth scroll snap behavior
- [ ] Visual scroll indicators
- [ ] 44px minimum touch targets
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Focus indicators visible
- [ ] No impact on Core Web Vitals
- [ ] Smooth scrolling performance
- [ ] No layout shifts
- [ ] CSS-only implementation

## Troubleshooting

### Common Issues

1. **Tabs Not Scrolling Horizontally**:
   - Check that `sm:flex` and `sm:overflow-x-auto` are applied
   - Verify container width constraints
   - Ensure tabs have `sm:flex-shrink-0`

2. **Touch Targets Too Small**:
   - Verify `sm:min-w-[44px]` is applied
   - Check padding values
   - Test on actual mobile device

3. **Spacing Not Applied**:
   - Confirm `mb-12` class is present
   - Check for CSS conflicts
   - Verify Tailwind CSS is loaded

4. **Scroll Indicators Not Showing**:
   - Check CSS is loaded
   - Verify container has `tabs-scroll-container` class
   - Test gradient backgrounds

### Debug Commands

```bash
# Check Tailwind CSS compilation
npm run build

# Run linting
npm run lint

# Test responsive behavior
npm run dev
```

## Next Steps

After implementing these changes:

1. **Code Review**: Submit PR with changes
2. **Testing**: Run full test suite
3. **Deployment**: Deploy to staging for final testing
4. **Production**: Deploy to production after approval

## Rollback Plan

If issues arise, rollback by reverting the changes:

1. Revert `mb-12` back to `mb-8`
2. Remove responsive classes from TabsList
3. Remove responsive classes from TabsTrigger
4. Remove custom CSS for scroll indicators

The changes are designed to be easily reversible without breaking existing functionality.
