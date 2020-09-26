import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  block,
  cond,
  divide,
  eq,
  floor,
  max,
  multiply,
  set,
  useCode,
  Value,
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

const withSafeOffset = (
  value: Animated.Value<number>,
  state: Animated.Value<State>,
  offset: Animated.Adaptable<number>
) => {
  const safeOffset = new Value(0);
  return cond(
    eq(state, State.ACTIVE),
    add(safeOffset, value),
    set(safeOffset, offset)
  );
};

const SortableCard = ({ card, index, offsets }: SortableCardProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    position,
    state,
  } = panGestureHandler();
  const zIndex = cond(eq(state, State.ACTIVE), 100, 1);
  const x = withSafeOffset(translation.x, state, 0);
  const y = withSafeOffset(translation.y, state, offsets[index]);
  const currentOffset = multiply(
    max(floor(divide(y, CARD_HEIGHT)), 0),
    CARD_HEIGHT
  );

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

  const translateX = x;
  const translateY = y;
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
