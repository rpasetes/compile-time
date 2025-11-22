import { useEffect, useRef } from 'react';
import * as ts from 'typescript';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { fieldGuide } from '../theme/fieldGuideTheme';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  hoveredNode?: ts.Node | null; // From hovering nodes → highlights code
}

/**
 * CodeEditor Component
 *
 * PARSING INSIGHT: Before the Tree
 * =================================
 * Code starts as plain text—characters you type on a keyboard.
 * To computers, "const x = 5" is just a string, no different from "hello world".
 *
 * The parser's job is to read this text and understand its structure:
 * - What's a keyword vs a variable name?
 * - What's being assigned to what?
 * - How are expressions nested?
 *
 * When you press a key, this editor updates. When parseCode() runs,
 * text transforms into a tree—the foundation for every tool you use.
 *
 * Even the syntax highlighting you see here? That's parsing too.
 * CodeMirror tokenizes each line to know what colors to apply.
 */
export function CodeEditor({ value, onChange, hoveredNode }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        javascript({ typescript: true }), // TypeScript mode handles both JS and TS
        fieldGuide, // Field guide theme
        EditorView.updateListener.of((update) => {
          // Handle document changes
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    // Ensure editor fills container and handles overflow
    view.dom.style.height = '100%';

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []); // Only create editor once

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (viewRef.current) {
      const currentValue = viewRef.current.state.doc.toString();
      if (currentValue !== value) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentValue.length,
            insert: value,
          },
        });
      }
    }
  }, [value]);

  // Highlight hovered node (visual only, doesn't move cursor)
  // When hovering a node, show which code it corresponds to
  // When leaving a node (hoveredNode becomes null), clear the selection
  useEffect(() => {
    if (!viewRef.current) return;

    if (hoveredNode) {
      const docLength = viewRef.current.state.doc.length;

      // Validate bounds to handle edge cases where document is modified while hovering
      if (hoveredNode.pos < 0 || hoveredNode.end > docLength) return;

      // Trim leading whitespace from the highlight
      const text = viewRef.current.state.doc.sliceString(hoveredNode.pos, hoveredNode.end);
      const leadingWhitespace = text.match(/^\s*/)?.[0].length || 0;
      const trimmedStart = hoveredNode.pos + leadingWhitespace;

      viewRef.current.dispatch({
        selection: { anchor: trimmedStart, head: hoveredNode.end },
      });
    } else {
      // Clear selection when no node is hovered
      const currentPos = viewRef.current.state.selection.main.head;
      viewRef.current.dispatch({
        selection: { anchor: currentPos, head: currentPos },
      });
    }
  }, [hoveredNode]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      width: '100%',
      flex: 1,
      minHeight: 0, // Key for flex scrolling
    }}>
      <label
        className="specimen-label"
        style={{
          fontWeight: 600,
          letterSpacing: '0.02em',
          flexShrink: 0,
        }}
      >
        Source Code:
      </label>
      <div
        ref={editorRef}
        className="paper-elevated"
        style={{
          width: '100%',
          flex: 1,
          minHeight: 0, // Allow flex to constrain height
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}
