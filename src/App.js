import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { COLOURS } from './app/assets/colours';
import { Feather } from '@expo/vector-icons';
import SignInScreen from './app/screens/SignInScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
