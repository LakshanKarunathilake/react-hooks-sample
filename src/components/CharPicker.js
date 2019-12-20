import React, { useState, useEffect } from "react";

import "./CharPicker.css";

const CharPicker = props => {
  const [characters, setCharactersState] = useState([]);
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    console.log("Working");
    setLoadingState(true);
    fetch("https://swapi.co/api/people")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        setCharactersState(
          selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          }))
        );
        setLoadingState(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let content = <p>Loading characters...</p>;

  if (!isLoading && characters && characters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {characters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!characters || characters.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
