import React from "react";

import { StyleSheet, View, Dimensions } from "react-native";

import ToggleOpacity from "./src/ToggleOpacity";
import LayoutTransitions from "./src/LayoutTransitions";
import UseTransitions from "./src/components/UseTransitions";

export default function App() {
  return (
    <View style={Styles.pageContainer}>
      <UseTransitions />
      {/* <LayoutTransitions /> */}
      {/* <ToggleOpacity /> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  pageContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
});
