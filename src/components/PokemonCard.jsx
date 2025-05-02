function PokemonCard({ pokemon }) {
    return (
      <div className="bg-white shadow-md rounded p-4 text-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-20 h-20"
        />
        <h2 className="capitalize font-bold text-lg mt-2">{pokemon.name}</h2>
        <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
        <div className="mt-2">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.slot}
              className="inline-block bg-gray-200 text-sm px-2 py-1 rounded m-1"
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default PokemonCard;
  