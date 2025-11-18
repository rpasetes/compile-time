# Week 9 Sprint Plan - LexiScope Blob Visualization

## Vision Statement
Transform LexiScope into a **code fluency tool for working developers** that helps build structural literacy through visual inspection of TypeScript syntax. The tool enables developers to understand unfamiliar code by examining it like specimens under a microscope.

## Core Value Proposition
**"I don't understand this code snippet. Let me see what it actually is."**

In a world where developers spend more time reading/auditing code (especially AI-generated) than writing from scratch, LexiScope builds intuition about TypeScript's ~300 syntactic constructs (Leximons) through curiosity-driven exploration.

## Key Insight for Week 9
**Nested tree structures are limiting.** They don't viscerally convey encapsulation and containment.

**New approach:** Circle packing visualization (nested blobs/cellular organisms) where you can literally SEE how expressions wrap around each other, like microbes under a microscope.

## Week 9 Goals

### Must-Have (Critical Path)
1. **Blob visualization spike** (Monday) - Implement D3 circle packing to replace tree view
2. **Enhanced inspection UX** - Click/hover reveals Leximon (SyntaxKind) details clearly
3. **5 curated specimens** - Pre-loaded TypeScript patterns that demonstrate structural complexity
4. **Professor Oak LLM integration** - Click "Explain this Leximon" → plain English explanation

### Should-Have (High Value)
5. **Specimen gallery UI** - Browse and select from curated code patterns
6. **Visual polish** - Make it feel like examining specimens (microbe aesthetic, clean labels)

### Nice-to-Have (If Time Permits)
7. **Save/bookmark specimens** - Track interesting patterns you've discovered
8. **Share links** - Generate URL with code pre-loaded

## Monday Focus: Blob Visualization Spike

### Goal
Replace the current tree visualization with D3 circle packing to show nested containment as concentric blobs.

### Technical Approach

