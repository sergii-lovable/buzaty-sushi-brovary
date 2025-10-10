# Feature Specification: Пузаті суші Online Ordering Platform

**Feature Branch**: `001-create-baseline-specification`  
**Created**: 2025-10-10  
**Status**: Baseline  
**Input**: User description: "create baseline specification based on the existing project structure"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Menu and View Product Details (Priority: P1)

A customer visits the website to explore available sushi offerings and view detailed information about specific items before deciding what to order.

**Why this priority**: Menu browsing is the foundation of the ordering experience. Without the ability to view products, no orders can be placed. This represents the minimum viable experience.

**Independent Test**: Can be fully tested by navigating to the website, selecting different menu categories (Rolls, Sets, Nigiri, etc.), and viewing item details including name, description, price, and image. Success is achieved when all 45+ menu items are visible and filterable by category.

**Acceptance Scenarios**:

1. **Given** a customer lands on the homepage, **When** they scroll to the menu section, **Then** they see a tabbed interface with category filters (All, Rolls, Sets, Baked, Salad, Sashimi, Nigiri, Gunkan, Soups, Drinks, Mini Rolls, Sushi)
2. **Given** the menu is displayed, **When** a customer views the category tabs on desktop (≥768px), **Then** category buttons are displayed in a horizontal grid with 5 categories per row, wrapping to multiple rows when there are more than 5 categories
3. **Given** the menu is displayed, **When** a customer selects a category tab, **Then** only items from that category are shown in a responsive grid layout
4. **Given** a menu item is displayed, **When** a customer views it, **Then** they see the item name in Ukrainian, description with ingredients, price in UAH, and product image
5. **Given** a customer is on a mobile device (320px-768px width), **When** they view the menu, **Then** items display in a single column with touch-friendly spacing and readable text
6. **Given** a customer is on a mobile device, **When** they view the category tabs, **Then** category buttons adapt to smaller screen width while maintaining usability and readability
7. **Given** a customer uses keyboard navigation, **When** they tab through categories, **Then** focus indicators are visible and all interactive elements are reachable

---

### User Story 2 - Add Items to Cart and Manage Quantities (Priority: P2)

A customer selects desired menu items, adds them to a shopping cart, adjusts quantities, and reviews their selection before proceeding to checkout.

**Why this priority**: Cart management is essential for order composition but depends on the menu being browsable first. This enables customers to build their order incrementally.

**Independent Test**: Can be fully tested by clicking "Add to Cart" buttons on menu items, opening the cart sidebar, increasing/decreasing item quantities with +/- buttons, removing items, and viewing the real-time total calculation. Success is achieved when cart state persists during the browsing session and displays accurate totals.

**Acceptance Scenarios**:

1. **Given** a customer is viewing a menu item, **When** they click the "Додати" (Add) button, **Then** the item is added to their cart with quantity 1 and a success toast notification appears
2. **Given** an item is already in the cart, **When** the customer adds it again, **Then** the quantity increments by 1 instead of creating a duplicate entry
3. **Given** the customer clicks the cart icon in the header, **When** the cart sidebar opens, **Then** they see all added items with names, individual prices, quantities, and subtotals
4. **Given** an item is in the cart, **When** the customer clicks the "-" button, **Then** the quantity decreases by 1, and if quantity reaches 0, the item is removed from the cart
5. **Given** multiple items are in the cart, **When** quantities change, **Then** the total price updates in real-time without page reload
6. **Given** a customer has items in their cart, **When** they close and reopen the cart sidebar during the same session, **Then** all cart items remain preserved
7. **Given** the cart is not empty, **When** the customer views the header, **Then** they see a badge with the total number of items in the cart

---

### User Story 3 - Submit Order via Order Form (Priority: P3)

A customer completes their cart selection and submits an order by providing delivery details through an integrated order form.

**Why this priority**: Order submission converts browsing into revenue but requires cart management to be complete first. This represents the final step in the purchase funnel.

**Independent Test**: Can be fully tested by clicking "Оформити замовлення" (Checkout) in the cart, filling out the order form with name, phone, address, and optional comment, then submitting. Success is achieved when the order data is sent to the integrated Google Form, the customer sees a success confirmation, and the cart is cleared.

**Acceptance Scenarios**:

