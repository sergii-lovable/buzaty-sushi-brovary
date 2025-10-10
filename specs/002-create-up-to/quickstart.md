# Quickstart: Testing & Validation Guide

**Feature**: Up-to-Date Search Engine Fallback  
**Date**: 2025-10-10

## Overview

This guide provides step-by-step instructions for testing and validating the updated noscript HTML content to ensure it meets all quality standards and success criteria.

## Prerequisites

- ✅ Vite plugin `generate-noscript.ts` has been implemented
- ✅ Plugin is registered in `vite.config.ts`
- ✅ Development server is running (`npm run dev` or `bun dev`)
- ✅ Build completes successfully (`npm run build` or `bun run build`)
- ✅ Chrome or Firefox browser installed
- ✅ Internet connection (for online validation tools)

---

## Testing Checklist

### ✅ Step 0: Build Verification (Automated Plugin)

**Purpose**: Verify the Vite plugin successfully generates noscript content during build

**Instructions**:

1. **Clean previous build**:
   ```bash
   # From repo root
   rm -rf dist
   ```

2. **Run production build**:
   ```bash
   npm run build
   # or
   bun run build
   ```

3. **Check build output**:
   - [ ] Build completes without errors
   - [ ] No plugin errors in console output
   - [ ] Build time increase is < 5 seconds compared to baseline

4. **Inspect generated HTML**:
   ```bash
   # View the noscript section in built HTML
   grep -A 50 "<noscript>" dist/index.html
   ```
   
   - [ ] Noscript section is present
   - [ ] Contains menu categories (Роли, Сети, etc.)
   - [ ] Contains menu items with prices
   - [ ] HTML structure looks well-formed

5. **Verify content completeness**:
   ```bash
   # Count menu items in generated HTML
   grep -c "<li><strong>" dist/index.html
   ```
   - [ ] Count should be 45 (matching Menu.tsx items)

6. **Test menu modification**:
   - Edit `src/components/Menu.tsx` - change one item's price
   - Rebuild: `npm run build`
   - Check `dist/index.html` noscript section
   - [ ] Modified price appears in built HTML (confirms automation works)
   - Revert the test change in Menu.tsx

**Expected Result**: Build completes successfully, dist/index.html contains complete noscript content with all 45 menu items and updated data from Menu.tsx.

**Troubleshooting**:
- If build fails with "Menu.tsx not found": Check plugin is reading correct file path
- If build fails with "menuItems not found": Verify Menu.tsx exports menuItems constant
- If HTML is incomplete: Check plugin's category filtering logic
- If prices don't update: Verify plugin is parsing Menu.tsx correctly (not cached)

---

### ✅ Step 1: Visual Verification (No JavaScript)

**Purpose**: Verify noscript content displays correctly when JavaScript is disabled

**Instructions**:

1. **Open Chrome DevTools**:
   - Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

2. **Disable JavaScript**:
   - Open Command Palette: `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows)
   - Type "JavaScript" and select "Debugger: Disable JavaScript"
   - Or: Settings (⚙️) → Preferences → Debugger → "Disable JavaScript" checkbox

3. **Load the page**:
   - Navigate to `http://localhost:5173` (or your dev server URL)
   - Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+F5` (Windows)

4. **Verify content**:
   - [ ] Page displays header with site name and tagline
   - [ ] "Наше меню" section is visible
   - [ ] All 10 category sections are present (Роли, Сети, Запечені, Салат, Сашимі, Нігірі, Гункани, Супи, Напої)
   - [ ] Each category contains menu items with name, description, and price
   - [ ] Prices are formatted as "XXX грн"
   - [ ] Contact section with phone, address, and hours is visible
   - [ ] Footer with copyright is present

5. **Check mobile layout**:
   - Toggle device toolbar: `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)
   - Select "iPhone SE" (375px) or custom size (320px)
   - [ ] No horizontal scrolling required
   - [ ] Text is readable without zooming
   - [ ] Spacing looks reasonable

