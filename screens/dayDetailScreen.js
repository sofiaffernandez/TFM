import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../styles/styles';
import moods from '../utils/moods';
import categories from '../utils/categories';
import { theme } from '../styles/styles';
import Avatar from '../components/avatar';

const DayDetailScreen = ({ route, navigation }) => {
  const { selectedDay, loadDiaryData } = route.params || {};
  
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  if (!selectedDay) {
    console.error("selectedDay no está definido");
  }

  const [mood, setMood] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    const loadDayData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('diaryData');
        const diaryData = storedData ? JSON.parse(storedData) : {};
        const dayData = diaryData[selectedDay] || {};

        setMood(dayData.mood || "");
        setNote(dayData.note || "");
        setGratitude(dayData.gratitude || "");
        setSelectedActivities(dayData.activities || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadDayData();
  }, [selectedDay]);

  const toggleActivity = (activity) => {
    setSelectedActivities(prevActivities =>
      prevActivities.includes(activity)
        ? prevActivities.filter(a => a !== activity)
        : [...prevActivities, activity]
    );
  };

  const handleMoodSelect = (moodLabel) => {
    setSelectedMood(moodLabel);  
    setMood(moodLabel);          
  };

  const handleSave = async () => {
    if (!mood) {
      Alert.alert("Error", "Por favor selecciona un mood para guardar los datos.");
      return;
    }

    try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      
      const selectedDate = new Date(formattedDate);
      const formattedISODate = selectedDate.toISOString().split('T')[0];  // YYYY-MM-DD

      const storedData = await AsyncStorage.getItem('diaryData');
      let diaryData = storedData ? JSON.parse(storedData) : [];

      if (!Array.isArray(diaryData)) {
        diaryData = [];  // Si no es un array, reiniciar a un array vacío
      }

      const existingDataIndex = diaryData.findIndex(item => item.date === formattedISODate);
      const dayData = { date: formattedISODate, mood, note, gratitude, activities: selectedActivities };

      if (existingDataIndex !== -1) {
        diaryData[existingDataIndex] = dayData;
      } else {
        diaryData.push(dayData);
      }

      await AsyncStorage.setItem('diaryData', JSON.stringify(diaryData));

      Alert.alert("Datos guardados", "Tu información ha sido guardada.");
      if (loadDiaryData) {
        loadDiaryData();  
      }
      
      navigation.goBack();
    } catch (error) {
      console.error("Error guardando los datos:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={globalStyles.container}
    contentContainerStyle={{ paddingBottom:20 }}>
      <Avatar navigation={navigation} />
      <Text style={globalStyles.title}>{selectedDay} {currentMonth}</Text>

      <Text style={globalStyles.label}>AÑADE TU MOOD DE HOY</Text>
      <View style={globalStyles.moodContainer}>
        {moods.map((moodItem, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMoodSelect(moodItem.label)}
            style={[globalStyles.mood, selectedMood === moodItem.label && globalStyles.selectedMood]}
          >
            {moodItem.icon}
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={globalStyles.inputArea}
        placeholder="ESCRIBE ALGO"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TextInput
        style={globalStyles.inputArea}
        placeholder="HOY SIENTO GRATITUD POR"
        value={gratitude}
        onChangeText={setGratitude}
        multiline
      />

      {Object.entries(categories).map(([category, icons]) => (
        <View key={category}>
          <Text style={globalStyles.label}>{category.toUpperCase()}</Text>
          <View style={globalStyles.activitiesContainer}>
            {icons.map((activity, index) => {
              const isSelected = selectedActivities.includes(activity.label);
              const iconWithColor = React.cloneElement(
                activity.icon,
                { 
                  color: isSelected ? theme.colors.primary : theme.colors.mediumGray
                }
              );

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    globalStyles.activityIcon
                  ]}
                  onPress={() => toggleActivity(activity.label)}
                >
                  {iconWithColor}
                  <Text style={[
                    globalStyles.smallText,
                    isSelected && { color: theme.colors.primary }
                  ]}>
                    {activity.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DayDetailScreen;
