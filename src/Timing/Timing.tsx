import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Clock,
  clockRunning,
  set,
  startClock,
  stopClock,
  useCode,
  Value,
  cond,
  and,
  not,
  Easing,
  block,
  timing,
  eq,
} from "react-native-reanimated";
import { useClock, useValue } from "react-native-redash";
import Button from "../components/Button";
import ChatActivityIndicator from "../components/ChatActivityIndicator";

const DeviceWidth = Dimensions.get("screen").width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DeviceWidth,
  },
});

const runTiming = (clock: Animated.Clock): Animated.Node<number> => {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.linear,
  };
  return block([
    cond(
      not(clockRunning(clock)),
      set(state.time, 0),
      timing(clock, state, config)
    ),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1)),
    ]),
    state.position,
  ]);
};

export default () => {
  const [play, setPlay] = useState<boolean>(false);
  const clock = useClock();
  const progress = useValue(0);
  const isPlaying = useValue(0);
  useCode(() => [set(isPlaying, play ? 1 : 0)], [play]);
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
      cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
      set(progress, runTiming(clock)),
    ],
    []
  );
  return (
    <>
      <View style={Styles.container}>
        <ChatActivityIndicator progress={progress} />
      </View>
      <Button
        title={play ? "Pause" : "Play"}
        onPress={() => {
          setPlay((prev) => !prev);
        }}
      />
    </>
  );
};
