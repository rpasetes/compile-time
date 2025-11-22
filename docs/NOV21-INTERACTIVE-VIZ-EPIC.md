# Interactive Visualization Suite Epic

**Date:** November 21, 2025
**Epic ID:** `arbparse-9xu`
**Status:** In Progress

## Overview

Multi-PR epic implementing bidirectional highlighting, zoom interactions, and radial tree visualization across all views. Spans 3 PRs with 16 atomic, testable tasks.

**Goal:** Make Arbor Parser's visualizations interactive and intuitive through:
1. Bidirectional highlighting (click node → select code, click code → highlight node)
2. Zoom/focus interactions for Rings visualization
3. New Radial Tidy Tree visualization using D3
4. Shared state management and visual consistency across all views

## Epic Structure

### PR 1: Bidirectional Highlighting + Nodes Rename (5 tasks, P1)

**Branch:** `feature/bidirectional-highlighting`
**Success Criteria:** Click AST node → selects code. Click code → highlights node.

| ID | Task | Labels | Dependencies |
|----|------|--------|--------------|
| arbparse-9xu.1 | Rename 'Tree' → 'Nodes' | nodes-view, refactor, pr-1 | - |
| arbparse-9xu.2 | Add selectedNode state to App | shared, state-management, pr-1 | - |
| arbparse-9xu.3 | Node → Code highlighting | editor, highlighting, pr-1 | 9xu.2 |
| arbparse-9xu.4 | Code → Node algorithm | editor, highlighting, algorithm, pr-1 | 9xu.2 |
| arbparse-9xu.5 | Wire up node click handlers | nodes-view, highlighting, pr-1 | 9xu.2 |

**Technical Details:**

*Task 9xu.1: Rename 'Tree' → 'Nodes'*
- Update SegmentedControl options
- Change `vizMode` type: `"tree" | "rings"` → `"nodes" | "rings"`
- Update all variable names and comments
- Rationale: "Nodes" better describes what's shown (individual AST nodes, not tree diagram)

*Task 9xu.2: Add selectedNode State*
```typescript
// App.tsx
const [selectedNode, setSelectedNode] = useState<ts.Node | null>(null);
// Pass to CodeEditor, ASTTree, RingsVisualization
```

*Task 9xu.3: Node → Code Highlighting*
```typescript
// CodeEditor.tsx
useEffect(() => {
  if (!selectedNode) return;

  view.dispatch({
    selection: { anchor: selectedNode.pos, head: selectedNode.end },
    scrollIntoView: true
  });
}, [selectedNode]);
```

*Task 9xu.4: Code → Node Algorithm*
```typescript
// Traverse AST to find deepest node containing cursor position
function findNodeAtPosition(node: ts.Node, pos: number): ts.Node {
  if (pos < node.pos || pos > node.end) return node;

  let deepest = node;
  ts.forEachChild(node, (child) => {
    if (pos >= child.pos && pos <= child.end) {
      deepest = findNodeAtPosition(child, pos);
    }
  });
  return deepest;
}

// Listen to CodeMirror selection changes
EditorView.updateListener.of((update) => {
  if (update.selectionSet) {
    const pos = update.state.selection.main.head;
    const foundNode = findNodeAtPosition(ast, pos);
    setSelectedNode(foundNode);
  }
})
```

*Task 9xu.5: Wire Up Click Handlers*
- Pass `onNodeClick` through ASTTree → TreeNode → ASTNode
- On click: `onNodeClick(node)` → updates App's selectedNode
- Verify `isHighlighted` prop triggers vermillion styling

---

### PR 2: Rings Zoom + Enhanced Highlighting (4 tasks, P2)

**Branch:** `feature/rings-zoom`
**Success Criteria:** Click ring → zooms + highlights code. Breadcrumbs enable navigation.

| ID | Task | Labels | Dependencies |
|----|------|--------|--------------|
| arbparse-9xu.6 | Add focusedNode state | rings-view, state-management, pr-2 | - |
| arbparse-9xu.7 | Click-to-zoom with D3 transitions | rings-view, animation, pr-2 | 9xu.6, 9xu.2 |
| arbparse-9xu.8 | Smart label display | rings-view, rendering, pr-2 | - |
| arbparse-9xu.9 | Breadcrumb navigation | rings-view, navigation, pr-2 | 9xu.6 |

**Technical Details:**

