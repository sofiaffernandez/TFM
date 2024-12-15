import React, { useState, useEffect } from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import { Pedometer as ExpoPedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles, { theme } from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const Pedometer = () => {
  const navigation = useNavigation();
  const [steps, setSteps] = useState(0);
  const [stepGoal, setStepGoal] = useState('6000');


  useEffect(() => {
    let stepCountSubscription;

    const loadStepGoal = async () => {
      try {
        const storedStepGoal = await AsyncStorage.getItem('stepGoal');
        if (storedStepGoal) {
          setStepGoal(storedStepGoal);
        }
      } catch (error) {
        console.error('Error loading step goal:', error);
      }
    };

    const startStepCounting = async () => {
      const isAvailable = await ExpoPedometer.isAvailableAsync();
      if (isAvailable) {
        stepCountSubscription = ExpoPedometer.watchStepCount((result) => {
          setSteps(result.steps);
        });
      } else {
        console.log("Pedometer is not available on this device.");
      }
    };

    loadStepGoal();
    startStepCounting();

    const unsubscribe = navigation.addListener('focus', loadStepGoal);

    return () => {
      if (stepCountSubscription) {
        stepCountSubscription.remove();
      }
      unsubscribe();
    };
  }, [navigation]);

  const stepsProgress = Math.min(steps / parseInt(stepGoal), 1);

    return (
       <TouchableOpacity style={globalStyles.card} onPress={() => navigation.navigate('StepDetails')}>
        <Text style={globalStyles.sectionTitle}>Movimiento</Text>
        <View style={globalStyles.progressBarContainer}>
          <View style={globalStyles.iconContainer}>
            <Icon name="walking" size={24} color={theme.colors.primary} style={globalStyles.iconStyle} /> 
          </View>
          <View style={globalStyles.progressBarWrapper}>
          <View
          style={[globalStyles.progressBar, { width: `${stepsProgress * 100}%` }]}/>
        </View>
        <Text style={globalStyles.progressText}>{steps}/{stepGoal}</Text>
        </View>
      </TouchableOpacity>
    );
};

export default Pedometer; 