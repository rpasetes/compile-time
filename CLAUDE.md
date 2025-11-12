BEFORE ANYTHING ELSE: run 'bd onboard' and follow the instructions

---

# Claude Instructions for Compile Time

## Project Context
This is **Compile Time** - an interactive AST visualizer that teaches parsing concepts through direct manipulation. Users paste JavaScript or TypeScript code and see the tree structure in real-time.

**Key insight**: Make parsing feel concrete rather than mystical.

## Core Principles

### 1. MVP-First Mindset
The MVP is deliberately minimal:
- Code input (textarea)
- AST tree visualization
- Bidirectional highlighting (code ↔ tree)
- JS/TS toggle

**Do not add features beyond MVP scope unless explicitly requested.** Every feature should justify its existence by making the core concept clearer.

### 2. Real-World Relevance
We support TypeScript because that's what people actually write in 2025. Users should be able to paste real production code - their own code, AI-generated code, library code - and see how it parses. This isn't about toy examples; it's about understanding the structure of code they encounter daily.

Dogfooding (visualizing our own source) is a nice bonus, but the primary value is relevance to modern development.

### 3. Teaching Through Exploration
The tool teaches by letting users play, not by explaining exhaustively. Visual clarity and interaction are more important than comprehensive documentation within the tool.

## Technical Stack

### Core Dependencies
- **React + TypeScript** (Vite template: `react-ts`)
- **TypeScript Parser** (`typescript` package)
  - Parses both JavaScript and TypeScript
  - Use `ts.createSourceFile()` for parsing
  - `ScriptKind.JS` for JavaScript mode
  - `ScriptKind.TS` or `ScriptKind.TSX` for TypeScript mode

### Parsing Strategy
```typescript
import * as ts from 'typescript';

// JavaScript mode
const jsAST = ts.createSourceFile(
  'temp.js',
  sourceCode,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.JS
);

// TypeScript mode
const tsAST = ts.createSourceFile(
  'temp.ts',
  sourceCode,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS
);
```

## Development Workflow

### Issue Tracking with Beads
All tasks should be tracked in Beads. Before starting work:

```bash
# See what's ready to work on
bd ready --json

# Create issues for new work discovered
bd create "Description" -t feature -p 1

# Update status as you work
bd update <issue-id> --status in_progress

# Close when complete
bd close <issue-id> --reason "Implemented"
```

**Key behaviors:**
- Create issues proactively as work is discovered
- Link discovered work with `bd dep add <new-id> <parent-id> --type discovered-from`
- One issue `in_progress` at a time
- Close issues immediately when complete, don't batch

### Git Workflow & Pull Requests

**Branch Strategy:**
- Create feature branches with encoded intent (e.g., `feature/ast-visualization`, `fix/parse-errors`, `refactor/tree-rendering`)
- Branch name should convey the app-level change being made

**Git Best Practices:**
1. **Always start fresh:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/descriptive-name
   ```
2. **Commit frequently** - don't let work sit uncommitted
3. **Single-line commit messages only** - no multi-line, no heredocs
4. **Avoid git stash** - prefer WIP commits instead
5. **Use `git status` liberally** - always know your current state
6. **Never use `git reset --hard` or `git clean -fd`** without explicit user approval

**PR Philosophy:**
PRs represent **distinct app-level changes** based on user intent, not just issue completion:
- **PR = user intent** (new feature, bug fix, refactor)
- **Issues = implementation tracking** (work breakdown to achieve that intent)
- One PR might close multiple related issues
- One large issue might span multiple PRs

**PR Creation:**
- Create PRs when we've completed a meaningful app-level change
- PR title: Clear statement of intent
- PR description: Succinct summary - what changed and why (2-4 short bullet points max)
- Reference related Beads issues if relevant
- **Commit messages: SINGLE LINE ONLY** - clear, descriptive, no multi-line
- Always checkout main, pull latest, then create new branch

**Beads + PR Relationship:**
- Use Beads for internal work tracking and memory
- Beads issues track implementation breakdown
- When creating PR, close/update relevant Beads issues
- Sync Beads before PR creation: `bd sync && git add .beads/issues.jsonl && git commit -m "Update issue tracker"`

**Future Note:**
CodeRabbit will eventually handle PR generation - workflow will adjust when that's configured.

### Session-Ending Protocol
Before finishing:
1. File issues for remaining work and TODOs
2. Close completed issues
3. Sync Beads: `bd sync && git add .beads/issues.jsonl && git commit -m "Update issue tracker"`
4. Push all changes
5. Run `bd ready --json` to see next session's options

## Code Style & Patterns

### File Organization
```
src/
  components/
    CodeEditor.tsx       # Input + language toggle
    ASTTree.tsx          # Tree container
    ASTNode.tsx          # Individual node rendering
  utils/
    parser.ts            # TypeScript parser wrapper
    highlighter.ts       # Highlight coordination
  App.tsx               # Main component
  examples.ts           # Preset examples
