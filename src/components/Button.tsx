import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title?: string;
  onPress: any;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={Styles.toggleButton}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={Styles.togglebuttonText}>{title ? title : "Toggle"}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const Styles = StyleSheet.create({
  toggleButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 32,
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, .2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  togglebuttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0072ff",
    textAlign: "center",
  },
});
