# Compile Time - Project Specification

## Project Overview
An interactive web application that parses JavaScript and TypeScript code and visualizes its Abstract Syntax Tree (AST), designed to teach parsing concepts through direct manipulation and exploration.

**Repository**: [https://github.com/rpasetes/compile-time](https://github.com/rpasetes/compile-time)

## Core Concept
Transform the abstract concept of parsing into something visceral: paste code, see the tree, understand that code is structure. The tool exists to make parsing *feel* concrete rather than mystical.

## Project Management

### Issue Tracking with Beads
Using [Beads](https://github.com/steveyegge/beads) - a graph-based issue tracker designed for AI coding agents.

**How Beads works:**
- Issues stored as JSONL in `.beads/issues.jsonl` (committed to git)
- Local SQLite cache (`.beads/*.db`, gitignored) for fast queries
- Auto-syncs between SQLite and JSONL (5-second debounce)
- Git acts as the "database server" - distributed by design
- Four dependency types: blocks, related, parent-child, discovered-from

**Setup (one-time):**
````bash
cd compile-time
bd init
# Say yes to git hooks (recommended)
# Say yes to merge driver (recommended)
````

**Agent workflow:**
````bash
# Find what's ready to work on
bd ready --json

# Create issues as you discover work
bd create "Add syntax error highlighting" -t feature -p 1

# Link discovered work back to parent
bd dep add <new-issue-id> <parent-id> --type discovered-from

# Update status
bd update <issue-id> --status in_progress

# Complete work
bd close <issue-id> --reason "Implemented"
````

**Key commands:**
- `bd ready` - Show issues with no blockers
- `bd create` - File new issue
- `bd dep add` - Link dependencies
- `bd list` - See all issues
- `bd show <id>` - View details
- `bd dep tree <id>` - Visualize dependency graph

**Dependency types:**
- `blocks` - Hard blocker (affects ready work)
- `related` - Soft relationship
- `parent-child` - Hierarchical
- `discovered-from` - Work found while doing parent task

Issues use hash-based IDs (`bd-a1b2`) to prevent merge conflicts when multiple branches create issues concurrently.

### Code Review
Using [CodeRabbit](https://docs.coderabbit.ai/overview/introduction) for automated code reviews.
- AI-powered PR reviews
- Catches common issues early
- Provides context-aware suggestions

## MVP Scope

### Minimum Viable Product
The simplest version that teaches the core concept:

1. **Input**: Text area for JavaScript/TypeScript code
2. **Language Toggle**: Switch between JavaScript and TypeScript parsing modes
3. **Output**: Visual tree representation of the resulting AST
4. **Interaction**: Bidirectional highlighting
   - Click source code → highlight corresponding AST node
   - Click AST node → highlight corresponding source code
5. **Parser**: Use TypeScript's parser (handles both JS and TS)

That's it. No bells, no whistles. Just the core loop that makes the concept click.

### Why This Scope?
This already demonstrates the fundamental insight: your code isn't just text, it's a structured tree that the engine navigates. Everything else is enhancement.

## Technical Stack

### Required
- **Parser**: TypeScript's parser (`typescript` package)
  - Handles both JavaScript and TypeScript
  - Official parser with comprehensive support
  - Larger bundle (~10MB) but necessary for TS support
  - Produces TypeScript AST (superset of ESTree)
- **Language**: TypeScript
  - Modern, relevant to 2025 - this is what people actually use
  - Users can paste real production code they write or generate
  - Type safety helps with AST node handling
  - Dogfooding bonus: visualize the same language we write in
- **Framework**: React (familiar, handles dynamic updates well)
- **Tree Visualization**: Start with pure CSS/HTML using flexbox or grid
- **Hosting**: Vercel, Netlify, or similar

### Optional (Only If Needed)
- **Tree Library**: react-d3-tree or similar (only if you need pan/zoom/complex layouts)
- **Styling**: Tailwind or whatever's comfortable

### Parser Strategy: JavaScript/TypeScript Toggle
- **Default mode**: JavaScript (simpler for teaching basics)
- **TypeScript mode**: Show how type annotations appear in AST
- **Benefits**:
  - Educational simplicity for beginners (JS mode)
  - Full feature parity with modern development (TS mode)
  - Users can visualize real production code they write or generate
  - Demonstrates that types are "just extra nodes"
  - Dogfooding bonus: works with our own source code too

## User Experience Flow

### Basic Flow
1. User opens page
2. Sees pre-populated example: `const add = (a, b) => a + b`
3. Tree is already rendered (JavaScript mode by default)
4. User clicks on `add` in the code → corresponding Identifier node highlights
5. User modifies code → tree updates in real-time
6. User can toggle TypeScript mode to see type annotations in the tree
7. Understanding emerges through play

### Progressive Complexity Examples
Provide preset examples that build understanding:

1. **Simple literal**: `42`
   - One node (Literal)
   - Establishes the basic concept

2. **Binary operation**: `2 + 3`
   - Three nodes (BinaryExpression with two Literal children)
   - Shows operator as parent

3. **Precedence**: `2 + 3 * 4`
   - Tree shape encodes order of operations
   - Multiplication is deeper (evaluated first)

4. **Small function**: `(x) => x * 2`
   - ArrowFunctionExpression with params and body
   - 8-10 nodes total

5. **Something real**: A short utility function users might actually write

## Visual Design Principles

### Tree Rendering
- **Vertical layout**: Parent above children (conventional tree orientation)
- **Node representation**: Boxes with node type as label
- **Edges**: Simple lines connecting parent to children
- **Spacing**: Generous whitespace for readability

### Node Information
Each node shows:
- **Type**: The AST node type (e.g., "BinaryExpression", "Identifier")
- **Key values**: For literals, show the value; for identifiers, show the name
- **Position**: Optional, but helpful for debugging

### Color Coding (Optional Enhancement)
- Statements: One color family
- Expressions: Another color family
- Declarations: Another color family
- Literals/Identifiers: Another color family

Keep it subtle - the structure should be apparent from layout, not just color.

## Essay Integration

### Structure
The tool is embedded *within* the essay, not separate from it. Structure:
```text
[ Introduction: "When you write code, what does the engine see?" ]
[ Tool instance #1: Simple example with explanation below ]
[ Conceptual explanation ]
[ Tool instance #2: More complex example ]
[ Deeper explanation ]
...
[ Final tool instance: Full playground for exploration ]
```

### Writing Approach
- **Concrete first**: Start with specific code, not abstract definitions
- **Build complexity**: Each example slightly more complex than the last
- **Interactive**: Reader should be modifying examples, not just reading
- **No hand-waving**: If you mention a concept, show it in the tree

### Key Teaching Moments
1. **Code is not text**: It's structured data the parser extracts
2. **Tree shape = meaning**: The structure encodes semantics (precedence, scope, etc.)
3. **Recursive nature**: Expressions contain expressions, statements contain statements
4. **Why this matters**: Connect to real tools (linters, transpilers, minifiers)

## Implementation Phases

### Phase 0: Prototype
1. Get TypeScript parser working and console.logging ASTs
2. Hand-write HTML/CSS for rendering ONE specific tree
3. Figure out what "feels good" visually
4. Don't generalize until you know what you're generalizing

### Phase 1: MVP
1. Input text area with real-time parsing
2. JavaScript/TypeScript mode toggle
3. Basic tree rendering (type + essential info per node)
4. Click code → highlight node
5. Click node → highlight code
6. Handle parse errors gracefully (show error, don't crash)

### Phase 2: Polish
1. Add preset examples with descriptions
2. Improve tree layout (handle wide trees better)
3. Add collapsible nodes for deep trees
4. Better error messages

### Phase 3: Essay Integration
1. Write the essay content
2. Embed tool instances at appropriate points
3. Create preset examples that support the narrative
4. Test the learning flow with real users

## Future Enhancements (Post-MVP)

### Tier 1: Still Simple
- **Color coding** by node type
- **Collapsible nodes** for focusing on specific subtrees
- **Preset library** with explanations for each
- **Dark mode** (because it's 2025)

### Tier 2: Getting Interesting
- **Tokenization view**: Show the token stream before the AST
- **Side-by-side comparison**: Two code snippets, diff their ASTs
- **Filter view**: "Show only function declarations" or "Show only identifiers"
- **Search**: Find all nodes of a specific type
- **Type annotation highlighting**: In TS mode, visually distinguish type nodes from runtime nodes

### Tier 3: Real Tool Territory
- **Parse error visualization**: Show partial tree + where parsing failed
- **Performance metrics**: Parse time, node count
- **AST diff**: Show what changed between edits
- **Export**: Download AST as JSON
- **Custom parser options**: Strict mode, source type, ECMAScript version

### Tier 4: Teaching Extensions
- **Ambiguity visualizer**: Same code in different contexts (expression vs statement)
- **Transform playground**: Modify the AST, see the generated code
- **Quiz mode**: "What will this parse to?" with validation
- **Regex AST**: Extend to show regex patterns as trees too

## Success Metrics

### For MVP
- [ ] Can paste any valid JS or TS code and see a tree
- [ ] Language toggle switches between JS and TS parsing modes
- [ ] Clicking creates bidirectional highlights
- [ ] Updates in real-time as user types
- [ ] Handles parse errors without breaking
- [ ] Loads fast enough that parsing feels instant (<100ms for typical code)

### For Learning
- [ ] Someone unfamiliar with ASTs can explain what one is after using the tool
- [ ] Users discover insights by playing ("oh, THAT'S why precedence works")
- [ ] The essay + tool combination is something people want to share

## Technical Constraints

### Performance
- Parse on every keystroke (with debounce if needed)
- Target <100ms parse time for typical input (TypeScript parser handles this well)
- Tree rendering should be <50ms for trees up to 100 nodes

### Browser Support
- Modern evergreen browsers only
- No IE11, no legacy polyfills
- Assume ES6+ support

### Accessibility
- Keyboard navigation through the tree
- Screen-reader friendly node descriptions
- High contrast mode support
- Focus indicators on interactive elements

## Open Questions

### To Resolve During Development
1. How deep do trees get before we need collapsing by default?
2. What's the right amount of information per node? (Too little is opaque, too much is overwhelming)
3. Should we show all node properties or just the interesting ones?
4. Do we need zoom/pan for large trees or is scrolling fine?
5. What's the best way to show array properties (like function parameters)?

### Design Decisions
1. Horizontal vs vertical tree layout?
2. How to represent different node types visually?
3. How much AST detail to expose vs hide?
4. Should the tool explain itself or should explanation live in essay?

## Non-Goals

### Explicitly Out of Scope
- Writing a parser from scratch (use TypeScript's parser)
- Supporting languages beyond JS/TS (just JavaScript and TypeScript for MVP)
- Being a full IDE replacement (just visualization + learning)
- AST transformation/manipulation (just visualization for MVP)
- Being exhaustively comprehensive about every edge case

## Development Workflow

### Getting Started
```bash
# Setup
npm create vite@latest compile-time -- --template react-ts
cd compile-time
npm install typescript

# Initialize Beads for issue tracking
bd init

# Run
npm run dev
```

### Core Files Structure
```text
src/
  components/
    CodeEditor.tsx       # Input textarea with language toggle
    ASTTree.tsx          # Tree visualization
    ASTNode.tsx          # Individual node component
  utils/
    parser.ts            # TypeScript parser wrapper (handles JS & TS)
    highlighter.ts       # Bidirectional highlight logic
  App.tsx               # Main component
  examples.ts           # Preset code examples (both JS and TS)

.beads/
  issues.jsonl          # Issue tracking (committed to git)
  *.db                  # SQLite cache (gitignored)
```

### Testing Strategy
- Manual testing during development
- Test with progressively complex examples
- Test error cases (syntax errors, edge cases)
- User testing with both novice and experienced programmers

### Code Review Process
1. Create feature branch
2. Implement changes
3. Push and open PR
4. CodeRabbit provides automated review
5. Address feedback
6. Merge when ready

### Session-Ending Protocol
Before finishing work:
1. **File/update issues** for remaining work
   - Create issues for discovered bugs, TODOs, follow-up tasks
   - Close completed issues and update status for in-progress work
2. **Sync the issue tracker**
````bash
   bd sync           # Flush pending changes
   git add .beads/issues.jsonl
   git commit -m "Update issue tracker"
   git push
````
3. **Verify clean state**
   - All changes committed and pushed
   - No untracked files
4. **Choose next work**
````bash
   bd ready --json   # See what's ready for next session
````

## Resources

### Parser Documentation
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [ESTree Spec](https://github.com/estree/estree) (Base AST format)
- [TypeScript AST Viewer](https://ts-ast-viewer.com/) (reference implementation)

### AST Exploration
- [AST Explorer](https://astexplorer.net/) (reference implementation)
- Babel parser docs (alternative parser option)

### Learning Resources
- [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler) (good for understanding concepts)
- [Crafting Interpreters](https://craftinginterpreters.com/) (deep dive into parsing)

### Project Management
- [Beads Documentation](https://github.com/steveyegge/beads)
- [CodeRabbit Documentation](https://docs.coderabbit.ai/overview/introduction)

## License
MIT (or whatever you prefer)

## Contact / Contribution
Open to contributions - check `bd ready` for current work items and open a PR!
