import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { set, useCode, Value } from "react-native-reanimated";
import { onGestureEvent, withSpring } from "react-native-redash";

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
  // x: Animated.Value<number>;
  // y: Animated.Value<number>;
  // offsetX: Animated.Value<number>;
  // offsetY: Animated.Value<number>;
  // snapPoints: Animated.Value<number>[];
  // onSnap: Animated.Value<number>;

  // velocityX: Animated.Value<number>;
}

const Swipeable = ({ translateX, translateY }: SwipeableProps) => {
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
    state: state,
    snapPoints: [0],
    config,
  });
  const y = withSpring({
    value: translationY,
    velocity: velocityY,
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
