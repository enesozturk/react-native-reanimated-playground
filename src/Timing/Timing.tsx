import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Clock, Value } from "react-native-reanimated";
import Button from "../components/Button";
import ChatActivityIndicator from "../components/ChatActivityIndicator";

const DeviceWidth = Dimensions.get("screen").width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DeviceWidth,
  },
});

export default () => {
  const progress = new Value(0);
  return (
    <>
      <View style={Styles.container}>
        <ChatActivityIndicator progress={progress} />
      </View>
      <Button
        title="Start"
        onPress={() => {
          return false;
        }}
      />
    </>
  );
};
