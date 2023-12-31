import { useState } from "react";
import { BiSearch, BiCaretDown } from "react-icons/bi";
import Dropdown from "./Dropdown";

function Search({
  query,
  onQueryChange,
  orderBy,
  setOrderBy,
  sortBy,
  setSortBy,
}) {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          onChange={(event) => onQueryChange(event.target.value)}
          type="text"
          name="query"
          id="query"
          value={query}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              onClick={() => {
                setDropdownToggle(!dropdownToggle);
              }}
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <Dropdown
              toggle={dropdownToggle}
              orderBy={orderBy}
              setOrderBy={(myOrder) => {
                setOrderBy(myOrder);
              }}
              sortBy={sortBy}
              setSortBy={(mysort) => {
                setSortBy(mysort);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
