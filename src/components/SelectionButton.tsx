import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface SelectionButtonProps {
  isActive?: boolean;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const SelectionButton = ({
  isActive,
  title,
  onPress,
}: SelectionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[Styles.selectionButton]}>
      <Text
        style={[
          Styles.selectionButtonText,
          isActive ? { ...Styles.selectionButtonTextActive } : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectionButton;

const Styles = StyleSheet.create({
  selectionButton: {
    width: "100%",
    padding: 16,
    borderBottomColor: "#e2e2e2",
    borderBottomWidth: 1,
  },
  selectionButtonText: {
    color: "gray",
  },
  selectionButtonTextActive: {
    fontWeight: "bold",
    color: "#00c6ff",
  },
});
