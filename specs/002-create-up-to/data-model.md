# Data Model: Noscript Menu Content

**Feature**: Up-to-Date Search Engine Fallback  
**Date**: 2025-10-10  
**Status**: Complete

## Overview

This document describes the data structure used to generate the noscript HTML fallback. The data model is derived from the existing TypeScript interfaces in the application and mapped to static HTML output.

## Source: MenuItemType Interface

**Location**: `src/components/MenuItem.tsx` (exported type)  
**Used in**: `src/components/Menu.tsx` (menuItems constant)

```typescript
export interface MenuItemType {
  id: number;              // Unique identifier
  name: string;            // Ukrainian menu item name
  description: string;     // Ingredient list in Ukrainian
  price: number;           // Price in UAH (integer)
  image: string;           // Image path (not used in noscript)
  category: string;        // Category ID (e.g., "rolls", "sets")
}
```

## Entities

### MenuItem (Source Data)

**Description**: Represents a single menu item as defined in Menu.tsx

**Attributes**:
- `id` (number): Unique identifier (1-45)
- `name` (string): Ukrainian name, e.g., "Філадельфія"
- `description` (string): Comma-separated ingredient list, e.g., "Лосось, крем-сир, огірок, рис, норі"
- `price` (number): Integer price in UAH, e.g., 219
- `category` (string): One of: rolls, sets, nigiri, salat, sashimi, nigiri-sushi, gunkan, soup, drinks
- `image` (string): Path to product image - IGNORED in noscript (images don't load without JS)

**Relationships**: None (flat array structure)

**Validation Rules**:
- `name` must not be empty
- `description` must not be empty
- `price` must be positive integer
- `category` must match one of the defined category IDs

**State Transitions**: N/A (static data)

---

### Category (UI Grouping)

**Description**: Represents a menu category for organizing items

**Attributes**:
- `id` (string): Internal identifier (e.g., "rolls")
- `displayName` (string): Ukrainian label for UI (e.g., "Роли")
- `itemCount` (number): Number of items in this category (derived)

**Mapping Table**:

| Category ID   | Display Name (Ukrainian) | Items in Menu.tsx |
|---------------|-------------------------|-------------------|
| rolls         | Роли                    | 15                |
| sets          | Сети                    | 10                |
| nigiri        | Запечені                | 3                 |
| salat         | Салат                   | 1                 |
| sashimi       | Сашимі                  | 3                 |
| nigiri-sushi  | Нігірі                  | 4                 |
| gunkan        | Гункани                 | 3                 |
| soup          | Супи                    | 3                 |
| drinks        | Напої                   | 3                 |

**Relationships**: One category contains many MenuItems (one-to-many)

**Business Rules**:
- Categories with zero items are omitted from noscript output
- Categories are displayed in order of importance (rolls first, drinks last)

---

### NoscriptMenuItem (Output Format)

**Description**: HTML representation of a menu item in the noscript fallback

**HTML Template**:
```html
<li><strong>{name}</strong> - {description} - {price} грн</li>
```

**Example**:
```html
<li><strong>Філадельфія</strong> - Лосось, крем-сир, огірок, рис, норі - 219 грн</li>
```

**Transformation Rules**:
1. `name` → `<strong>` tag for emphasis
2. `description` → plain text, no modification
3. `price` → append " грн" suffix for currency
4. `image` → omitted (not needed in text-only fallback)
5. `id` and `category` → used for grouping, not displayed

**Special Character Handling**:
- Ukrainian characters (і, є, ї, ґ) must be UTF-8 encoded
- Apostrophes in names must be properly escaped in HTML
- Commas in descriptions are preserved as-is

---

### NoscriptCategorySection (Output Format)

**Description**: HTML representation of a category section containing menu items

**HTML Template**:
```html
<article>
  <h3>{categoryDisplayName}</h3>
  <ul>
    {menuItems mapped to <li> elements}
  </ul>
</article>
```

**Example**:
```html
<article>
  <h3>Роли</h3>
  <ul>
    <li><strong>Філадельфія</strong> - Лосось, крем-сир, огірок, рис, норі - 219 грн</li>
    <li><strong>Філадельфія Люкс</strong> - Лосось, крем-сир, авокадо, ікра масаго, рис, норі - 249 грн</li>
    ...
  </ul>
</article>
```

**Ordering**:
1. Sort menuItems by `id` (ascending) within each category
2. Display categories in predefined order (rolls, sets, nigiri, salat, sashimi, nigiri-sushi, gunkan, soup, drinks)

---

## Data Flow

```
Build Process Start
    ↓
Vite Plugin: generate-noscript.ts
    ↓
Read src/components/Menu.tsx
    ↓
Parse TypeScript AST (ts.createSourceFile)
    ↓
Extract menuItems array (walk AST nodes)
    ↓
Validate MenuItemType[] structure
    ↓
Group by category → Sort by id
    ↓
Apply HTML template to each item
    ↓
Generate semantic HTML string
    ↓
Inject into index.html noscript section
    ↓
Build Output: dist/index.html
    ↓
[Browser / Search Engine Crawler]
```

### Automated Extraction Process

The Vite plugin (`vite-plugins/generate-noscript.ts`) performs the following steps:

1. **AST Parsing**: Use `ts.createSourceFile()` to parse Menu.tsx into an Abstract Syntax Tree
2. **Node Traversal**: Walk the AST using `ts.forEachChild()` to find the `menuItems` variable declaration
3. **Data Extraction**: Extract the array literal expression containing menu item objects
4. **Type Validation**: Verify each object has required properties (id, name, description, price, category)
5. **Transformation**: Convert TypeScript objects to HTML strings using template functions
6. **Injection**: Replace noscript placeholder in index.html with generated content during `transformIndexHtml` hook

## Data Integrity

**Consistency Requirements** (Automatically Enforced):
- Every item in Menu.tsx menuItems AUTOMATICALLY appears in noscript (enforced by build plugin)
- Name, description, and price AUTOMATICALLY match exactly (100% parity guaranteed)
- Category groupings AUTOMATICALLY match the dynamic menu structure

**Automated Verification** (Build-Time):
1. Plugin parses Menu.tsx and extracts all items (build fails if parsing errors)
2. Plugin validates each item has required properties (build fails if missing data)
3. Plugin generates HTML with all items (guaranteed complete by design)
4. Plugin verifies HTML size < 50KB (build fails if constraint violated)
5. Plugin validates HTML is well-formed (build fails if invalid structure)

**Update Triggers** (Automatic):
- **Automatic**: When a new menu item is added to Menu.tsx → next build regenerates noscript
- **Automatic**: When an existing item's name, description, or price changes → next build reflects changes
- **Automatic**: When a menu item is removed from Menu.tsx → next build removes from noscript
- **Zero manual intervention required**

**Build Failures** (Protection Against Errors):
- Plugin fails build if Menu.tsx has syntax errors
- Plugin fails build if menuItems array is not found or malformed
- Plugin fails build if any item is missing required properties
- Plugin fails build if generated HTML exceeds size constraints
- Build failures prevent deployment of stale or invalid content

---

## Notes

- No database or API integration required (static data generated at build time)
- No manual validation needed (automated via plugin at every build)
- **No risk of staleness** - automated synchronization eliminates human error
- Plugin code is testable independently of build process
- TypeScript Compiler API ensures type-safe extraction

