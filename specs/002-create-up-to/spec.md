# Feature Specification: Up-to-Date Search Engine Fallback

**Feature Branch**: `002-create-up-to`  
**Created**: 2025-10-10  
**Status**: Draft  
**Input**: User description: "Create up-to-date fallback for search engines"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Search Engine Crawls Complete Menu (Priority: P1)

A search engine bot (Googlebot, Bingbot, etc.) accesses the website without JavaScript enabled and needs to index the full menu content to display accurate search results with up-to-date product information.

**Why this priority**: Search engine visibility is the primary driver of organic traffic. Without complete, accurate menu data in the HTML fallback, the site cannot rank for specific product searches (e.g., "Філадельфія суші Бровари"), missing significant SEO opportunities. This is the core business value.

**Independent Test**: Can be fully tested by disabling JavaScript in browser DevTools, loading the homepage, and verifying that all 45+ menu items across 12 categories are visible with accurate names, descriptions, and prices matching the dynamic menu. Success is achieved when the noscript content is indexable and complete.

**Acceptance Scenarios**:

1. **Given** a search engine bot crawls the site without JavaScript, **When** it parses the HTML, **Then** it finds all 12 menu categories (Rolls, Sets, Baked, Salad, Sashimi, Nigiri, Gunkan, Soups, Drinks, Mini Rolls, Sushi, All) in the noscript section
2. **Given** the noscript fallback is rendered, **When** viewing any category section, **Then** all menu items from that category are listed with name, description (ingredients), and price in UAH
3. **Given** a search engine indexes the page, **When** searching for specific menu items (e.g., "Філадельфія"), **Then** the search results include accurate product descriptions and prices from the noscript content
4. **Given** menu prices or items change in the main application, **When** the noscript content is updated, **Then** it reflects the same data as the dynamic menu without discrepancies
5. **Given** the noscript content is rendered, **When** a user without JavaScript views the page, **Then** they see a complete, readable menu that enables them to make ordering decisions (even if they must call to order)

---

### User Story 2 - User with JavaScript Disabled Views Menu (Priority: P2)

A customer visits the website with JavaScript disabled (due to browser settings, security software, or accessibility tools) and needs to browse the complete menu to decide what to order before calling the restaurant.

**Why this priority**: While rare, users with JavaScript disabled still represent potential customers. Providing a complete menu ensures no customer is excluded from browsing products. This is lower priority than SEO but still delivers customer value.

**Independent Test**: Can be fully tested by disabling JavaScript, navigating to the site, and verifying that all menu items are readable, organized by category, and include contact information for phone orders. Success is achieved when the user can view complete product information without JavaScript.

**Acceptance Scenarios**:

1. **Given** a user has JavaScript disabled, **When** they load the homepage, **Then** they see a fallback version with header, menu sections, and footer with contact information
2. **Given** the noscript menu is displayed, **When** the user scrolls through it, **Then** menu items are organized by category with clear section headings (Роли, Сети, Нігірі, etc.)
3. **Given** the user views a menu item, **When** they read the details, **Then** they see the item name in Ukrainian, full ingredient description, and price in UAH format (e.g., "189 грн")
4. **Given** the user wants to order, **When** they scroll to the contact section, **Then** they see the phone number, address, and operating hours to place an order via phone
5. **Given** the noscript content is rendered, **When** the user views it on mobile, **Then** the content is readable without horizontal scrolling and uses mobile-friendly text sizes

---

### User Story 3 - Website Maintains SEO Performance (Priority: P3)

The website maintains or improves its search engine rankings and rich snippet appearance in Google search results by providing complete, structured menu data in the HTML fallback.

**Why this priority**: This is an outcome of P1 implementation. While critical for business, it's measured over time after the fallback is deployed. It represents the long-term SEO benefit of having complete crawlable content.

**Independent Test**: Can be tested using Google Search Console's URL inspection tool, Google's Rich Results Test, and Lighthouse SEO audits. Success is achieved when the noscript content is fully indexed, structured data validates correctly, and menu items appear in rich snippets.

**Acceptance Scenarios**:

1. **Given** the updated noscript content is deployed, **When** Google recrawls the page, **Then** Search Console shows all menu items indexed with no crawl errors
2. **Given** the page is tested with Google's Rich Results Test, **When** analyzing the HTML, **Then** the tool validates the Restaurant and Menu structured data successfully
3. **Given** a user searches for "суші Бровари" or specific items, **When** viewing search results, **Then** the site appears with accurate menu previews and pricing information in rich snippets
4. **Given** the page is audited with Lighthouse, **When** running the SEO test, **Then** it achieves a score of 95+ with no missing metadata warnings
5. **Given** competitors update their menus, **When** our noscript content stays current, **Then** search engines display our up-to-date information, maintaining competitive advantage

---

### Edge Cases

- **What happens when new menu items are added to the dynamic menu?** The noscript fallback must be updated simultaneously to prevent indexing stale data. A maintenance process or automated generation should ensure consistency.

