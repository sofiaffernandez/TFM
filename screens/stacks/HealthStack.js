import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HealthScreen from '../healthScreen';
import SleepDetails from '../details/SleepDetails';
import MedicationDetails from '../details/medicationDetails';
import MealsDetails from '../details/MealsDetails';
import HealthDetails from '../details/HealthDetails';
import StepDetails from '../details/StepDetails';
import MedicationHistory from '../details/medicationHistory';
const Stack = createStackNavigator();

const HealthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HealthScreen" 
        component={HealthScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="StepDetails" 
        component={StepDetails} 
        options={{ title: 'Tus pasos' }}
      />
      <Stack.Screen 
        name="SleepDetails" 
        component={SleepDetails} 
        options={{ title: 'Tu sueño' }}
      />
      <Stack.Screen 
        name="MedicationDetails" 
        component={MedicationDetails} 
        options={{ title: 'Tu medicación' }}
      />
      <Stack.Screen 
        name="MealsDetails" 
        component={MealsDetails} 
        options={{ title: 'Tus comidas' }}
      />
      <Stack.Screen 
        name="HealthDetails" 
        component={HealthDetails} 
        options={{ title: 'Tu diario de salud' }}
      />
      <Stack.Screen 
        name="MedicationHistory" 
        component={MedicationHistory} 
        options={{ title: 'Historial de medicación' }}
      />
    </Stack.Navigator>
  );
};

export default HealthStack;
