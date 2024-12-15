import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import moment from 'moment';
import moods from './moods'; 
import globalStyles from '../styles/styles'

const YearInPixels = ({ diaryData = [] }) => {
  const currentYear = new Date().getFullYear(); // Asegúrate de usar el año correcto

  const daysInMonth = (month) => moment().year(currentYear).month(month).daysInMonth();

  // Función para obtener el color basado en el estado de ánimo
  const getMoodColor = (mood) => {
    if (moods && Array.isArray(moods)) {
      const moodObj = moods.find(m => m.label === mood);
      // Usamos la propiedad `color` directamente del `icon` (extraído del JSX)
      return moodObj ? moodObj.icon.props.color : '#FFFFFF'; // Si no se encuentra el estado de ánimo, devolvemos blanco
    }
    return '#FFFFFF'; // Si moods no es válido, devolver blanco por defecto
  };

  // Verificar la estructura de diaryData
  useEffect(() => {
    console.log("Updated diary data pixele:", diaryData);  // Verificar si los datos se actualizan correctamente
  }, [diaryData]);  // Se ejecuta cada vez que diaryData cambia

  return (
    <ScrollView>
        <Text style={globalStyles.sectionTitle}>Tu año en píxeles</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* Generar columnas por cada mes */}
        {Array.from({ length: 12 }).map((_, monthIndex) => (
          <View key={monthIndex} style={globalStyles.monthContainer}>
            {/* Generar filas por cada día */}
            {Array.from({ length: daysInMonth(monthIndex) }).map((_, dayIndex) => {
              // Crear la fecha con el formato correcto YYYY-MM-DD
              const formattedDate = moment().year(currentYear).month(monthIndex).date(dayIndex + 1).format('YYYY-MM-DD');
              // Verificar si diaryData es un array antes de usar .find()
              const mood = Array.isArray(diaryData) ? diaryData.find(data => data.date === formattedDate)?.mood : null;
              const moodColor = getMoodColor(mood);

              return (
                <View
                  key={dayIndex}
                  style={[globalStyles.dayBox, { backgroundColor: moodColor }]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default YearInPixels;

