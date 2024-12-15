import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import confScreen from '../confScreen';
import DayDetailScreen from '../dayDetailScreen';
import HomeScreen from '../homeScreen';
import HabitListScreen from '../details/habitsListScreen';
import HabitHistoryScreen from '../details/HabitHistoryScreen';
import AddHabitScreen from '../details/AddHabitScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DayDetailScreen" component={DayDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="confScreen" component={confScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HabitListScreen" component={HabitListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddHabitScreen" component={AddHabitScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HabitHistoryScreen" component={HabitHistoryScreen} options={({ route }) => ({ headerShown: true, title: `Historial de ${route.params?.habitName || 'Hábito'}`})} />


    </Stack.Navigator>
  );
};

export default HomeStack;