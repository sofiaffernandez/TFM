import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/es';
import globalStyles, { theme } from '../styles/styles';
import Avatar from '../components/avatar';
import YearInPixels from "../utils/yearinppixeles";
import moods from "../utils/moods";
import { ScrollView } from 'react-native-virtualized-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import categories from '../utils/categories';
import { useFocusEffect } from '@react-navigation/native';

const CalendarScreen = ({ route, navigation }) => {
  const [diaryData, setDiaryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const currentMonth = selectedDate.format('MMMM');
  const currentYear = selectedDate.format('YYYY');
  const daysInMonth = selectedDate.daysInMonth();

  const getFirstDayOffset = () => {
    const firstDay = moment(selectedDate).startOf('month').day();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const generateCalendarWeeks = () => {
    const firstDayOffset = getFirstDayOffset();
    const totalDays = firstDayOffset + daysInMonth;
    const totalCells = Math.ceil(totalDays / 7) * 7;

    return Array(totalCells).fill(null).map((_, index) => {
      if (index < firstDayOffset) return null;
      if (index >= firstDayOffset + daysInMonth) return null;
      return index - firstDayOffset + 1;
    });
  };

  const loadDiaryData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('diaryData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDiaryData(parsedData);
        console.log('Datos del diario actualizados:', parsedData);
      }
    } catch (error) {
      console.error("Error cargando los datos:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDiaryData();
    }, [])
  );

  useEffect(() => {
    loadDiaryData();
  }, [selectedDate]);

  const handleDatePress = useCallback((date) => {
    navigation.navigate('DayDetailScreen', { selectedDay: date });
  }, [navigation]);

  const renderMoodIcon = (mood) => {
    const moodData = moods.find(m => m.label === mood);
    return moodData ? moodData.icon : null;
  };

  const goToPreviousMonth = () => {
    setSelectedDate(prev => moment(prev).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setSelectedDate(prev => moment(prev).add(1, 'month'));
  };

  const getMonthlyMoodCounts = () => {
    if (!Array.isArray(diaryData)) return [];
    
    const startOfMonth = moment(selectedDate).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(selectedDate).endOf('month').format('YYYY-MM-DD');
    
    return diaryData.filter(entry => {
      return entry.date >= startOfMonth && entry.date <= endOfMonth;
    });
  };

 const getMonthlyActivitiesCounts = () => {
    try {
      if (!Array.isArray(diaryData)) {
        console.log('DiaryData no es un array:', diaryData);
        return {};
      }

      const startOfMonth = moment(selectedDate).startOf('month');
      const endOfMonth = moment(selectedDate).endOf('month');
      
      console.log('Mes seleccionado:', selectedDate.format('YYYY-MM'));
      console.log('Buscando actividades entre:', startOfMonth.format('YYYY-MM-DD'), 'y', endOfMonth.format('YYYY-MM-DD'));

      const monthlyData = diaryData.filter(entry => {
        const entryDate = moment(entry.date);
        return entryDate.isSameOrAfter(startOfMonth, 'day') && 
               entryDate.isSameOrBefore(endOfMonth, 'day');
      });

      console.log('Entradas encontradas para el mes:', monthlyData.length);
      console.log('Entradas del mes:', monthlyData);

      const activityCounts = {};
      monthlyData.forEach(entry => {
        if (entry && entry.activities && Array.isArray(entry.activities)) {
          entry.activities.forEach(activity => {
            if (activity) {
              activityCounts[activity] = (activityCounts[activity] || 0) + 1;
            }
          });
        }
      });

      console.log('Conteo de actividades del mes actual:', activityCounts);
      return activityCounts;

    } catch (error) {
      console.error('Error al contar actividades:', error);
      return {};
    }
  };

  return (
    <ScrollView style={globalStyles.container}
    contentContainerStyle={{ paddingBottom: 40 }}>
      <Avatar navigation={navigation} />
      <Text style={globalStyles.title}>Calendario</Text>

      <View style={globalStyles.monthNavigationContainer}>
        <TouchableOpacity onPress={goToPreviousMonth} style={globalStyles.monthNavigationButton}>
          <Text style={globalStyles.monthNavigationText}>{'<'}</Text>
        </TouchableOpacity>
        
        <Text style={globalStyles.sectionTitle}>
          {`${currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} ${currentYear}`}
        </Text>
        
        <TouchableOpacity 
          onPress={goToNextMonth} 
          style={globalStyles.monthNavigationButton}
        >
          <Text style={globalStyles.monthNavigationText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={globalStyles.calendarContainer}
        data={generateCalendarWeeks()}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item === null) {
            return <View style={globalStyles.emptyDayContainer} />;
          }

          const month = String(selectedDate.month() + 1).padStart(2, '0');
          const day = String(item).padStart(2, '0'); 
          const fullDate = `${currentYear}-${month}-${day}`;
          const mood = Array.isArray(diaryData) ? diaryData.find(data => data.date === fullDate)?.mood : null;

          return (
            <TouchableOpacity
              onPress={() => handleDatePress(item)}
              style={globalStyles.dayContainer}
            >
              {mood ? (
                <View style={globalStyles.moodIcon}>
                  {renderMoodIcon(mood)}
                </View>
              ) : (
                <Text style={globalStyles.dayText}>{item}</Text>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <View style={globalStyles.monthlyStatsContainer}>
        <Text style={globalStyles.sectionTitle}>Tus emociones del mes</Text>
        <View style={globalStyles.monthlyStatsRow}>
          {moods.map((mood, index) => {
            const monthlyData = getMonthlyMoodCounts();
            const count = monthlyData ? monthlyData.filter(day => day.mood === mood.label).length : 0;
            if (count === 0) return null;
            
            return (
              <View key={index} style={globalStyles.moodIconContainer}>
                {mood.icon}
                {count > 0 && (
                  <View style={[
                    globalStyles.countBadge,
                    { backgroundColor: mood.icon.props.color || theme.colors.primary }
                  ]}>
                    <Text style={globalStyles.countBadgeText}>
                      {count}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
          {!getMonthlyMoodCounts().length && (
            <Text style={globalStyles.noDataText}>
              Registra tus emociones diarias para ver las estadísticas del mes
            </Text>
          )}
        </View>
      </View>

      <View style={globalStyles.monthlyStatsContainer}>
        <Text style={globalStyles.sectionTitle}>Tus actividades más frecuentes</Text>
        <View style={globalStyles.activitiesStatsRow}>
          {Object.entries(getMonthlyActivitiesCounts())
            .filter(([, count]) => count > 0)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([activityName, count], index) => {
              let foundActivity = null;
              Object.values(categories).forEach(categoryArray => {
                const found = categoryArray.find(item => item.label === activityName);
                if (found) foundActivity = found;
              });

              if (!foundActivity) return null;

              const iconColor = foundActivity.icon.props.color || theme.colors.primary;

              return (
                <View key={index} style={globalStyles.activityIconContainer}>
                  {foundActivity.icon}
                  <View style={[
                    globalStyles.countBadge,
                    { backgroundColor: iconColor }
                  ]}>
                    <Text style={globalStyles.countBadgeText}>
                      {count}
                    </Text>
                  </View>
                </View>
              );
            })}
          {Object.keys(getMonthlyActivitiesCounts()).length === 0 && (
            <Text style={globalStyles.noDataText}>
              Registra tus actividades diarias para ver las más frecuentes del mes
            </Text>
          )}
        </View>
      </View>

      <View style={globalStyles.yearInPixelsContainer}>
        <YearInPixels diaryData={diaryData} />
      </View>
    </ScrollView>
  );
};

export default CalendarScreen;
