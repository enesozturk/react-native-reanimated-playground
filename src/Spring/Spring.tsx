import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Value } from "react-native-reanimated";
import { onGestureEvent, withSpring } from "react-native-redash";
import Card, { CARD_HEIGHT, CARD_WIDTH } from "../components/Card";

const DeviceWidth = Dimensions.get("screen").width;
const DeviceHeight = Dimensions.get("screen").height;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DeviceWidth,
  },
});

const card = { id: 0, colors: ["#00c6ff", "#0072ff"] };

const snapX = (DeviceWidth - CARD_WIDTH) / 2;
const snapY = (DeviceHeight - CARD_HEIGHT) / 2;

const offsetX = new Value(snapX);
const offsetY = new Value(snapY);

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    offset: offsetX,
    snapPoints: [snapX],
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    offset: offsetY,
    snapPoints: [snapY],
  });

  return (
    <View style={Styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }],
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
