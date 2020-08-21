import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const Card = (props: Props) => {
  return <View></View>;
};

export default Card;

const Styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
