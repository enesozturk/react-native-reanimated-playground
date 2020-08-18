import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";

const CardWidth = Dimensions.get("screen").width - 80;
import { LinearGradient } from "expo-linear-gradient";

const Card = ({}) => {
  return (
    <LinearGradient colors={["#00c6ff", "#0072ff"]} style={Styles.card}>
      <Text style={[Styles.text, { fontSize: 18 }]}>
        React Native Reanimated
      </Text>
      <Text style={[Styles.text, Styles.thin, { fontSize: 18 }]}>
        Toggle Opacity Example
      </Text>
      <Text style={[Styles.text, Styles.thin, { fontSize: 14, marginTop: 4 }]}>
        Enes Öztürk
      </Text>
    </LinearGradient>
  );
};

export default Card;

const Styles = StyleSheet.create({
  card: {
    width: "100%",
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
