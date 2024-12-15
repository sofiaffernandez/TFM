import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './styles/styles';
import ListStack from './screens/stacks/ListStack';
import CalendarStack from './screens/stacks/CalendarStack';
import HealthStack from './screens/stacks/HealthStack';
import HomeStack from './screens/stacks/HomeStack';
import Tutorial from './screens/firstScreen'; 

const Tab = createBottomTabNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    'Gayathri': require('./assets/fonts/Gayathri-Regular.ttf'),
    'FiraSans': require('./assets/fonts/FiraSans-Regular.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      await loadFonts();
      setFontsLoaded(true);
      checkIfFirstLaunch();
    };
    loadResources();
  }, []);

  const checkIfFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.log(error);
      setIsFirstLaunch(false);
    }
  };

  const handleFinishTutorial = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error finishing tutorial:', error);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <Tutorial onFinish={handleFinishTutorial} />
      ) : (
        <>
          <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background}/>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Calendario') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Tus listas') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Salud') {
                  iconName = focused ? 'heart' : 'heart-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: 'black',
              tabBarShowLabel: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Calendario" component={CalendarStack} options={{ headerShown: false }} />
            <Tab.Screen name="Tus listas" component={ListStack} options={{ headerShown: false }} />
            <Tab.Screen name="Salud" component={HealthStack} options={{ headerShown: false }} />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
