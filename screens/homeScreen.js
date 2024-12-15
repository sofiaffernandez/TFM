import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles, { theme } from '../styles/styles';
import phrases from './json/phrases.json';
import Avatar from '../components/avatar';
import moment from 'moment';
import moods from '../utils/moods';
import { STREAK_LEVELS, getStreakLevel, renderStreakIcon } from '../utils/streakLevels';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [weeklyEmojis, setWeeklyEmojis] = useState([]);
  const [dailyPhrase, setDailyPhrase] = useState('');
  const [weekDays, setWeekDays] = useState([]);
  const [currentDay, setCurrentDay] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [habits, setHabits] = useState([]);
  const [streakDays, setStreakDays] = useState(0);
  const [randomGratitude, setRandomGratitude] = useState('');
  const [hasGratitudes, setHasGratitudes] = useState(true);


  useEffect(() => {
    loadData();

    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    await calculateWeekDays();
    await loadUserName();
    await loadWeeklyEmojis();
    loadDailyPhrase();
    await loadHabits();
    await calculateStreak(); 
    await loadRandomGratitude();
  };

  const calculateWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const day = new Date();
      day.setDate(today.getDate() + i);
      days.push(day.getDate().toString());
    }
    setWeekDays(days);
    setCurrentDay(today.getDate().toString());
  };

  const loadUserName = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      setNombreUsuario(userName || '');
    } catch (error) {
      console.error('Error cargando el nombre del usuario', error);
    }
  };
const loadWeeklyEmojis = async () => {
  try {
    const storedData = await AsyncStorage.getItem('diaryData');
    const emojis = [];

      moment.updateLocale('es', {
        week: {
          dow: 1,
        },
      });

      const startOfWeek = moment().startOf('isoWeek'); 
      const endOfWeek = moment().endOf('isoWeek');

      console.log('Start of week:', startOfWeek.format('YYYY-MM-DD')); 
      console.log('End of week:', endOfWeek.format('YYYY-MM-DD')); 

    if (storedData) {
      const diaryData = JSON.parse(storedData);

      for (
        let day = startOfWeek.clone();
        day.isSameOrBefore(endOfWeek);
        day.add(1, 'days')
      ) {
        const dayKey = day.format('YYYY-MM-DD'); 
        console.log('Checking day:', dayKey); 
        const foundEntry = diaryData.find(entry => entry.date === dayKey);

        if (foundEntry) {
          emojis.push(foundEntry.mood);
        } else {
          emojis.push('Sin registro'); 
        }
      }

      console.log('Emojis for the week:', emojis); 
    }
    setWeeklyEmojis(emojis);
  } catch (error) {
    console.error('Error cargando los datos semanales', error);
    setWeeklyEmojis(Array(7).fill('Sin registro'));
  }
};
const loadRandomGratitude = async () => {
  try {
    const storedData = await AsyncStorage.getItem('diaryData');
    if (storedData) {
      const diaryData = JSON.parse(storedData);
      const gratitudes = diaryData
        .map(entry => entry.gratitude)
        .filter(gratitude => gratitude && gratitude.trim() !== '');

      if (gratitudes.length > 0) {
        const randomIndex = Math.floor(Math.random() * gratitudes.length);
        setRandomGratitude(gratitudes[randomIndex]);
        setHasGratitudes(true);
      } else {
        setRandomGratitude('Aún no has registrado gratitudes.');
        setHasGratitudes(false);
      }
    } else {
      setRandomGratitude('Aún no has registrado gratitudes.');
      setHasGratitudes(false);
    }
  } catch (error) {
    console.error('Error cargando una gratitud aleatoria:', error);
    setRandomGratitude('Error al cargar gratitudes.');
    setHasGratitudes(false);
  }
};
  const loadDailyPhrase = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setDailyPhrase(randomPhrase);
  };

  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      setHabits(JSON.parse(storedHabits) || []);
    } catch (error) {
      console.error('Error cargando los hábitos', error);
    }
  };

