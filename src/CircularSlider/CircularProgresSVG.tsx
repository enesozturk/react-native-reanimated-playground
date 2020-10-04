import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

// const { PI } = Math;

interface CircularProgressProps {
  theta: number;
  r: number;
  bg: string;
  fg: string;
  strokeWidth: number;
}

const CircularProgress = ({ r, bg, strokeWidth }: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={bg}
        r={radius}
        {...{ strokeWidth }}
      />
    </Svg>
  );
};

export default CircularProgress;
