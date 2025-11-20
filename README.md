# Arbor Parser

Interactive JavaScript/TypeScript code to AST visualizer. See how parsers read your code — every syntax tree, visualized.

## What is this?

**Arbor Parser** is an educational tool that reveals the hidden structure beneath your code. Type or paste JavaScript or TypeScript, and watch it transform into an Abstract Syntax Tree (AST) in real-time.

## Why parsing matters

Every developer tool you use operates on ASTs, not text:

- **Syntax highlighters** - Tokenize code to apply colors
- **Linters (ESLint)** - Traverse trees to find rule violations
- **Formatters (Prettier)** - Parse → regenerate with consistent style
- **Refactoring tools** - Find all symbol references across codebases
- **Transpilers (Babel, TypeScript)** - Transform AST nodes to different languages
- **IDEs** - Parse in real-time for autocomplete, navigation, type checking

This visualizer shows you what these tools see: the structured tree representation that makes modern development possible.

## Features

- **Two visualization modes**:
  - Tree view: Traditional hierarchical AST display
  - Rings view: Radial layout showing depth and relationships
- **Live parsing**: See the AST update as you type
- **TypeScript-powered**: Uses TypeScript's official parser (handles both JS and TS)
- **CodeMirror editor**: Syntax highlighting and line numbers

## Current State

✅ MVP Complete:
- CodeMirror editor with TypeScript/JavaScript support
- Tree visualization with recursive node rendering
- Radial "rings" visualization (experimental)
- Split-pane layout with fixed viewport sizing
- Real-time parsing feedback

📝 Project rebranded from "Compile Time" → "Arbor Parser" (Nov 2025)
- Focus shifted from compilation to parsing education
- All code comments enhanced with detailed parsing insights
- Comprehensive research documentation added

## Development

```bash
npm install
npm run dev
```

Built with:
- React + TypeScript (Vite)
- TypeScript Compiler API
- CodeMirror 6
- D3 (for radial visualization)

## Learn More

See [docs/NOV20-WHY-PARSING-MATTERS.md](./docs/NOV20-WHY-PARSING-MATTERS.md) for an in-depth exploration of parsing, ASTs, and how developer tools work.
