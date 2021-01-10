import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, CircularProgress, Card, CardHeader, CardMedia,  } from '@material-ui/core';
import axios from "axios";
import Header from './components/Header';
import './App.css';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

function App() {
  // const [pokemon, setPokemon] = useState("");
  // const [pokemonData, setPokemonData] = useState({});
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [typeColor, setTypeColor] = useState("");

  const getPokemonCard = async () => {
    const pokeArr = [];

    try {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const pokemonRes = await axios.get(pokemonUrl);

      const imageUrl = pokemonRes.data.sprites.front_default;
      const types = pokemonRes.data.types.map(type => type.type.name);
      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
      console.log("themeColor: ", themeColor);
      setTypeColor(typeColor)
      // console.log(pokemonRes.data);
      pokeArr.push(pokemonRes.data);
      // setPokemonType(pokemonRes.data.types[0].type.name);
      setPokemonData(pokeArr);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchChange = (e) => {
      setPokemon(e.target.value.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getPokemonCard();
  }

  // const getPokemonCard = (pokemonId) => {
  //   const { id, name, sprite } = pokemonData[pokemonId];
  //   return (
  //     <Grid item xs={4} key={pokemonId}>

  //     </Grid>
  //   );
  // }

  return (
    <div className="App">
      <Header />
      <div className="search_container">
        <TextField
          // {...params}
          label="Search Pokemon"
          margin="normal"
          variant="filled"
          onChange={handleSearchChange}
          // InputProps={{ ...params.InputProps, type: 'search' }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: '#e3350f', color: 'white', marginLeft: 20 }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {pokemonData.map((data) => {
        console.log("data: ", data.sprites);
        const imageUrl = data.sprites;

        return (
          <div className="pokemon-container">
            <Card
              style={{
                width: "70%",
                maxWidth: 1000,
                minWidth: 500,
              }}>
              <div className="card-header">
                <h4># {data.id}</h4>
                <h3 className="pokemon-name">
                  {data.name.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                </h3>
                <h4>
                  Type: &nbsp;
                  {data.types.map(type => (
                    <span
                      key={type}
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type.type.name]}`,
                        color: 'white',
                        borderRadius: 5,
                        padding: 5
                      }}
                    >{type.type.name}</span>
                  ))}

                </h4>
              </div>
              <div className="pokemon-data">

                <div className="basic-data">
                  <div className="image-container">
                      <img className="pokemon-image" src={imageUrl.front_default} />
                  </div>
                  <div className="sprites-container">
                    <div>
                      <img className="sprites-image" src={imageUrl.front_female} />
                      <img className="sprites-image" src={imageUrl.back_female} />
                    </div>
                    <div>
                      <img className="sprites-image" src={imageUrl.front_shiny} />
                      <img className="sprites-image" src={imageUrl.back_shiny} />
                    </div>
                  </div>

                </div>

                <div className="basic-data">
                    <div className="status-container">
                      <div className="status">
                        <div>HP: </div>
                        <div className="status-details">{data.stats[0].base_stat}</div>
                      </div>
                      <div className="status">
                        <div>Attack: </div>
                        <div className="status-details">{data.stats[1].base_stat}</div>
                      </div>
                      <div className="status">
                        <div>Defense: </div>
                        <div className="status-details">{data.stats[2].base_stat}</div>
                      </div>
                      <div className="status">
                        <div>Sp Atk: </div>
                        <div className="status-details">{data.stats[3].base_stat}</div>
                      </div>
                      <div className="status">
                        <div>Sp Def: </div>
                        <div className="status-details">{data.stats[4].base_stat}</div>
                      </div>
                      <div className="status">
                        <div>Speed: </div>
                        <div className="status-details">{data.stats[5].base_stat}</div>
                      </div>
                   </div>

                  <div className="status-container">

                    <div className="status">
                        <div>Height: </div>
                        <div className="status-details">{Math.round(data.height) / 10} m</div>
                    </div>
                    <div className="status">
                        <div>Weight: </div>
                        <div className="status-details">{Math.round(data.weight) / 10} kg</div>
                    </div>
                    <div className="status">
                        <div>Abilities: </div>
                        <div className="status-details">
                          {data.abilities.map(abilities => (
                                <span key={abilities}>{abilities.ability.name}&nbsp;</span>
                          ))}
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            </Card>
          </div>

        );
      })}
    </div>
  );
}

export default App;
