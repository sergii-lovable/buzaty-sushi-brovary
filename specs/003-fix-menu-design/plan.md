# Implementation Plan: Fix Menu Design Issues

**Branch**: `003-fix-menu-design` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-fix-menu-design/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Fix menu design issues by increasing spacing between category tabs and product grid (32px → 48px) and implementing responsive tab layout to prevent text compression and maintain accessibility on small screens (320px+).

## Technical Context

**Language/Version**: TypeScript 5.8.3, React 18.3.1  
**Primary Dependencies**: Vite 5.4.19, Tailwind CSS 3.4.17, shadcn/ui components, Radix UI primitives  
**Storage**: N/A (client-side state only)  
**Testing**: Playwright 1.56.0 for E2E testing  
**Target Platform**: Web browsers (mobile-first responsive design)  
**Project Type**: Single web application (React SPA)  
**Performance Goals**: Maintain Core Web Vitals (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms)  
**Constraints**: Static hosting on GitHub Pages, mobile-first design (320px+), WCAG 2.2 AA accessibility  
**Scale/Scope**: Local restaurant website with menu navigation improvements

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Assessment ✅

**Performance First**: ✅ PASS - Menu spacing changes will not impact Core Web Vitals. No new images or render-blocking resources added.

**Accessibility (WCAG 2.2 AA)**: ✅ PASS - Changes improve accessibility by ensuring minimum 44px touch targets and preventing text compression below readable thresholds.

**SEO and Discoverability**: ✅ PASS - No impact on meta tags, structured data, or content language. Menu improvements enhance user experience.

**Reliability and Error Handling**: ✅ PASS - No changes to error handling or data persistence. Pure UI improvements.

**Security and Privacy**: ✅ PASS - No new external integrations or data collection. Pure frontend styling changes.

**Code Quality and Type Safety**: ✅ PASS - Changes will use existing TypeScript patterns and Tailwind CSS utilities.

**Mobile-First Responsive Design**: ✅ PASS - Changes specifically address mobile usability issues identified in analysis.

**Simplicity and Maintainability**: ✅ PASS - Changes use existing component patterns and Tailwind utilities without adding complexity.

### Post-Phase 1 Assessment ✅

**Performance First**: ✅ PASS - Responsive tab layout implementation will maintain or improve performance through better CSS optimization.

**Accessibility (WCAG 2.2 AA)**: ✅ PASS - Touch target compliance and text readability improvements directly address accessibility requirements.

**Mobile-First Responsive Design**: ✅ PASS - Implementation specifically targets mobile usability improvements with proper breakpoints.

**Code Quality and Type Safety**: ✅ PASS - Implementation uses existing TypeScript patterns and component structure.

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
src/
├── components/
│   ├── Menu.tsx              # Main menu component (primary modification target)
│   ├── MenuItem.tsx         # Individual menu item component
│   └── ui/
│       └── tabs.tsx         # shadcn/ui tabs component (may need customization)
├── pages/
│   └── Index.tsx            # Homepage containing menu section
├── hooks/
│   └── use-mobile.tsx      # Mobile detection hook (may be used for responsive behavior)
├── lib/
│   └── utils.ts            # Utility functions including cn() for className merging
└── App.tsx                 # Main app component

tests/
├── homepage.spec.ts        # Existing E2E tests (may need updates for new behavior)
└── menu-responsive.spec.ts  # New tests for responsive menu behavior

public/
└── [static assets]

