import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../calendarScreen';
import confScreen from '../confScreen';
import DayDetailScreen from '../dayDetailScreen';

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DayDetailScreen" component={DayDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="confScreen" component={confScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default CalendarStack;
