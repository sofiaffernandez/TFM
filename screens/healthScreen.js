import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyles, { theme } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../components/avatar';
import {FontAwesome5} from 'react-native-vector-icons';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import Pedometer from '../components/Pedometer';

const HealthScreen = () => {
  const navigation = useNavigation();
  const [steps, setSteps] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [medications, setMedications] = useState([]);
  const [medicationPending, setMedicationPending] = useState(false);
  const [stepGoalState, setStepGoalState] = useState('6000');
  const [sleepGoalState, setSleepGoalState] = useState('8');

  const loadData = async () => {
    try {
      const storedStepGoal = await AsyncStorage.getItem('stepGoal');
      setStepGoalState(storedStepGoal ? parseInt(storedStepGoal) : 6000);

      const storedSleepGoal = await AsyncStorage.getItem('sleepGoal') || '8';
      setSleepGoalState(parseInt(storedSleepGoal));

      const currentDate = new Date().toISOString().split('T')[0]; 

      const storedSteps = await AsyncStorage.getItem('steps') || '[]';
      const stepsRecord = JSON.parse(storedSteps);
      const todaySteps = stepsRecord.find(item => item.date === currentDate);
      if (todaySteps) {
        setSteps(todaySteps.steps); 
      }

      const storedSleep = await AsyncStorage.getItem('sleep') || '[]';
      const sleepRecord = JSON.parse(storedSleep);
      const todaySleep = sleepRecord.find(item => item.date === currentDate);
      if (todaySleep) {
        setSleep(todaySleep.sleep); 
      } else {
        setSleep(0); 
      }

      const storedMedications = await AsyncStorage.getItem('medicaciones') || '[]';
      const medications = JSON.parse(storedMedications);
      setMedications(medications);
      console.log(storedMedications)
      const todayMedication = medications.every(med => med.date === currentDate && med.taken);
      setMedicationPending(!todayMedication);


    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    }
  };

  const sleepProgress = Math.min(sleep / sleepGoalState, 1);

  useEffect(() => {
    loadData();

    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={globalStyles.container}
    contentContainerStyle={{ paddingBottom:20 }}>
      <Avatar navigation={navigation} />
      <Text style={globalStyles.title}>Salud</Text>

      <Pedometer style={globalStyles.card} onPress={() => navigation.navigate('StepDetails')}/>
   
    <TouchableOpacity style={globalStyles.card} onPress={() => navigation.navigate('SleepDetails')}>
      <Text style={globalStyles.sectionTitle}>Sueño</Text>
      <View style={globalStyles.progressBarContainer}>
        <View style={globalStyles.iconContainer}>
          <MaterialCommunityIcons name="sleep" size={20} color={theme.colors.primary} />
        </View>
        <View style={globalStyles.progressBarWrapper}>
          <View
            style={[globalStyles.progressBar, { width: `${sleepProgress * 100}%` }]}
          />
        </View>
        <Text style={globalStyles.progressText}>{sleep}/{sleepGoalState} horas</Text>
      </View>
    </TouchableOpacity>


      <TouchableOpacity 
        style={globalStyles.healthCard} 
        onPress={() => navigation.navigate('MedicationDetails', { checkMedicationStatus: loadData })}
      >
        <View style={globalStyles.healthCardIcon}>
          <FontAwesome5 name="pills" size={24} color={theme.colors.primary} />
        </View>
        <View style={globalStyles.healthCardContent}>
          <Text style={globalStyles.sectionTitle}>Medicación</Text>
          <Text style={[
            globalStyles.healthStatusText,
            medications.some(med => med.necesaria && !med.tomadaHoy) && globalStyles.pendingStatus
          ]}>
            {medications.length === 0
              ? 'Medicación pendiente'
              : medications.some(med => med.necesaria && !med.tomadaHoy)
              ? 'Medicación pendiente'
              : 'Todo tomado'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={globalStyles.healthCard} 
        onPress={() => navigation.navigate('MealsDetails')}
      >
        <View style={globalStyles.healthCardIcon}>
          <MaterialCommunityIcons 
            name="food-apple" 
            size={24} 
            color={theme.colors.primary} 
          />
        </View>
        <View style={globalStyles.healthCardContent}>
          <Text style={globalStyles.sectionTitle}>Comidas</Text>
          <Text style={globalStyles.healthStatusText}>
            Comidas pendientes
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={globalStyles.healthCard} 
        onPress={() => navigation.navigate('HealthDetails')}
      >
        <View style={globalStyles.healthCardIcon}>
          <MaterialCommunityIcons 
            name="account-heart-outline" 
            size={24} 
            color={theme.colors.primary} 
          />
        </View>
        <View style={globalStyles.healthCardContent}>
          <Text style={globalStyles.sectionTitle}>Salud</Text>
          <Text style={globalStyles.healthStatusText}>
            Estado pendiente
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={globalStyles.healthCard} 
        onPress={() => navigation.navigate('HabitListScreen')}
      >
        <View style={globalStyles.healthCardIcon}>
          <MaterialCommunityIcons 
            name="format-list-checks" 
            size={24} 
            color={theme.colors.primary} 
          />
        </View>
        <View style={globalStyles.healthCardContent}>
          <Text style={globalStyles.sectionTitle}>Habit Tracker</Text>
          <Text style={globalStyles.healthStatusText}>
            Hábitos pendientes
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HealthScreen;
