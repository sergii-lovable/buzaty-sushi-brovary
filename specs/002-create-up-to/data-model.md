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
Menu.tsx menuItems array (TypeScript)
    ↓
[Manual Extraction Process]
    ↓
Grouped by category → Sorted by id
    ↓
HTML Template Application
    ↓
index.html noscript section (HTML)
    ↓
[Browser / Search Engine Crawler]
```

## Data Integrity

**Consistency Requirements**:
- Every item in Menu.tsx menuItems MUST appear in noscript
- Name, description, and price MUST match exactly (100% parity)
- Category groupings MUST match the dynamic menu structure

**Verification Process**:
1. Count items in noscript vs Menu.tsx (should be 45)
2. Spot-check 5 random items for name/description/price accuracy
3. Verify all 10 categories are present with correct Ukrainian names

**Update Triggers**:
- When a new menu item is added to Menu.tsx
- When an existing item's name, description, or price changes
- When a menu item is removed from Menu.tsx

---

## Notes

- No database or API integration required (static data)
- No validation logic needed (data is pre-validated in TypeScript)
- Manual synchronization creates risk of staleness (documented in plan.md)
- Future enhancement: automated extraction and HTML generation

