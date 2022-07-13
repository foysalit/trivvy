import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./features/shared/navigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
