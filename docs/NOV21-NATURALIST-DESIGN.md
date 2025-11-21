# Naturalist Visual Design System

**Date:** November 21, 2025
**Branch:** `feature/botanical-aesthetic`

## Overview

This document captures the design philosophy, implementation details, and decision history for Arbor Parser's naturalist visual language—a design system inspired by 19th-century scientific illustration that bridges historical field notebooks with modern computational diagrams.

## Design Philosophy

### Core Insight: Technology Revealing Nature

The naturalist aesthetic creates a visual throughline from hand-drawn discovery to algorithmic analysis:

- **Historical anchor:** Darwin's field sketches, Linnaeus's botanical drafts, museum archives
- **Modern clarity:** Phylogenetic trees, computational diagrams, AST visualizations
- **Connection:** Draftsmanship → algorithms

This isn't just "vintage styling"—it's about showing that **parsing is specimen collection for code**. Just as naturalists catalogued species, parsers catalogue syntax structures.

### Why This Aesthetic Matters

> "This design is more than just CSS background changes and Times New Roman font stylings. We're revitalizing the curiosity toward nature that brought us to our present moment of technology."

The aesthetic serves pedagogical goals:
1. **Makes parsing feel concrete** - AST nodes are specimens, trees are field diagrams
2. **Reduces intimidation** - Warm, organic materials vs. cold technical interfaces
3. **Encourages exploration** - Field notebook aesthetic invites annotation and discovery
4. **Connects past and present** - Shows continuity of human knowledge-building

## Visual Language

### Color Palette

**Paper Tones** (aged parchment, natural fibers):
- `--paper-pristine: #faf8f3` - Fresh vellum
- `--paper-aged: #f4efe1` - 50-year-old notebook
- `--paper-weathered: #e8dcc8` - 150-year-old field notes
- `--paper-stained: #ddd0b8` - Water marks, foxing
- `--paper-shadow: rgba(61, 40, 23, 0.08)` - Creased edges

**Ink Tones** (sepia, brown ink, faded black):
- `--ink-fresh: #2d1f14` - Fresh iron gall ink
- `--ink-brown: #3d2817` - Brown ink (common in field notes)
- `--ink-faded: #5a4230` - 100-year fade
- `--ink-light: #6b5444` - Diluted sketch lines
- `--ink-wash: #8b7355` - Ink wash for shading

**Botanical Accents** (traditional pigments):
- `--vermillion: #c84f31` - Red oxide (specimen labels, highlights)
- `--indigo: #3d5a7f` - Blue ink (annotations, strings)
- `--verdigris: #4a6b5a` - Green copper (numbers, constants)
- `--ochre: #d4915e` - Yellow earth (functions, methods)

### Typography

**Font Families:**
- **Display:** `'EB Garamond', 'Crimson Text', Georgia, serif` - Title work, elegant headers
- **Body:** `'Libre Baskerville', Georgia, serif` - Readable, bookish
- **Mono:** `'Inconsolata', 'Source Code Pro', 'Courier New', monospace` - Code and labels

**Philosophy:** Serif fonts evoke printed scientific journals and handwritten field notes. Monospace maintains technical clarity for code while feeling like typewritten specimen labels.

### Spacing & Rhythm

Based on **golden ratio** for natural visual harmony:
- `--space-xs: 0.382rem`
- `--space-sm: 0.618rem`
- `--space-md: 1rem`
- `--space-lg: 1.618rem`
- `--space-xl: 2.618rem`
- `--space-xxl: 4.236rem`

### Animation & Timing

**Organic, not mechanical:**
- `--ease-natural: cubic-bezier(0.4, 0.0, 0.2, 1)` - Smooth, natural deceleration
- `--ease-growth: cubic-bezier(0.34, 1.56, 0.64, 1)` - Plant-like growth with slight bounce
- `--duration-instant: 150ms`
- `--duration-quick: 300ms`
- `--duration-smooth: 500ms`
- `--duration-grow: 800ms`

Tree nodes "grow in" with staggered delays, mimicking botanical illustration being drawn.

