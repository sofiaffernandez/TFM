import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';

const HabitHistoryScreen = ({ route }) => {
  const { habit } = route.params || {}; // Asegúrate de que este parámetro llegue
  const [history, setHistory] = useState([]);

  const habitName = habit ? habit.habitName : 'Hábito no definido';

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('habitHistory');
        if (storedHistory) {
          const parsedHistory = JSON.parse(storedHistory);
          const habitHistory = parsedHistory[habitName] || []; // Historial específico del hábito
          setHistory(habitHistory);
        }
      } catch (error) {
        console.error('Error cargando el historial del hábito:', error);
      }
    };
    fetchHistory();
  }, [habitName]);

  const renderItem = ({ item }) => (
      <View style={globalStyles.card}>
        <Text style={globalStyles.historyCardText}>{`Fecha: ${item.date} `}</Text>
        <Text style={globalStyles.historyCardDate}>{`Hora: ${item.time}`}</Text>
      </View>
    );

  return (
    <View style={globalStyles.container}
    contentContainerStyle={{ paddingBottom:20 }}>
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={globalStyles.emptyText}>No hay historial para este hábito.</Text>
      )}
    </View>
  );
}

export default HabitHistoryScreen;