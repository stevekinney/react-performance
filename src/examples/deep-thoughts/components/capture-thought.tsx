import { Button } from '$/common/components/button';
import { Input } from '$/common/components/input';
import { useState } from 'react';

type CaptureThoughtProps = {
  onSubmit: (content: string) => void;
};

export const CaptureThought = ({ onSubmit }: CaptureThoughtProps) => {
  const [draftThought, setDraftThought] = useState('');

  return (
    <div className="py-4">
      <form
        className="flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          onSubmit(draftThought);
        }}
      >
        <Input
          name="thought"
          placeholder="What's on your mind?"
          required
          value={draftThought}
          onChange={(e) => setDraftThought(e.target.value)}
        />

        <Button type="submit" className="whitespace-nowrap">
          Capture Thought
        </Button>
      </form>
    </div>
  );
};
