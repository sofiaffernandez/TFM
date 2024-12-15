import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { theme } from '../../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Avatar from '../../components/avatar';

function HabitListScreen() {
  const navigation = useNavigation();
  const [habits, setHabits] = useState([]);
  const [isNewestFirst, setIsNewestFirst] = useState(true);

  const checkAndResetWeeklyHabits = async (currentHabits) => {
    const today = new Date();
    const lastResetDate = await AsyncStorage.getItem('lastHabitReset');
    
    if (!lastResetDate) {
      await AsyncStorage.setItem('lastHabitReset', today.toISOString());
      return currentHabits;
    }

    const lastReset = new Date(lastResetDate);
    const diffDays = Math.floor((today - lastReset) / (1000 * 60 * 60 * 24));

    if (diffDays >= 7) {
      // Guardar en el historial antes de resetear
      const habitHistory = await AsyncStorage.getItem('habitHistory') || '{}';
      const parsedHistory = JSON.parse(habitHistory);

      const weekEndDate = lastReset.toISOString().split('T')[0];
      currentHabits.forEach(habit => {
        if (!parsedHistory[habit.habitName]) {
          parsedHistory[habit.habitName] = [];
        }
        parsedHistory[habit.habitName].push({
          weekEnding: weekEndDate,
          completedDays: habit.daysCompleted,
          goal: habit.goal
        });
      });

      await AsyncStorage.setItem('habitHistory', JSON.stringify(parsedHistory));

      // Resetear los días completados
      const resetHabits = currentHabits.map(habit => ({
        ...habit,
        daysCompleted: []
      }));

      await AsyncStorage.setItem('lastHabitReset', today.toISOString());
      await AsyncStorage.setItem('habits', JSON.stringify(resetHabits));
      
      return resetHabits;
    }

    return currentHabits;
  };

  const sortHabits = (habitsToSort) => {
    return habitsToSort.sort((a, b) => {
      const comparison = new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return isNewestFirst ? comparison : -comparison;
    });
  };

  const toggleOrder = () => {
    setIsNewestFirst(!isNewestFirst);
    const sortedHabits = [...habits];
    sortHabits(sortedHabits);
    setHabits(sortedHabits);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        try {
          const storedHabits = await AsyncStorage.getItem('habits');
          if (storedHabits) {
            const parsedHabits = JSON.parse(storedHabits);
            // Primero verificamos el reset semanal
            const checkedHabits = await checkAndResetWeeklyHabits(parsedHabits);
            // Luego ordenamos los hábitos
            const sortedHabits = sortHabits(checkedHabits);
            setHabits(sortedHabits);
          }
        } catch (error) {
          console.error('Error fetching habits:', error);
        }
      };
      
      fetchHabits();
    }, [isNewestFirst])
  );

  const markAsCompleted = async (habit) => {
    const currentDate = new Date();
    
    // Usar fecha en formato YYYY-MM-DD (sin hora) para evitar problemas de zona horaria
    const formattedDate = currentDate.toLocaleDateString('en-CA'); // "en-CA" usa el formato YYYY-MM-DD
    const formattedTime = currentDate.toLocaleTimeString();  // Hora en formato HH:MM:SS

    const habitIndex = habits.findIndex(h => h.habitName === habit.habitName);

    if (habitIndex === -1) {
      Alert.alert('Error', 'Hábito no encontrado.');
      return;
    }

    const updatedHabits = [...habits];
    const updatedHabit = updatedHabits[habitIndex];

    // Si el día actual ya ha sido marcado, no hacer nada
    if (updatedHabit.daysCompleted.some(item => item.date === formattedDate)) {
      console.log(formattedDate);
      Alert.alert('¡Ya está marcado!', `El día ${formattedDate} ya ha sido marcado como realizado.`);
      return;
    }

    // Agregar la fecha y hora al array de días completados
    updatedHabit.daysCompleted.push({ date: formattedDate, time: formattedTime });

    // Guardar los hábitos actualizados en AsyncStorage
    await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));

    // Guardar el historial
    const habitHistory = await AsyncStorage.getItem('habitHistory');
    const parsedHistory = habitHistory ? JSON.parse(habitHistory) : {};
    if (!parsedHistory[habit.habitName]) {
      parsedHistory[habit.habitName] = [];
    }

    parsedHistory[habit.habitName].push({ date: formattedDate, time: formattedTime });

    // Guardar el historial actualizado en AsyncStorage
    await AsyncStorage.setItem('habitHistory', JSON.stringify(parsedHistory));

    // Actualizar el estado local para reflejar los cambios
    setHabits(updatedHabits);
  };

  // Calcular el progreso de un hábito basado en los días completados
  const calculateProgress = (habit) => {
    const totalDays = habit.goal;  // Goal es el número de veces que debe realizarse
    const completedDays = habit.daysCompleted.length;
    return completedDays / totalDays;
  };

  const renderItem = ({ item }) => {
    const progress = calculateProgress(item);

    return (
      <TouchableOpacity
        style={globalStyles.card}
        onPress={() => navigation.navigate('HabitHistoryScreen', { habit: item })}
      >
        <Text style={globalStyles.sectionTitle}>{item.habitName}</Text>
        <View style={globalStyles.progressBarContainer}>
          <View style={globalStyles.iconContainer}>
            <MaterialCommunityIcons name={item.icon || 'tasks'} size={20} color={theme.colors.primary} />
          </View>
          <View style={globalStyles.progressBarWrapper}>
            <View
              style={[
                globalStyles.progressBar,
                { 
                  width: `${progress * 100}%`,
                  backgroundColor: theme.colors.primary 
                }
              ]}
            />
          </View>
        </View>

        {/* Mostrar un solo botón de "check" */}
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: item.daysCompleted.length === item.goal ? theme.colors.primary : theme.colors.lightGray }]}
          onPress={() => markAsCompleted(item)}  // Marcar como completado
          disabled={item.daysCompleted.length === item.goal}  // Deshabilitar si ya se ha alcanzado la meta
        >
          <Text style={globalStyles.buttonText}>
            {item.daysCompleted.length === item.goal ? `Completado (${item.goal}/${item.goal})` : `Marcar como realizado`}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.container}>
       <Avatar navigation={navigation} />
        <Text style={globalStyles.title}>Lista de hábitos</Text>

        <TouchableOpacity onPress={toggleOrder} style={{ padding: 10 }}>
          <MaterialCommunityIcons 
            style={globalStyles.sortButton}
            name={isNewestFirst ? 'sort-descending' : 'sort-ascending'} 
            size={24} 
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('AddHabitScreen')}>
        <Text style={globalStyles.buttonText}>Añadir un nuevo hábito</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HabitListScreen;
