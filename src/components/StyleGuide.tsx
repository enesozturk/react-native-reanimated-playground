import { Dimensions } from "react-native";

const StyleGuide = {
  spacing: 8,
  dimensionWidth: Dimensions.get("screen").width,
  dimensionHeight: Dimensions.get("screen").height,
  palette: {
    primary: "#0072ff",
    secondary: "#FF6584",
    tertiary: "#38ffb3",
    backgroundPrimary: "#d5e5ff", // === rgba(primary, 0.1)
    background: "#f2f2f2",
    border: "#f2f2f2",
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      color: "#999999",
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
    },
  },
  pageContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default StyleGuide;
