import React, { useState, useEffect, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonFavoriteApi } from "../api/favorites";
import { getPokemonDetails } from "../api/pokemon";
import useAuth from "../hooks/useAuth";
import PokemonList from "../components/PokemonList";
import Notlogged from "../components/Notlogged";

export default function Favorites() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonFavoriteApi();
          const pokemonArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetails(id);
            pokemonArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image: pokemonDetails.sprites.other.dream_world.front_default,
            });
          }
          setPokemons(pokemonArray);
        })();
      }
    }, [auth])
  );

  return !auth ? <Notlogged /> : <PokemonList pokemons={pokemons} />;
}