## Component Design Patterns

### AST Nodes: Pressed Botanical Samples

```css
.ast-node {
  background: var(--paper-weathered);
  border: 1.5px solid var(--ink-light);
  font-family: var(--font-mono);
  /* Subtle paper grain texture */
  background-image: repeating-linear-gradient(...);
}

.ast-node.highlighted {
  background: var(--vermillion);
  color: var(--paper-pristine);
  /* Specimen label emphasis */
}
```

**Design intent:** Each node feels like a pressed specimen on aged paper, carefully labeled and catalogued.

### Tree Container: Collection Drawer

```css
.tree-container {
  background: var(--paper-pristine);
  border: 1px solid var(--paper-stained);
  box-shadow: /* layered depth */;
}

.tree-container::after {
  /* Pinned corner effect - like museum mounting */
}
```

**Design intent:** The tree view feels like opening a specimen drawer in a natural history museum.

### Segmented Control: Index Tabs

```css
.tab-control {
  background: var(--paper-stained);
  border: 1.5px solid var(--ink-light);
}

.tab-button.active {
  background: var(--ink-brown);
  color: var(--paper-pristine);
  /* Ink-stained tab separators */
}
```

**Design intent:** Tabs evoke the index cards and section dividers in archival filing systems.

### Code Editor: Field Notebook Page

Custom CodeMirror theme (`fieldGuideTheme.ts`) with:
- Paper-colored background (`#faf8f3`)
- Brown ink for syntax (`#2d1f14`)
- Vermillion keywords (scientific terminology)
- Indigo strings (specimen labels)
- Verdigris numbers (measurements)
- Ochre functions (active elements)

**Design intent:** Writing code feels like annotating a field notebook.

### Custom Scrollbars

```css
*::-webkit-scrollbar-thumb {
  background: var(--ink-light);
  border-radius: 2px;
  border: 2px solid var(--paper-aged);
}
```

**Design intent:** Even utilitarian UI elements maintain the material aesthetic—ink-stained thumbs on aged paper tracks.

## Technical Implementation

### File Structure

```
src/
  theme/
    naturalist.css         # Complete CSS design system
    fieldGuideTheme.ts     # CodeMirror theme
    botanical.ts           # Color utilities (getInkGradient, etc.)
  components/
    CustomSelect.tsx       # Fully styled dropdown (native select insufficient)
    ASTNode.tsx           # Uses .ast-node CSS classes
    ASTTree.tsx           # Uses .tree-container
    SegmentedControl.tsx  # Uses .tab-control
    CodeEditor.tsx        # Integrates fieldGuideTheme
    RingsVisualization.tsx # Uses botanical.ts for gradients
docs/
  moodboard/              # Visual references
    darwin-famous-sketch.jpg
    linnaeus-lapland-field-notes.png
    radial-tidy-tree.png
    ...
```

### Key Technical Decisions

**1. CSS Custom Properties Over CSS-in-JS**
- Centralized theme in `naturalist.css` using CSS variables
- Easy to override, inspect in DevTools, consistent across components
- Components reference variables rather than hardcoding colors

**2. Custom Dropdown Component**
- Native `<select>` elements have browser-enforced styling limits
- Built `CustomSelect.tsx` for full control over appearance
- Uses React hooks (`useState`, `useRef`, `useEffect`) for dropdown state
- Click-outside detection for UX

**3. Overflow & Scrolling Pattern**
- **Critical CSS pattern:** `minHeight: 0` on flex children
  - Default `min-height: auto` prevents flex items from shrinking below content
  - Setting `minHeight: 0` allows container to respect parent constraints
  - Enables proper scrolling in constrained flex layouts
- **CodeMirror-specific:** `view.dom.style.height = '100%'` + `height: 100%` in theme
  - Makes CodeMirror fill container and activate internal scroller
  - Custom scrollbar styling via `.cm-scroller::-webkit-scrollbar`

