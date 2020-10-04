import Animated from "react-native-reanimated";

const {
  sub,
  multiply,
  add,
  cos,
  sin,
  pow,
  sqrt,
  proc,
  abs,
  cond,
  greaterOrEq,
  divide,
  lessThan,
} = Animated;

// https://en.wikipedia.org/wiki/Atan2
// https://www.gamedev.net/forums/topic/441464-manually-implementing-atan2-or-atan/
// https://developer.download.nvidia.com/cg/atan2.html
const atan2Proc = proc(
  (y: Animated.Adaptable<number>, x: Animated.Adaptable<number>) => {
    const coeff1 = Math.PI / 4;
    const coeff2 = 3 * coeff1;
    const absY = abs(y);
    const angle = cond(
      greaterOrEq(x, 0),
      [sub(coeff1, multiply(coeff1, divide(sub(x, absY), add(x, absY))))],
      [sub(coeff2, multiply(coeff1, divide(add(x, absY), sub(absY, x))))]
    );
    return cond(lessThan(y, 0), multiply(angle, -1), angle);
  }
);

export const atan2 = (
  y: Animated.Adaptable<number>,
  x: Animated.Adaptable<number>
): Animated.Node<number> => atan2Proc(y, x);

export const cubicBezier = (
  t: Animated.Adaptable<number>,
  p0: Animated.Adaptable<number>,
  p1: Animated.Adaptable<number>,
  p2: Animated.Adaptable<number>,
  p3: Animated.Adaptable<number>
): Animated.Node<number> => {
  const term = sub(1, t);
  const a = multiply(1, pow(term, 3), pow(t, 0), p0);
  const b = multiply(3, pow(term, 2), pow(t, 1), p1);
  const c = multiply(3, pow(term, 1), pow(t, 2), p2);
  const d = multiply(1, pow(term, 0), pow(t, 3), p3);
  return add(a, b, c, d);
};

export interface Point {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

export interface PolarPoint {
  theta: Animated.Adaptable<number>;
  radius: Animated.Adaptable<number>;
}

export const canvas2Cartesian = ({ x, y }: Point, center: Point) => {
  return {
    x: sub(x, center.x),
    y: multiply(sub(y, center.y), -1),
  };
};

export const cartesian2Canvas = ({ x, y }: Point, center: Point) => ({
  x: add(x, center.x),
  y: add(multiply(y, -1), center.y),
});

export const cartesian2Polar = ({ x, y }: Point) => {
  return {
    theta: atan2(y, x),
    radius: sqrt(add(pow(x, 2), pow(y, 2))),
  };
};

export const polar2Cartesian = ({ theta, radius }: PolarPoint) => ({
  x: multiply(radius, cos(theta)),
  y: multiply(radius, sin(theta)),
});

export const polar2Canvas = ({ theta, radius }: PolarPoint, center: Point) =>
  cartesian2Canvas(polar2Cartesian({ theta, radius }), center);

export const canvas2Polar = ({ x, y }: Point, center: Point) =>
  cartesian2Polar(canvas2Cartesian({ x, y }, center));