const calculateStreak = async () => {
  try {
    const storedData = await AsyncStorage.getItem('diaryData');
    if (storedData) {
      const diaryData = JSON.parse(storedData);
      
      if (diaryData.length === 0) {
        setStreakDays(0);
        return;
      }

      // Ordenamos las fechas en orden descendente
      const sortedDates = diaryData
        .map(entry => entry.date)
        .sort((a, b) => moment(b).diff(moment(a)));

      // Verificamos si hay una entrada para hoy
      const today = moment().format('YYYY-MM-DD');
      const hasEntryToday = sortedDates.includes(today);
      
      if (!hasEntryToday) {
        // Si no hay entrada para hoy, verificamos si hay una entrada para ayer
        const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const hasEntryYesterday = sortedDates.includes(yesterday);
        
        if (!hasEntryYesterday) {
          setStreakDays(0);
          return;
        }
      }

      let streak = hasEntryToday ? 1 : 0;
      let currentDate = hasEntryToday ? 
        moment(today) : 
        moment(sortedDates[0]);

      for (let i = 1; i < sortedDates.length; i++) {
        const previousDate = moment(sortedDates[i]);
        
        if (currentDate.diff(previousDate, 'days') === 1) {
          streak++;
          currentDate = previousDate;
        } else {
          break;
        }
      }

      setStreakDays(streak);
    } else {
      setStreakDays(0);
    }
  } catch (error) {
    console.error('Error calculando la racha:', error);
    setStreakDays(0);
  }
};


  const renderMoodIcon = (mood) => {
    const moodData = moods.find(m => m.label === mood);
    return moodData ? moodData.icon : null;
  };
  

  return (
    <ScrollView 
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom:20 }}
    >
      {/* Avatar y saludo */}
      <Avatar navigation={navigation} />
      <Text style={globalStyles.title}>HI {nombreUsuario}</Text>

      {/* Días de la semana */}
      <View style={globalStyles.weekContainer}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('DayDetailScreen', { selectedDay: day, onEmojiUpdate: loadWeeklyEmojis })
            }
            style={[globalStyles.dayCircle, day === currentDay && globalStyles.currentDayCircle]}
          >
            <Text style={globalStyles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Emojis semanales */}
      <View style={globalStyles.emojiContainer}>
        <Text style={globalStyles.sectionTitle}>TU SEMANA</Text>
        <View style={globalStyles.emojis}>
          {weeklyEmojis.length > 0 ? (
            weeklyEmojis.every(emoji => emoji === 'Sin registro') ? (
              <Text style={globalStyles.noDataText}>No has registrado nada esta semana.</Text>
            ) : (
              weeklyEmojis.map((emoji, index) => (
                <View key={index} style={globalStyles.emoji}>
                  {emoji === 'Sin registro' ? (
                    <Text style={globalStyles.noDataText}>-</Text>
                  ) : (
                    renderMoodIcon(emoji)
                  )}
                </View>
              ))
            )
          ) : (
            <Text style={globalStyles.noDataText}>No has registrado nada esta semana.</Text>
          )}
        </View>
      </View>

      {/* Habits tracker */}
      <View style={globalStyles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('HabitListScreen')}>
          <Text style={globalStyles.sectionTitle}>HABIT TRACKER</Text>
        </TouchableOpacity>

        {habits.length > 0 ? (
          habits.map((habit, index) => {
            const daysCompleted = habit.daysCompleted || [];
            const selectedDays = habit.selectedDays || [];
            const progress = selectedDays.length > 0 ? daysCompleted.length / selectedDays.length : 0;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('HabitHistoryScreen', { habit })}
                style={globalStyles.touchableHabit}
              >
                <View style={globalStyles.progressBarContainer}>
                  <View style={globalStyles.iconContainer}>
                    <MaterialCommunityIcons name={habit.icon || 'tasks'} size={30} color={theme.colors.primary} />
                  </View>

                  <View style={globalStyles.progressBarWrapper}>
                    <View
                      style={[globalStyles.progressBar, { width: `${progress * 100}%` }]}
                    />
                  </View>

                  <Text style={globalStyles.progressText}>{habit.habitName || 'Hábito sin nombre'}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('AddHabitScreen')} style={globalStyles.noHabitsButton}>
            <Text style={globalStyles.noHabitsText}>No tienes hábitos, ¡crea uno nuevo!</Text>
          </TouchableOpacity>
        )}
      </View>

      
     {/* Gratitud aleatoria */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>AGRADECIDO</Text>
        <Text style={globalStyles.dailyPhrase}>{randomGratitude}</Text>

        {!hasGratitudes && (
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('DayDetailScreen', { selectedDay: new Date().getDate().toString() })}
          >
            <Text style={globalStyles.noHabitsText}>Añadir nueva entrada</Text>
          </TouchableOpacity>
        )}
      </View>




      {/* Frase del día */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>FRASE DEL DÍA</Text>
        <Text style={globalStyles.dailyPhrase}>{dailyPhrase}</Text>
      </View>

      {/* Racha */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>RACHA ACTUAL</Text>
        <View style={globalStyles.streakContainer}>
          {(() => {
            const { currentLevel, nextLevel } = getStreakLevel(streakDays);
            return (
              <>
                <View style={[
                  globalStyles.streakIconContainer,
                  { backgroundColor: currentLevel ? `${currentLevel.color}20` : '#f0f8ff' }
                ]}>
                  {currentLevel ? 
                    renderStreakIcon(currentLevel.icon, 24, currentLevel.color) :
                    renderStreakIcon('seedling', 24, theme.colors.primary)
                  }
                </View>
                <View style={globalStyles.streakTextContainer}>
                  <Text style={globalStyles.streakTitle}>
                    {currentLevel ? currentLevel.name : '¡Comienza tu racha!'}
                  </Text>
                  <Text style={[
                    globalStyles.streakCount, 
                    { color: currentLevel?.color || theme.colors.primary }
                  ]}>
                    {streakDays} {streakDays === 1 ? 'día' : 'días'}
                  </Text>
                </View>
              </>
            );
          })()}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
