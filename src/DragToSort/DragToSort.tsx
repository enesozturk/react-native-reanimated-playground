import React from "react";
import { StyleSheet, View } from "react-native";

import SortableCard from "./SortableCard";
import { cards, CARD_HEIGHT } from "../components/Card";
import { Value } from "react-native-reanimated";

const DragToSort = () => {
  const offsets = cards.map((_, index) => new Value(CARD_HEIGHT * index));

  return (
    <View style={Styles.container}>
      {cards.map((card, index) => (
        <SortableCard key={card.id} {...{ card, index, offsets }} />
      ))}
    </View>
  );
};

export default DragToSort;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
