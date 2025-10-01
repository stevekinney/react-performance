import { useState } from 'react';
import { Card } from '$components/card';
import { Button } from '$components/button';

// ✅ CORRECT: State colocated inside the component
export function CounterWidget() {
  const [count, setCount] = useState(0);

  console.log('CounterWidget rendered');

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Counter Widget
      </h3>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        A simple counter. Notice this only re-renders when you interact with IT.
      </p>

      <div className="flex items-center justify-center space-x-4">
        <Button onClick={() => setCount(count - 1)} variant="secondary">
          −
        </Button>
        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{count}</span>
        <Button onClick={() => setCount(count + 1)} variant="secondary">
          +
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={() => setCount(0)} variant="secondary" size="small">
          Reset
        </Button>
      </div>
    </Card>
  );
}
