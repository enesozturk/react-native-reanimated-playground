import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import Animated, {
  useCode,
  cond,
  add,
  interpolate,
  startClock,
  set,
  not,
  eq,
  Value,
  Extrapolate,
  Clock,
} from "react-native-reanimated";

import Card from "./components/Card";
import CardToggleButton from "./components/CardToggleButton";

const ToggleOpacity = () => {
  const startAnimation = new Value(0);
  const clock = new Clock();
  const duration = 1000;

  const startTime = new Value(0);
  const endTime = add(startTime, duration);

  const from = new Value(1);
  const to = new Value(0);

  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () => [
      cond(eq(startAnimation, 1), [
        startClock(clock),
        set(from, opacity),
        set(to, not(to)),
        set(startTime, clock),
        set(startAnimation, 0),
      ]),
    ],
    [clock, from, startAnimation, startTime, to]
  );

  return (
    <View>
      <Animated.View style={{ opacity }}>
        <Card />
      </Animated.View>
      <CardToggleButton
        onPress={() => {
          startAnimation.setValue(1);
        }}
      />
    </View>
  );
};

export default ToggleOpacity;