1. **Given** a customer has items in their cart, **When** they click the "Оформити замовлення" button, **Then** a modal dialog opens displaying the order form with required fields (name, phone, address) and optional comment field
2. **Given** the order form is open, **When** the customer attempts to submit with empty required fields, **Then** browser validation prevents submission and highlights missing fields
3. **Given** the customer fills in all required fields, **When** they click "Підтвердити замовлення" (Confirm Order), **Then** the form data is submitted to Google Forms integration without navigating away from the page
4. **Given** the form is submitting, **When** the request is in progress, **Then** the submit button shows "Відправка..." (Sending...) and is disabled to prevent double-submission
5. **Given** the order submits successfully, **When** the response is received, **Then** the customer sees a success toast notification, the modal closes, and the cart is emptied
6. **Given** the submission fails, **When** an error occurs, **Then** the customer sees an error toast with retry instructions and the cart data remains preserved
7. **Given** the customer is on a mobile device, **When** they interact with the order form, **Then** input fields use appropriate mobile keyboard types (tel for phone, text for name/address)

---

### User Story 4 - Access Contact Information and Restaurant Details (Priority: P4)

A customer wants to find the restaurant's physical location, phone number, operating hours, and social media links for direct contact or visit planning.

**Why this priority**: Contact information supports customer trust and provides alternative ordering channels, but is not required for the primary online ordering flow.

**Independent Test**: Can be fully tested by scrolling to the footer section and verifying the presence of address (м. Бровари, вул. Грушевського 7), phone number (+38 077 172-07-07), operating hours (Пн-Нд: 10:00 - 21:00), and social media icons. Success is achieved when all information is readable and links are functional.

**Acceptance Scenarios**:

1. **Given** a customer scrolls to the page footer, **When** they view the contact section, **Then** they see the restaurant address, phone number with clickable tel: link, and operating hours
2. **Given** a customer is on a mobile device, **When** they tap the phone number, **Then** their device's dialer opens with the number pre-populated
3. **Given** the footer is visible, **When** a customer looks for social links, **Then** they see icons/links for Instagram and Facebook (if configured)

---

### Edge Cases

- **What happens when a customer's internet connection drops during order submission?** The form shows an error toast and preserves cart data so the customer can retry without losing their selection.

- **How does the system handle extremely large orders (e.g., 50+ items in cart)?** Cart sidebar uses a scrollable area to accommodate any number of items without breaking layout; total calculation remains accurate.

- **What if a menu item has missing or invalid data (e.g., no price or image)?** The system should gracefully display placeholder values or default images to prevent rendering errors (current implementation uses a shared sushi-roll.jpg as fallback).

- **How does the site perform when a customer adds the same item 100+ times?** Cart allows unlimited quantity increases; total calculation and form submission handle large numbers without overflow errors.

- **What happens if Google Forms integration endpoint changes or becomes unavailable?** Order submission fails with an error toast; customer is instructed to call the restaurant directly (phone number visible in footer).

- **How does the site behave on very old browsers (IE11, older mobile browsers)?** Modern browser features may not be supported; graceful degradation should allow basic browsing, though ordering may not function.

- **What if a customer has JavaScript disabled?** The site includes a noscript fallback with static menu content visible to search engines, but interactive features (cart, order form) require JavaScript to function.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a comprehensive menu with 45+ items organized into 12 categories (Rolls, Sets, Baked, Salad, Sashimi, Nigiri, Gunkan, Soups, Drinks, Mini Rolls, Sushi, All)
- **FR-002**: System MUST display category tabs in a horizontal grid layout showing 5 categories per row on desktop viewports (≥768px), with automatic wrapping to additional rows when more than 5 categories are present
- **FR-003**: System MUST allow users to filter menu items by selecting category tabs, showing only items belonging to the selected category
- **FR-004**: Each menu item MUST display name (Ukrainian), description with ingredient list, price in UAH, and product image
- **FR-005**: System MUST provide an "Add to Cart" button on each menu item that adds the item to a persistent shopping cart
- **FR-006**: Cart MUST automatically merge duplicate items by incrementing quantity instead of creating separate entries
- **FR-007**: System MUST provide a cart sidebar accessible via header icon, showing all added items with quantity controls (+/-), individual prices, and running total
- **FR-008**: Cart MUST calculate and display the total order price in real-time as items are added, removed, or quantities change
- **FR-009**: System MUST preserve cart contents during the browsing session (sessionStorage or in-memory state)
- **FR-010**: System MUST display a badge on the cart icon showing the total count of items in the cart
- **FR-011**: System MUST provide a checkout button that opens an order form modal when cart contains at least one item
- **FR-012**: Order form MUST collect required fields: customer name, phone number, delivery address
- **FR-013**: Order form MUST collect optional field: order comment/special instructions
- **FR-014**: System MUST validate required fields client-side before allowing form submission
- **FR-015**: System MUST submit order data to Google Forms integration endpoint using POST request with form-encoded data
- **FR-016**: System MUST display loading state during form submission and prevent duplicate submissions
- **FR-017**: System MUST show success notification upon successful order submission and clear the cart
- **FR-018**: System MUST show error notification if order submission fails and preserve cart data for retry
- **FR-019**: System MUST display restaurant contact information in footer: address (м. Бровари, вул. Грушевського 7), phone (+38 077 172-07-07), operating hours (Пн-Нд: 10:00 - 21:00)
- **FR-020**: System MUST provide a clickable phone number that triggers device dialer on mobile
- **FR-021**: System MUST include SEO metadata: title, description, Open Graph tags, Twitter Cards, canonical URL, sitemap, robots.txt
- **FR-022**: System MUST include JSON-LD structured data for Restaurant and LocalBusiness schemas with menu, address, hours, and geo-coordinates
- **FR-023**: System MUST render without uncaught JavaScript errors in browser console
- **FR-024**: System MUST provide keyboard navigation for all interactive elements (tabs, buttons, form fields) with visible focus indicators
- **FR-025**: System MUST include semantic HTML with appropriate ARIA labels for screen reader accessibility
- **FR-026**: System MUST be responsive and functional on viewport widths from 320px (mobile) to 2560px (large desktop)
- **FR-027**: All user-facing text MUST be in Ukrainian language (uk-UA locale)
- **FR-028**: System MUST include a noscript fallback with static menu content for search engines and users with JavaScript disabled

