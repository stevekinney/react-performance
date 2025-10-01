import { useState, useCallback } from 'react';

import { Button } from '$/common/components/button';
import { Container } from '$/common/components/container';

import type { DeepThought, ThoughtChanges } from './types';

import { CaptureThought } from './components/capture-thought';
import { Thoughts } from './components/thoughts';

import { createThought } from './utilities/create-thought';
import { initialThoughts } from './utilities/initial-thoughts';

function Application() {
  const [thoughts, setThoughts] = useState<DeepThought[]>(initialThoughts);

  const addThought = useCallback((content: string) => {
    const newThought = createThought(content);
    setThoughts((prev) => [...prev, newThought]);
  }, []);

  const updateThought = useCallback((id: string, changes: ThoughtChanges) => {
    setThoughts((prev) => {
      const thought = prev.find((t) => t.id === id);
      if (!thought) return prev;
      const updatedThought = { ...thought, ...changes };
      return prev.map((t) => (t.id === id ? updatedThought : t));
    });
  }, []);

  const deleteThought = useCallback((id: string) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setThoughts([]);
  }, []);

  return (
    <Container className="my-8 flex flex-col gap-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Deep Thoughts
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Capture and manage your thoughts. Now optimized with useCallback - child components only re-render when necessary!
        </p>
        <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            ✅ Optimized with useCallback, memo, and useMemo for efficient re-renders
          </p>
        </div>
      </section>

      <CaptureThought onSubmit={addThought} />

      <Thoughts
        updateThought={updateThought}
        deleteThought={deleteThought}
        addThought={addThought}
        thoughts={thoughts}
      />

      <div className="flex flex-wrap items-center justify-end gap-4 p-4">
        <Button variant="danger" onClick={clearAll}>
          Clear All
        </Button>
      </div>
    </Container>
  );
}

export default Application;
