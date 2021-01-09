import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, CircularProgress, Card } from '@material-ui/core';
import axios from "axios";
import Header from './components/Header';
import './App.css';

function App() {
  // const [pokemon, setPokemon] = useState("");
  // const [pokemonData, setPokemonData] = useState({});
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  const getPokemonCard = async () => {

    try {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(pokemonUrl);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchChange = (e) => {
      setPokemon(e.target.value);
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
      })}
    </div>
  );
}

export default App;
