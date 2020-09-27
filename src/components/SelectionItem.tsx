import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import StyleGuide from "./StyleGuide";

interface SelectionItemProps {
  isActive?: boolean;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const SelectionItemHeight =
  StyleGuide.typography.body.lineHeight + 16 * 2;

const SelectionItem = ({ isActive, title, onPress }: SelectionItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={Styles.button}>
      <Text
        style={[
          Styles.buttonText,
          isActive ? { ...Styles.buttonTextActive } : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectionItem;

const Styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    borderBottomColor: "#e2e2e2",
    borderBottomWidth: 1,
  },
  buttonText: {
    color: "gray",
    ...StyleGuide.typography.body,
  },
  buttonTextActive: {
    fontWeight: "bold",
    color: "#00c6ff",
  },
});
