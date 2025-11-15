# LexiScope - Project Specification

## Project Overview
An interactive code microscope that reveals the hidden biological structure of JavaScript and TypeScript. Users discover and collect **Leximons** - the 300+ distinct node types that form the cellular anatomy of code.

**Repository**: [https://github.com/rpasetes/compile-time](https://github.com/rpasetes/compile-time)

## Core Concept
Code is a living organism with complex internal anatomy. **LexiScope** is your microscope for examining specimens - paste code onto the stage plate, peer through the lens, and discover the Leximons that compose its structure.

### The Biological Metaphor
- **Code specimens** = Living organisms to examine
- **Editor (stage plate)** = Where you place specimens for analysis
- **AST view (microscope)** = Reveals the hidden cellular structure
- **Leximons** = The 300+ species of syntax nodes (TypeScript's SyntaxKind enum)
- **Parser** = The microscope lens that makes structure visible
- **Discovery** = Finding new Leximon species in the wild

### Why This Works
TypeScript's complexity stops being intimidating when you frame it as **natural biodiversity**. Of course there are 300+ species - language is a rich ecosystem! This reframe transforms:
- "Overwhelming technical complexity" → "Fascinating natural variety"
- "Learning to parse" → "Exploring living code"
- "AST visualization tool" → "Scientific discovery instrument"

## Core Experience: Discovery

### The Leximon Collection Loop
1. **Examine** - Paste code into the editor (stage plate)
2. **Analyze** - View the organism's structure through the microscope
3. **Discover** - Identify new Leximon species you haven't seen before
4. **Catalog** - Track your discoveries in the Lexidex
5. **Explore** - Find more specimens to expand your collection

### First-Time Experience (Critical!)
**Goal**: Immediate wonder + clear mental model

1. User lands on empty LexiScope
2. FizzBuzz code **types itself** onto the stage plate (auto-typing animation)
3. AST populates in real-time as code appears
4. Discovery notification: **"You discovered 12 new Leximons!"**
   - IfStatement (Common)
   - BinaryExpression (Common)
   - ForStatement (Common)
   - Identifier (Common)
   - ... (show all discovered)
5. Subtle pulse/glow on the Lexidex button
6. User clicks Lexidex → sees their first 12 species cataloged
7. Mental model clicks: "I'm a code biologist"

### Progressive Engagement
**Casual users**: Paste their code, see what's inside, discover a few Leximons
**Engaged users**: Deliberately hunt for rare species, try to complete the Lexidex
**Power users**: Explore the taxonomy, understand the ecosystem structure

## The Lexidex: Your Field Guide

### Purpose
A comprehensive catalog of all Leximon species, tracking which ones you've discovered.

### Structure
**Organized by rarity tier (based on language fluency progression):**

The Lexidex groups Leximons by **rarity**, which maps directly to coding fluency levels. Finding rare and legendary species requires deeper knowledge of JavaScript/TypeScript.

#### Rarity Tiers

**COMMON Leximons** (Beginner fluency - ~40 species)
*Found in every program, even "Hello World"*

**Core Building Blocks:**
- `Identifier` - Variable/function names
- `NumericLiteral` - Numbers (42, 3.14)
- `StringLiteral` - Strings ("hello")
- `TrueKeyword`, `FalseKeyword` - Booleans
- `NullKeyword` - null value

**Basic Expressions:**
- `BinaryExpression` - Math and comparisons (a + b, x < 10)
- `CallExpression` - Function calls (console.log())
- `PropertyAccessExpression` - Dot notation (obj.prop)
- `ElementAccessExpression` - Bracket notation (arr[0])
- `ParenthesizedExpression` - Grouping ((a + b))

**Basic Statements:**
- `VariableStatement` - Variable declarations
- `VariableDeclaration` - const/let/var
- `IfStatement` - Conditionals
- `ReturnStatement` - Function returns
- `ExpressionStatement` - Expression as statement
- `Block` - Curly brace blocks

**Basic Operators:**
- `PlusToken`, `MinusToken`, `AsteriskToken`, `SlashToken` - Arithmetic
- `EqualsToken` - Assignment
- `EqualsEqualsToken`, `ExclamationEqualsToken` - Equality
- `LessThanToken`, `GreaterThanToken` - Comparison

---

**UNCOMMON Leximons** (Intermediate fluency - ~60 species)
*Regular use once comfortable with the language*

**Modern JavaScript:**
- `ArrowFunctionExpression` - Arrow functions (=>)
- `TemplateLiteral` - Template strings (`hello ${name}`)
- `TemplateExpression` - Template interpolation
- `SpreadElement` - Spread syntax (...)
- `ObjectLiteralExpression` - Object literals
- `ArrayLiteralExpression` - Array literals
- `PropertyAssignment` - Object properties
- `ShorthandPropertyAssignment` - {name} shorthand

**Control Flow:**
- `ForStatement` - For loops
- `ForOfStatement` - for...of loops
- `ForInStatement` - for...in loops
- `WhileStatement` - While loops
- `SwitchStatement` - Switch cases
- `CaseClause`, `DefaultClause` - Switch branches
- `BreakStatement`, `ContinueStatement` - Loop control
- `TryStatement`, `CatchClause`, `FinallyKeyword` - Error handling

**Functions:**
- `FunctionDeclaration` - Function declarations
- `FunctionExpression` - Function expressions
- `Parameter` - Function parameters
- `CallSignature` - Function type signatures

**Advanced Operators:**
- `ConditionalExpression` - Ternary (a ? b : c)
- `PrefixUnaryExpression` - ++i, !flag
- `PostfixUnaryExpression` - i++
- `EqualsEqualsEqualsToken` - Strict equality (===)
- `AmpersandAmpersandToken` - Logical AND (&&)
- `BarBarToken` - Logical OR (||)

**Destructuring:**
- `ObjectBindingPattern` - {a, b} = obj
- `ArrayBindingPattern` - [x, y] = arr
- `BindingElement` - Destructured elements

---

**RARE Leximons** (Advanced fluency - ~50 species)
*Requires deep language knowledge*

**Async Programming:**
- `AwaitExpression` - await keyword
- `AsyncKeyword` - async functions
- `PromiseType` - Promise types

**Generators:**
- `YieldExpression` - yield keyword
- `AsteriskToken` (in function context) - function* generators

**Advanced Types (TypeScript):**
- `TypeReference` - Custom type references
- `TypeParameter` - Generic type params <T>
- `UnionType` - Union types (A | B)
- `IntersectionType` - Intersection types (A & B)
- `TypeLiteral` - Inline object types
- `IndexSignature` - [key: string]: value
- `TypePredicate` - Type guards (is Type)
- `AsExpression` - Type assertions (as Type)
- `NonNullExpression` - Non-null assertion (!)
- `SatisfiesExpression` - satisfies keyword (TS 4.9+)

**Classes:**
- `ClassDeclaration` - Class declarations
- `Constructor` - Constructor methods
- `MethodDeclaration` - Class methods
- `PropertyDeclaration` - Class properties
- `GetAccessor`, `SetAccessor` - Getters/setters
- `HeritageClause` - extends/implements
- `AbstractKeyword` - Abstract classes

**Modules:**
- `ImportDeclaration` - import statements
- `ImportClause` - import bindings
- `NamedImports` - { foo, bar } from 'module'
- `ImportSpecifier` - Individual imports
- `ExportDeclaration` - export statements
- `ExportAssignment` - export = (TS)
- `NamespaceImport` - import * as

**Advanced Expressions:**
- `TaggedTemplateExpression` - Tagged templates
- `NewExpression` - new keyword
- `ThisKeyword` - this reference
- `SuperKeyword` - super reference
- `DeleteExpression` - delete operator
- `TypeOfExpression` - typeof operator
- `VoidExpression` - void operator
- `CommaListExpression` - Comma operator

---

**LEGENDARY Leximons** (Expert/niche fluency - ~30 species)
*Rare syntax, edge cases, experimental features*

**Decorators (Experimental):**
- `Decorator` - @decorator syntax
- `AtToken` - @ symbol in decorators

**Private Fields:**
- `PrivateIdentifier` - #privateField syntax
- `PrivateKeyword` - private modifier

**Advanced Type Manipulation:**
- `MappedType` - {[K in T]: U}
- `ConditionalType` - T extends U ? X : Y
- `InferType` - infer keyword in types
- `TemplateLiteralType` - Template literal types
- `IndexedAccessType` - T[K] type access

**Module Systems (Legacy):**
- `ImportEqualsDeclaration` - import = require() (TS)
- `ExternalModuleReference` - require() in types
- `NamespaceExportDeclaration` - export as namespace

**Metaprogramming:**
- `MetaProperty` - new.target, import.meta
- `ImportType` - import('module').Type

**JSDoc Integration:**
- `JSDocSignature` - JSDoc type in comments
- `JSDocNullableType` - ?Type in JSDoc
- `JSDocOptionalType` - Type= in JSDoc

**Obscure Syntax:**
- `WithStatement` - with() (deprecated)
- `DebuggerStatement` - debugger keyword
- `LabeledStatement` - label: syntax
- `EmptyStatement` - Lone semicolon
- `CommaToken` (standalone) - Comma expression
- `MissingDeclaration` - Error recovery node
- `PartiallyEmittedExpression` - Compiler internal

**Enums:**
- `EnumDeclaration` - enum keyword
- `EnumMember` - Enum values

**Namespaces:**
- `ModuleDeclaration` - namespace/module (TS)
- `ModuleBlock` - Namespace body

---

### Rarity Distribution
- **Common**: ~40 species (13% of total) - "Everyone uses these"
- **Uncommon**: ~60 species (20% of total) - "Daily driver syntax"
- **Rare**: ~50 species (17% of total) - "Advanced patterns"
- **Legendary**: ~30 species (10% of total) - "Expert territory"
- **Gliphs**: ~120 tokens (40%) - Operators, keywords, punctuation - the ancient building blocks

### The Gliph System
**Gliphs are the fundamental symbols** - operators (`+`, `-`, `*`), punctuation (`;`, `,`, `.`), brackets (`()`, `[]`, `{}`), and keywords that form the alphabet of code.

**Philosophy:**
- Like the Unown of the code ecosystem - simple individually, powerful collectively
- Ancient syntactic symbols that combine to form larger Leximons
- Discovered passively as you write code using them
- Collected separately from main Leximons

**Characteristics:**
- No rarity tiers (all are equally fundamental)
- Quiet, automatic discovery (no celebration notifications)
- Organized by category: Arithmetic, Comparison, Logical, Brackets, Punctuation, Assignment, etc.
- Separate tab in Lexidex showing glyph collection progress

**Completion Reward:**
Discovering all 120 Gliphs **unlocks expanded editor canvas**:
- Initial state: 50 LOC (lines of code) maximum
- Upon 120/120 Gliphs: Expand to 200+ LOC capacity
- Functional progression: "Collect ancient symbols to examine larger specimens"
- Visual feedback: Editor height grows when unlocked

### Rarity Visual Design
**Color coding by rarity tier:**
- **Common**: Grey/silver tones - Familiar, foundational
- **Uncommon**: Green tones - Growth, everyday use
- **Rare**: Blue/purple tones - Special, advanced knowledge
- **Legendary**: Gold/amber tones - Prestigious, expert-level

**Discovery celebrations scale with rarity:**
- Common: Subtle notification, brief highlight
- Uncommon: Clear notification, satisfying pulse
- Rare: Prominent notification, exciting animation
- Legendary: Special celebration, confetti/fanfare effect

**Lexidex display:**
- Rarity badge/icon on each Leximon card
- Undiscovered species show rarity tier in silhouette
- Collection stats broken down by rarity: "Common: 38/40 | Uncommon: 25/60 | Rare: 3/50 | Legendary: 0/30"
- Progress bars for each tier

### Classification (Secondary Organization)
Within each rarity tier, Leximons are organized into realms and families:

**The Two Realms:**
1. **Runtime Leximons** - Code that executes (JavaScript + TypeScript runtime)
2. **Type Leximons** - Type system only (TypeScript-exclusive, compile-time only)

**Runtime Families:**
- **Expressions** - Values and computations
- **Statements** - Actions and control flow
- **Declarations** - Defining things
- **Literals** - Concrete values

**Type Families:**
- **Basic Types** - Primitives, references, arrays
- **Composite Types** - Unions, intersections, tuples
- **Advanced Constructs** - Mapped types, conditional types, inference

**Visual Distinction:**
- Type Leximons get a special badge (🔷 or similar)
- Separate tabs in Lexidex: [Runtime] [Types] [Gliphs]
- Type nodes in microscope view have distinct styling (to be designed)

### Each Lexidex Entry Shows:
**Discovered species:**
- ✓ Name (e.g., "IfStatement")
- ✓ Classification/family
- ✓ First discovered in: [code snippet where you found it]
- ✓ Times observed: [frequency count]
- ✓ Habitat notes: "Commonly found in conditional logic organisms"
- ✓ Example structure: Small code sample showing typical usage

**Undiscovered species:**
- ? Silhouette/locked state
- ? Name hidden or shown depending on design choice
- ? "Find this species by writing code that contains..."

### Lexidex UI Location
**Slide-out panel from the right side:**
- Overlays the AST view when open
- Toggle button in top-right corner
- Shows total discovery progress: "47 / 180 Leximons | 87 / 120 Gliphs"

**Three-Tab Structure:**
1. **[Runtime]** - Runtime Leximons with rarity progress bars
2. **[Types]** - Type Leximons with rarity progress bars
3. **[Gliphs]** - Glyph collection organized by category

**Features:**
- Search by name (within active tab)
- Filter by rarity tier (Runtime/Types tabs only)
- Filter by family/category
- Rarity progress visualization for each tier

## UI Layout

### Three-Panel Design
```
┌─────────────────────────────────────────────────┐
│  LexiScope                    [Lexidex: 47/300+]│
├──────────────────┬────────────────────────────────┤
│                  │                                │
│   STAGE PLATE    │      MICROSCOPE VIEW           │
│   (Code Editor)  │      (AST Tree)                │
│                  │                                │
│   • CodeMirror   │   • Tree visualization         │
│   • JS/TS toggle │   • Click to inspect nodes     │
│   • Line numbers │   • Hover for details          │
│   • Syntax       │   • Color-coded by family      │
│     highlighting │                                │
│                  │                                │
│                  │                                │
└──────────────────┴────────────────────────────────┘
```

**When Lexidex opens:**
```
┌─────────────────────────────────────────────────┐
│  LexiScope                    [Lexidex: 47/300+]│
├──────────────────┬──────────────┬─────────────────┤
│                  │              │  LEXIDEX        │
│   STAGE PLATE    │  MICROSCOPE  │                 │
│   (Code Editor)  │  VIEW (dim)  │  [Search...]    │
│                  │              │                 │
│                  │              │  Expressions    │
│                  │              │  ✓ Binary..     │
│                  │              │  ✓ Call...      │
│                  │              │  ? Await...     │
│                  │              │                 │
│                  │              │  Statements     │
│                  │              │  ✓ If...        │
└──────────────────┴──────────────┴─────────────────┘
```

## Visual Design Language

### Biological/Scientific Aesthetic
**NOT**: Dev tool, technical, sterile
**YES**: Natural, organic, scientific journal

**Color palette:**
- Deep greens/blues (like lab equipment)
- Warm accent colors for discovery moments
- Each Leximon family gets a distinct color
- Subtle gradients suggesting depth/microscopy

**Typography:**
- Monospace for code (stage plate)
- Scientific serif or clean sans for labels
- Size hierarchy emphasizing discovery

**Interaction feel:**
- Smooth, organic animations
- Discoveries feel like "aha!" moments
- Zoom/focus effects suggesting microscope adjustment

### Node Visualization (The Microscope View)
**Tree structure shows organism anatomy:**
- Vertical tree layout (traditional biology diagram)
- Nodes as "cells" with rounded corners
- Color-coded by Leximon family
- Connection lines like biological system diagrams

**Each node displays:**
- Leximon species name (e.g., "IfStatement")
- Key identifying features (like specimen labels)
- Nested structure showing cellular organization

**Visual hierarchy:**
- Parent nodes (major organs)
- Child nodes (component cells)
- Depth indicates complexity of organism

### Discovery Notifications
**When new Leximon found:**
- Gentle pulse/glow on the new node
- Toast notification: "New species: IfStatement"
- Lexidex badge updates: "48 / 300+"
- Celebration for milestones (10, 25, 50, 100...)

## Teaching Through Biological Framing

### Compiler Insights as Natural Phenomena
**Instead of technical jargon, use biological language:**

**Example insights:**
- "IfStatement Leximons always contain a test condition and two possible branches - this branching structure is how code organisms make decisions"
- "Notice how BinaryExpression nests inside itself - this recursive anatomy lets simple organisms build complex behavior"
- "The FunctionDeclaration species creates isolated environments (scopes) where other Leximons can live protected from outside interference"

### Educational Moments
**Embedded throughout the interface:**
- First FizzBuzz analysis: Tooltips explaining what you're seeing
- Lexidex entries: Each species has habitat notes and behavior description
- Tree exploration: Hover states reveal how parent/child relationships work
- Progressive complexity: Suggest specimens to examine next

### Key Teaching Goals (Indirectly)
1. **Code has structure** - The tree reveals the hidden anatomy
2. **Syntax creates meaning** - Different Leximons serve different biological functions
3. **Composition is powerful** - Complex organisms built from simple species
4. **Parsing is discovery** - The parser identifies and classifies each species
5. **TypeScript is rich** - 300+ species shows the language's expressive power

## Technical Stack

### Frontend
- **Framework**: React + TypeScript
- **Editor**: CodeMirror 6
  - Syntax highlighting for JS/TS
  - Line numbers
  - Auto-typing animation support
- **Parser**: TypeScript compiler API
  - Handles both JavaScript and TypeScript
  - Source of all 300+ SyntaxKind values (Leximons)
  - Use `ts.createSourceFile()` for parsing
- **Styling**: CSS Modules or Tailwind (TBD based on design needs)
- **Tree visualization**: Custom React components (start simple)

### Data Model

#### Leximon Discovery Tracking
```typescript
interface Leximon {
  kind: ts.SyntaxKind;           // The TypeScript enum value
  name: string;                   // Human-readable name
  realm: Realm;                  // Runtime vs Type realm
  rarity: Rarity;                // Fluency-based rarity tier
  family: Family;                // Family grouping within realm
  discovered: boolean;            // Has user found this?
  firstSeenIn?: string;          // Code snippet of first discovery
  timesObserved: number;         // Frequency counter
  habitatNotes: string;          // Educational description
  exampleCode: string;           // Typical usage example
}

interface Gliph {
  kind: ts.SyntaxKind;           // The token enum value
  symbol: string;                // The actual symbol (+, -, etc.)
  category: GliphCategory;       // Grouping (Arithmetic, Logical, etc.)
  discovered: boolean;            // Has user found this?
  timesObserved: number;         // Frequency counter
}

type Realm =
  | 'Runtime'  // Code that executes (JS + TS runtime)
  | 'Type';    // Type system only (TS compile-time)

type Rarity =
  | 'Common'      // Beginner fluency
  | 'Uncommon'    // Intermediate fluency
  | 'Rare'        // Advanced fluency
  | 'Legendary';  // Expert/niche fluency

type Family =
  // Runtime families
  | 'Expression'
  | 'Statement'
  | 'Declaration'
  | 'Literal'
  // Type families
  | 'BasicType'
  | 'CompositeType'
  | 'AdvancedConstruct';

type GliphCategory =
  | 'Arithmetic'     // + - * / %
  | 'Comparison'     // < > <= >= == === != !==
  | 'Logical'        // && || !
  | 'Bitwise'        // & | ^ ~ << >> >>>
  | 'Assignment'     // = += -= *= /= etc.
  | 'Brackets'       // () [] {}
  | 'Punctuation'    // ; , . : ? ...
  | 'Keywords';      // Reserved words

interface DiscoveryState {
  // Leximon tracking (separated by realm)
  discoveredLeximons: {
    runtime: Set<ts.SyntaxKind>;
    type: Set<ts.SyntaxKind>;
  };
  observationCounts: Map<ts.SyntaxKind, number>;
  firstSightings: Map<ts.SyntaxKind, string>;

  // Rarity progress (per realm)
  runtimeRarityProgress: {
    common: { found: number; total: number };
    uncommon: { found: number; total: number };
    rare: { found: number; total: number };
    legendary: { found: number; total: number };
  };
  typeRarityProgress: {
    common: { found: number; total: number };
    uncommon: { found: number; total: number };
    rare: { found: number; total: number };
    legendary: { found: number; total: number };
  };

  // Gliph tracking
  discoveredGliphs: Set<ts.SyntaxKind>;
  gliphsProgress: { found: number; total: 120 };
  editorMaxLOC: number; // Unlocks from 50 → 200+ when gliphs complete
}
```

#### Parser Integration
```typescript
// Parse code and extract all Leximon species present
function analyzeSpecimen(code: string, mode: 'javascript' | 'typescript'): {
  ast: ts.SourceFile;
  lexiMonsFound: Set<ts.SyntaxKind>;
  newDiscoveries: ts.SyntaxKind[];
}

// Traverse AST and catalog all SyntaxKind values
function catalogLeximons(node: ts.Node): ts.SyntaxKind[] {
  const kinds: ts.SyntaxKind[] = [node.kind];
  ts.forEachChild(node, child => {
    kinds.push(...catalogLeximons(child));
  });
  return kinds;
}
```

### Persistence Strategy
**LocalStorage for discovery progress:**
- Persist `DiscoveryState` to localStorage
- Load on app mount
- Update on each new discovery
- Export/import functionality for sharing collections

## MVP Feature Set

### Phase 1: Core Experience (Current Priority)
- [x] Code editor with CodeMirror 6
- [x] Real-time AST parsing
- [x] Basic tree visualization
- [x] JS/TS toggle
- [ ] Auto-typing FizzBuzz on first load
- [ ] Leximon discovery detection
- [ ] Discovery notifications
- [ ] Basic Lexidex (slide-out panel)
- [ ] Discovery state persistence (localStorage)

### Phase 2: Polish & Engagement
- [ ] Visual design refinement (biological aesthetic)
- [ ] Node color-coding by classification
- [ ] Improved tree layout for complex specimens
- [ ] Discovery milestones & celebrations
- [ ] Lexidex search and filtering
- [ ] Specimen presets (beyond FizzBuzz)
- [ ] Share discoveries (export/import)

### Phase 3: Deep Exploration
- [ ] Click node to highlight code (bidirectional)
- [ ] Click code to highlight node
- [ ] Detailed node inspection view
- [ ] Habitat notes and educational content
- [ ] Suggested specimens to find rare Leximons
- [ ] Collection completion percentage
- [ ] "Hunting guide" for hard-to-find species

## First Specimens (Preset Examples)

### Default: FizzBuzz (auto-types on load)
```javascript
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}
```
**Leximons discovered: ~15-20 species**
- ForStatement, IfStatement, BinaryExpression, CallExpression, etc.

### Other Specimen Ideas
**Simple specimens (5-10 Leximons):**
- Arrow function: `const add = (a, b) => a + b`
- Object literal: `const user = { name: "Alice", age: 30 }`

**Medium specimens (15-25 Leximons):**
- Class definition with methods
- Array methods chain: `arr.filter().map().reduce()`

**Complex specimens (30+ Leximons):**
- TypeScript interface and implementation
- Async/await function with error handling
- React component (meta: examining the tool with itself!)

**Rare Leximon hunting grounds:**
- Generators: `function*` (YieldExpression)
- Decorators: TypeScript decorators
- Type manipulation: Advanced TS types

## Success Metrics

### For MVP
- [ ] FizzBuzz auto-types smoothly on first load
- [ ] Discovery detection works correctly
- [ ] Lexidex shows accurate discovery count
- [ ] LocalStorage persists discoveries across sessions
- [ ] UI clearly communicates the biological metaphor
- [ ] New users understand "I'm collecting Leximons" within 30 seconds

### For Engagement
- [ ] Users paste their own code to discover Leximons
- [ ] Lexidex completion rate drives exploration
- [ ] Users deliberately hunt for rare species
- [ ] Discovery notifications feel rewarding
- [ ] Users share their collection progress

### For Learning (Indirect)
- [ ] Users understand code has structure (not just text)
- [ ] Users recognize common patterns (IfStatement, BinaryExpression)
- [ ] Users grasp TypeScript's expressiveness through variety
- [ ] Users can explain what a SyntaxKind is in biological terms

## Open Questions

### Design Decisions
1. **Lexidex locked species**: Show names or keep mysterious until discovered?
2. **Discovery notification style**: Toast, modal, subtle badge pulse?
3. **Color system**: How many distinct families? What palette?
4. **Auto-typing speed**: How fast should FizzBuzz type itself?
5. **Tree complexity**: When do we collapse nodes for deep specimens?

### Feature Scope
1. **Bidirectional highlighting**: MVP or Phase 2?
2. **Node inspection details**: How much info per Leximon?
3. **Sharing**: Export as image, JSON, or URL params?
4. **Gamification**: Achievements, badges, leaderboards?
5. **Educational content**: How much habitat notes vs let users explore?

### Technical
1. **Performance**: Parse on every keystroke or debounce?
2. **Tree rendering**: Custom or library (react-d3-tree)?
3. **Mobile support**: Responsive or desktop-only MVP?
4. **Analytics**: Track discovery patterns anonymously?

## Non-Goals

### Explicitly Out of Scope
- Writing a parser from scratch (use TypeScript's)
- Supporting languages beyond JS/TS
- AST transformation/code generation
- Being a full IDE or debugger
- Comprehensive documentation of every Leximon (curated highlights instead)
- Multiplayer/social features (Phase 3+)

## Project Management

### Issue Tracking with Beads
Using [Beads](https://github.com/steveyegge/beads) for graph-based issue tracking.

**Key workflow:**
```bash
bd ready --json              # See ready work
bd create "..." -t feature   # File new issues
bd update <id> --status in_progress
bd close <id> --reason "..."
```

### Git Workflow
- Feature branches named by intent: `feature/lexidex-panel`, `feature/discovery-notifications`
- Single-line commit messages only
- Sync Beads before PR: `bd sync && git add .beads/issues.jsonl`
- PRs represent app-level changes, not just issue completion

### CI/CD
- Vercel auto-deploys from `main` branch
- Preview deployments on every PR
- Live at: compile-time-zeta.vercel.app (will update domain)

## Development Roadmap

### Immediate Next Steps (Post CodeMirror Integration)
1. Implement auto-typing FizzBuzz on first load
2. Build Leximon discovery detection system
3. Create basic Lexidex slide-out panel
4. Add discovery notifications
5. Implement localStorage persistence

### Week 1 Goals
- [ ] Core discovery loop functional
- [ ] Lexidex shows accurate collection
- [ ] First-time experience delightful
- [ ] Visual design reflects biological metaphor

### Week 2 Goals
- [ ] Bidirectional highlighting
- [ ] Node inspection details
- [ ] Multiple specimen presets
- [ ] Polish and refinement

## Resources

### TypeScript SyntaxKind Reference
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [SyntaxKind Enum](https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts) - All 300+ values
- [TS AST Viewer](https://ts-ast-viewer.com/) - Reference implementation

### Design Inspiration
- Scientific field guides and taxonomy books
- Microscopy visualization aesthetics
- Natural history museum exhibits
- Pokédex UI (for collection mechanics)

### Technical References
- [CodeMirror 6 Docs](https://codemirror.net/docs/)
- [React Documentation](https://react.dev/)

---

**Remember**: This isn't just an AST visualizer - it's a microscope for discovering the hidden biodiversity of code. Every decision should serve the sense of wonder and discovery.
