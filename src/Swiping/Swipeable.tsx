import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { set, useCode, Value } from "react-native-reanimated";
import { onGestureEvent } from "react-native-redash";
import { withSpring } from "../components/AnimationHelpers";

const config = {
  damping: 40,
  mass: 1,
  stiffness: 300,
  overshootClamping: false,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 1,
};

interface SwipeableProps {
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
  offsetX?: Animated.Value<number>;
  offsetY?: Animated.Value<number>;
  snapPoints: number[];
  onSnap?: (value: readonly number[]) => void;
}

const Swipeable = ({
  translateX,
  translateY,
  offsetX,
  offsetY,
  snapPoints,
  onSnap,
}: SwipeableProps) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    state,
  });

  const x = withSpring({
    value: translationX,
    velocity: velocityX,
    offset: offsetX,
    state,
    snapPoints,
    onSnap,
    config,
  });
  const y = withSpring({
    value: translationY,
    velocity: velocityY,
    offset: offsetY || new Value(0),
    state,
    snapPoints: [0],
    config,
  });

  useCode(() => [set(translateX, x), set(translateY, y)], []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[StyleSheet.absoluteFill]} />
    </PanGestureHandler>
  );
};

export default Swipeable;
