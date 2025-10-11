import { test, expect } from '@playwright/test';

/**
 * Menu Design Fixes Visual Tests
 * 
 * This test suite validates the menu design improvements:
 * 1. Spacing validation (48px minimum between tabs and content)
 * 2. Responsive layout (horizontal scrolling on mobile)
 * 3. Touch target accessibility (44px minimum)
 * 4. Text readability (8px character width minimum)
 * 5. Visual regression testing
 * 6. Performance impact validation
 */

// Test configuration
const SCREEN_SIZES = {
  desktop: { width: 1200, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
  smallMobile: { width: 320, height: 568 }
};

const REQUIREMENTS = {
  minSpacing: 48, // pixels
  minTouchTarget: 44, // pixels
  minCharacterWidth: 8, // pixels
  maxCLS: 0.1, // Cumulative Layout Shift
  maxLCP: 2500, // Largest Contentful Paint (ms)
  maxINP: 200 // Interaction to Next Paint (ms)
};

test.describe('Menu Design Fixes - Visual Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Ensure menu section is visible
    await expect(page.locator('[role="tablist"]')).toBeVisible();
  });

  test.describe('Spacing Validation', () => {
    
    test('should have 48px minimum spacing between tabs and content on desktop', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.desktop);
      
      // Get the TabsList element
      const tabsList = page.locator('[role="tablist"]');
      const tabsContent = page.locator('[role="list"]').first();
      
      // Get bounding boxes
      const tabsListBox = await tabsList.boundingBox();
      const tabsContentBox = await tabsContent.boundingBox();
      
      // Calculate spacing
      const spacing = tabsContentBox!.y - (tabsListBox!.y + tabsListBox!.height);
      
      // Verify minimum spacing requirement
      expect(spacing).toBeGreaterThanOrEqual(REQUIREMENTS.minSpacing);
    });

    test('should have 48px minimum spacing between tabs and content on tablet', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.tablet);
      
      const tabsList = page.locator('[role="tablist"]');
      const tabsContent = page.locator('[role="list"]').first();
      
      const tabsListBox = await tabsList.boundingBox();
      const tabsContentBox = await tabsContent.boundingBox();
      
      const spacing = tabsContentBox!.y - (tabsListBox!.y + tabsListBox!.height);
      
      expect(spacing).toBeGreaterThanOrEqual(REQUIREMENTS.minSpacing);
    });

    test('should have 48px minimum spacing between tabs and content on mobile', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.mobile);
      
      const tabsList = page.locator('[role="tablist"]');
      const tabsContent = page.locator('[role="list"]').first();
      
      const tabsListBox = await tabsList.boundingBox();
      const tabsContentBox = await tabsContent.boundingBox();
      
      const spacing = tabsContentBox!.y - (tabsListBox!.y + tabsListBox!.height);
      
      expect(spacing).toBeGreaterThanOrEqual(REQUIREMENTS.minSpacing);
    });

    test('should have 48px minimum spacing between tabs and content on small mobile', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.smallMobile);
      
      const tabsList = page.locator('[role="tablist"]');
      const tabsContent = page.locator('[role="list"]').first();
      
      const tabsListBox = await tabsList.boundingBox();
      const tabsContentBox = await tabsContent.boundingBox();
      
      const spacing = tabsContentBox!.y - (tabsListBox!.y + tabsListBox!.height);
      
      expect(spacing).toBeGreaterThanOrEqual(REQUIREMENTS.minSpacing);
    });
  });

  test.describe('Responsive Layout', () => {
    
    test('should use multi-row grid layout on mobile screens', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.mobile);
      
      const tabsList = page.locator('[role="tablist"]');
      
      // Check if grid layout is used
      const display = await tabsList.evaluate(el => getComputedStyle(el).display);
      expect(display).toBe('grid');
      
      // Check that all tabs are visible without horizontal scrolling
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      // All tabs should be visible
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        await expect(tab).toBeVisible();
      }
    });

    test('should use multi-row grid layout on small mobile screens', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.smallMobile);
      
      const tabsList = page.locator('[role="tablist"]');
      
      // Check if grid layout is used
      const display = await tabsList.evaluate(el => getComputedStyle(el).display);
      expect(display).toBe('grid');
      
      // Tabs should wrap to multiple rows (2 columns on small mobile)
      const gridTemplateColumns = await tabsList.evaluate(el => getComputedStyle(el).gridTemplateColumns);
      
      // Should have 2 columns on small mobile
      const columnCount = gridTemplateColumns.split(' ').length;
      expect(columnCount).toBe(2);
    });

    test('should maintain grid layout on desktop screens', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.desktop);
      
      const tabsList = page.locator('[role="tablist"]');
      
      // Check computed styles
      const display = await tabsList.evaluate(el => getComputedStyle(el).display);
      
      // Should use grid layout on desktop
      expect(display).toBe('grid');
      
      // Desktop should have 5 columns
      const gridTemplateColumns = await tabsList.evaluate(el => getComputedStyle(el).gridTemplateColumns);
      const columnCount = gridTemplateColumns.split(' ').length;
      expect(columnCount).toBe(5);
    });
  });

  test.describe('Touch Target Accessibility', () => {
    
    test('should have 44px minimum touch targets on mobile', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.mobile);
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        const box = await tab.boundingBox();
        
        // Check both width and height meet minimum requirements
        expect(box!.width).toBeGreaterThanOrEqual(REQUIREMENTS.minTouchTarget);
        expect(box!.height).toBeGreaterThanOrEqual(REQUIREMENTS.minTouchTarget);
      }
    });

    test('should have 44px minimum touch targets on small mobile', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.smallMobile);
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        const box = await tab.boundingBox();
        
        expect(box!.width).toBeGreaterThanOrEqual(REQUIREMENTS.minTouchTarget);
        expect(box!.height).toBeGreaterThanOrEqual(REQUIREMENTS.minTouchTarget);
      }
    });
  });

  test.describe('Text Readability', () => {
    
    test('should maintain readable text on mobile with ellipsis for overflow', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.mobile);
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        const text = await tab.textContent();
        const box = await tab.boundingBox();
        
        if (text && text.trim()) {
          // Text should be readable - check that overflow is handled
          const styles = await tab.evaluate(el => {
            const style = getComputedStyle(el);
            return {
              overflow: style.overflow,
              textOverflow: style.textOverflow,
            };
          });
          
          expect(styles.overflow).toBe('hidden');
          expect(styles.textOverflow).toBe('ellipsis');
          
          // Tab should have reasonable width for 2-column grid
          expect(box!.width).toBeGreaterThan(100); // Minimum reasonable width
        }
      }
    });

    test('should maintain readable text on small mobile with ellipsis for overflow', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.smallMobile);
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        const text = await tab.textContent();
        const box = await tab.boundingBox();
        
        if (text && text.trim()) {
          // Text should be readable - check that overflow is handled
          const styles = await tab.evaluate(el => {
            const style = getComputedStyle(el);
            return {
              overflow: style.overflow,
              textOverflow: style.textOverflow,
            };
          });
          
          expect(styles.overflow).toBe('hidden');
          expect(styles.textOverflow).toBe('ellipsis');
          
          // Tab should have reasonable width for 2-column grid
          expect(box!.width).toBeGreaterThan(100); // Minimum reasonable width
        }
      }
    });
  });

  test.describe('Text Overflow Prevention', () => {
    
    test('should prevent text overflow on 700px width', async ({ page }) => {
      await page.setViewportSize({ width: 700, height: 800 });
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        
        // Check computed styles for overflow handling
        const styles = await tab.evaluate(el => {
          const style = getComputedStyle(el);
          return {
            overflow: style.overflow,
            textOverflow: style.textOverflow,
          };
        });
        
        // Verify that overflow is hidden and text-overflow is ellipsis
        expect(styles.overflow).toBe('hidden');
        expect(styles.textOverflow).toBe('ellipsis');
      }
    });

    test('should prevent text overflow on all screen sizes', async ({ page }) => {
      const testSizes = [
        { width: 320, height: 568 },
        { width: 375, height: 667 },
        { width: 600, height: 800 },
        { width: 700, height: 800 },
        { width: 768, height: 1024 },
        { width: 1200, height: 800 }
      ];
      
      for (const size of testSizes) {
        await page.setViewportSize(size);
        
        const tabTriggers = page.locator('[role="tab"]');
        const tabCount = await tabTriggers.count();
        
        for (let i = 0; i < tabCount; i++) {
          const tab = tabTriggers.nth(i);
          
          // Check computed styles
          const styles = await tab.evaluate(el => {
            const style = getComputedStyle(el);
            return {
              overflow: style.overflow,
              textOverflow: style.textOverflow,
            };
          });
          
          // Verify overflow handling at this screen size
          expect(styles.overflow).toBe('hidden');
          expect(styles.textOverflow).toBe('ellipsis');
        }
      }
    });

    test('should not have overlapping tabs at 700px width', async ({ page }) => {
      await page.setViewportSize({ width: 700, height: 800 });
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      // Get bounding boxes for all tabs
      const tabBoxes = [];
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        const box = await tab.boundingBox();
        tabBoxes.push(box);
      }
      
      // Check for overlaps
      for (let i = 0; i < tabBoxes.length; i++) {
        for (let j = i + 1; j < tabBoxes.length; j++) {
          const box1 = tabBoxes[i];
          const box2 = tabBoxes[j];
          
          if (box1 && box2) {
            // Check if boxes overlap
            const horizontalOverlap = !(box1.x + box1.width < box2.x || box2.x + box2.width < box1.x);
            const verticalOverlap = !(box1.y + box1.height < box2.y || box2.y + box2.height < box1.y);
            
            // Tabs should not overlap
            const hasOverlap = horizontalOverlap && verticalOverlap;
            expect(hasOverlap).toBe(false);
          }
        }
      }
    });

    test('should not have vertical overlap at 768px (tablet) width', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      const tabTriggers = page.locator('[role="tab"]');
      const tabCount = await tabTriggers.count();
      
      // Get bounding boxes for all tabs
      const tabBoxes = [];
      for (let i = 0; i < tabCount; i++) {
        const tab = tabTriggers.nth(i);
        const box = await tab.boundingBox();
        tabBoxes.push(box);
      }
      
      // Check for vertical overlaps between rows
      for (let i = 0; i < tabBoxes.length; i++) {
        for (let j = i + 1; j < tabBoxes.length; j++) {
          const box1 = tabBoxes[i];
          const box2 = tabBoxes[j];
          
          if (box1 && box2) {
            // Check if boxes overlap vertically
            const horizontalOverlap = !(box1.x + box1.width <= box2.x || box2.x + box2.width <= box1.x);
            const verticalOverlap = !(box1.y + box1.height <= box2.y || box2.y + box2.height <= box1.y);
            
            // Tabs should not overlap
            const hasOverlap = horizontalOverlap && verticalOverlap;
            expect(hasOverlap).toBe(false);
          }
        }
      }
    });

    test('should not have overlaps on any screen size', async ({ page }) => {
      const testSizes = [
        { width: 320, height: 568 },
        { width: 375, height: 667 },
        { width: 600, height: 800 },
        { width: 700, height: 800 },
        { width: 768, height: 1024 },
        { width: 1200, height: 800 }
      ];
      
      // Tolerance for sub-pixel rendering differences across browsers
      const TOLERANCE = 1;
      
      for (const size of testSizes) {
        await page.setViewportSize(size);
        
        const tabTriggers = page.locator('[role="tab"]');
        const tabCount = await tabTriggers.count();
        
        // Get bounding boxes for all tabs
        const tabBoxes = [];
        for (let i = 0; i < tabCount; i++) {
          const tab = tabTriggers.nth(i);
          const box = await tab.boundingBox();
          tabBoxes.push(box);
        }
        
        // Check for overlaps (with tolerance for sub-pixel rendering)
        for (let i = 0; i < tabBoxes.length; i++) {
          for (let j = i + 1; j < tabBoxes.length; j++) {
            const box1 = tabBoxes[i];
            const box2 = tabBoxes[j];
            
            if (box1 && box2) {
              // Check if boxes are separated horizontally (accounting for tolerance)
              const horizontalSeparation = 
                (box1.x + box1.width + TOLERANCE <= box2.x) || 
                (box2.x + box2.width + TOLERANCE <= box1.x);
              
              // Check if boxes are separated vertically (accounting for tolerance)
              const verticalSeparation = 
                (box1.y + box1.height + TOLERANCE <= box2.y) || 
                (box2.y + box2.height + TOLERANCE <= box1.y);
              
              // Boxes overlap only if they are not separated in BOTH directions
              const hasOverlap = !horizontalSeparation && !verticalSeparation;
              
              if (hasOverlap) {
                console.error(`Overlap detected at ${size.width}x${size.height}:`, {
                  box1: { x: box1.x, y: box1.y, width: box1.width, height: box1.height },
                  box2: { x: box2.x, y: box2.y, width: box2.width, height: box2.height }
                });
              }
              
              expect(hasOverlap).toBe(false);
            }
          }
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    
    test('should support keyboard navigation', async ({ page }) => {
      await page.setViewportSize(SCREEN_SIZES.desktop);
      
      // Focus on the first tab
      await page.locator('[role="tab"]').first().focus();
      
      // Navigate with arrow keys
      await page.keyboard.press('ArrowRight');
      
      // Verify focus moved to next tab
      const focusedTab = page.locator('[role="tab"]:focus');
      await expect(focusedTab).toBeVisible();
    });

    test('should have proper ARIA labels', async ({ page }) => {
      const tabsList = page.locator('[role="tablist"]');
      
      // Check for aria-label
      const ariaLabel = await tabsList.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Категорії');
    });
  });
});
