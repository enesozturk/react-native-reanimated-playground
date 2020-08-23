import React from "react";

import { StyleSheet, View, Dimensions } from "react-native";

import ToggleOpacity from "./src/ToggleOpacity";
import LayoutTransitions from "./src/LayoutTransitions";
import UseTransitions from "./src/UseTransitions";
import Timing from "./src/Timing";

export default function App() {
  return (
    <View style={Styles.pageContainer}>
      <Timing />
      {/* <UseTransitions /> */}
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
