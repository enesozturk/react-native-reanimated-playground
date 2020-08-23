import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface SelectionItemProps {
  isActive?: boolean;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const SelectionItem = ({ isActive, title, onPress }: SelectionItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[Styles.button]}>
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
  },
  buttonTextActive: {
    fontWeight: "bold",
    color: "#00c6ff",
  },
});