**4. Animation Strategy**
- Tree nodes animate in with staggered delays (`animation-delay: 50ms * n`)
- Growth animation uses bounce easing for organic feel
- Branch connectors "draw" via `stroke-dasharray` animation (though not currently visible)

**5. Typography Loading**
- Google Fonts via `@import` in CSS (not JS)
- Fallback stack: `Georgia, serif` / `'Courier New', monospace`
- Font weights carefully chosen (400, 500, 600) to match archival printing

## Evolution & Iteration

### Initial Direction (Incorrect)

First attempt created a "living forest" palette with greens and vibrant nature colors. **User correction:**

> "Honestly Claude, I'm not impressed. This design is more than just CSS background changes and Times New Roman font stylings."

User provided references: Darwin's field notebooks, Linnaeus's botanical illustrations.

**Lesson:** The aesthetic is **historical scientific illustration**, not "nature vibes." Aged paper, sepia ink, museum archive quality.

### SVG Filters Experiment (Removed)

Attempted to add hand-drawn texture via SVG filters:
- `#ink-wobble` - Subtle line variation
- `#paper-grain` - Fiber texture
- `#ink-bleed` - Feathering on paper
- `#vermillion-glow` - Specimen label highlight

**Result:** Effects were too subtle to notice. User feedback:

> "Remove it, I honestly don't notice it."

**Lesson:** Design effects must be **perceptible** to justify complexity. Removed entire `SVGFilters.tsx` component and filter references.

### Blob → Rings Rename

Originally called `BlobVisualization` (generic). Renamed to `RingsVisualization` to match:
1. Visual appearance (concentric rings)
2. Botanical metaphor (tree rings, growth rings)
3. Historical diagrams (radial phylogenetic trees)

**Lesson:** Naming should reinforce the conceptual model.

### Scrollbar Struggle

Default browser scrollbars clashed with naturalist aesthetic. Custom styling required:
- Webkit scrollbars: `-webkit-scrollbar`, `-webkit-scrollbar-thumb`, `-webkit-scrollbar-track`
- Firefox: `scrollbar-width`, `scrollbar-color`
- Applied globally with `*::-webkit-scrollbar` selector
- CodeMirror required separate `.cm-scroller::-webkit-scrollbar` targeting

**Lesson:** Scrollbars are easy to overlook but break visual cohesion if left default.

### Dropdown Styling Saga

Native `<select>` elements proved impossible to fully style:
1. Tried CSS classes with `!important` → failed
2. Tried ID selectors with inline values → failed
3. Tried `appearance: none` with custom arrow → inconsistent across browsers
4. User insight: **"Is this dropdown even something that can be styled without creating a custom component?"**

**Solution:** Built `CustomSelect.tsx` from scratch with full control.

**Lesson:** Some web platform primitives have styling limits. Custom components needed when design requirements exceed browser capabilities.

## Moodboard & References

Visual references in `docs/moodboard/`:

1. **darwin-famous-sketch.jpg** - Darwin's "I think" tree sketch (1837)
   - Hand-drawn, exploratory, branching structure
   - Shows thinking process, not polished diagram

2. **linnaeus-lapland-field-notes.png** - Linnaeus's field observations
   - Handwritten annotations, botanical sketches
   - Aged paper, brown ink, specimen labels

3. **darwin-genealogical-geological.jpg** - Darwin's geological sketches
   - Scientific rigor meets hand-drawn warmth
   - Layered annotations, crossed-out revisions

4. **radial-tidy-tree.png** - Modern radial phylogenetic tree
   - Computational precision with organic radial layout
   - The "target aesthetic" for RingsVisualization

5. **Plant_phylogenetic_tree.png** - Contemporary phylogenetic diagram
   - Clean, modern, but retains tree metaphor
   - Shows evolution from field sketches to data viz

**Design throughline:** Hand-drawn discovery → systematic classification → computational analysis. Our AST visualizations sit at the modern end of this continuum while honoring its origins.

## Design System Usage

### For Future Development

**Adding New Components:**

