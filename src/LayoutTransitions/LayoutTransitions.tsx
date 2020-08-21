import React, { useState } from "react";
import { Dimensions, View, StyleSheet, ViewStyle } from "react-native";
import Card, { cards } from "../components/Card";
import SelectionButton from "../components/SelectionButton";

const DimensionWidth = Dimensions.get("screen").width;
const CARD_ASPECT_RATIO = 1324 / 863;
const CARD_ROW_WIDTH = (DimensionWidth - 64) / 3 - 4;
const CARD_WRAP_WIDTH = (DimensionWidth - 64) / 2 - 4;

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ViewStyle;
  };
}

const layouts: Layout[] = [
  {
    id: "column",
    name: "Column",
    layout: {
      container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        marginBottom: 16,
      },
    },
  },
  {
    id: "row",
    name: "Row",
    layout: {
      container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      child: {
        width: CARD_ROW_WIDTH,
        height: CARD_ROW_WIDTH / CARD_ASPECT_RATIO,
      },
    },
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: {
      container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      child: {
        flex: 0,
        width: CARD_WRAP_WIDTH,
        height: CARD_WRAP_WIDTH / CARD_ASPECT_RATIO,
        marginBottom: 8,
      },
    },
  },
];

export default () => {
  const [currentLayout, setCurrentLayout] = useState(layouts[0]);
  return (
    <View style={Styles.container}>
      <View style={[Styles.cardsContainer, currentLayout.layout.container]}>
        {cards.map((item) => {
          return (
            <Card
              key={item.id}
              card={item}
              style={{ ...currentLayout.layout.child }}
            />
          );
        })}
      </View>
      <View style={Styles.layoutButtonsContainer}>
        {layouts.map((item, i) => {
          return (
            <SelectionButton
              key={i}
              title={item.name}
              onPress={() => {
                setCurrentLayout(item);
              }}
              isActive={i == layouts.indexOf(currentLayout)}
            />
          );
        })}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  cardsContainer: {
    flex: 1,
    width: "100%",
    padding: 32,
  },
  layoutButtonsContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
