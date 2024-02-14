import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://localhost:7152/api/Locations/Search?searchParam=${searchTerm}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setSearchResults(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <a href={result.link}>{result.title}</a>
            {result.thumbnail && (
              <>
                {" "}
                <br />
                <img src={result.thumbnail} alt={result.title} />
              </>
            )}
            <p>{result?.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
