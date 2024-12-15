
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../listScreen';
import ListDetailScreen from '../listDetailScreen';
import ConfScreen from '../confScreen';

const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ListDetailScreen" component={ListDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="confScreen" component={ConfScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default ListStack;
