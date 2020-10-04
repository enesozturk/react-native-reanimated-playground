import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";

import CircularProgress from "./CircularProgress";
import StyleGuide from "../components/StyleGuide";
import Cursor from "./Cursor";
import Animated, {
  add,
  cond,
  lessThan,
  multiply,
  sub,
  Value,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

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
  const start = new Value(0);
  const end = new Value(0);
  const theta = sub(
    cond(lessThan(start, end), end, add(multiply(2, PI), end)),
    start
  );
  const rotate = sub(PI, end);

  const backgroundColor = interpolateColor(theta, {
    inputRange: [0, 2 * PI],
    outputRange: ["#00c6ff", "#0072ff"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <CircularProgress
            backgroundColor={backgroundColor}
            bg={StyleGuide.palette.background}
            fg={StyleGuide.palette.primary}
            strokeWidth={STROKE_WIDTH}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor
          theta={start}
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
        />
        <Cursor
          theta={end}
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
        />
      </View>
    </View>
  );
};

export default CircularSlider;
