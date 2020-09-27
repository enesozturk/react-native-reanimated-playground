import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { multiply, sub } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import StyleGuide from "../components/StyleGuide";
import Color from "color";

export const STROKE_WIDTH = 40;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface CircularProgressProps {
  icon: string;
  color: string;
  size: number;
  progress: Animated.Node<number>;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  color,
  size,
  progress,
  icon,
}: CircularProgressProps) => {
  const r = (size - STROKE_WIDTH) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = r * 2 * Math.PI;
  const a = multiply(sub(1, progress), Math.PI * 2);
  const strokeDashoffset = multiply(a, r);
  const backgroundColor = new Color(color).darken(0.85);
  return (
    <View style={styles.container}>
      <Svg
        style={{ transform: [{ rotateZ: "270deg" }] }}
        width={size}
        height={size}
      >
        <Circle
          stroke={backgroundColor.string()}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          {...{
            cx,
            cy,
            r,
          }}
        />
        <AnimatedCircle
          stroke={color}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          strokeWidth={STROKE_WIDTH}
          {...{
            strokeDashoffset,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather
          style={{ top: -r }}
          name={icon}
          color="white"
          size={STROKE_WIDTH - StyleGuide.spacing}
        />
      </View>
    </View>
  );
};

export default CircularProgress;