1. **Use CSS variables** from `naturalist.css`
   ```tsx
   style={{ color: 'var(--ink-fresh)', padding: 'var(--space-md)' }}
   ```

2. **Follow material metaphors:**
   - Paper layers (elevated, stained, weathered)
   - Ink tones (fresh to wash)
   - Botanical accents for semantic emphasis

3. **Typography hierarchy:**
   - Titles: `var(--font-display)`
   - Body text: `var(--font-body)`
   - Code/labels: `var(--font-mono)`

4. **Animation timing:**
   - Instant feedback: `var(--duration-instant)`
   - UI transitions: `var(--duration-quick)`
   - Grow/reveal: `var(--duration-grow)`

### Color Semantic Mapping

| Element | Color | Rationale |
|---------|-------|-----------|
| Keywords | `--vermillion` | Scientific terminology, emphasis |
| Strings | `--indigo` | Specimen labels, annotations |
| Numbers | `--verdigris` | Measurements, data |
| Functions | `--ochre` | Active elements, operations |
| Comments | `--ink-faded` | Marginalia, notes |
| Errors | `--vermillion` | Critical attention needed |
| Highlights | `--vermillion` + glow | Selected specimen |

### Spacing Patterns

| Context | Spacing | Variable |
|---------|---------|----------|
| Inline spacing | 4-8px | `--space-xs` to `--space-sm` |
| Component padding | 16px | `--space-md` |
| Section margins | 26px | `--space-lg` |
| Page margins | 42px | `--space-xl` |
| Title spacing | 68px | `--space-xxl` |

## Lessons Learned

### 1. Design Needs Clear References

Abstract descriptions ("botanical feel") → unclear execution.
Visual references (Darwin notebooks) → aligned vision.

**Takeaway:** Start with moodboard, not adjectives.

### 2. Subtlety Has Limits

If users can't perceive an effect (SVG filters), it's not adding value.

**Takeaway:** Design details must be **noticeable** to justify complexity.

### 3. Web Platform Has Limits

Some HTML elements (native selects) can't be fully styled.

**Takeaway:** Custom components needed when platform constraints conflict with design requirements.

### 4. Naming Reinforces Concepts

`BlobVisualization` → generic, unclear
`RingsVisualization` → botanical, precise

**Takeaway:** Names should reinforce the mental model.

### 5. Comprehensive > Piecemeal

Naturalist design works **as a system**—paper, ink, typography, spacing all align.
Partial implementations (just changing colors) don't capture the vision.

**Takeaway:** Design systems need holistic execution.

## Future Possibilities

**Not implemented, but worth considering:**

1. **Paper texture overlays** - Very subtle noise/grain on backgrounds
2. **Ink variation** - Slight color shifts like real ink fading
3. **Hand-drawn connectors** - Slightly wobbly lines between nodes
4. **Watercolor accents** - Soft color bleeds for backgrounds
5. **Letterpress effects** - Subtle shadows on text (embossed feel)
6. **Age spots** - Random sepia marks (foxing) on containers

**Philosophy:** Only add if **perceptibly enhancing** the experience. Subtlety for its own sake adds complexity without value.

## Conclusion

The naturalist design system transforms Arbor Parser from a technical tool into an **educational experience**. By borrowing the visual language of 19th-century scientific illustration, we:

1. Make parsing feel **concrete and tangible** (specimens, not abstractions)
2. Create **emotional connection** (curiosity, not intimidation)
3. Show **historical continuity** (field sketches → computational diagrams)
4. Build a **cohesive visual language** (every element reinforces the metaphor)

This isn't just "pretty styling"—it's **pedagogy through design**. The aesthetic teaches users to see parsing as **specimen collection**, ASTs as **field diagrams**, and code as **natural phenomena worth studying with careful attention**.

---

**Design Credits:**
- Visual direction: Inspired by Darwin's field notebooks, Linnaeus's botanical drafts
- Implementation: Naturalist CSS design system, field guide CodeMirror theme
- Philosophy: Technology revealing nature—showing the throughline from hand-drawn discovery to computational analysis

**November 21, 2025**