### Key Entities

- **Menu Item**: Represents a single product offering with attributes: unique ID, name (Ukrainian), description (ingredients list), price (in UAH), category (rolls/sets/nigiri/etc.), and image reference. No relationships to other entities; self-contained product definition.

- **Cart Item**: Represents a menu item added to the shopping cart, extending Menu Item with additional attribute: quantity (integer ≥ 1). Derived from Menu Item by adding quantity tracking for purchase flow.

- **Order**: Represents a customer's order submission containing: customer name, phone number, delivery address, optional comment, list of Cart Items with quantities, and calculated total price. Submitted to external system (Google Forms) for processing.

- **Category**: Represents a menu classification with attributes: internal identifier (string key like "rolls", "sets") and display name (Ukrainian label). Used to filter and organize menu items in the UI.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can browse the full menu and view item details within 3 seconds of page load on a mobile 3G connection
- **SC-002**: Users can complete the entire ordering journey (browse → add to cart → checkout → submit) in under 3 minutes on first visit
- **SC-003**: 95% of users successfully add items to cart on first attempt without errors or confusion
- **SC-004**: Cart total calculation displays accurate prices for all quantity combinations without rounding errors or delays
- **SC-005**: Order form submission succeeds within 5 seconds under normal network conditions
- **SC-006**: Website achieves Lighthouse Performance score ≥ 90 and Accessibility score ≥ 95 on mobile devices
- **SC-007**: All 45+ menu items are discoverable through category filtering without pagination or scrolling issues
- **SC-008**: Website is fully functional on screens from 320px width (iPhone SE) to 2560px width (4K desktop) without layout breaks
- **SC-009**: Users can navigate the entire site using only keyboard controls with visible focus on all interactive elements
- **SC-010**: Website appears in Google search results for "суші Бровари" queries with accurate business information (address, hours, menu items) visible in rich snippets
- **SC-011**: Order data successfully reaches the restaurant's Google Forms backend with 100% accuracy (no data loss or corruption)
- **SC-012**: 90% of mobile users successfully complete checkout without pinch-to-zoom or horizontal scrolling

## Assumptions

- The Google Forms integration endpoint remains stable and accessible; restaurant staff monitors the Google Forms responses for incoming orders
- Product images (currently using placeholder sushi-roll.jpg) are acceptable for all menu items; high-quality product photography is not required at this baseline stage
- Prices are accurate and up-to-date as of baseline documentation; no automated pricing system or CMS integration is required
- Cart persistence during session (not across browser closes) is sufficient; users do not need saved carts across devices or login sessions
- Payment is handled offline (cash on delivery or phone confirmation); no online payment gateway integration is required
- Delivery area is limited to Brovary region; no address validation or delivery zone checking is implemented
- Ukrainian language only is sufficient; no multi-language support or internationalization is required
- Standard 60-minute delivery promise is communicated via phone after order submission; no real-time delivery tracking is required
- Menu content updates are handled via code changes and redeployment; no admin panel or content management system exists
