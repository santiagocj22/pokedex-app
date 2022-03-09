import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { map, capitalize } from "lodash";
import { getColorPokemonType } from "../utils/getColorPokemonType";

export default function Type(props) {
  const { types } = props;
  return (
    <View style={styles.content}>
      {map(types, (item, index) => (
        <View
          key={index}
          style={{
            ...styles.pill,
            backgroundColor: getColorPokemonType(item.type.name),
          }}
        >
          <Text style={styles.typename}>{capitalize(item.type.name)}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 200,
    marginHorizontal: 10,
    backgroundColor: "darkgray",
  },
  typename: {
    color: "white",
    fontSize: 15,
  },
});
