import { useEffect, useState } from 'react';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [availableTypes, setAvailableTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        // Set Pokémon list
        setPokemonList(detailedPokemon);

        const allTypes = new Set();
        detailedPokemon.forEach(p => {
          p.types.forEach(t => allTypes.add(t.type.name));
        });
        setAvailableTypes(['All', ...Array.from(allTypes)]);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch Pokémon.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm);
    const matchesType =
      typeFilter === 'All' ||
      pokemon.types.some((t) => t.type.name === typeFilter.toLowerCase());

    return matchesName && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Dropdown
        availableTypes={availableTypes}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {loading && <p className="text-center mt-6 text-lg">Loading Pokémon...</p>}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {filteredPokemon.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 mt-6">No Pokémon found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
