import React, { useState } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const apiKey = "YOUR_BING_SEARCH_API_KEY";
  const endpoint = `https://api.bing.microsoft.com/v7.0/search`;

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${endpoint}?q=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.webPages.value);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
            <a href={result.url}>{result.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
