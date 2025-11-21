import * as ts from 'typescript';
import { getNodeTypeName } from '../utils/parser';

interface ASTNodeProps {
  node: ts.Node;
  onClick?: (node: ts.Node) => void;
  isHighlighted?: boolean;
}

/**
 * ASTNode Component
 *
 * PARSING INSIGHT: What's in a Node?
 * ===================================
 * Each AST node represents a "syntactic construct" - a piece of grammar.
 *
 * Every node has:
 * - kind: What type of syntax (Identifier, BinaryExpression, etc.)
 * - pos/end: Where it lives in the source code (character positions)
 * - Children: Other nodes nested inside
 *
 * Example: In "x + 5", the BinaryExpression node has:
 * - left child: Identifier "x"
 * - operator: PlusToken "+"
 * - right child: NumericLiteral "5"
 *
 * This structure is why refactoring tools can rename "x" across your entire
 * codebase without accidentally changing strings that contain "x" or comments
 * that mention "x". The AST knows which "x" is the variable you care about.
 */
export function ASTNode({ node, onClick, isHighlighted }: ASTNodeProps) {
  const typeName = getNodeTypeName(node.kind);

  // Extract interesting properties to display
  let displayValue = '';

  // Show the actual value for literals and identifiers
  if (ts.isIdentifier(node)) {
    displayValue = `: ${node.text}`;
  } else if (ts.isStringLiteral(node)) {
    displayValue = `: "${node.text}"`;
  } else if (ts.isNumericLiteral(node)) {
    displayValue = `: ${node.text}`;
  }

  return (
    <div
      className={`ast-node ${isHighlighted ? 'highlighted' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(node);
      }}
    >
      <strong>{typeName}</strong>
      {displayValue && <span className="ast-node-value">{displayValue}</span>}
    </div>
  );
}