6. **Re-enable JavaScript** when done:
   - Command Palette → "Debugger: Enable JavaScript"

**Expected Result**: Complete menu is visible and readable without JavaScript, matching the dynamic menu content.

---

### ✅ Step 2: HTML Validation

**Purpose**: Ensure HTML is valid and meets web standards

**Instructions**:

1. **Get page source**:
   - Visit your dev server (JavaScript enabled)
   - View page source: `Cmd+Option+U` (Mac) / `Ctrl+U` (Windows)
   - Copy entire HTML (including noscript section)

2. **Validate with W3C**:
   - Go to https://validator.w3.org/#validate_by_input
   - Paste HTML into text area
   - Click "Check"

3. **Review results**:
   - [ ] Zero errors
   - [ ] Zero warnings (or only acceptable warnings about vendor-specific meta tags)
   - [ ] Document type is HTML5
   - [ ] Character encoding is UTF-8

**Expected Result**: "Document checking completed. No errors or warnings to show."

**Troubleshooting**:
- If errors appear, check for unclosed tags in noscript section
- Verify special characters (Ukrainian letters) are properly encoded
- Ensure quotation marks in descriptions are properly escaped

---

### ✅ Step 3: Lighthouse SEO Audit

**Purpose**: Verify SEO performance and crawlability

**Instructions**:

1. **Open Lighthouse**:
   - Chrome DevTools → Lighthouse tab
   - If not visible: More tools → Lighthouse

2. **Configure audit**:
   - Mode: Navigation
   - Categories: Check "SEO" only (faster)
   - Device: Mobile

3. **Run audit**:
   - Click "Analyze page load"
   - Wait for results (~30 seconds)

4. **Check SEO score**:
   - [ ] Score ≥ 95
   - [ ] "Document has a `<title>` element" - PASS
   - [ ] "Document has a meta description" - PASS
   - [ ] "Page has valid `rel=canonical`" - PASS
   - [ ] "Links are crawlable" - PASS
   - [ ] No "Content is not sized correctly for viewport" warning

**Expected Result**: SEO score 95-100 with all checks passing.

---

### ✅ Step 4: Structured Data Validation

**Purpose**: Ensure JSON-LD structured data still validates correctly

**Instructions**:

1. **Get full page URL**:
   - Copy URL from browser (dev server or production)

2. **Google Rich Results Test**:
   - Go to https://search.google.com/test/rich-results
   - Paste URL or enter code
   - Click "Test URL"

3. **Review results**:
   - [ ] "Valid page" message appears
   - [ ] Restaurant schema detected
   - [ ] LocalBusiness schema detected
   - [ ] No errors or warnings
   - [ ] Menu items visible in preview (if supported)

**Expected Result**: Both schemas validate successfully with no errors.

**Note**: Noscript content complements structured data; both should coexist without conflicts.

---

### ✅ Step 5: Content Parity Check

**Purpose**: Verify noscript content matches Menu.tsx data exactly

**Instructions**:

1. **Count menu items**:
   - View noscript source in DevTools (disable JS)
   - Count `<li>` elements in menu sections
   - [ ] Total count = 45 items

2. **Spot check 5 random items**:
   - Open `src/components/Menu.tsx`
   - Pick 5 random items from menuItems array
   - Find corresponding items in noscript HTML
   - [ ] Names match exactly
   - [ ] Descriptions match exactly
   - [ ] Prices match exactly (e.g., 219 in Menu.tsx → "219 грн" in HTML)

3. **Verify category completeness**:
   - [ ] Роли section has 15 items
   - [ ] Сети section has 10 items
   - [ ] Запечені section has 3 items
   - [ ] Салат section has 1 item
   - [ ] Сашимі section has 3 items
   - [ ] Нігірі section has 4 items
   - [ ] Гункани section has 3 items
   - [ ] Супи section has 3 items
   - [ ] Напої section has 3 items

**Expected Result**: 100% data parity between Menu.tsx and noscript HTML.

