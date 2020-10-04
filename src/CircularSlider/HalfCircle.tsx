import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

interface HalfCircleProps {
  color: Animated.Node<number> | string;
  r: number;
}

const HalfCircle = ({ color, r }: HalfCircleProps) => {
  return (
    <View
      style={{
        width: r * 2,
        height: r,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          backgroundColor: color,
          width: r * 2,
          height: r * 2,
          borderRadius: r,
        }}
      />
    </View>
  );
};

export default HalfCircle;
