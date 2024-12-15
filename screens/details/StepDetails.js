import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';
import { theme } from '../../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/es';

const StepDetails = () => {
  const [stepsHistory, setStepsHistory] = useState([]);
  const [stepGoal, setStepGoal] = useState('6000');

  useEffect(() => {
    loadStepsHistory();
  }, []);

  const loadStepsHistory = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const stepKeys = allKeys.filter(key => key.startsWith('steps_'));
      const stepsData = await AsyncStorage.multiGet(stepKeys);
      
      const historyData = stepsData.map(([key, value]) => ({
        date: key.replace('steps_', ''),
        steps: parseInt(value) || 0,
      }));

      historyData.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
      setStepsHistory(historyData);
    } catch (error) {
      console.error('Error cargando historial de pasos:', error);
    }
  };

  const renderHistoryItem = ({ item }) => {
    const stepsProgress = Math.min((item.steps / stepGoal), 1);

    return (
      <View style={globalStyles.card}>
        <Text style={globalStyles.saludText}>
          {moment(item.date).format('dddd, D [de] MMMM')}
        </Text>
        <View style={globalStyles.progressBarContainer}>
          <View style={globalStyles.iconContainer}>
            <Icon 
              name="walking" 
              size={24} 
              color={theme.colors.primary} 
              style={globalStyles.iconStyle} 
            /> 
          </View>
          <View style={globalStyles.progressBarWrapper}>
            <View
              style={[
                globalStyles.progressBar, 
                { width: `${stepsProgress * 100}%` }
              ]}
            />
          </View>
          <Text style={globalStyles.progressText}>
            {item.steps.toLocaleString()}/{stepGoal.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.historyScreenContainer}>
      <Text style={globalStyles.historyTitle}>Historial de Pasos</Text>
      <FlatList
        data={stepsHistory}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.date}
        ListEmptyComponent={
          <Text style={globalStyles.historyEmptyText}>
            No hay registros de pasos
          </Text>
        }
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingHorizontal: 16,
          paddingBottom: 20 
        }}
      />
    </SafeAreaView>
  );
};

export default StepDetails; 