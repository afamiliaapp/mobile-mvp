import React, { useEffect, useContext, useState, createContext } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

// Layouts
import Authlayout from './navigation/Authlayout';
import MainLayout from './navigation/Mainlayout';

// Contexts
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { EventsProvider } from './context/Eventscontext';
import { MenuProvider } from './context/Menucontex';
import { ChoreProvider } from './context/ChoreContext';
import { MealProvider } from './context/MealContext';
import { BudgetProvider } from './context/BudgetContext';

// 1. Simple Auth Context Setup
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({
    name: '...',
    image: null,
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const updateProfile = data => setProfile(prev => ({ ...prev, ...data }));

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, profile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const RootStack = createNativeStackNavigator();

// Themes
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
  const { isAuthenticated, login } = useContext(AuthContext);

  return (
    <NavigationContainer theme={isDark ? DarkNavTheme : LightNavTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        {isAuthenticated ? (
          // If logged in, only MainLayout is accessible
          <RootStack.Screen name="Main" component={MainLayout} />
        ) : (
          // If not logged in, only Authlayout is accessible
          <RootStack.Screen name="Auth">
            {props => <Authlayout {...props} onSignIn={login} />}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Hide splash screen on mount
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
