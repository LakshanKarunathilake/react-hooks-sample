import React, { useState, useEffect } from "react";

import Summary from "./Summary";

const Character = props => {
  const [characters, setCharacters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " +
        this.props.selectedChar
    );
    setIsLoading(true);
    fetch("https://swapi.co/api/people/" + this.props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: this.props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        isLoading(false);
        setCharacters(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && characters.id) {
    content = (
      <Summary
        name={characters.name}
        gender={characters.gender}
        height={characters.height}
        hairColor={characters.colors.hair}
        skinColor={characters.colors.skin}
        movieCount={characters.movieCount}
      />
    );
  } else if (!isLoading && !characters.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default Character;
