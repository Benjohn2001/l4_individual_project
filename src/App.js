import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLOURS from './app/assets/colours';
import SignInScreen from './app/screens/SignInScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import MeScreen from './app/screens/MeScreen';
import FriendsScreen from './app/screens/FriendsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import GroupScreen from './app/screens/GroupScreen';
import GroupSettingsScreen from './app/screens/GroupSettingsScreen';
import ClockCustomiseScreen from './app/screens/ClockCustomiseScreen';
import CreateNewGroupScreen from './app/screens/CreateNewGroupScreen';
import UserProfileScreen from './app/screens/UserProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs  (){
    return(
      <Tab.Navigator
          screenOptions={{
              tabBarActiveTintColor: COLOURS.darkerPurple,
              tabBarInactiveTintColor: 'gray'
          }}
      >
          <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                  tabBarLabel: 'Home',
                  headerShown: false,
                  tabBarIcon: ({ color }) => (
                  <Feather name="home" color={color} size={25} />
              ),
              }}
          />
          <Tab.Screen
              name="Friends"
              component={FriendsScreen}
              options={{
                  tabBarLabel: 'Friends',
                  headerShown: false,
                  tabBarIcon: ({ color }) => (
                  <Feather name="users" color={color} size={25} />
                  ),
              }}
          />
          <Tab.Screen
              name="Me"
              component={MeScreen}
              options={{
                  tabBarLabel: 'Me',
                  headerShown: false,
                  tabBarIcon: ({ color }) => (
                  <Feather name="user" color={color} size={25} />
                  ),
                  }}
          />
          <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                  tabBarLabel: 'Settings',
                  headerShown: false,
                  tabBarIcon: ({ color }) => (
                  <Feather name="settings" color={color} size={25} />
                  ),

              }}
          />
      </Tab.Navigator>
    );

}


function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeScreen"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GroupScreen"
          component={GroupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GroupSettingsScreen"
          component={GroupSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ClockCustomiseScreen"
          component={ClockCustomiseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CreateNewGroupScreen"
          component={CreateNewGroupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App
