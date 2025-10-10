<!--
Sync Impact Report
- Version change: template → 1.0.0
- Modified principles: n/a (initial version)
- Added sections: 8 core principles, Performance Standards, Development Workflow, Governance
- Removed sections: Generic placeholders
- Templates requiring updates:
  ✅ plan-template.md: Constitution Check section aligned
  ✅ spec-template.md: Requirements section aligned
  ✅ tasks-template.md: Test-optional approach aligned
- Follow-up TODOs: Monitor Core Web Vitals quarterly; Add accessibility audit checklist
-->

# Пузаті суші (Buzaty Sushi Brovary) Constitution

## Core Principles

### I. Performance First

Every feature MUST maintain or improve Core Web Vitals (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms). Images MUST be optimized and lazy-loaded. Code MUST be split by route. No render-blocking resources in critical path.

**Rationale**: Fast load times directly impact conversion rates and SEO rankings for local restaurant searches. Mobile users on 3G/4G are primary audience.

### II. Accessibility (WCAG 2.2 AA)

Semantic HTML is REQUIRED. Interactive elements MUST be keyboard navigable with visible focus indicators. ARIA labels MUST be present where needed. Color contrast MUST meet AA thresholds (4.5:1 for text). Form errors MUST be announced to screen readers.

**Rationale**: Inclusive design expands customer base and ensures legal compliance. Many users navigate via keyboard or assistive technology.

### III. SEO and Discoverability

Pages MUST include accurate meta tags (Open Graph, Twitter Cards), canonical URLs, and valid JSON-LD structured data (Restaurant, LocalBusiness schemas). Sitemap and robots.txt MUST be maintained. Content language is Ukrainian (uk-UA).

**Rationale**: Organic search is primary customer acquisition channel. "суші Бровари" and related keywords drive traffic.

### IV. Reliability and Error Handling

Application MUST render without uncaught exceptions. Network failures MUST provide clear user feedback with retry mechanisms. Form validation MUST happen client-side before submission. Order data MUST be preserved in sessionStorage during checkout to prevent loss.

**Rationale**: Any failure during order flow results in lost revenue. Users expect resilience and clear guidance when errors occur.

### V. Security and Privacy

No API keys or secrets in client code. External links MUST use `rel="noopener noreferrer"`. User input MUST be validated and sanitized. Google Forms integration MUST only collect delivery-necessary data (name, phone, address, order details).

**Rationale**: Protect customer data and maintain trust. Minimize attack surface and comply with privacy expectations.

### VI. Code Quality and Type Safety

TypeScript strict mode is REQUIRED. Avoid `any` type; use proper types or `unknown`. ESLint MUST pass before merge. Dead code and unused imports MUST be removed. Prefer shadcn/ui and Radix UI primitives over custom components.

**Rationale**: Type safety prevents runtime errors. Standardized components reduce bugs and maintenance burden.

### VII. Mobile-First Responsive Design

Layout MUST work on screens from 320px to 2560px. Touch targets MUST be ≥44px. Primary CTAs (order, add to cart) MUST be easily reachable on mobile. Tailwind CSS utilities and shadcn/ui patterns MUST be used for consistency.

**Rationale**: 70%+ of restaurant orders come from mobile devices. Thumb-friendly design improves conversion.

### VIII. Simplicity and Maintainability

Avoid premature abstraction. Components SHOULD be colocated with usage. State management SHOULD use React hooks (useState, useReducer) unless complexity demands more. Prefer inline Tailwind over CSS files. YAGNI (You Aren't Gonna Need It) principle applies.

**Rationale**: Small project scope demands lean, easy-to-understand code. Over-engineering increases onboarding friction and slows iteration.

## Performance Standards

- **Bundle Size**: Initial JS bundle ≤ 200KB gzipped
- **Lighthouse Score**: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- **Time to Interactive (TTI)**: ≤ 3.5s on mobile 3G
- **Image Optimization**: All images MUST use WebP/AVIF with fallbacks; responsive srcset required

## Development Workflow

### Code Review Requirements

- All PRs MUST include a "Constitution Check" comment mapping changes to affected principles or stating "No impact"
- Breaking changes to accessibility, SEO metadata, or order flow REQUIRE explicit approval from project owner
- Linter errors MUST be resolved before merge

### Testing Strategy

- Manual testing of order flow (add to cart → checkout → form submission) REQUIRED before each release
- Accessibility spot-checks using axe DevTools or Lighthouse RECOMMENDED
- Automated E2E tests are OPTIONAL (not mandatory for this project size)

### Quality Gates

- `npm run lint` MUST pass
- No TypeScript errors (`tsc --noEmit`)
- Visual review on mobile (375px) and desktop (1280px)
- Cart state persistence across page refresh verified

## Governance

### Amendment Procedure

1. Propose changes via PR with `constitution` label
2. Include rationale and version bump justification (see Versioning Policy)
3. At least one repository maintainer MUST approve
4. Breaking removals (e.g., removing a principle) require project owner sign-off
5. Upon merge, update version and "Last Amended" date below

### Versioning Policy (Semantic)

- **MAJOR** (X.0.0): Backward-incompatible principle removals or redefinitions (e.g., removing accessibility requirement)
- **MINOR** (1.X.0): New principle added or materially expanded guidance (e.g., adding analytics principle)
- **PATCH** (1.0.X): Clarifications, typo fixes, non-semantic refinements

### Compliance Review

- **Quarterly**: Run Lighthouse audit, validate Core Web Vitals in production, check structured data with Google Rich Results Test
- **On major features**: Accessibility review with keyboard navigation and screen reader spot-check
- **Violations**: File GitHub issue tagged `constitution-violation` with remediation plan

## Enforcement

This constitution supersedes all other development practices. PRs that violate principles WITHOUT documented exception will be blocked. When in doubt, ask in PR comments referencing specific principle section.

**Exceptions**: Time-boxed technical debt is permitted if:
1. Filed as GitHub issue with `tech-debt` label
2. Includes remediation timeline (≤ 2 sprints)
3. Approved by maintainer

---

**Version**: 1.0.0 | **Ratified**: 2025-10-10 | **Last Amended**: 2025-10-10
