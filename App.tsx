import React from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import ToggleOpacity from "./src/ToggleOpacity";
import LayoutTransitions from "./src/LayoutTransitions";
import UseTransitions from "./src/UseTransitions";
import Timing from "./src/Timing";
import PanGesture from "./src/PanGesture/PanGesture";
import Spring from "./src/Spring/Spring";
import Swipe from "./src/Swiping";
import DragToSort from "./src/DragToSort";
import Svg from "./src/Svg";
import Trigonometry from "./src/Trigonometry";
import CircularProgress from "./src/CircularSlider";

import { createDrawerNavigator } from "@react-navigation/drawer";
import StyleGuide from "./src/components/StyleGuide";

function CircularProgressScreen() {
  return <CircularProgress />;
}

function TrigonometryScreen() {
  return <Trigonometry />;
}

function SvgScreen() {
  return <Svg />;
}

function DragToSortScreen() {
  return <DragToSort />;
}

function SwipeScreen() {
  return <Swipe />;
}

function SpringScreen() {
  return <Spring />;
}

function PanGestureScreen() {
  return <PanGesture />;
}

function TimingScreen() {
  return <Timing />;
}

function UseTransitionsScreen() {
  return <UseTransitions />;
}

function LayoutTransitionsScreen() {
  return <LayoutTransitions />;
}

function ToggleOpacityScreen() {
  return <ToggleOpacity />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CicularProgress">
        <Drawer.Screen
          name="CicularProgress"
          component={CircularProgressScreen}
        />
        <Drawer.Screen name="Trigonometry" component={TrigonometryScreen} />
        <Drawer.Screen name="SVG" component={SvgScreen} />
        <Drawer.Screen name="Drag To Sort" component={DragToSortScreen} />
        <Drawer.Screen name="Swipe" component={SwipeScreen} />
        <Drawer.Screen name="Spring" component={SpringScreen} />
        <Drawer.Screen name="PanGesture" component={PanGestureScreen} />
        <Drawer.Screen name="Timing" component={TimingScreen} />
        <Drawer.Screen
          name="Use Transitions"
          component={UseTransitionsScreen}
        />
        <Drawer.Screen
          name="Layout Transitions"
          component={LayoutTransitionsScreen}
        />
        <Drawer.Screen name="Toggle Opacity" component={ToggleOpacityScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
