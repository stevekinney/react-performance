import { Container } from '$components/container';
import { Range } from '$components/range';
import { useMemo, useState, useDeferredValue } from 'react';
import { ShapesGrid } from './components/shapes-grid';
import { generateShapes } from './utilities/generate-shapes';

function Application() {
  const [shapeCount, setShapeCount] = useState(1000);

  // Create a deferred version that can lag behind for performance
  const deferredShapeCount = useDeferredValue(shapeCount);
  const isRendering = shapeCount !== deferredShapeCount;

  // Use deferred value for expensive shape generation
  const shapes = useMemo(() => generateShapes(deferredShapeCount), [deferredShapeCount]);

  return (
    <Container className="my-8 space-y-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Throwing Shapes
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Drag the slider to control how many shapes are rendered. Now optimized with useDeferredValue - the slider stays responsive while shapes render in the background!
        </p>
        <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            ✅ Optimized with useDeferredValue for responsive UI
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <Range
          label={`Number of shapes: ${shapeCount.toLocaleString()}`}
          min={1000}
          max={20000}
          step={1000}
          value={shapeCount}
          onChange={setShapeCount}
        />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Currently rendering {shapes.length.toLocaleString()} shapes.
          {isRendering && <span className="ml-2 text-yellow-600 dark:text-yellow-400">⏳ Catching up...</span>}
        </p>
      </section>

      <section>
        <ShapesGrid shapes={shapes} />
      </section>
    </Container>
  );
}

export default Application;
