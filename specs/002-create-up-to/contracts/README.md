# Contracts Directory

**Feature**: Up-to-Date Search Engine Fallback  
**Date**: 2025-10-10

## Overview

This directory contains interface contracts for the automated build plugin that generates noscript HTML content.

## Contracts

### [vite-plugin-interface.md](./vite-plugin-interface.md)

Defines the interface contract for the `generate-noscript` Vite plugin:

- **Plugin API**: Export structure, configuration, Vite hooks
- **Input Contract**: Expected Menu.tsx structure, HTML template markers
- **Output Contract**: Generated HTML structure and guarantees
- **Error Handling**: Build failure conditions and error messages
- **Performance Contract**: Build time and memory constraints
- **Testing Interface**: Testable function exports and fixtures

## Why Contracts Are Needed

While this feature doesn't involve external APIs or microservices, it does introduce a new build-time component (Vite plugin) that:

1. **Parses source code** (Menu.tsx) as input
2. **Generates HTML output** injected into index.html
3. **Integrates with build process** (Vite's plugin lifecycle)
4. **Enforces constraints** (size limits, validation rules)
5. **Must be testable** independently of full builds

The plugin interface contract ensures:
- Clear expectations for input/output formats
- Documented error conditions and handling
- Performance guarantees
- Testability requirements

## Data Source

The menu data is extracted from the existing TypeScript interface:

```typescript
// src/components/MenuItem.tsx
export interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
```

The plugin reads this interface and the `menuItems` array from `Menu.tsx` during build time.

## No Runtime APIs

This feature does not involve:
- REST APIs
- GraphQL endpoints  
- WebSocket connections
- External service integrations

All contracts are build-time only. The generated HTML is static content served to browsers and search engine crawlers.

## Related Documentation

- [spec.md](../spec.md) - Feature specification with functional requirements
- [plan.md](../plan.md) - Implementation plan and technical context  
- [data-model.md](../data-model.md) - Menu data structure and transformation flow
- [research.md](../research.md) - Technical research and automation decisions
- [quickstart.md](../quickstart.md) - Testing and validation guide
