import { useMemo, useState, useTransition } from 'react';

import { Container } from '$components/container';
import { Input } from '$components/input';
import { Pokemon } from './components/pokemon';
import { filterPokemon } from './utilities/filter-pokemon';

const Application = () => {
	// Separate urgent (input) from non-urgent (filtering) state
	const [inputValue, setInputValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isPending, startTransition] = useTransition();

	const filteredPokemon = useMemo(() => filterPokemon(searchQuery), [searchQuery]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Update input immediately (urgent)
		setInputValue(value);
		// Update search query with low priority (non-urgent)
		startTransition(() => {
			setSearchQuery(value);
		});
	};

	return (
		<Container className="space-y-8">
			<section>
				<h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Pokamoka</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Search through the Pokedex! Now optimized with useTransition - type as fast as you want, the input stays responsive while filtering happens in the background.
				</p>
				<div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
					<p className="text-sm font-medium text-green-800 dark:text-green-200">
						✅ Optimized with useTransition for responsive search
						{isPending && <span className="ml-2 text-yellow-600 dark:text-yellow-400">⏳ Filtering...</span>}
					</p>
				</div>
			</section>

			<section id="filters">
				<Input
					label="Search Pokemon"
					placeholder="Search by name, type, ability, species, or description…"
					value={inputValue}
					onChange={handleInputChange}
				/>
			</section>
			<section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{filteredPokemon.map((pokemon) => (
					<Pokemon key={pokemon.id} {...pokemon} />
				))}
			</section>
		</Container>
	);
};

export default Application;