*Task 9xu.6: Add focusedNode State*
```typescript
// RingsVisualization.tsx
const [focusedNode, setFocusedNode] = useState<ts.Node | null>(null);
// When null: show full tree (current behavior)
// When set: re-run D3 pack layout with focusedNode as root
```

*Task 9xu.7: Click-to-Zoom*
```typescript
circle.on('click', (event, d) => {
  event.stopPropagation();
  setFocusedNode(d.data.node); // Zoom
  onNodeClick?.(d.data.node);  // Highlight code
});

// D3 transition (250ms, match --duration-quick)
svg.transition()
  .duration(250)
  .attr('viewBox', calculateNewViewBox(focusedNode));

// Maintain hover highlight (color change)
```

*Task 9xu.8: Smart Labels*
```typescript
// Top level: show node type name
const label = ts.SyntaxKind[node.kind];

// If literal with value: display in center
let value = null;
if (ts.isStringLiteral(node)) value = `"${node.text}"`;
if (ts.isNumericLiteral(node)) value = node.text;
if (ts.isBooleanLiteral(node)) value = node.kind === ts.SyntaxKind.TrueKeyword ? 'true' : 'false';
```

*Task 9xu.9: Breadcrumbs*
```typescript
// Top of container
<div className="breadcrumb-nav">
  {pathToRoot.map(ancestor => (
    <button onClick={() => setFocusedNode(ancestor)}>
      {ts.SyntaxKind[ancestor.kind]}
    </button>
  ))}
  <button onClick={() => setFocusedNode(null)}>Reset</button>
</div>
```

---

### PR 3: Radial Tidy Tree Visualization (5 tasks, P2)

**Branch:** `feature/radial-tree`
**Success Criteria:** New "Radial" mode works. Click node → highlights code. Zoom/pan enabled.

| ID | Task | Labels | Dependencies |
|----|------|--------|--------------|
| arbparse-9xu.10 | Create RadialTreeVisualization | radial-view, d3, pr-3 | - |
| arbparse-9xu.11 | Smart label positioning/rotation | radial-view, rendering, pr-3 | 9xu.10 |
| arbparse-9xu.12 | Integrate selectedNode highlighting | radial-view, highlighting, pr-3 | 9xu.10, 9xu.2 |
| arbparse-9xu.13 | D3 zoom and pan behavior | radial-view, interaction, pr-3 | 9xu.10 |
| arbparse-9xu.14 | Add 'Radial' to toggle | shared, ui, pr-3 | 9xu.10 |

**Technical Details:**

*Task 9xu.10: Create Component*
```typescript
// Use Reingold-Tilford algorithm
const tree = d3.tree<HierarchyNode>()
  .size([2 * Math.PI, radius])
  .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

const root = d3.hierarchy(astToHierarchy(ast));
tree(root);

// Convert polar (angle, radius) to cartesian
const x = d.y * Math.cos(d.x - Math.PI / 2);
const y = d.y * Math.sin(d.x - Math.PI / 2);

// Links with d3.linkRadial
const linkGenerator = d3.linkRadial()
  .angle(d => d.x)
  .radius(d => d.y);
```

*Task 9xu.11: Label Rotation*
```typescript
// Primary rotation: position radially
const rotation = d.x * 180 / Math.PI - 90;

// Secondary rotation: flip text on right hemisphere (avoid upside-down)
const textRotation = d.x >= Math.PI ? 180 : 0;
const textAnchor = d.x >= Math.PI ? 'end' : 'start';

<text
  transform={`rotate(${rotation}) rotate(${textRotation})`}
  textAnchor={textAnchor}
  style={{ fontFamily: 'var(--font-mono)' }}
/>
```

*Task 9xu.12: Highlighting*
```typescript
// Visual hierarchy
const nodeStyle = {
  normal: { fill: 'var(--paper-weathered)', stroke: 'var(--ink-light)' },
  hovered: { fill: 'var(--paper-stained)', stroke: 'var(--ink-brown)' },
  selected: { fill: 'var(--vermillion)', stroke: 'var(--vermillion)' }
};

// Highlight selected node + ancestor path
const ancestorPath = getPathToRoot(selectedNode);
links
  .attr('stroke', d => ancestorPath.includes(d.target.data.node)
    ? 'var(--vermillion)'
    : 'var(--ink-light)');

// Click handler
node.on('click', (event, d) => {
  onNodeClick?.(d.data.node);
});

// Transition (250ms)
const duration = 250;
node.transition().duration(duration)
  .attr('fill', d => d.data.node === selectedNode ? 'var(--vermillion)' : 'var(--paper-weathered)');
```

