import { Button } from '$/common/components/button';
import { Input } from '$/common/components/input';

type CaptureThoughtProps = {
  onSubmit: (content: string) => void;
};

export const CaptureThought = ({ onSubmit }: CaptureThoughtProps) => {
  return (
    <div className="py-4">
      <form
        className="flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const content = formData.get('thought');

          onSubmit(String(content));
        }}
      >
        <Input name="thought" placeholder="What's on your mind?" required />

        <Button type="submit" className="whitespace-nowrap">
          Capture Thought
        </Button>
      </form>
    </div>
  );
};
