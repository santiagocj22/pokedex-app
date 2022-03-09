import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { capitalize } from "lodash";
import { getColorPokemonType } from "../utils/getColorPokemonType";

export default function PokemonHeader(props) {
  const { name, order, image, type } = props;
  const color = getColorPokemonType(type);
  const bgStyles = [{ backgroundColor: color, ...styles.bg }];
  return (
    <>
      <View style={bgStyles} />
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.order}>#{`${order}`.padStart(2, 0)}</Text>
          <Text style={styles.name}>{capitalize(name)}</Text>
        </View>
        <View style={styles.contentImg}>
          <SvgUri
            uri={image}
            width={300}
            height={250}
            resizeMode={"contain"}
            style={styles.image}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    margin: 20,
    bottom: 10,
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: 400,
    borderBottomEndRadius: 150,
    borderBottomLeftRadius: 150,

    transform: [{ scaleX: 1 }],
    resizeMode: "contain",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  name: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  order: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
