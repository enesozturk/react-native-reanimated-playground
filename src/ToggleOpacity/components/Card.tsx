import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";

const CardWidth = Dimensions.get("screen").width - 80;
import { LinearGradient } from "expo-linear-gradient";

const Card = ({}) => {
  return (
    <LinearGradient colors={["#7474BF", "#348AC7"]} style={Styles.card}>
      <Text style={[Styles.text, Styles.bold, { fontSize: 18 }]}>
        Enes Öztürk
      </Text>
      <Text style={[Styles.text, { fontSize: 16 }]}>
        React Native Reanimated Workshop
      </Text>
      <Text style={[Styles.text, Styles.thin, { fontSize: 16 }]}>
        Toggle Opacity
      </Text>
    </LinearGradient>
  );
};

export default Card;

const Styles = StyleSheet.create({
  card: {
    width: CardWidth,
    height: (CardWidth * 2) / 3,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  bold: {
    fontWeight: "bold",
  },
  thin: {
    fontWeight: "300",
  },
});
