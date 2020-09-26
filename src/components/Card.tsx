import * as React from "react";
import { Dimensions, StyleSheet, ViewStyle, View, Text } from "react-native";
import StyleGuide from "./StyleGuide";

import { LinearGradient } from "expo-linear-gradient";

type CardId = number;
interface Card {
  id: CardId;
  colors: string[];
}

export const cards: Card[] = [
  {
    id: 0,
    colors: ["#00c6ff", "#0072ff"],
  },
  {
    id: 1,
    colors: ["#00c6ff", "#0072ff"],
  },
  {
    id: 2,
    colors: ["#00c6ff", "#0072ff"],
  },
];

const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
export const CARD_WIDTH = width - StyleGuide.spacing * 16;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  indexWrapper: {
    width: 64,
    height: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 100,
  },
  index: { color: "white", fontSize: 28, fontWeight: "bold" },
});

export interface CardProps {
  card: Card;
  index?: number | null;
  cardStyles?: ViewStyle;
}

const Card = ({ card, index = null, cardStyles }: CardProps) => {
  return (
    <>
      <LinearGradient
        style={[styles.container, { ...cardStyles }]}
        colors={card ? card.colors : ["#00c6ff", "#0072ff"]}
      >
        {index ? (
          <View style={styles.indexWrapper}>
            <Text style={styles.index}>{index}</Text>
          </View>
        ) : null}
      </LinearGradient>
    </>
  );
};

export default Card;
