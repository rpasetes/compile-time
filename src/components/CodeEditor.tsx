import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { LanguageMode } from '../utils/parser';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  mode: LanguageMode;
  onModeChange: (mode: LanguageMode) => void;
}

/**
 * CodeEditor Component
 *
 * COMPILER INSIGHT: The Source Code Phase
 * ==========================================
 * This is where everything starts. Before parsing, before ASTs, before execution,
 * there's just text. Raw characters that humans write.
 *
 * The compiler's first job is to take this text and make sense of it.
 * That's what our parser does when we pass it to parseCode().
 */
export function CodeEditor({ value, onChange, mode, onModeChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        javascript({ typescript: mode === 'typescript' }),
        oneDark,
        EditorView.updateListener.of((update) => {
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

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [mode]); // Recreate editor when mode changes

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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      width: '100%',
      flex: 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label htmlFor="code-input" style={{ fontWeight: 'bold' }}>
          Source Code:
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onModeChange('javascript')}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: mode === 'javascript' ? '#646cff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            JavaScript
          </button>
          <button
            onClick={() => onModeChange('typescript')}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: mode === 'typescript' ? '#646cff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            TypeScript
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        style={{
          width: '100%',
          flex: 1,
          minHeight: '200px',
          border: '1px solid #444',
          borderRadius: '4px',
          overflow: 'auto',
        }}
      />
    </div>
  );
}
