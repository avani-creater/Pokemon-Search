function Search({ searchTerm, setSearchTerm }) {
    return (
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search Pokémon by name"
          className="w-80 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>
    );
  }
  
  export default Search;
  