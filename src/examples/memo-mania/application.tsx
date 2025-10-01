import { useState, useCallback } from 'react';
import { Container } from '$components/container';
import { Button } from '$components/button';
import { CalculationList } from './components/calculation-list';
import type { Calculation, CalculationType } from './types';

const CALCULATION_TYPES: CalculationType[] = ['fibonacci', 'factorial', 'primeFactors', 'sumOfDivisors'];

function Application() {
  const [calculations, setCalculations] = useState<Calculation[]>([
    { id: '1', type: 'fibonacci', input: 30 },
    { id: '2', type: 'factorial', input: 15 },
  ]);

  // Use useCallback to maintain stable function references
  const addCalculation = useCallback(() => {
    const randomType = CALCULATION_TYPES[Math.floor(Math.random() * CALCULATION_TYPES.length)];
    const defaultInput = randomType === 'fibonacci' ? 25 : 10;

    const newCalculation: Calculation = {
      id: Date.now().toString(),
      type: randomType,
      input: defaultInput,
    };

    setCalculations((prev) => [...prev, newCalculation]);
  }, []);

  const updateCalculation = useCallback((id: string, input: number) => {
    setCalculations((prev) =>
      prev.map((calc) =>
        calc.id === id ? { ...calc, input } : calc
      )
    );
  }, []);

  const deleteCalculation = useCallback((id: string) => {
    setCalculations((prev) => prev.filter((calc) => calc.id !== id));
  }, []);

  return (
    <Container className="my-8 space-y-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Memo Mania
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          All optimizations applied! Change a number and check the console - only the changed
          calculation runs. Try adding/deleting cards too.
        </p>
        <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            ✅ Using useMemo, React.memo, and useCallback for maximum performance
          </p>
        </div>
      </section>

      <section className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {calculations.length} {calculations.length === 1 ? 'calculation' : 'calculations'}
          </p>
        </div>
        <Button onClick={addCalculation}>
          Add Random Calculation
        </Button>
      </section>

      <section>
        <CalculationList
          calculations={calculations}
          onUpdate={updateCalculation}
          onDelete={deleteCalculation}
        />
      </section>
    </Container>
  );
}

export default Application;
