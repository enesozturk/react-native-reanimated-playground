import * as React from "react";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";
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
  },
});

export interface CardProps {
  card: Card;
  style?: ViewStyle;
}

const Card = ({ card, style }: CardProps) => {
  return (
    <LinearGradient
      style={[styles.container, { ...style }]}
      colors={card ? card.colors : ["#00c6ff", "#0072ff"]}
    />
  );
};

export default Card;
