import React, { useEffect, useContext } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Authlayout from '../mobile-mvp/navigation/Authlayout';
import MainLayout from '../mobile-mvp/navigation/Mainlayout';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { EventsProvider } from './context/Eventscontext';
import { MenuProvider } from './context/Menucontex';
import { ChoreProvider } from './context/ChoreContext';
import { MealProvider } from './context/MealContext';
import { BudgetProvider } from './context/BudgetContext';

const RootStack = createNativeStackNavigator();

const LightNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F9',
  },
};

const DarkNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#020617',
    card: '#020617',
    text: '#F8FAFC',
    border: '#1E293B',
  },
};

const AppNavigator = () => {
  const { theme, isDark } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={isDark ? DarkNavTheme : LightNavTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
        initialRouteName="Main"
      >
        <RootStack.Screen name="Auth" component={Authlayout} />
        <RootStack.Screen name="Main" component={MainLayout} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <EventsProvider>
        <BudgetProvider>
          <MenuProvider>
            <MealProvider>
              <ChoreProvider>
                <AppNavigator />
              </ChoreProvider>
            </MealProvider>
          </MenuProvider>
        </BudgetProvider>
      </EventsProvider>
    </ThemeProvider>
  );
};

export default App;
