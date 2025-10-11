# Tasks: Fix Menu Design Issues

**Input**: Design documents from `/specs/003-fix-menu-design/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Playwright visual verification tests are REQUIRED per constitution and agent rules.

**Organization**: Tasks are organized by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- Paths based on React SPA structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and visual testing infrastructure

- [x] T001 Configure Playwright for visual testing in `playwright.config.ts`
- [x] T002 [P] Create visual test structure in `tests/menu-design-fixes.spec.ts`
- [x] T003 [P] Create baseline screenshots for current state
- [x] T004 [P] Setup test data and measurement thresholds

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core testing infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Implement spacing validation tests in `tests/menu-design-fixes.spec.ts`
- [x] T006 [P] Implement responsive layout tests in `tests/menu-design-fixes.spec.ts`
- [x] T007 [P] Implement touch target accessibility tests in `tests/menu-design-fixes.spec.ts`
- [x] T008 [P] Implement text readability tests in `tests/menu-design-fixes.spec.ts`
- [x] T009 [P] Implement visual regression tests in `tests/menu-design-fixes.spec.ts`
- [x] T010 [P] Implement performance impact tests in `tests/menu-design-fixes.spec.ts`

**Checkpoint**: Visual testing infrastructure ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Improved Menu Spacing (Priority: P1) 🎯 MVP

**Goal**: Increase spacing between category tabs and product grid from 32px to 48px for better visual hierarchy

**Independent Test**: Verify 48px minimum spacing between TabsList and TabsContent components across all screen sizes

### Tests for User Story 1 ⚠️

**NOTE: These tests MUST be written and FAIL before implementation**

- [x] T011 [US1] Spacing validation test for 48px minimum requirement in `tests/menu-design-fixes.spec.ts`
- [x] T012 [US1] Visual regression test for spacing changes in `tests/menu-design-fixes.spec.ts`

### Implementation for User Story 1

- [x] T013 [US1] Update TabsList spacing from mb-8 to mb-12 in `src/components/Menu.tsx`
- [x] T014 [US1] Verify spacing consistency across all screen sizes
- [x] T015 [US1] Test spacing with various content lengths

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Responsive Category Navigation (Priority: P1)

**Goal**: Implement responsive tab layout to prevent text compression and maintain accessibility on small screens

**Independent Test**: Verify horizontal scrolling works on screens < 768px with 44px minimum touch targets and 8px character width

### Tests for User Story 2 ⚠️

- [x] T016 [US2] Responsive layout test for horizontal scrolling in `tests/menu-design-fixes.spec.ts`
- [x] T017 [US2] Touch target compliance test for 44px minimum in `tests/menu-design-fixes.spec.ts`
- [x] T018 [US2] Text readability test for 8px character width in `tests/menu-design-fixes.spec.ts`
- [x] T019 [US2] Accessibility test for keyboard navigation in `tests/menu-design-fixes.spec.ts`

### Implementation for User Story 2

- [x] T020 [US2] Update TabsList with responsive classes in `src/components/Menu.tsx`
- [x] T021 [US2] Update TabsTrigger with responsive behavior in `src/components/ui/tabs.tsx`
- [x] T022 [US2] Add custom CSS for scroll indicators in `src/index.css`
- [x] T023 [US2] Update Menu component with scroll container in `src/components/Menu.tsx`
- [x] T024 [US2] Test responsive behavior across all breakpoints
- [x] T025 [US2] Verify accessibility compliance

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and integration testing

- [ ] T026 [P] Run comprehensive visual regression tests
- [ ] T027 [P] Performance validation (Core Web Vitals)
- [ ] T028 [P] Accessibility compliance verification
- [ ] T029 [P] Cross-browser testing
- [ ] T030 [P] Mobile device testing
- [ ] T031 [P] Update documentation with implementation results
- [ ] T032 [P] Code review and cleanup

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1 but both are P1 priority

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, both user stories can start in parallel (both are P1)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Spacing validation test for 48px minimum requirement in tests/menu-design-fixes.spec.ts"
Task: "Visual regression test for spacing changes in tests/menu-design-fixes.spec.ts"

# Implementation tasks are sequential (same file):
Task: "Update TabsList spacing from mb-8 to mb-12 in src/components/Menu.tsx"
Task: "Verify spacing consistency across all screen sizes"
Task: "Test spacing with various content lengths"
```

---

## Parallel Example: User Story 2

```bash
# Launch all tests for User Story 2 together:
Task: "Responsive layout test for horizontal scrolling in tests/menu-design-fixes.spec.ts"
Task: "Touch target compliance test for 44px minimum in tests/menu-design-fixes.spec.ts"
Task: "Text readability test for 8px character width in tests/menu-design-fixes.spec.ts"
Task: "Accessibility test for keyboard navigation in tests/menu-design-fixes.spec.ts"

# Launch implementation tasks in parallel (different files):
Task: "Update TabsList with responsive classes in src/components/Menu.tsx"
Task: "Update TabsTrigger with responsive behavior in src/components/ui/tabs.tsx"
Task: "Add custom CSS for scroll indicators in src/index.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (spacing fixes)
   - Developer B: User Story 2 (responsive layout)
3. Stories complete and integrate independently

---

## Success Criteria

### Automated Validation (Playwright)
- [ ] All spacing measurements meet 48px minimum requirement
- [ ] Horizontal scrolling works on screens < 768px
- [ ] Touch targets meet 44px minimum on mobile
- [ ] Text remains readable (8px+ character width)
- [ ] Visual regression tests pass
- [ ] Performance metrics maintained

### Manual Verification
- [ ] Screenshots show improved visual hierarchy
- [ ] Mobile experience is intuitive and accessible
- [ ] No visual regressions in existing design
- [ ] Smooth scrolling behavior on touch devices

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Both user stories are P1 priority and can be implemented in parallel
- Visual testing is mandatory per constitution requirements
