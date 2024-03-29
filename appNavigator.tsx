import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  PlayBookScreen,
  SettingsScreen,
  SignInScreen,
} from "./src/screens";
import { hideHeader } from "./src/custom";

const AuthStacks = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <AuthStacks.Navigator screenOptions={hideHeader}>
      <AuthStacks.Screen name="SignIn" component={SignInScreen} />
    </AuthStacks.Navigator>
  );
};

const RootStacks = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <RootStacks.Navigator>
      <RootStacks.Screen
        options={hideHeader}
        name="Auth"
        component={AuthStack}
      />
      <RootStacks.Screen
        name="Home"
        component={HomeScreen}
        options={hideHeader}
      />
      <RootStacks.Screen
        name="PlayBook"
        component={PlayBookScreen}
        options={hideHeader}
      />
      <RootStacks.Screen
        name="Settings"
        component={SettingsScreen}
        options={hideHeader}
      />
    </RootStacks.Navigator>
  );
};

export default AppNavigator;
