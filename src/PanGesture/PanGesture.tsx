import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  cond,
  and,
  set,
  eq,
  not,
  add,
  Clock,
  block,
  clockRunning,
  startClock,
  decay,
  neq,
  stopClock,
} from "react-native-reanimated";
import { diffClamp, onGestureEvent, withDecay } from "react-native-redash";
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

const offsetX = new Value((DeviceWidth - CARD_WIDTH) / 2);
const offsetY = new Value((DeviceHeight - CARD_HEIGHT) / 2);

interface WithDecayProps {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
}

// const withDecay = (config: WithDecayProps) => {
//   const { value, velocity, state, offset, deceleration } = {
//     offset: new Value(0),
//     deceleration: 0.998,
//     ...config,
//   };
//   const clock = new Clock();
//   const decayState = {
//     finished: new Value(0),
//     velocity: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//   };
//   const isDecayInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
//   const finishDecay = [set(offset, decayState.position), stopClock(clock)];

//   return block([
//     cond(isDecayInterrupted, finishDecay),
//     cond(neq(state, State.END), [
//       set(decayState.finished, 0),
//       set(decayState.position, add(offset, value)),
//     ]),
//     cond(eq(state, State.END), [
//       cond(and(not(clockRunning(clock)), not(decayState.finished)), [
//         set(decayState.velocity, velocity),
//         set(decayState.time, 0),
//         startClock(clock),
//       ]),
//       decay(clock, decayState, { deceleration }),
//       cond(decayState.finished, finishDecay),
//     ]),
//     decayState.position,
//   ]);
// };

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
    withDecay({
      value: translationX,
      velocity: velocityX,
      state,
      offset: offsetX,
    }),
    0,
    DeviceWidth - CARD_WIDTH
  );
  const translateY = diffClamp(
    withDecay({
      value: translationY,
      velocity: velocityY,
      state,
      offset: offsetY,
    }),
    0,
    DeviceHeight - CARD_HEIGHT
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