**Library Choice: D3.js with React**
- Use `d3-hierarchy` for data transformation
- Use `d3.pack()` for circle packing layout
- Render with React + SVG for full control
- Reference: [React Graph Gallery - Circular Packing](https://www.react-graph-gallery.com/circular-packing)

**Installation:**
```bash
npm install d3
npm install --save-dev @types/d3
```

**Implementation Steps:**

1. **Create new component** - `src/components/BlobVisualization.tsx`
   - Accept AST as prop (same format as current ASTTree component)
   - Convert AST to D3 hierarchy format
   - Apply circle packing layout
   - Render as SVG circles with labels

2. **AST to Hierarchy Converter** - `src/utils/astToHierarchy.ts`
   - Transform TypeScript AST nodes into D3-compatible hierarchy
   - Each node needs: `{ name: string, children?: [], value?: number }`
   - Filter out noise nodes (SourceFile, EndOfFileToken wrapper)
   - Assign meaningful values for circle sizing (node complexity, child count, or uniform)

3. **Test with simple example**
   - Start with `const x = 1 + 2`
   - Should produce 3-4 nested circles showing containment
   - Verify layout is readable and intuitive

4. **Decision point by lunch:**
   - ✅ If it feels magical → commit to blob viz, continue polishing
   - ❌ If it's fighting you → pivot back to enhanced tree view

### D3 Circle Packing Primer

**Basic D3 Pattern:**
```typescript
import * as d3 from 'd3';

// 1. Create hierarchy from data
const root = d3.hierarchy(data);

// 2. Sum values (required before pack)
root.sum(d => d.value || 1);

// 3. Apply pack layout
const pack = d3.pack()
  .size([width, height])
  .padding(3);

pack(root);

// 4. Each node now has x, y, r properties
// Render as SVG circles
```

**Key Resources:**
- [D3 Pack API](https://d3js.org/d3-hierarchy/pack)
- [Observable - Circle Packing](https://observablehq.com/@d3/circle-packing)
- [React Graph Gallery Tutorial](https://www.react-graph-gallery.com/circular-packing)

### Expected Data Structure

**Input (TypeScript AST node):**
```typescript
{
  kind: SyntaxKind.BinaryExpression,
  left: { kind: SyntaxKind.NumericLiteral, text: "1" },
  operator: { kind: SyntaxKind.PlusToken },
  right: { kind: SyntaxKind.NumericLiteral, text: "2" }
}
```

**Output (D3 hierarchy format):**
```typescript
{
  name: "BinaryExpression",
  children: [
    { name: "NumericLiteral: 1", value: 1 },
    { name: "PlusToken", value: 1 },
    { name: "NumericLiteral: 2", value: 1 }
  ]
}
```

### Success Criteria for Monday

**Minimum viable blob viz:**
- [ ] D3 installed and importing correctly
- [ ] Simple AST (3-5 nodes) renders as nested circles
- [ ] Circle labels show SyntaxKind names
- [ ] Layout is readable (circles don't overlap inappropriately)
- [ ] Feels more intuitive than tree view for understanding containment

**If successful:**
- Continue to hover/click interactions
- Add microbe-inspired visual styling
- Test with complex specimens

**If blocked:**
- Document what didn't work
- Pivot to enhanced tree view (better spacing, visual hierarchy, subtle animations)
- Don't burn the whole week on layout algorithms

## Specimen Gallery (5 Curated Examples)

These are code patterns that demonstrate structural complexity and benefit from visual inspection:

1. **Optional Chaining**
   ```typescript
   const name = data?.items?.[0]?.name;
   ```
   Shows: OptionalChainingExpression → ElementAccessExpression → PropertyAccessExpression

2. **Nullish Coalescing**
   ```typescript
   const value = input ?? defaultValue;
   ```
   Shows: BinaryExpression with NullishCoalescingOperator

3. **Type Guard**
   ```typescript
   if (typeof x === 'string') { return x.toUpperCase(); }
   ```
   Shows: IfStatement → BinaryExpression → TypeOfExpression

4. **Generic Constraint**
   ```typescript
   function pick<T extends Record<string, unknown>>(obj: T) { }
   ```
   Shows: TypeParameter → Constraint → TypeReference

5. **Conditional Expression with Complex Nesting**
   ```typescript
   const result = isValid ? (hasPermission ? 'allowed' : 'denied') : 'invalid';
   ```
   Shows: Nested ConditionalExpressions

Each specimen should have:
- Title (e.g., "Optional Chaining Pattern")
- Code snippet
- Brief description of when you'd encounter this
- Key Leximons to notice

## Professor Oak Integration

**Concept:** Click any Leximon (node) → Get plain English explanation of what it is and why it matters.

**Implementation approach:**
- Use Claude API (or OpenAI) with structured prompt
- Cache explanations for common SyntaxKinds to avoid API spam
- Style as friendly professor explaining microbiology

**Example prompt structure:**
```
You are Professor Oak, a friendly expert teaching developers about TypeScript syntax.

Explain this SyntaxKind in 2-3 sentences:
- What it represents in code
- When developers encounter it
- Why it's structured this way

SyntaxKind: OptionalChainingExpression

Respond in a warm, educational tone suitable for working developers.
```

**UI Pattern:**
- Click node → Modal or sidebar appears
- Shows: SyntaxKind name, Professor Oak explanation, example code
- Button to close and continue exploring

## Demo Script (End of Week)

**Hook:** "Here's code I saw in a PR today and didn't fully understand."

**Code example:**
```typescript
const userName = user?.profile?.displayName ?? user?.email?.split('@')?.[0] ?? 'Anonymous';
```

**Demo flow:**
1. Paste into LexiScope
2. Blob visualization renders - see the nested structure visually
3. Hover over nodes - identify OptionalChainingExpression, NullishCoalescingExpression, etc.
4. Click on OptionalChainingExpression → Professor Oak explains it
5. "Now I understand this pattern structurally, I can read it anywhere"
6. Show specimen gallery - "Here are other patterns worth understanding"

**Key message:** LexiScope builds code fluency by making TypeScript structure visible and explorable.

## Technical Constraints

**Performance targets:**
- Parse + render < 200ms for typical snippets
- Smooth interactions (hover/click feedback < 50ms)

**Browser support:**
- Modern browsers only (Chrome, Firefox, Safari, Edge)

**Dependencies to add:**
- `d3` (and `@types/d3`)
- Consider: `react-spring` for smooth animations (optional, only if time)

## Risk Management

**Biggest risk:** Blob visualization takes too long to implement well.

**Mitigation:**
- Time-box Monday to spike
- Decision point by lunch: commit or pivot
- Fallback: Enhanced tree view is still valuable
- Don't let perfect be the enemy of good

**Other risks:**
- LLM API costs for Professor Oak (use caching, rate limiting)
- Specimen selection (focus on patterns Russell actually encounters)
- Over-scoping Week 9 (stick to must-haves, cut nice-to-haves ruthlessly)

## Success Metrics

**Week 9 is a win if:**
- [ ] Blob visualization working for at least simple specimens
- [ ] 5 curated specimens loaded and explorable
- [ ] Professor Oak explains at least 10 common SyntaxKinds
- [ ] Demo shows clear value: "I understand code better with this tool"
- [ ] Presented with clarity and rigor (Mohamed-level talk quality)

**Bonus wins:**
- [ ] Specimen gallery has polished UX
- [ ] Visual design feels cohesive (microbe/cellular aesthetic)
- [ ] Other bootcamp folks actually want to use it

## Post-Week 9 Roadmap

Ideas for future sprints (not this week):

- Search/filter nodes by type
- AST diff view (compare two snippets)
- Export specimens as images/links
- Expand specimen library (community contributions?)
- Tokenization view (show lexical analysis step separately)
- More advanced Professor Oak responses (context-aware explanations)

## Resources

**D3 Circle Packing:**
- https://www.react-graph-gallery.com/circular-packing
- https://d3js.org/d3-hierarchy/pack
- https://observablehq.com/@d3/circle-packing

**TypeScript Compiler API:**
- https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
- https://ts-ast-viewer.com/ (reference for SyntaxKind names)

**LLM Integration:**
- Anthropic Claude API docs
- Consider caching strategy for common explanations

---

## Handoff Notes

**Current state:**
- Repository: `/Users/russellpasetes/Documents/FractalBootcamp/compile-time`
- Branch: `main` (clean working tree)
- MVP already built: CodeMirror editor + TypeScript parser + tree visualization
- Deployed and functional

**What to do first:**
1. Read this plan
2. Install D3: `npm install d3 @types/d3`
3. Start Monday spike: Create `BlobVisualization.tsx` component
4. Follow React Graph Gallery tutorial for basic circle packing
5. Test with simple AST from parser
6. Report back with results by lunch - commit or pivot decision

**Questions to resolve:**
- Circle sizing algorithm: uniform, by child count, or by complexity metric?
- Label placement: inside circles, outside, or on hover only?
- Color scheme: map to SyntaxKind categories or keep it simple?
- Interaction model: click to zoom in (like D3 examples) or click to inspect (Professor Oak)?

Good luck. Build something that makes code structure visceral. Let's win Week 9.
