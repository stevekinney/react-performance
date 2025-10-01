import { useState, useMemo, useDeferredValue } from 'react';
import { Container } from '$components/container';
import { Input } from '$components/input';
import { PrimeGrid } from './components/prime-grid';
import { Stats } from './components/stats';
import { calculatePrimes } from './utilities/calculate-primes';

function Application() {
  const [limit, setLimit] = useState(10000);

  // Defer the expensive computation so input stays responsive
  const deferredLimit = useDeferredValue(limit);
  const isCalculating = limit !== deferredLimit;

  // Use deferred value for expensive prime calculation
  const primes = useMemo(() => calculatePrimes(deferredLimit), [deferredLimit]);

  const largestPrime = primes.length > 0 ? primes[primes.length - 1] : 0;

  return (
    <Container className="my-8 space-y-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Prime Time</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a number to find all prime numbers up to that limit. Now optimized with useDeferredValue - type as fast as you want, the input stays responsive!
        </p>
        <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            ✅ Optimized with useDeferredValue for responsive input
            {isCalculating && <span className="ml-2 text-yellow-600 dark:text-yellow-400">⏳ Calculating...</span>}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <Input
          type="number"
          label="Find primes up to:"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          min={2}
          max={100000}
          placeholder="Enter a number (e.g., 10000)"
        />
      </section>

      <section>
        <Stats count={primes.length} largestPrime={largestPrime} limit={limit} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Prime Numbers Found
        </h2>
        <PrimeGrid primes={primes} />
      </section>
    </Container>
  );
}

export default Application;
