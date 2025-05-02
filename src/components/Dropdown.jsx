
function Dropdown({ availableTypes, typeFilter, setTypeFilter }) {
    return (
      <div className="flex justify-center mt-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {availableTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Dropdown;
  