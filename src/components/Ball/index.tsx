import React from "react";

import {
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  Animated,
} from "react-native";

interface BallProps {}
interface BallState {
  panResponder: PanResponderInstance;
  position: Animated.ValueXY;
}

class Ball extends React.Component<BallProps, BallState> {
  constructor(props: BallProps) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onPanResponderGrant: () => {
        position.setOffset({ x: position.x._value, y: position.y._value });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        {}
      ),
      onPanResponderRelease: () => {
        position.flattenOffset();
      },
    });
    this.state = { panResponder, position };
  }
  render() {
    const { position, panResponder } = this.state;
    return (
      <Animated.View
        style={[
          Styles.ball,
          {
            transform: position.getTranslateTransform(),
          },
        ]}
        {...panResponder.panHandlers}
      ></Animated.View>
    );
  }
}

const Styles = StyleSheet.create({
  ball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1fc3ff",
  },
});

export default Ball;
