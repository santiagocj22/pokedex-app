import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SvgUri } from "react-native-svg";
import { getColorPokemonType } from "../utils/getColorPokemonType";
import { capitalize } from "lodash";

export default function PokemonCard(props) {
  const { pokemon } = props;
  const navigation = useNavigation();

  const pokemonColor = getColorPokemonType(pokemon.type);
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

  const goToPokemon = () => {
    navigation.navigate("Pokemon", { id: pokemon.id });
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>
              {`${pokemon.order}`.padStart(2, 0)}
            </Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <View style={styles.image}>
              <SvgUri uri={pokemon.image} width={70} height={70} />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
  },
  number: {
    position: "absolute",
    fontWeight: "bold",
    right: 10,
    top: 6,
    padding: 5,
    fontSize: 12,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0)",
  },
  name: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
});
