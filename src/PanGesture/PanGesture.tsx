import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Value } from "react-native-reanimated";
import {
  clamp,
  diffClamp,
  onGestureEvent,
  withOffset,
} from "react-native-redash";
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

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const offsetX = new Value((DeviceWidth - CARD_WIDTH) / 2);
  const offsetY = new Value((DeviceHeight - CARD_HEIGHT) / 2);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
  });
  const translateX = diffClamp(
    withOffset(translationX, state, offsetX),
    0,
    DeviceWidth - CARD_WIDTH
  );
  const translateY = diffClamp(
    withOffset(translationY, state, offsetY),
    0,
    DeviceHeight - CARD_HEIGHT
  );
  return (
    <View style={Styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX: translateX }, { translateY: translateY }],
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
