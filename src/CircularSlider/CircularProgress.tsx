import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { transformOrigin } from "react-native-redash";
import HalfCircle from "./HalfCircle";

const { PI } = Math;
const { lessThan, interpolate, Extrapolate } = Animated;

interface CircularProgressProps {
  theta: number;
  r: number;
  bg: string;
  fg: string;
  strokeWidth: number;
}

const CircularProgress = ({
  theta,
  r,
  bg,
  fg,
  strokeWidth,
}: CircularProgressProps) => {
  const opacity = lessThan(theta, PI);
  const rotate = interpolate(theta, {
    inputRange: [PI, 2 * PI],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={{ zIndex: 1 }}>
        <HalfCircle color={fg} {...{ r }} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin({ x: 0, y: r / 2 }, { rotate: theta }),
            opacity,
          }}
        >
          <HalfCircle color={bg} {...{ r }} />
        </Animated.View>
      </View>
      <View style={{ transform: [{ rotate: "180deg" }] }}>
        <HalfCircle color={fg} {...{ r }} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin({ x: 0, y: r / 2 }, { rotate }),
          }}
        >
          <HalfCircle color={bg} {...{ r }} />
        </Animated.View>
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: (r - strokeWidth) * 2,
            height: (r - strokeWidth) * 2,
            borderRadius: r - strokeWidth,
          }}
        />
      </View>
    </>
  );
};

export default CircularProgress;
