import React from "react";

import { StyleSheet, View, Dimensions } from "react-native";
import ToggleOpacity from "./src/ToggleOpacity";

export default function App() {
  return (
    <View style={Styles.pageContainer}>
      <ToggleOpacity />
    </View>
  );
}

const Styles = StyleSheet.create({
  pageContainer: {
    width: Dimensions.get("screen").width,
    height: "100%",
    paddingHorizontal: 32,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
