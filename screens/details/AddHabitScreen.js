import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../components/avatar';

const AddHabitScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [icon, setIcon] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]); // Days selected by the user
  const navigation = useNavigation();

  const icons = [
    { name: 'walk', label: 'Ejercicio' },
    { name: 'battery-off-outline', label: 'Desconectar' },
    { name: 'book-open', label: 'Leer' },
    { name: 'asterisk', label: 'Otros' },
  ];

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Toggle function for selecting days of the week
  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(d => d !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  // Save habit function
  const saveHabit = async () => {
    console.log('Habit Name:', habitName);
    console.log('Icon:', icon);
    console.log('Selected Days:', selectedDays);

    // Validate input
    if (habitName.trim() && icon && selectedDays.length > 0) {
      const newHabit = {
        habitName,
        icon,
        progress: 0,
        goal: selectedDays.length,  
        selectedDays,               
        daysCompleted: [],          
        createdAt: new Date().toISOString(),
      };

      
      const storedHabits = await AsyncStorage.getItem('habits');
      const habits = storedHabits ? JSON.parse(storedHabits) : [];
      habits.push(newHabit);
      await AsyncStorage.setItem('habits', JSON.stringify(habits)); 

     
      navigation.navigate('HabitListScreen');
    } else {
      Alert.alert('Error', 'Por favor, introduce un nombre, selecciona un ícono y marca los días.');
    }
  };

  return (
    <ScrollView style={globalStyles.container}
    contentContainerStyle={{ paddingBottom:20 }}>
      <Avatar navigation={navigation} />
      <Text style={globalStyles.title}>Añadir un hábito</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nombre del hábito"
        value={habitName}
        onChangeText={setHabitName}
      />
      
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Selecciona un ícono:</Text>
        <View style={globalStyles.iconSelection}>
          {icons.map((iconItem) => (
            <TouchableOpacity key={iconItem.name} onPress={() => setIcon(iconItem.name)}>
              <MaterialCommunityIcons
                name={iconItem.name}
                size={40}
                color={icon === iconItem.name ? '#9AC9D8' : '#333'}
                style={globalStyles.icon}
              />
              <Text style={globalStyles.iconLabel}>{iconItem.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Selecciona los días de la semana:</Text>
        <View style={globalStyles.iconSelection}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                globalStyles.dayButton,
                selectedDays.includes(day) && { backgroundColor: '#9AC9D8' }
              ]}
              onPress={() => toggleDaySelection(day)}
            >
              <Text style={globalStyles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Save habit button */}
      <TouchableOpacity style={globalStyles.button} onPress={saveHabit}>
        <Text style={globalStyles.buttonText}>Guardar hábito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddHabitScreen;
