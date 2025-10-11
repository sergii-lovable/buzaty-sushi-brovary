# Data Model: Fix Menu Design Issues

**Feature**: Fix Menu Design Issues  
**Date**: 2024-12-19  
**Phase**: 1 - Design & Contracts

## Overview

This feature primarily involves UI/UX improvements to existing components without significant data model changes. The existing data structures remain unchanged, but we document the current state and any minor enhancements needed.

## Existing Data Entities

### MenuCategory

**Purpose**: Represents a food category for navigation and filtering

**Current Structure**:
```typescript
interface MenuCategory {
  id: string;           // Category identifier (e.g., "rolls", "sets")
  displayName: string;  // Human-readable name (e.g., "ФІЛАДЕЛЬФІЯ МЕНЮ")
  value: string;        // Filter value used in state management
}
```

**Fields**:
- `id`: Unique identifier for the category
- `displayName`: Display text shown in UI tabs
- `value`: Internal value used for filtering logic

**Validation Rules**:
- `id` must be non-empty string
- `displayName` must be non-empty string
- `value` must match `id` for consistency

**State Transitions**: None - categories are static configuration

### MenuItem

**Purpose**: Represents individual food items in the menu

**Current Structure**:
```typescript
interface MenuItemType {
  id: number;           // Unique item identifier
  name: string;         // Item name (e.g., "Філадельфія")
  description: string;  // Item description
  price: number;        // Price in Ukrainian Hryvnia
  image: string;        // Image path/URL
  category: string;     // Category identifier (matches MenuCategory.id)
}
```

**Fields**:
- `id`: Unique numeric identifier
- `name`: Display name of the food item
- `description`: Detailed description of ingredients
- `price`: Price in Ukrainian Hryvnia (₴)
- `image`: Path to item image
- `category`: Category association for filtering

**Validation Rules**:
- `id` must be positive integer
- `name` must be non-empty string
- `description` must be non-empty string
- `price` must be positive number
- `image` must be valid path/URL
- `category` must reference existing MenuCategory.id

**State Transitions**: None - menu items are static configuration

### ScreenSize

**Purpose**: Represents viewport dimensions affecting layout behavior

**New Structure** (for responsive design):
```typescript
interface ScreenSize {
  width: number;        // Viewport width in pixels
  height: number;       // Viewport height in pixels
  breakpoint: string;   // Tailwind breakpoint name (sm, md, lg, xl)
}
```

**Fields**:
- `width`: Current viewport width
- `height`: Current viewport height  
- `breakpoint`: Active Tailwind CSS breakpoint

**Validation Rules**:
- `width` must be positive number
- `height` must be positive number
- `breakpoint` must be valid Tailwind breakpoint

**State Transitions**: Updates on window resize events

## Component State Models

### Menu Component State

**Current State**:
```typescript
interface MenuState {
  selectedCategory: string;  // Currently active category
  filteredItems: MenuItemType[]; // Items filtered by selected category
}
```

**State Transitions**:
- `selectedCategory` changes when user clicks different tab
- `filteredItems` updates automatically based on `selectedCategory`

### Responsive Layout State

**New State** (for responsive behavior):
```typescript
interface ResponsiveState {
  isMobile: boolean;        // Whether current viewport is mobile
  tabScrollPosition: number; // Horizontal scroll position for tabs
  showScrollIndicators: boolean; // Whether to show scroll indicators
}
```

**State Transitions**:
- `isMobile` updates on window resize
- `tabScrollPosition` updates on scroll events
- `showScrollIndicators` updates based on scroll position and content overflow

## Data Flow

### Current Flow
1. **Initialization**: Menu categories and items loaded from static data
2. **Category Selection**: User clicks tab → `selectedCategory` updates
3. **Filtering**: `filteredItems` computed based on `selectedCategory`
4. **Rendering**: Components render based on current state

### Enhanced Flow (with responsive design)
1. **Initialization**: Same as current + responsive state initialization
2. **Responsive Detection**: Window resize → responsive state updates
3. **Category Selection**: Same as current + responsive layout considerations
4. **Scroll Management**: Tab scrolling → scroll state updates
5. **Rendering**: Components render with responsive behavior

## Validation Rules

### Category Display Names
- Must be readable at minimum 8px character width
- Should not exceed 22 characters for optimal mobile display
- Must maintain meaning when truncated with ellipsis

### Touch Targets
- All interactive elements must have minimum 44px width/height
- Proper spacing between touch targets to prevent accidental activation
- Visual feedback for touch interactions

### Spacing Requirements
- Minimum 48px spacing between navigation and content
- Consistent spacing across all screen sizes
- Proper padding within tab elements

## Data Persistence

**Current**: No persistence needed - all data is static configuration
**Enhanced**: No additional persistence - responsive state is ephemeral

## Performance Considerations

- **Static Data**: Menu categories and items are loaded once at component mount
- **Responsive State**: Updates only on window resize events (throttled)
- **Scroll State**: Updates only during active scrolling (throttled)
- **No API Calls**: All data is client-side static configuration

## Migration Strategy

**No Migration Required**: This feature only modifies UI behavior and styling. Existing data structures remain unchanged. Components will gracefully handle the enhanced responsive behavior without breaking existing functionality.
