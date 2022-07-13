import { useEffect } from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { useGame } from "../game/useGame";
import { Home } from "../game/screens/Home";
import { Play } from "../game/screens/Play";
import { Score } from "../game/screens/Score";

const RootStack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Play: undefined;
  Score: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type PlayScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Play"
>;
export type ScoreScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Score"
>;

export const RootNavigator = () => {
  const { hasStarted } = useGame();

  return (
    <RootStack.Navigator
      initialRouteName={!hasStarted ? "Home" : "Play"}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Play" component={Play} />
      <RootStack.Screen name="Score" component={Score} />
    </RootStack.Navigator>
  );
};
