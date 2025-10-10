# Research: Up-to-Date Search Engine Fallback

**Date**: 2025-10-10  
**Feature**: Update noscript HTML with complete menu data  
**Status**: Complete

## Overview

This document consolidates research findings for implementing an up-to-date noscript fallback containing all menu items. The primary challenges are: (1) extracting and organizing 45 menu items by category, (2) generating semantic HTML, and (3) ensuring maintenance simplicity.

## Research Tasks

### 1. Menu Data Source Analysis

**Task**: Identify the authoritative menu data source and understand its structure.

**Findings**:
- **Location**: `src/components/Menu.tsx`, lines 6-376
- **Structure**: TypeScript constant `menuItems: MenuItemType[]` with 45 objects
- **Properties**: `id`, `name`, `description`, `price`, `image`, `category`
- **Categories**: 
  - `rolls` (15 items)
  - `sets` (10 items) 
  - `nigiri` (3 items - labeled as "Запечені")
  - `salat` (1 item)
  - `sashimi` (3 items)
  - `nigiri-sushi` (4 items - labeled as "Нігірі")
  - `gunkan` (3 items)
  - `soup` (3 items)
  - `drinks` (3 items)
  - Note: Categories `minirolls` and `krimsushi` exist in UI but have no items currently

**Decision**: Use Menu.tsx menuItems as single source of truth. Extract data from this file for noscript generation.

**Rationale**: This array is already maintained and used by the dynamic menu. Any updates to menu items will be reflected here first. Using the same source ensures consistency.

---

### 2. HTML Structure and Semantic Markup

**Task**: Determine optimal HTML structure for search engine crawlability and accessibility.

**Findings**:

**Best practices for noscript content**:
- Use semantic HTML5 elements (`<section>`, `<article>`, `<header>`, `<footer>`)
- Clear heading hierarchy: h1 (page title) → h2 (category) → h3 (item name) or use lists
- List elements (`<ul>`, `<li>`) for menu items improve structure
- Strong/emphasis tags for item names and prices improve scannability
- Meta information (ingredient description) should be in plain text within list items

**Decision**: 
```html
<header>
  <h1>Пузаті суші - Доставка суші у Броварах</h1>
  <p>Tagline</p>
</header>
<main>
  <section>
    <h2>Наше меню</h2>
    <article>
      <h3>Роли</h3>
      <ul>
        <li><strong>Філадельфія</strong> - Ingredients - XXX грн</li>
        ...
      </ul>
    </article>
    <article>
      <h3>Сети</h3>
      <ul>
        ...
      </ul>
    </article>
  </section>
  <section>
    <h2>Контакти</h2>
    <p>Phone, address, hours</p>
  </section>
</main>
<footer>
  <p>Copyright</p>
</footer>
```

**Rationale**: This structure provides clear semantic hierarchy for search engines and screen readers. Articles group categories logically, lists indicate related items, and heading levels guide navigation.

**Alternatives considered**:
- **Flat h2/h3 without articles**: Less semantic grouping, harder for screen readers to navigate
- **Definition lists (`<dl>`, `<dt>`, `<dd>`)**: More verbose, less familiar to developers maintaining it
- **Tables**: Poor accessibility without proper headers, overkill for simple lists

---

### 3. Inline CSS Strategy

**Task**: Determine minimal CSS needed for readable noscript presentation without external stylesheets.

**Findings**:

**Constraints**:
- External CSS may not load for users with strict browser settings
- Inline styles in noscript block ensure presentation independence
- Mobile-first: ensure readability on 320px viewports

**Decision**:
```html
<header style="padding: 20px; background: #1a1a1a; color: white;">
<main style="padding: 20px; max-width: 1200px; margin: 0 auto;">
<h2 style="font-size: 1.8em; margin: 24px 0 16px;">
<h3 style="font-size: 1.3em; margin: 20px 0 12px; color: #333;">
<li style="margin-bottom: 8px; line-height: 1.6;">
<footer style="padding: 20px; background: #1a1a1a; color: white; margin-top: 40px;">
```

**Rationale**: Minimal inline styles ensure basic readability and visual hierarchy without bloating HTML significantly. Dark header/footer match brand, clear spacing improves scannability.

