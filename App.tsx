import React from "react";

import { StyleSheet, View, Dimensions } from "react-native";

import ToggleOpacity from "./src/ToggleOpacity";
import LayoutTransitions from "./src/LayoutTransitions";
import UseTransitions from "./src/UseTransitions";
import Timing from "./src/Timing";
import PanGesture from "./src/PanGesture/PanGesture";
import Spring from "./src/Spring/Spring";
import Swipe from "./src/Swiping";
import DragToSort from "./src/DragToSort";
import Svg from "./src/Svg";

export default function App() {
  return (
    <View style={Styles.pageContainer}>
      <Svg />
      {/* <DragToSort /> */}
      {/* <Swipe /> */}
      {/* <Spring /> */}
      {/* <PanGesture /> */}
      {/* <Timing /> */}
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
  },
});
