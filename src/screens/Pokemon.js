import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonDetails } from "../api/pokemon";
import PokemonHeader from "../pokemon/PokemonHeader";
import Type from "../pokemon/Type";
import Stats from "../pokemon/Stats";
import Icon from "react-native-vector-icons/FontAwesome5";
import Favorite from "../pokemon/Favorite";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const {
    route: { params },
    navigation,
  } = props;
  const [pokemon, setPokemon] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id} />,
      headerLeft: () => (
        <Icon
          name={"arrow-left"}
          color={"#fff"}
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetails(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;
  return (
    <ScrollView>
      <PokemonHeader
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other.dream_world.front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
