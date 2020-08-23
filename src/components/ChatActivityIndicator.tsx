import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import StyleGuide from "./StyleGuide";
import { LinearGradient } from "expo-linear-gradient";

const DeviceWidth = Dimensions.get("screen").width;
const ChatBubbleSize = DeviceWidth * 0.8;
const { width: wWidth } = Dimensions.get("screen");
const width = wWidth * 0.8;

const { interpolate, Extrapolate } = Animated;

const size = 32;
const Styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: ChatBubbleSize,
    height: ChatBubbleSize,
    backgroundColor: "white",
    borderTopLeftRadius: ChatBubbleSize / 2,
    borderTopRightRadius: ChatBubbleSize / 2,
    borderBottomLeftRadius: ChatBubbleSize / 2,
    shadowColor: "rgba(0, 0, 0, .3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 10,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: ChatBubbleSize / 2,
    borderTopRightRadius: ChatBubbleSize / 2,
    borderBottomLeftRadius: ChatBubbleSize / 2,
  },
  bubble: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "white",
  },
});

interface ChatActivityIndicatorProps {
  progress: Animated.Value<number>;
}

const ChatActivityIndicator = ({ progress }: ChatActivityIndicatorProps) => {
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;
  return (
    <View style={Styles.root}>
      <View style={Styles.container}>
        <View style={Styles.wrapper}>
          <LinearGradient
            colors={["#00c6ff", "#0072ff"]}
            style={{
              ...StyleSheet.absoluteFillObject,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {bubbles.map((i) => {
              const start = i * delta;
              const end = start + delta;
              const opacity = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [0.5, 1],
                extrapolate: Extrapolate.CLAMP,
              });
              const scale = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [1, 1.5],
                extrapolate: Extrapolate.CLAMP,
              });
              return (
                <Animated.View
                  key={i}
                  style={[Styles.bubble, { opacity, transform: [{ scale }] }]}
                />
              );
            })}
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default ChatActivityIndicator;
