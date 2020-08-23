import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Card, { cards } from "../Card";
import Animated, {
  divide,
  multiply,
  not,
  interpolate,
  concat,
} from "react-native-reanimated";
import Button from "../Button";

import { useTransition } from "react-native-redash";

const DeviceWidth = Dimensions.get("screen").width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DeviceWidth,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, .2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
});

const transformOrigin = -1 * (DeviceWidth / 2);

export default () => {
  // In reanimated there is not really Boolean values, we should use 0 or 1
  const [toggled, setToggled] = useState<0 | 1>(0);
  const transition = useTransition(toggled, {
    duration: 300,
  });
  return (
    <>
      <View style={Styles.container}>
        {cards.map((card, index) => {
          const direction = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1],
          });

          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6],
            })
          );
          return (
            <Animated.View
              key={index}
              style={[
                Styles.overlay,
                {
                  transform: [
                    { translateX: transformOrigin },
                    { rotate },
                    { translateX: -transformOrigin },
                  ],
                },
              ]}
            >
              <Card card={card} />
            </Animated.View>
          );
        })}
      </View>
      <Button
        title={toggled ? "Reset" : "Toggle"}
        onPress={() => setToggled(toggled ^ 1)}
      />
    </>
  );
};
