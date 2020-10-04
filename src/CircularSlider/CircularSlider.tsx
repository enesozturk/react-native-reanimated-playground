import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";

import CircularProgress from "./CircularProgress";
import StyleGuide from "../components/StyleGuide";

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});

const CircularSlider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CircularProgress
          bg={StyleGuide.palette.background}
          fg={StyleGuide.palette.primary}
          strokeWidth={STROKE_WIDTH}
          theta={PI / 4}
          {...{ r }}
        />
      </View>
    </View>
  );
};

export default CircularSlider;
