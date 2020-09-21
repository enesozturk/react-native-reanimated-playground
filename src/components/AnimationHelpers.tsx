import Animated, { Easing } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { min } from "react-native-redash";

const {
  Clock,
  Value,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  timing: reTiming,
  spring: reSpring,
  stopClock,
  add,
  multiply,
  call,
  and,
  eq,
  abs,
  sub,
  neq,
  set,
  defined,
} = Animated;

interface PrivateSpringConfig extends Animated.SpringConfig {
  toValue: Animated.Value<number>;
}

type SpringConfig = Omit<Animated.SpringConfig, "toValue">;

export interface WithSpringParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  snapPoints: Animated.Adaptable<number>[];
  offset?: Animated.Value<number>;
  config?: SpringConfig;
  onSnap?: (value: readonly number[]) => void;
}

export const snapPoint = (
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  points: Animated.Adaptable<number>[]
) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Animated.Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map((p) => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce(
    (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
    new Value()
  );
};

export const withSpring = (props: WithSpringParams) => {
  const {
    value,
    velocity,
    state,
    snapPoints,
    offset,
    config: springConfig,
    onSnap,
  } = {
    offset: new Value(0),
    ...props,
  };
  const clock = new Clock();
  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config: PrivateSpringConfig = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig,
  };

  const gestureAndAnimationIsOver = new Value(1);
  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [
    set(offset, springState.position),
    stopClock(clock),
    set(gestureAndAnimationIsOver, 1),
  ];
  const snap = onSnap
    ? [cond(clockRunning(clock), call([springState.position], onSnap))]
    : [];
  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(gestureAndAnimationIsOver, set(springState.position, offset)),
    cond(neq(state, State.END), [
      set(gestureAndAnimationIsOver, 0),
      set(springState.finished, 0),
      set(springState.position, add(offset, value)),
    ]),
    cond(and(eq(state, State.END), not(gestureAndAnimationIsOver)), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(
          config.toValue,
          snapPoint(springState.position, velocity, snapPoints)
        ),
        startClock(clock),
      ]),
      reSpring(clock, springState, config),
      cond(springState.finished, [...snap, ...finishSpring]),
    ]),
    springState.position,
  ]);
};
