"use client";

import { useEffect, useRef, useCallback } from "react";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "./ThemeProvider";

const MAX_CHARS = 200000;

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
}

function fontSizeExtension(fontSizeRem: number) {
  return EditorView.theme(
    {
      "&": { fontSize: `${fontSizeRem}rem` },
    }
  );
}

function makeTheme() {
  return EditorView.theme(
    {
      "&": {
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      },
      ".cm-content": {
        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
        padding: "1.5rem 2rem",
        lineHeight: 1.7,
      },
      ".cm-gutters": {
        display: "none",
      },
      ".cm-cursor": {
        borderLeftColor: "var(--text-primary)",
      },
      "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
        backgroundColor: "var(--accent) !important",
        opacity: 0.3,
      },
      ".cm-placeholder": {
        color: "var(--text-secondary)",
        fontStyle: "italic",
      },
    },
    { dark: false }
  );
}

export default function CodeEditor({ value, onChange, fontSize = 1 }: CodeEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const valueRef = useRef(value);
  valueRef.current = value;
  const { theme } = useTheme();

  const onUpdate = useCallback(() => {
    if (!viewRef.current) return;
    const val = viewRef.current.state.doc.toString();
    if (val.length > MAX_CHARS) {
      viewRef.current.dispatch({
        changes: {
          from: MAX_CHARS,
          to: val.length,
        },
      });
      return;
    }
    onChangeRef.current(val);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    // Destroy previous instance if re-creating (theme change)
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const baseTheme = theme === "dark" ? oneDark : makeTheme();
    const extensions = [
      python(),
      baseTheme,
      fontSizeExtension(fontSize),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onUpdate();
        }
      }),
      EditorView.lineWrapping,
      placeholder("Escreva sua nota aqui..."),
    ];

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: ref.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, fontSize]);

  // Sync external value changes (e.g. initial load from Supabase)
  useEffect(() => {
    const view = viewRef.current;
    if (view) {
      const current = view.state.doc.toString();
      if (current !== value) {
        view.dispatch({
          changes: {
            from: 0,
            to: current.length,
            insert: value,
          },
        });
      }
    }
  }, [value]);

  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        overflow: "auto",
      }}
    />
  );
}
