import React, { useState, useEffect } from 'react';
import { Button, TextField, Card } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
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
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [typeColor, setTypeColor] = useState("");
  const [pokemonName, setPokemonName] = useState([]);

  const getPokemonCard = async () => {
    const pokeArr = [];

    try {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const pokemonRes = await axios.get(pokemonUrl);

      setTypeColor(typeColor)
      pokeArr.push(pokemonRes.data);
      setPokemonData(pokeArr);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = [];
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
          };
        });
        setPokemonName(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e, newValue) => {
    if (typeof newValue === 'string') {
      setPokemon(newValue);
    } else {
      setPokemon(e.target.value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getPokemonCard();
  }

  return (
    <div className="App">
      <Header />
      <div className="search_container">
        <Autocomplete
          freeSolo
          disableClearable
          options={pokemonName.map((option) => option.name)}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              required={true}
              {...params}
              label="Search Pokemon"
              margin="normal"
              variant="filled"
              onChange={handleSearchChange}
              InputProps={{ ...params.InputProps, type: 'search' }}
              style={{width: 200}}
            />
          )}
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
        const imageUrl = data.sprites;
        const themeColor = data.types[0].type.name;
        console.log("data: ", data.types[0].type.name);
        return (
          <div className="pokemon-container">
            <Card
              style={{
                width: "70%",
                maxWidth: 1000,
                minWidth: 500,
              }}>
              <div className="card-header">
                <h5># {data.id}</h5>
                <h3 className="pokemon-name">
                  {data.name.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                </h3>
                <h5>
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
                </h5>
              </div>

              <div className="pokemon-data">

                <div className="basic-data">
                  <div className="image-container">
                      <img className="pokemon-image" src={imageUrl.front_default} />
                  </div>

                  <div className="status-container">
                      <div>
                        <div className="status">
                          <div>HP </div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[0].base_stat}%`,
                                  backgroundColor: `#${TYPE_COLORS[themeColor]}`
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <small>{data.stats[0].base_stat}</small>
                              </div>
                          </div>
                        </div>

                        <div className="status">
                          <div>Attack </div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[1].base_stat}%`,
                                  backgroundColor: `#${TYPE_COLORS[themeColor]}`
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <small>{data.stats[1].base_stat}</small>
                              </div>
                          </div>
                        </div>

                        <div className="status">
                          <div>Defense </div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[2].base_stat}%`,
                                  backgroundColor: `#${TYPE_COLORS[themeColor]}`
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <small>{data.stats[2].base_stat}</small>
                              </div>
                          </div>
                        </div>

                        <div className="status">
                          <div>Sp Atk </div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[3].base_stat}%`,
                                  backgroundColor: `#${TYPE_COLORS[themeColor]}`
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <small>{data.stats[3].base_stat}</small>
                              </div>
                          </div>
                        </div>

                        <div className="status">
                          <div>Sp Def </div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[4].base_stat}%`,
                                  backgroundColor: `#${TYPE_COLORS[themeColor]}`
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <small>{data.stats[4].base_stat}</small>
                              </div>
                          </div>
                        </div>

                        <div className="status">
                          <div>Speed </div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[5].base_stat}%`,
                                  backgroundColor: `#${TYPE_COLORS[themeColor]}`
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <small>{data.stats[5].base_stat}</small>
                              </div>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="basic-data">
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
                <div className="sprites-container">
                    <div>
                      <img className="sprites-image" src={imageUrl.front_female} />
                      <img className="sprites-image" src={imageUrl.back_female} />
                      <img className="sprites-image" src={imageUrl.front_shiny} />
                      <img className="sprites-image" src={imageUrl.back_shiny} />
                    </div>
                  </div>
              </div>
            </Card>
          </div>
        );
      })}
      {pokemonData.length === 0 ? <PokemonCard /> : ""}


    </div>
  );
}

export default App;