**Alternatives considered**:
- **No styling (pure HTML)**: Results in cramped, hard-to-read text on mobile
- **Extensive inline CSS**: Increases HTML size, harder to maintain
- **External stylesheet link**: May not load for some no-JS scenarios

---

### 4. Category Organization and Display Names

**Task**: Map internal category IDs to user-friendly Ukrainian display names.

**Findings** (from Menu.tsx lines 394-407):

| Internal ID      | Display Name (Ukrainian) | Item Count |
|------------------|-------------------------|------------|
| all              | Всі                     | 45         |
| rolls            | Роли                    | 15         |
| sets             | Сети                    | 10         |
| nigiri           | Запечені                | 3          |
| salat            | Салат                   | 1          |
| sashimi          | Сашимі                  | 3          |
| nigiri-sushi     | Нігірі                  | 4          |
| gunkan           | Гункани                 | 3          |
| soup             | Супи                    | 3          |
| drinks           | Напої                   | 3          |
| minirolls        | Міні роли / Макі        | 0          |
| krimsushi        | Суші та крім-суші       | 0          |

**Decision**: Display only categories with items (10 categories). Omit `minirolls` and `krimsushi` since they have zero items. Order categories by importance: Роли → Сети → Запечені → Салат → Сашимі → Нігірі → Гункани → Супи → Напої.

**Rationale**: Empty categories confuse search engines and users. Ordering by item count and popularity (rolls/sets first) improves user experience.

---

### 5. Data Synchronization Strategy

**Task**: Evaluate approaches for keeping noscript content synchronized with Menu.tsx.

**Findings**:

**Options evaluated**:
1. **Manual update**: Copy-paste from Menu.tsx to index.html manually when menu changes
2. **Build-time generation**: Create Vite plugin to generate noscript from Menu.tsx during build
3. **Script-based generation**: Node.js script to extract data and update index.html

**Decision**: Manual update for initial implementation (documented in plan.md and assumptions).

**Rationale**: 
- Menu updates are infrequent (weeks/months between changes)
- Manual process is simplest and requires no new tooling
- Risk of staleness is acceptable given update frequency
- Future enhancement: automate if menu update frequency increases

**Alternatives considered**:
- **Build plugin**: Over-engineering for current needs, adds complexity to build process
- **Script**: Better than manual but still requires running extra commands, adds maintenance

---

### 6. HTML Validation and Testing Approach

**Task**: Define validation process to ensure noscript content meets quality standards.

**Findings**:

**Validation tools**:
- W3C Markup Validation Service (validator.w3.org)
- Lighthouse SEO audit in Chrome DevTools
- Google Rich Results Test (search.google.com/test/rich-results)
- Browser DevTools with JavaScript disabled

**Decision**: Multi-step validation process
1. Disable JavaScript in Chrome DevTools → verify content displays correctly
2. Run W3C HTML Validator → ensure zero errors
3. Run Lighthouse SEO audit → verify score ≥95
4. Google Rich Results Test → confirm structured data still validates
5. Mobile viewport testing (375px, 414px) → check readability

**Rationale**: Comprehensive validation ensures both technical correctness (valid HTML) and business value (SEO, usability).

---

## Implementation Summary

### Key Decisions

1. **Data Source**: Menu.tsx menuItems array (45 items, 10 active categories)
2. **HTML Structure**: Semantic HTML5 with header/main/footer, h1-h3 hierarchy, ul/li lists
3. **Styling**: Minimal inline CSS for readability and mobile responsiveness
4. **Category Display**: Show only categories with items, ordered by importance
5. **Synchronization**: Manual update process, documented as technical debt
6. **Validation**: W3C validator + Lighthouse + Google Rich Results Test + manual browser testing

### Size Estimate

- 45 menu items × ~120 chars each = ~5,400 chars
- HTML structure overhead: ~1,000 chars
- Total estimated size: ~6.5KB (well under 50KB constraint)

### Next Steps (Phase 1)

1. Generate data-model.md documenting menu item structure
2. Create quickstart.md with validation testing instructions
3. Update agent context with this feature