*Task 9xu.13: Zoom/Pan*
```typescript
const zoom = d3.zoom()
  .scaleExtent([0.5, 5])
  .on('zoom', (event) => {
    svg.attr('transform', event.transform);
  });

svg.call(zoom);

// Click node → center it
node.on('click', (event, d) => {
  svg.transition()
    .duration(250)
    .call(zoom.translateTo, d.x, d.y);
});
```

*Task 9xu.14: Add to Toggle*
```typescript
// SegmentedControl: support 3 options
<SegmentedControl
  options={["Nodes", "Rings", "Radial"]}
  selected={vizMode}
  onChange={(mode) => setVizMode(mode as "nodes" | "rings" | "radial")}
/>

// App.tsx render
{vizMode === "nodes" && <ASTTree ... />}
{vizMode === "rings" && <RingsVisualization ... />}
{vizMode === "radial" && <RadialTreeVisualization ... />}
```

---

### Testing & Optimization (2 tasks, P3)

| ID | Task | Labels | Dependencies |
|----|------|--------|--------------|
| arbparse-9xu.15 | Test edge cases | testing, highlighting | - |
| arbparse-9xu.16 | Performance optimization (conditional) | performance, optimization | discovered-from:9xu.15 |

**Edge Cases to Test:**
- Empty selections in code
- Click whitespace/comments (no AST node)
- Very deep nesting (performance)
- Rapid clicking between nodes
- Switching visualization modes while highlighted
- Overlapping/nested nodes with same position

**Performance Optimizations (if needed):**
- Memoize AST traversal results
- Debounce cursor position updates
- Virtual scrolling for very deep trees
- Lazy rendering for off-screen nodes

---

## Beads Workflow

### Session Start
```bash
bd ready --json  # See available work
bd update <id> --status in_progress  # Start task
```

### During Work
- Keep one task `in_progress` at a time
- Update status as work progresses
- Close when complete: `bd close <id> --reason "..."`

### Session End
```bash
bd export  # Export DB → JSONL
git add .beads/issues.jsonl
git commit -m "Update issue tracker - close <ids>"
git push
```

### Epic Progress Tracking
```bash
bd epic status arbparse-9xu  # View completion percentage
bd dep tree arbparse-9xu.X   # View task dependencies
bd list --json | jq '.[] | select(.labels[] | contains("pr-1"))'  # Filter by PR
```

---

## Key Lessons from Epic Planning

**From Design Overhaul Experience:**

1. **Break down into atomic tasks** - Each task should be independently testable
2. **Track dependencies explicitly** - Use `blocks`, `discovered-from`, `parent-child` types
3. **Label by component & PR** - Makes filtering and organization trivial
4. **Plan for edge cases** - Testing and optimization as separate tasks
5. **Document technical details** - Future sessions need context without re-reading all code

**Beads Capabilities Discovered:**

- **Parent-child hierarchy:** `--parent` creates numbered children (9xu.1, 9xu.2, etc.)
- **Dependency types:** `blocks`, `discovered-from`, `parent-child`
- **Labels for organization:** Multiple labels per issue, filterable
- **Epic tracking:** `bd epic status` shows completion percentage
- **Systematic workflow:** Beads replaces ad-hoc TodoWrite for complex work

**Why This Matters:**

The design overhaul taught us that large features have hidden complexity:
- SVG filters seemed simple → turned out unnecessary (removed)
- Native select styling → required custom component
- Scrollbar styling → needed global + CodeMirror-specific approaches
- Font sizes → multiple iterations to get right

This epic anticipates similar discoveries by:
- Breaking work into small, testable increments
- Planning for edge cases explicitly
- Tracking conditional optimization work
- Using Beads to maintain context across sessions

---

## References

**Observable Examples:**
- [Collapsible Tree](https://observablehq.com/@d3/collapsible-tree) - Highlighting/selection patterns
- [Radial Tree](https://observablehq.com/@d3/radial-tree/2) - Layout and label rotation

**Related Documentation:**
- `docs/NOV21-NATURALIST-DESIGN.md` - Visual design system to maintain
- `CLAUDE.md` - Git workflow, Beads best practices

**External Resources:**
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [CodeMirror Selection API](https://codemirror.net/docs/ref/#state.EditorSelection)
- [D3 Hierarchy](https://d3js.org/d3-hierarchy)
- [D3 Zoom](https://d3js.org/d3-zoom)

---

**Created:** November 21, 2025
**Epic Status:** Ready to begin PR 1
