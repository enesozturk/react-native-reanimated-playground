import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Animated, { Value } from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";

// import { useMemoOne } from "use-memo-one";
import { RectButton } from "react-native-gesture-handler";
import Card, { Profile } from "./Profile";
import StyleGuide from "../components/StyleGuide";
import Swipeable from "./Swipeable";
// import Swipeable from "./Swipeable";

// const { width, height } = Dimensions.get("window");
// const deltaX = width / 2;
// const α = Math.PI / 12;
// const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
// const snapPoints = [-A, 0, A];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "space-evenly",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    marginHorizontal: 16,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

interface ProfilesProps {
  profiles: Profile[];
}

const Profiles = ({ profiles }: ProfilesProps) => {
  const [index, setIndex] = useState(0);
  const profile = profiles[index];
  const translateX = new Value(0);
  const translateY = new Value(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View>
      <View style={styles.cards}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ translateX }, { translateY }],
          }}
        >
          <Card {...{ profile }} />
        </Animated.View>
        <Swipeable {...{ translateX, translateY }} />
      </View>
      <View style={styles.footer}>
        <RectButton
          style={styles.circle}
          onPress={() => setIndex((index + 1) % profiles.length)}
        >
          <Icon name="x" size={32} color="#ec5288" />
        </RectButton>
        <RectButton
          style={styles.circle}
          onPress={() => setIndex((index + 1) % profiles.length)}
        >
          <Icon name="heart" size={32} color="#6ee3b4" />
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Profiles;