**Troubleshooting**: If mismatches found, re-extract data from Menu.tsx and update index.html.

---

### ✅ Step 6: Performance Impact Check

**Purpose**: Ensure noscript content doesn't negatively impact Core Web Vitals

**Instructions**:

1. **Check file size**:
   ```bash
   # From repo root
   wc -c index.html
   ```
   - [ ] Size increase < 50KB compared to previous version

2. **Run Lighthouse Performance audit** (with JavaScript enabled):
   - Chrome DevTools → Lighthouse
   - Categories: Performance only
   - Device: Mobile
   - Run audit

3. **Check Core Web Vitals**:
   - [ ] Performance score ≥ 90
   - [ ] LCP (Largest Contentful Paint) ≤ 2.5s
   - [ ] CLS (Cumulative Layout Shift) ≤ 0.1
   - [ ] No "Eliminate render-blocking resources" warning for noscript

**Expected Result**: No performance regression. Core Web Vitals remain within constitution thresholds.

**Note**: Noscript content is ignored when JavaScript is enabled, so impact should be minimal (just HTML payload size).

---

## Acceptance Criteria Verification

Map each test to feature spec success criteria:

| Success Criterion | Test Step | Pass/Fail |
|-------------------|-----------|-----------|
| SC-001: All 45+ items indexed | Step 5 (Content Parity) | ☐ |
| SC-002: Valid HTML | Step 2 (W3C Validation) | ☐ |
| SC-003: Viewable in under 5s on 3G | Step 6 (Performance) | ☐ |
| SC-004: Lighthouse SEO ≥95 | Step 3 (Lighthouse SEO) | ☐ |
| SC-005: Structured data valid | Step 4 (Rich Results Test) | ☐ |
| SC-007: Mobile display correct | Step 1 (Visual Check Mobile) | ☐ |
| SC-009: 100% data parity | Step 5 (Content Parity) | ☐ |
| SC-010: <50KB size increase | Step 6 (File Size) | ☐ |

**All criteria must pass before deployment.**

---

## Troubleshooting

### Issue: Noscript content not showing

**Cause**: JavaScript is enabled  
**Solution**: Noscript content only displays when JS is disabled. Follow Step 1 instructions to disable JS.

### Issue: HTML validation errors

**Common causes**:
- Unclosed tags (missing `</li>`, `</ul>`, `</article>`)
- Unescaped special characters in descriptions
- Invalid inline CSS syntax

**Solution**: Review noscript HTML carefully, ensure all tags are properly closed and nested.

### Issue: Content doesn't match Menu.tsx

**Cause**: Manual sync error during update  
**Solution**: Re-extract data from Menu.tsx and regenerate noscript HTML. Verify line-by-line.

### Issue: Mobile layout broken

**Cause**: Inline CSS not responsive or missing  
**Solution**: Add `max-width: 100%` to containers, use `padding: 20px` for spacing, ensure font sizes are readable (16px+).

---

## Post-Deployment Verification

After deploying to production:

1. **Google Search Console** (after 7 days):
   - Check URL inspection for homepage
   - Verify "Page is indexed" status
   - Confirm no crawl errors

2. **Monitor organic traffic** (after 14 days):
   - Check for increase in product-specific search impressions
   - Look for rankings on "суші Бровари" + menu item queries

3. **Quarterly review** (per constitution):
   - Re-run all validation tests above
   - Verify noscript content still matches Menu.tsx
   - Update if menu has changed

---

## Quick Reference Commands

```bash
# Start dev server
npm run dev
# or
bun dev

# Check HTML file size
wc -c index.html

# View page source
# Chrome: Cmd+Option+U (Mac) / Ctrl+U (Windows)

# Disable JavaScript in Chrome
# DevTools → Cmd+Shift+P → "Disable JavaScript"
```

---

**Questions?** Refer to [spec.md](./spec.md) for requirements or [plan.md](./plan.md) for technical context.

