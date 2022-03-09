import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { map, capitalize } from "lodash";

export default function Stats(props) {
  const { stats } = props;
  const barStyle = (number) => {
    const color = Number(number) > 49 ? "#00ac17" : "#ff3e3e";
    const width = Number(number) > 100 ? "100%" : `${number}%`;
    return {
      backgroundColor: color,
      width: width,
    };
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block}>
          <View style={styles.blockTitle}>
            <Text style={styles.statName}>{capitalize(item.stat.name)}</Text>
          </View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View style={[styles.bar, barStyle(item.base_stat)]} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
    // backgroundColor: "green",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "30%",
  },
  statName: {
    color: "#6b6b6b",
    fontSize: 12,
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 12,
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
  },
  bar: {
    // backgroundColor: "red",
    // width: "10%",
    height: 5,
    borderRadius: 20,
  },
});