- **How does the fallback handle extremely long descriptions?** Text wraps naturally without breaking layout; mobile displays remain readable without horizontal scroll.

- **What if a menu category has no items?** Empty categories are omitted from the noscript output to avoid confusing crawlers with blank sections.

- **How does the system handle special characters in menu item names (apostrophes, quotes, Ukrainian characters)?** All text is properly HTML-encoded to prevent rendering errors and ensure search engines index Unicode content correctly.

- **What if the noscript content becomes very large (1000+ items)?** HTML remains valid and crawlable; page load time for no-JS users may increase but search bots handle large HTML efficiently.

- **How does the fallback appear in accessibility tools that disable JavaScript?** Screen readers can navigate the semantic HTML structure with proper heading hierarchy (h1, h2, h3) and list elements.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include a noscript HTML fallback section containing the complete menu with all 45+ items organized into 12 categories matching the dynamic menu structure
- **FR-002**: Noscript content MUST display each menu item with name (Ukrainian), ingredient description, and price in UAH (e.g., "189 грн")
- **FR-003**: Noscript content MUST organize menu items by category with semantic HTML headings (h2 for category, h3 for item names) and list elements (ul/li)
- **FR-004**: Noscript content MUST include restaurant contact information: phone number, address (м. Бровари, вул. Грушевського 7), and operating hours (Пн-Нд: 10:00 - 21:00)
- **FR-005**: Noscript content MUST maintain consistency with the dynamic menu data - identical item names, descriptions, prices, and category organization
- **FR-006**: Noscript content MUST use inline CSS styling to ensure readable presentation without external stylesheets (as they may not load without JS)
- **FR-007**: Noscript HTML MUST be valid and semantic to maximize search engine crawlability and accessibility tool compatibility
- **FR-008**: Noscript content MUST be readable on mobile viewports (320px+) without horizontal scrolling or layout breaks
- **FR-009**: Noscript content MUST include a header section with the site name and tagline for brand context
- **FR-010**: Noscript content MUST include a footer with copyright information and year
- **FR-011**: All menu data in noscript section MUST match the data source used by the dynamic menu (Menu.tsx menuItems array) to prevent inconsistencies
- **FR-012**: Noscript content MUST properly encode special characters (Ukrainian letters, apostrophes, quotes) to prevent HTML rendering errors

### Key Entities

- **Noscript Menu Item**: Represents a static HTML representation of a menu item with attributes: name (Ukrainian text), description (ingredient list), price (formatted as "XXX грн"), and category (section grouping). Derived from the same data source as the dynamic Menu Item entity to ensure consistency.

- **Noscript Category Section**: Represents a semantic HTML section grouping menu items by category with attributes: category name (h2 heading), list of menu items (ul/li structure). Corresponds to the 12 categories from the dynamic menu (Rolls, Sets, Baked, etc.).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 45+ menu items appear in Google Search Console's index within 7 days of deployment with no crawl errors or warnings
- **SC-002**: Noscript content passes HTML validation with zero errors when checked with W3C Markup Validation Service
- **SC-003**: Users with JavaScript disabled can view the complete menu in under 5 seconds on a 3G mobile connection
- **SC-004**: Lighthouse SEO audit score reaches 95+ with no "missing content" warnings for JavaScript-disabled scenarios
- **SC-005**: Google Rich Results Test validates Restaurant and Menu structured data successfully with no errors
- **SC-006**: Search queries for specific menu items (e.g., "Філадельфія суші Бровари") return the site with accurate prices and descriptions within search results
- **SC-007**: Noscript content displays correctly on mobile devices (320px-768px) without horizontal scrolling or layout issues
- **SC-008**: Screen reader navigation (NVDA, VoiceOver) can traverse the noscript menu hierarchy with proper heading announcements and list navigation
- **SC-009**: Noscript content maintains 100% data parity with dynamic menu - zero discrepancies in names, prices, or descriptions
- **SC-010**: Page source size increases by less than 50KB when adding complete noscript fallback, maintaining reasonable initial HTML payload

## Assumptions

- The menu data source (Menu.tsx menuItems array) is the single source of truth; noscript content will be generated from or manually synchronized with this data
- Menu updates occur infrequently enough that manual or semi-automated noscript content updates are feasible (no real-time menu API integration required)
- Search engines will recrawl the site within 7 days of deployment; no immediate reindexing request is needed
- Users without JavaScript represent less than 1% of human traffic but search bots make up a significant portion of no-JS visitors
- The existing JSON-LD structured data (Restaurant, LocalBusiness schemas) will remain in the HTML head; noscript content complements but doesn't replace structured data
- Inline CSS in noscript is acceptable for basic styling; pixel-perfect design match with the dynamic site is not required
- Noscript content does not need interactive features (filters, add to cart); it serves as a read-only information display
- The noscript section will be placed immediately inside the body tag before the #root div, ensuring search bots encounter content before encountering the empty React mount point