```

### Component Patterns
- **Functional components** with hooks
- **Props interfaces** explicitly defined
- **Keep components small** - single responsibility
- **CSS modules or Tailwind** (decide based on user preference)

### AST Node Handling
TypeScript AST nodes are complex. For display, extract:
- `node.kind` (the SyntaxKind enum value)
- Key properties (e.g., `name` for identifiers, `text` for literals)
- Position info (`node.pos`, `node.end`) for highlighting

Don't try to show every property - overwhelming. Show the essential structure.

### Error Handling
- Parse errors should be caught and displayed gracefully
- Don't crash the app on invalid input
- Show error message + position if available
- Consider showing partial AST if parser recovers

## Testing Strategy
- **Manual testing** during development
- Test with examples from SPEC.md (literal, binary op, precedence, function)
- Test error cases (syntax errors, incomplete code)
- Test both JS and TS modes
- Performance: parsing should feel instant (<100ms)

## Performance Considerations
- **Debounce parsing** if needed (test first - might not be necessary)
- **Lazy rendering** for very deep trees (only if needed)
- **Memoization** for expensive renders
- Target: <100ms parse + <50ms render for typical input

## Accessibility
- Keyboard navigation through tree
- Focus indicators on interactive elements
- Screen reader friendly (aria labels on nodes)
- High contrast support

## What NOT to Do
- Don't write a parser from scratch (use TypeScript's parser)
- Don't add features speculatively beyond MVP
- Don't over-engineer the tree layout initially (CSS flex/grid is fine)
- Don't create markdown documentation files unless explicitly asked
- Don't use emojis unless explicitly requested

## Decision-Making Framework

When facing choices, bias toward:
1. **Simpler implementation** over more features
2. **Visual clarity** over information density
3. **Teaching value** over technical completeness
4. **Working software** over perfect architecture

When unsure, ask the user rather than assuming.

## Key Teaching Moments (from SPEC)
The tool should make these insights clear through interaction:
1. **Code is not text** - it's structured data
2. **Tree shape = meaning** - structure encodes semantics
3. **Recursive nature** - expressions contain expressions
4. **Why this matters** - foundation for linters, transpilers, minifiers

## Current State
- Repository initialized with Beads setup
- Specification updated for TypeScript support
- On branch: `spec/typescript-support`
- Ready to build application code

## Next Steps (User will decide)
1. Bootstrap Vite + React + TypeScript
2. Install TypeScript parser
3. Create basic project structure
4. Implement parser wrapper (Phase 0: prototype)
5. Build components (Phase 1: MVP)

## Resources
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [TS AST Viewer](https://ts-ast-viewer.com/) - reference for exploring TS ASTs
- [Beads Documentation](https://github.com/steveyegge/beads)
- [SPEC.md](./SPEC.md) - Full project specification

---

**Remember**: This tool exists to make parsing feel concrete, not to be a comprehensive IDE. Every decision should serve the learning experience.
