import * as React from "react";
import { View, Button, Text, Animated, ScrollView, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Rings from "./components/Rings";
import { useState } from "react";

function Home({ navigation }) {
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);

  const macroData = [
    { value: 50, color: "#e9c46a" }, // Protein
    { value: 30, color: "#f4a261" }, // Carbs
    { value: 26, color: "#e76f51" }, // Fat
  ];

  const calorieData = [
    { value: 2000, color: "#2A9D8F" }, // Calories so far
    { value: 500, color: "#264653" }, // Remainder
  ];

  function onLayoutHandler({ nativeEvent }) {
    setParentHeight(nativeEvent.layout.height);
    setParentWidth(nativeEvent.layout.width);
  }

  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%", padding: 20, gap: 20, backgroundColor: "#264653" }}>
      <View
        style={{ height: "30%", justifyContent: "center", alignItems: "center", padding: "20px" }}
        onLayout={onLayoutHandler}
      >
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Rings
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            macroData={macroData}
            calorieData={calorieData}
          />
        </Pressable>
      </View>

      <View style={{ minHeight: "60%", backgroundColor: "#489fb5" }}>
      </View>
    </ScrollView>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
