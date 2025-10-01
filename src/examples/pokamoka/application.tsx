import { useMemo, useState, useTransition } from 'react';

import { Container } from '$components/container';
import { Input } from '$components/input';
import { Pokemon } from './components/pokemon';
import { filterPokemon } from './utilities/filter-pokemon';

const Application = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemon = useMemo(() => filterPokemon(searchQuery), [searchQuery]);

  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputQuery(value);

    startTransition(() => {
      setSearchQuery(value);
    });
  };

  return (
    <Container className="space-y-8">
      <section id="filters">
        <Input
          label="Search Pokemon"
          placeholder="Search by name, type, ability, species, or description…"
          value={inputQuery}
          onChange={handleSearchChange}
        />
      </section>
      <section
        className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${isPending ? 'opacity-50' : 'opacity-100'}`}
      >
        {filteredPokemon.map((pokemon) => (
          <Pokemon key={pokemon.id} {...pokemon} />
        ))}
      </section>
    </Container>
  );
};

export default Application;
