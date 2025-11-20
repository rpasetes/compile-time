import { useState } from "react";
import { parseCode } from "./utils/parser";
import { CodeEditor } from "./components/CodeEditor";
import { BlobVisualization } from "./components/BlobVisualization";
import { ASTTree } from "./components/ASTTree";
import { SegmentedControl } from "./components/SegmentedControl";
import { examples } from "./examples";

/**
 * Main App Component
 *
 * PARSING INSIGHT: How Parsers Read Code
 * =======================================
 * Parsers transform text into structured trees (ASTs) through two phases:
 *
 * 1. LEXICAL ANALYSIS (Tokenization)
 *    "const x = 5" → [CONST, IDENTIFIER, EQUALS, NUMBER]
 *    Breaking code into smallest meaningful units
 *
 * 2. SYNTACTIC ANALYSIS (Tree Building)
 *    Tokens → VariableStatement tree with nested expression nodes
 *    Capturing the semantic relationships and nesting structure
 *
 * Why this matters: Every developer tool operates on ASTs, not text.
 *
 * - Syntax highlighters: Use tokens to colorize keywords, strings, operators
 * - Linters (ESLint): Traverse trees to find patterns that violate rules
 * - Formatters (Prettier): Parse → discard formatting → regenerate with consistency
 * - Refactoring tools: Find all references to a symbol across entire codebases
 * - Transpilers (Babel): Transform tree nodes to generate different languages
 * - IDEs: Parse in real-time for autocomplete, navigation, type checking
 *
 * This visualizer shows you what parsers see: the hidden structure beneath your code.
 */
function App() {
  const [sourceCode, setSourceCode] = useState(examples[0].code);
  const [selectedExample, setSelectedExample] = useState<string>(examples[0].name);
  const [vizMode, setVizMode] = useState<"tree" | "rings">("tree");

  // Parse the code whenever it changes (always using TypeScript mode)
  const parseResult = parseCode(sourceCode);

  // Handle example selection
  const handleExampleChange = (exampleName: string) => {
    const example = examples.find((ex) => ex.name === exampleName);
    if (example) {
      setSourceCode(example.code);
      setSelectedExample(exampleName);
    }
  };

  // Handle manual code changes - switch to "Custom" if user edits
  const handleCodeChange = (newCode: string) => {
    setSourceCode(newCode);

    // Check if the new code matches any example
    const matchingExample = examples.find((ex) => ex.code === newCode);
    if (matchingExample) {
      setSelectedExample(matchingExample.name);
    } else if (selectedExample !== "Custom") {
      setSelectedExample("Custom");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          borderBottom: "1px solid #444",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", margin: 0 }}>
          Arbor Parser
        </h1>
        <p
          style={{ color: "#aaa", fontSize: "1.1rem", margin: "0.5rem 0 0 0" }}
        >
          See how parsers read your code. Every syntax tree, visualized.
        </p>
      </div>

      {/* Split layout: Editor left, Tree right */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Left half: Code Editor */}
        <div
          style={{
            width: "50%",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Example selector dropdown */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="example-select"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#aaa",
                fontSize: "0.9rem",
              }}
            >
              Preset Examples:
            </label>
            <select
              id="example-select"
              value={selectedExample}
              onChange={(e) => handleExampleChange(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "#1a1a1a",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {examples.map((example) => (
                <option key={example.name} value={example.name}>
                  {example.name}
                </option>
              ))}
              {selectedExample === "Custom" && (
                <option value="Custom">Custom</option>
              )}
            </select>
          </div>

          <CodeEditor value={sourceCode} onChange={handleCodeChange} />
        </div>

        {/* Right half: Visualization */}
        <div
          style={{
            width: "50%",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Visualization Toggle - fixed to left */}
          <div
            style={{
              marginBottom: "1rem",
              alignSelf: "flex-start",
            }}
          >
            <SegmentedControl
              options={["Tree", "Rings"]}
              selected={vizMode}
              onChange={(mode) => setVizMode(mode as "tree" | "rings")}
            />
          </div>

          {/* Viz container */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {parseResult.success ? (
              vizMode === "tree" ? (
                <ASTTree ast={parseResult.ast} />
              ) : (
                <BlobVisualization ast={parseResult.ast} />
              )
            ) : (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#3a1a1a",
                  border: "1px solid #844",
                  borderRadius: "4px",
                  color: "#faa",
                }}
              >
                <strong>Parse Error:</strong> {parseResult.error}
                {parseResult.line && parseResult.column && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                    Line {parseResult.line}, Column {parseResult.column}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
