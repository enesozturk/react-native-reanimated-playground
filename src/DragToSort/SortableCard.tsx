import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  block,
  Clock,
  cond,
  divide,
  eq,
  floor,
  max,
  multiply,
  set,
  useCode,
  Value,
  spring,
  startClock,
  stopClock,
  diff,
  lessThan,
  abs,
  not,
  greaterThan,
  round,
} from "react-native-reanimated";
import { panGestureHandler } from "react-native-redash";
import Card, {
  CardProps,
  cards,
  CARD_HEIGHT,
  CARD_WIDTH,
} from "../components/Card";
import StyleGuide from "../components/StyleGuide";

interface SortableCardProps extends CardProps {
  offsets: Animated.Value<number>[];
  index: number;
}

const withTransition = (
  value: Animated.Node<number>,
  velocity: Animated.Value<number>,
  gestureState: Animated.Value<State>
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    damping: 40,
    mass: 3,
    stiffness: 300,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
  };

  return block([
    startClock(clock),
    set(config.toValue, value),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.position, value), set(state.velocity, velocity)],
      [spring(clock, state, config)]
    ),
    state.position,
  ]);
};

export const withSafeOffset = ({
  offset,
  value,
  state,
}: {
  offset: Animated.Adaptable<number>;
  value: Animated.Value<number>;
  state: Animated.Value<State>;
}) => {
  const safeOffset = new Value(0);
  return cond(
    eq(state, State.ACTIVE),
    add(safeOffset, value),
    set(safeOffset, offset)
  );
};

const moving = (position: Animated.Node<number>) => {
  const delta = diff(position);
  const noMovementFrames = new Value(0);
  return cond(
    lessThan(abs(delta), 1e-3),
    [
      set(noMovementFrames, add(noMovementFrames, 1)),
      not(greaterThan(noMovementFrames, 20)),
    ],
    [set(noMovementFrames, 0), 1]
  );
};

const SortableCard = ({ card, index, offsets }: SortableCardProps) => {
  const { gestureHandler, translation, velocity, state } = panGestureHandler();

  const x = withSafeOffset({ offset: 0, value: translation.x, state });
  const y = withSafeOffset({
    offset: offsets[index],
    value: translation.y,
    state,
  });

  const currentIndex = round(divide(y, CARD_HEIGHT));
  const currentOffset = multiply(currentIndex, CARD_HEIGHT);

  useCode(
    () =>
      block(
        offsets.map((offset) =>
          cond(eq(offset, currentOffset), [
            set(offset, offsets[index]),
            set(offsets[index], currentOffset),
          ])
        )
      ),
    []
  );

  const translateX = withTransition(x, velocity.x, state);
  const translateY = withTransition(y, velocity.y, state);

  const zIndex = cond(
    eq(state, State.ACTIVE),
    200,
    cond(moving(translateY), 100, 1)
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: StyleGuide.dimensionWidth / 2 - CARD_WIDTH / 2,
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          justifyContent: "center",
          alignItems: "center",
          zIndex,
          transform: [{ translateX }, { translateY }],
        }}
      >
        <Card card={card} index={index + 1} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SortableCard;

const styles = StyleSheet.create({});
