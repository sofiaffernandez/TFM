import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Notifications from 'expo-notifications';
import globalStyles from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Las notificaciones son necesarias para recordarte escribir en tu diario.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error al solicitar permisos:', error);
    return false;
  }
};

const ConfScreen = () => {
  const [name, setName] = useState('');
  const [stepGoal, setStepGoal] = useState('6000');
  const [sleepGoal, setSleepGoal] = useState('8');
  const [reminderTime, setReminderTime] = useState(null);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const [modalVisible, setModalVisible] = useState(false); 
  const [reminderModalVisible, setReminderModalVisible] = useState(false); 
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        const storedStepGoal = await AsyncStorage.getItem('stepGoal') || '6000';
        const storedSleepGoal = await AsyncStorage.getItem('sleepGoal') || '8';
        const storedReminderTime = await AsyncStorage.getItem('reminderTime');

        if (savedName) setName(savedName);
        setStepGoal(storedStepGoal);
        setSleepGoal(storedSleepGoal);
        if (storedReminderTime) setReminderTime(storedReminderTime);
      } catch (error) {
        console.error('Error loading settings from AsyncStorage', error);
      }
    };

    loadSettings();
    requestNotificationPermissions();
  }, []);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      const numericStepGoal = parseInt(stepGoal) || 6000;
      const numericSleepGoal = parseInt(sleepGoal) || 8;
      
      await AsyncStorage.setItem('stepGoal', numericStepGoal.toString());
      await AsyncStorage.setItem('sleepGoal', numericSleepGoal.toString());
      
      Alert.alert('Configuración guardada con éxito.');
    } catch (error) {
      console.error('Error al guardar configuración', error);
    }
  };

  const scheduleNotification = async (reminderTime) => {
  try {
    // Cancelar cualquier notificación existente
    await Notifications.cancelAllScheduledNotificationsAsync();

    const [hours, minutes] = reminderTime.split(':').map(Number);

    // Programar la notificación diaria
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '¡Es hora de escribir en tu diario!',
        body: 'Recuerda anotar en tu diario de hábitos.',
        sound: true,
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true, // Repetir todos los días
      },
    });

    console.log('Notificación programada para todos los días a las:', `${hours}:${minutes}`);
  } catch (error) {
    console.error('Error al programar la notificación:', error);
    Alert.alert('Error', 'No se pudo programar la notificación');
  }
};

  const showReminderModal = () => {
    setReminderModalVisible(true);
  };

  const handleSaveReminder = async () => {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return;
    }

    const time = moment(reminderDate).format('HH:mm');
    setReminderTime(time);
    await AsyncStorage.setItem('reminderTime', time);
    await scheduleNotification(time);
    setReminderModalVisible(false);
    Alert.alert('Recordatorio guardado', `La notificación se enviará todos los días a las ${time}.`);
  };


  const confirmClearData = async () => {
    try {
      await AsyncStorage.clear();
      setName('');
      setStepGoal('6000');
      setSleepGoal('8');
      setReminderTime(null);
      setSelectedHour('12');
      setSelectedMinute('00');
      Alert.alert('Datos borrados', 'Todos los datos han sido eliminados correctamente.');
      setModalVisible(false);
    } catch (error) {
      console.error('Error al borrar datos de AsyncStorage', error);
    }
  };

  const exportDataToFile = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      const data = stores.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      const jsonString = JSON.stringify(data, null, 2);
      const tempUri = `${FileSystem.documentDirectory}AsyncStorageData.json`;
      await FileSystem.writeAsStringAsync(tempUri, jsonString);

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(tempUri, {
          mimeType: 'application/json',
          dialogTitle: 'Guardar archivo JSON',
          UTI: 'public.json',
        });
      } else {
        Alert.alert('Error', 'No se puede compartir el archivo en este dispositivo.');
      }
    } catch (error) {
      console.error('Error al exportar datos de AsyncStorage', error);
    }
  };

console.log(stepGoal)
  return (
    <ScrollView style={globalStyles.container}
    contentContainerStyle={{ paddingBottom:20 }}>
      <Text style={globalStyles.title}>Configuración</Text>
      <View style={globalStyles.card}>
      <Text style={globalStyles.subtitle}>Tu configuración</Text>
      <Text>Tu nombre:</Text>
        {/* Input para el nombre del usuario */}
        <TextInput
          style={globalStyles.input}
          placeholder="Introduce tu nombre"
          value={name}
          onChangeText={setName}
        />
        {/* Input para la meta de pasos diarios */}
        <Text>Meta de pasos diarios:</Text>
        <TextInput 
          style={globalStyles.input}
          value={stepGoal} 
          keyboardType="numeric"
          onChangeText={(text) => {
            // Asegurarse de que solo se ingresen números
            const numericValue = text.replace(/[^0-9]/g, '');
            setStepGoal(numericValue);
          }}
        />

        {/* Input para la meta de horas de sueño */}
        <Text>Meta de horas de sueño:</Text>
        <TextInput 
          style={globalStyles.input}
          value={sleepGoal} 
          keyboardType="numeric"
          onChangeText={setSleepGoal} 
        />
        {/* Botón para guardar la configuración */}
        <TouchableOpacity style={globalStyles.button} onPress={saveSettings}>
          <Text style={globalStyles.buttonText}>Guardar configuración</Text>
        </TouchableOpacity>
      </View>
      
        {/* Botón para configurar el recordatorio */}
        <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Te lo recordamos</Text>
        <TouchableOpacity style={globalStyles.button} onPress={showReminderModal}>
          <Text style={globalStyles.buttonText}>Configurar recordatorio</Text>
        </TouchableOpacity>
        </View>

      {/* Botón para exportar datos */}
      <View style={globalStyles.card}>
      <Text style={globalStyles.subtitle}>Exporta tus datos</Text>
      <TouchableOpacity style={globalStyles.button} onPress={exportDataToFile}>
        <Text style={globalStyles.buttonText}>Exportar tus datos</Text>
      </TouchableOpacity>
      </View>

      {/* Botón para abrir el modal de confirmación */}
      <View style={globalStyles.card}>
      <Text style={globalStyles.subtitle}>Borrar datos</Text>
        <TouchableOpacity style={globalStyles.buttonRed} onPress={() => setModalVisible(true)}>
          <Text style={globalStyles.buttonText}>Borrar todos los datos</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de confirmación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Confirmación</Text>
            <Text style={globalStyles.modalText}>¿Estás seguro de que deseas borrar todos los datos? Esta acción no se puede deshacer.</Text>
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.button]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={globalStyles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.buttonRed]}
                onPress={confirmClearData}
              >
                <Text style={globalStyles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para configurar recordatorio */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reminderModalVisible}
        onRequestClose={() => setReminderModalVisible(false)}
      >
        <View style={globalStyles.modalOverlay}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Configura tu Recordatorio</Text>

            <TouchableOpacity
              style={globalStyles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={globalStyles.timeButtonText}>
                Hora: {moment(reminderDate).format('HH:mm')}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={reminderDate}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={(event, selectedDate) => {
                  setShowTimePicker(false);
                  if (selectedDate) {
                    setReminderDate(selectedDate);
                  }
                }}
              />
            )}

            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={globalStyles.cancelButton}
                onPress={() => setReminderModalVisible(false)}
              >
                <Text style={globalStyles.buttonRed}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={globalStyles.button}
                onPress={handleSaveReminder}
              >
                <Text style={globalStyles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

     
    </ScrollView>
  );
};

export default ConfScreen;
