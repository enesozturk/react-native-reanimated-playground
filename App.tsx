import React from "react";

import { StyleSheet, View } from "react-native";
import ToggleOpacity from "./src/ToggleOpacity";

export default function App() {
  return (
    <View style={Styles.container}>
      <ToggleOpacity />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    display: "flex",
  },
});
