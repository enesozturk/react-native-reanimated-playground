import React from "react";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  block,
  cond,
  divide,
  eq,
  multiply,
  set,
  useCode,
  Value,
  diff,
  lessThan,
  abs,
  not,
  greaterThan,
  round,
  neq,
  and,
} from "react-native-reanimated";
import { panGestureHandler } from "react-native-redash";
import Card, { CardProps, CARD_HEIGHT, CARD_WIDTH } from "../components/Card";
import { withTransition } from "../components/AnimationHelpers";
import StyleGuide from "../components/StyleGuide";

interface SortableCardProps extends CardProps {
  offsets: Animated.Value<number>[];
  index: number;
}

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

  const x = withSafeOffset({
    offset: 0,
    value: translation.x,
    state,
  });
  const translateX = withTransition(x, velocity.x, state);

  const y = withSafeOffset({
    offset: offsets[index],
    value: translation.y,
    state,
  });
  const translateY = withTransition(y, velocity.y, state);

  const zIndex = cond(
    eq(state, State.ACTIVE),
    200,
    cond(moving(translateY), 100, 1)
  );

  const currentIndex = round(divide(y, CARD_HEIGHT));
  const currentOffset = multiply(currentIndex, CARD_HEIGHT);

  useCode(
    () =>
      block([
        ...offsets.map((offset) =>
          cond(
            and(
              eq(currentOffset, offset),
              neq(currentOffset, offsets[index]),
              eq(state, State.ACTIVE)
            ),
            [set(offset, offsets[index]), set(offsets[index], currentOffset)]
          )
        ),
      ]),
    [currentOffset, index, offsets, state]
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
