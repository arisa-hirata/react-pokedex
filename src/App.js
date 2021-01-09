import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, CircularProgress, Card, CardHeader, CardMedia } from '@material-ui/core';
import axios from "axios";
import Header from './components/Header';
import './App.css';

function App() {
  // const [pokemon, setPokemon] = useState("");
  // const [pokemonData, setPokemonData] = useState({});
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemonCard = async () => {
    const pokeArr = [];

    try {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const pokemonRes = await axios.get(pokemonUrl);

      const imageUrl = pokemonRes.data.sprites.front_default;
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
        console.log("data: ", data);
        const imageUrl = data.sprites.front_default;

        return (
          <div className="pokemon-container">
            <Card style={{ width: 500, height: 500 }}>
              <CardHeader
                subheader= {data.id}
                title={data.name}
                // subheader={}
              />
              <div>
                Type: &nbsp;
                {data.types.map(type => (
                  <span key={type}>{type.type.name}</span>
                ))}
              </div>
              <div className="pokemon-data">

                <div className="basic-data">
                  <div className="image-container">
                     <img className="pokemon-image" src={imageUrl} />
                  </div>
                  <div className="status-container">
                    <div className="status">
                      <div>HP: </div>
                      <div>{data.stats[0].base_stat}</div>
                    </div>
                    <div className="status">
                      <div>Attack: </div>
                      <div>{data.stats[1].base_stat}</div>
                    </div>
                    <div className="status">
                      <div>Defense: </div>
                      <div>{data.stats[2].base_stat}</div>
                    </div>
                    <div className="status">
                      <div>Sp Atk: </div>
                      <div>{data.stats[3].base_stat}</div>
                    </div>
                    <div className="status">
                      <div>Sp Def: </div>
                      <div>{data.stats[4].base_stat}</div>
                    </div>
                    <div className="status">
                      <div>Speed: </div>
                      <div>{data.stats[5].base_stat}</div>
                    </div>
                  </div>
                </div>

                <div className="pokemon-profile">
                  <h3>Profile</h3>
                  <div className="status">
                      <div>Type: </div>
                      <div>
                          {data.types.map(type => (
                            <span key={type}>{type.type.name}&nbsp;</span>
                          ))}
                      </div>
                  </div>
                  <div className="status">
                      <div>Height: </div>
                      <div>{Math.round(data.height) / 10} m</div>
                  </div>
                  <div className="status">
                      <div>Weight: </div>
                      <div>{Math.round(data.weight) / 10} kg</div>
                  </div>
                  <div className="status">
                      <div>Abilities: </div>
                      <div>
                        {data.abilities.map(abilities => (
                              <span key={abilities}>{abilities.ability.name}&nbsp;</span>
                        ))}
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
