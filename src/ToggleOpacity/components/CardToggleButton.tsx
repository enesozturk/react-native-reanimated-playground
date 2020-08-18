import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CardToggleButtonProps {
  onPress: any;
}

const CardToggleButton = ({ onPress }: CardToggleButtonProps) => {
  return (
    <TouchableOpacity
      style={Styles.toggleButton}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={Styles.togglebuttonText}>Toggle</Text>
    </TouchableOpacity>
  );
};

export default CardToggleButton;

const Styles = StyleSheet.create({
  toggleButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7474BF",
    backgroundColor: "white",
  },
  togglebuttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7474BF",
    textAlign: "center",
  },
});
