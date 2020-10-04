import React from "react";
import { View, StyleSheet } from "react-native";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Value } from "react-native-reanimated";
import { diffClamp, onGestureEvent } from "react-native-redash";
import { withOffset } from "../components/AnimationHelpers";
import Card, { CARD_HEIGHT, CARD_WIDTH } from "../components/Card";
import StyleGuide from "../components/StyleGuide";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: StyleGuide.dimensionWidth,
  },
});

const card = { id: 0, colors: ["#00c6ff", "#0072ff"] };

const offsetX = new Value((StyleGuide.dimensionWidth - CARD_WIDTH) / 2);
const offsetY = new Value((StyleGuide.dimensionHeight - CARD_HEIGHT) / 2);

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

  const translateX = diffClamp(
    withOffset({
      offset: offsetX,
      value: translationX,
      state,
    }),
    0,
    StyleGuide.dimensionWidth - CARD_WIDTH
  );
  const translateY = diffClamp(
    withOffset({
      offset: offsetY,
      value: translationY,
      state,
    }),
    0,
    StyleGuide.dimensionHeight - CARD_HEIGHT
  );

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
