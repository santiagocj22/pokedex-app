import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonAPI, getPokemonDetailsAPI } from "../api/pokemon";
import PokemonList from "../components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setnextUrl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonAPI(nextUrl);
      setnextUrl(response.next);
      const pokemonArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsAPI(pokemon.url);
        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other.dream_world.front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonArray]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
