# UI QA Agent Skills

This document defines the skills used by the AI agent to analyze Next.js + Tailwind UI code.

The agent must apply all skills on every component unless explicitly disabled.

---

# 1. tailwind_class_analyzer

## Purpose

Detect incorrect, inefficient, or inconsistent Tailwind class usage.

## Detect

- duplicate utilities (e.g. "flex flex flex-col")
- conflicting utilities (p-2 p-4, w-full w-fit)
- arbitrary values (w-[123px], mt-[37px]) unless justified
- overly long className (>120 chars)
- excessive layout utilities in a single node (>8 layout-related classes)

## Anti-patterns

- flex + flex-col + items-center + justify-between all together (overkill)
- repeated spacing scales in one component
- inconsistent radius usage in same UI block

---

# 2. layout_structure_checker

## Purpose

Validate JSX structure and layout correctness.

## Detect

- div nesting depth > 4
- missing semantic HTML (div instead of main/section/header/nav/button)
- absolute positioning without relative parent
- flex inside flex inside flex (depth > 2)
- incorrect height logic:
  - h-full used without parent height chain
  - min-h-screen + h-full together without reason

## Next.js specific rules

- layout components misuse min-h-screen
- page components leaking layout responsibility
- inconsistent layout boundaries between layout.tsx and page.tsx

---

# 3. accessibility_checker

## Purpose

Ensure UI is accessible and keyboard-friendly.

## Detect

- missing alt on images
- clickable div instead of button
- missing aria-label on icon-only buttons
- incorrect heading hierarchy (h1 → h4 skip)
- missing focus styles (focus-visible:ring, focus:outline-none misuse)
- interactive elements not keyboard accessible

## Fix strategy

- replace div → button when clickable
- add aria-\* attributes when semantics unclear
- enforce proper heading order

---

# 4. visual_ui_checker

## Purpose

Detect visual and layout issues (screenshot + DOM based reasoning).

## Detect

- misaligned elements
- inconsistent spacing rhythm
- broken grid alignment
- horizontal overflow
- overlapping elements
- inconsistent button sizing
- poor visual hierarchy (bad typography scaling)

## Heuristics

- spacing inconsistency across siblings
- uneven padding in card components
- inconsistent radius usage in similar UI blocks
- visual imbalance between columns

---

# 5. refactor_suggester

## Purpose

Convert detected issues into actionable refactoring steps.

## Behavior

- group related issues into root causes
- suggest component extraction when repetition exists
- reduce className complexity
- enforce reuse of UI patterns

## Output format

- Summary of problems
- Root cause analysis
- Suggested refactor plan
- Example improved JSX (if needed)

---

# Execution Rules

The agent must:

1. Apply ALL skills to each component
2. Merge overlapping issues into a single report when possible
3. Prioritize:
   - accessibility > structure > visual > style consistency
4. Prefer actionable fixes over explanations
5. Assume Tailwind + Next.js App Router context
