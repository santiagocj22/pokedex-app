import React from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext } = props;
  const loadMore = () => {
    loadPokemons();
  };
  return (
    <SafeAreaView>
      <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContainer}
        onEndReached={isNext && loadMore}
        onEndReachedThreshold={(0, 1)}
        ListFooterComponent={
          isNext && (
            <ActivityIndicator
              color={"darkgray"}
              size={"large"}
              style={styles.spinner}
            />
          )
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
  },
  spinner: {
    marginTop: 10,
    marginBottom: 30,
  },
});