dist/
└── [build output]
```

**Structure Decision**: Single React SPA project structure. Changes will primarily modify existing `src/components/Menu.tsx` and potentially `src/components/ui/tabs.tsx` for responsive behavior. New tests will be added to verify responsive functionality.

## Visual Testing Strategy

### Playwright Visual Testing Plan

**Objective**: Automatically validate menu design fixes through comprehensive visual regression testing and responsive behavior verification.

### Test Categories

#### 1. Spacing Validation Tests
- **Test**: Verify 48px minimum spacing between category tabs and product grid
- **Screen Sizes**: Desktop (1200px), Tablet (768px), Mobile (375px), Small Mobile (320px)
- **Validation Method**: Measure bounding box distances between elements
- **Screenshot**: Capture visual spacing for manual verification
- **Expected Outcome**: Consistent 48px+ spacing across all screen sizes

#### 2. Responsive Layout Tests
- **Test**: Verify horizontal scrolling behavior on mobile screens
- **Screen Sizes**: Mobile (375px), Small Mobile (320px)
- **Validation Method**: Check `scrollWidth > clientWidth` and scroll functionality
- **Screenshot**: Capture scrolling state and tab layout
- **Expected Outcome**: Smooth horizontal scrolling with proper scroll snap

#### 3. Touch Target Accessibility Tests
- **Test**: Verify 44px minimum touch targets on mobile devices
- **Screen Sizes**: Mobile (375px), Small Mobile (320px)
- **Validation Method**: Measure tab element dimensions
- **Screenshot**: Capture touch target sizes
- **Expected Outcome**: All interactive elements meet WCAG 2.2 AA requirements

#### 4. Text Readability Tests
- **Test**: Verify minimum 8px character width for readable text
- **Screen Sizes**: All screen sizes, especially mobile
- **Validation Method**: Calculate character width (element width / text length)
- **Screenshot**: Capture text readability at different sizes
- **Expected Outcome**: No text compression below 8px character width

#### 5. Visual Regression Tests
- **Test**: Compare before/after screenshots for visual consistency
- **Screen Sizes**: Desktop (1200px), Tablet (768px), Mobile (375px)
- **Validation Method**: Playwright screenshot comparison
- **Screenshot**: Full page screenshots for each breakpoint
- **Expected Outcome**: Visual improvements without breaking existing design

#### 6. Performance Impact Tests
- **Test**: Verify no impact on Core Web Vitals
- **Metrics**: LCP (≤2.5s), CLS (≤0.1), INP (≤200ms)
- **Validation Method**: Performance API measurements
- **Screenshot**: Capture performance metrics
- **Expected Outcome**: Maintain or improve performance scores

### Test Implementation Plan

#### Phase 1: Test Setup
1. **Configure Playwright**: Enable mobile device testing and visual regression
2. **Create Test Structure**: Organize tests by category and screen size
3. **Baseline Screenshots**: Capture current state for comparison
4. **Test Data**: Define expected measurements and thresholds

#### Phase 2: Test Development
1. **Spacing Tests**: Implement automated spacing measurement
2. **Responsive Tests**: Add horizontal scrolling validation
3. **Accessibility Tests**: Create touch target verification
4. **Visual Tests**: Set up screenshot comparison framework

#### Phase 3: Test Execution
1. **Pre-Implementation**: Run tests on current state
2. **Post-Implementation**: Validate fixes meet requirements
3. **Regression Testing**: Ensure no visual regressions
4. **Performance Validation**: Confirm Core Web Vitals compliance

### Test Configuration Requirements

#### Playwright Config Updates
```typescript
// Enable mobile testing
projects: [
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } }
]

// Visual testing settings
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry'
}
```

#### Test File Structure
```
tests/
├── menu-design-fixes.spec.ts     # Main test suite
├── visual-regression.spec.ts     # Screenshot comparisons
├── accessibility.spec.ts         # WCAG compliance tests
└── performance.spec.ts          # Core Web Vitals tests
```

### Success Criteria for Visual Testing

#### Automated Validation
- [ ] All spacing measurements meet 48px minimum requirement
- [ ] Horizontal scrolling works on screens < 768px
- [ ] Touch targets meet 44px minimum on mobile
- [ ] Text remains readable (8px+ character width)
- [ ] Visual regression tests pass
- [ ] Performance metrics maintained

#### Manual Verification
- [ ] Screenshots show improved visual hierarchy
- [ ] Mobile experience is intuitive and accessible
- [ ] No visual regressions in existing design
- [ ] Smooth scrolling behavior on touch devices

### Integration with Development Workflow

#### Pre-Implementation
1. **Baseline Testing**: Capture current state screenshots
2. **Requirement Validation**: Confirm test criteria match specification
3. **Test Environment**: Ensure consistent testing setup

#### During Implementation
1. **Incremental Testing**: Run tests after each change
2. **Visual Feedback**: Use screenshots to guide implementation
3. **Performance Monitoring**: Track Core Web Vitals impact

#### Post-Implementation
1. **Final Validation**: Confirm all requirements met
2. **Regression Testing**: Ensure no breaking changes
3. **Documentation**: Update test results and screenshots

### Test Maintenance Strategy

#### Regular Updates
- **Screenshot Baselines**: Update when design changes
- **Threshold Adjustments**: Refine measurements based on feedback
- **New Screen Sizes**: Add testing for additional breakpoints
- **Performance Targets**: Update Core Web Vitals thresholds

#### Continuous Integration
- **Automated Runs**: Execute tests on every PR
- **Visual Reports**: Generate HTML reports with screenshots
- **Failure Analysis**: Provide detailed failure information
- **Performance Tracking**: Monitor metrics over time

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
