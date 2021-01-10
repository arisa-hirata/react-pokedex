import React, { useEffect, useState } from "react";
import { CircularProgress, Card, Grid, CardMedia, CardContent, Typography } from '@material-ui/core';
import axios from "axios";

const PokemonCard = () => {
   const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
        .then(function (response) {
          const { data } = response;
          const { results } = data;
          const newPokemonData = {};
          results.forEach((pokemon, index) => {
            newPokemonData[Math.floor(Math.random() * 9)] = {
              id: index + 1,
              name: pokemon.name.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '),
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`,
            };
          });
          setPokemonData(newPokemonData);
        });
    }, []);

  const getPokemonCard = (pokemonId) => {
      const { id, name, sprite } = pokemonData[pokemonId];
      return (
        <Grid item xs={4} key={pokemonId}>
          <Card>
            <CardMedia
              image={sprite}
              style={{ width: "150px", height: "150px"}}
            />
            <CardContent>
              <Typography>{`#${id}  ${name}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
  };

  return (
    <>
    {pokemonData ? (
        <Grid container spacing={2} >
          {Object.keys(pokemonData).map(
            (pokemonId) => getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default PokemonCard;
