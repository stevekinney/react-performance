import { useState, memo, useCallback, useMemo } from 'react';

import { Button } from '$/common/components/button';
import { Input } from '$/common/components/input';
import { Toggle } from '$/common/components/toggle';

import type { DeepThought, ThoughtActions } from '../types';

type ThoughtProps = DeepThought & ThoughtActions;

const ThoughtComponent = ({
  id,
  content,
  createdAt,
  updateThought,
  deleteThought,
  addThought,
}: ThoughtProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<string>(content);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    updateThought?.(id, { content: draft });
    setIsEditing(false);
  }, [updateThought, id, draft]);

  const handleDuplicate = useCallback(() => {
    addThought(content);
  }, [addThought, content]);

  const handleDelete = useCallback(() => {
    deleteThought(id);
  }, [deleteThought, id]);

  const toggleEdit = useCallback(() => {
    setIsEditing((editing) => !editing);
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(content);
  }, [content]);

  const date = useMemo(() => new Date(createdAt).toLocaleString(), [createdAt]);

  const wordCount = useMemo(() => {
    const trimmed = draft.trim();
    const count = trimmed.length ? trimmed.split(/\s+/).length : 0;
    const wordLabel = count === 1 ? 'word' : 'words';
    const charLabel = draft.length === 1 ? 'character' : 'characters';
    return `${count} ${wordLabel} • ${draft.length} ${charLabel}`;
  }, [draft]);

  return (
    <div className="group flex flex-col gap-4 bg-slate-50 p-4 shadow-sm dark:bg-slate-800">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <p>{content}</p>
          <time className="text-sm text-slate-500">{date}</time>
        </div>

        <div className="invisible flex gap-1 group-hover:visible">
          <Button size="small" variant="secondary" onClick={handleDuplicate}>
            Duplicate
          </Button>

          <Button size="small" variant="danger" onClick={handleDelete}>
            Forget
          </Button>
        </div>

        <Toggle
          checked={isEditing}
          label="Edit"
          onClick={toggleEdit}
          className="whitespace-nowrap"
        >
          Edit
        </Toggle>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 rounded-md bg-slate-100 p-4 shadow-sm dark:bg-slate-700"
        >
          <Input label="Update Thought" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <div className="-mt-1 text-xs text-slate-500">
            {wordCount}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="self-end"
              type="button"
              onClick={resetDraft}
            >
              Reset
            </Button>
            <Button className="self-end" type="submit">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

ThoughtComponent.displayName = 'Thought';

export const Thought = memo(ThoughtComponent);
