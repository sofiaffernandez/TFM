import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Modal, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles, { theme } from '../../styles/styles';
import moment from 'moment';
import 'moment/locale/es';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';

const MEDICATION_ICONS = [
  { name: 'pills', label: 'Píldoras' },,
  { name: 'syringe', label: 'Inyección' },
  { name: 'prescription-bottle', label: 'Jarabe' },
  { name: 'band-aid', label: 'Parche' },
  { name: 'eye-dropper', label: 'Gotas' },
];

const MedicationDetails = ({ navigation }) => {
  const [medications, setMedications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMedication, setNewMedication] = useState({
    nombre: '',
    hora: new Date(),
    necesaria: true,
    historial: [],
    icono: 'pills' // icono por defecto
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMedications();
    });

    return unsubscribe;
  }, [navigation]);

  const loadMedications = async () => {
    try {
      const storedMedications = await AsyncStorage.getItem('medicaciones');
      if (storedMedications) {
        const parsedMedications = JSON.parse(storedMedications);
        setMedications(parsedMedications.filter(med => !med.dadoDeBaja));
      }
    } catch (error) {
      console.error('Error cargando medicaciones:', error);
    }
  };

  const markAsTaken = async (medicationId) => {
    try {
      const updatedMedications = medications.map(med => {
        if (med.id === medicationId) {
          const newHistorial = [...(med.historial || []), moment().format()];
          return {
            ...med,
            historial: newHistorial,
            lastTaken: moment().format()
          };
        }
        return med;
      });

      await AsyncStorage.setItem('medicaciones', JSON.stringify(updatedMedications));
      setMedications(updatedMedications);
    } catch (error) {
      console.error('Error marcando medicación como tomada:', error);
    }
  };

  const handleAddMedication = async () => {
    if (!newMedication.nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de la medicación');
      return;
    }

    try {
      const medicationToAdd = {
        ...newMedication,
        id: Date.now().toString(),
        hora: moment(newMedication.hora).format('HH:mm'),
        dadoDeBaja: false
      };

      const storedMedications = await AsyncStorage.getItem('medicaciones');
      const currentMedications = storedMedications ? JSON.parse(storedMedications) : [];
      const updatedMedications = [...currentMedications, medicationToAdd];

      await AsyncStorage.setItem('medicaciones', JSON.stringify(updatedMedications));
      setMedications(updatedMedications.filter(med => !med.dadoDeBaja));
      setShowModal(false);
      setNewMedication({
        nombre: '',
        hora: new Date(),
        necesaria: true,
        historial: [],
        icono: 'pills'
      });
    } catch (error) {
      console.error('Error añadiendo medicación:', error);
      Alert.alert('Error', 'No se pudo guardar la medicación');
    }
  };

  const renderMedicationItem = ({ item }) => {
    const wasTakenToday = item.historial?.some(date => 
      moment(date).isSame(moment(), 'day')
    );

    return (
      <View style={globalStyles.medicationCard}>
        <TouchableOpacity 
          style={globalStyles.medicationContent}
          onPress={() => navigation.navigate('MedicationHistory', { medication: item })}
        >
          <View style={globalStyles.medicationHeader}>
            <Icon name={item.icono} size={20} color={theme.colors.primary} style={globalStyles.medicationIcon} />
            <Text style={globalStyles.medicationName}>{item.nombre}</Text>
          </View>
          <Text style={globalStyles.medicationTime}>{item.hora}</Text>
          <Text style={globalStyles.medicationLastTaken}>Ver historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.takenButton,
            wasTakenToday && globalStyles.takenButtonActive  
          ]}
          onPress={() => !wasTakenToday && markAsTaken(item.id)}
          disabled={wasTakenToday}
        >
          <Text style={[
            globalStyles.takenButtonText,
            wasTakenToday && { color: '#FFFFFF' }
          ]}>
            {wasTakenToday ? 'TOMADO' : 'TOMAR'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={globalStyles.medicationList}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>
            No hay medicaciones programadas
          </Text>
        }
      />
      
      <TouchableOpacity 
        style={globalStyles.button}
        onPress={() => setShowModal(true)}
      >
        <Text style={globalStyles.buttonText }>Añadir medicación</Text>
      </TouchableOpacity>

      <Modal
  visible={showModal}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setShowModal(false)}
>
  <View style={globalStyles.modalOverlay}>
    <View style={globalStyles.modalContent}>
      <Text style={globalStyles.modalTitle}>Nueva Medicación</Text>

      {/* Grid de Iconos */}
      <View style={globalStyles.iconGrid}>
        {MEDICATION_ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={[
              globalStyles.iconButton,
              newMedication.icono === icon.name && globalStyles.iconButtonSelected,
            ]}
            onPress={() => setNewMedication((prev) => ({ ...prev, icono: icon.name }))}
          >
            <Icon
              name={icon.name}
              size={32} // Tamaño de ícono más claro
              color={newMedication.icono === icon.name ? '#FFFFFF' : theme.colors.primary}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Input para Nombre */}
      <TextInput
        style={globalStyles.inputMed}
        placeholder="Nombre de la medicación"
        value={newMedication.nombre}
        onChangeText={(text) => setNewMedication((prev) => ({ ...prev, nombre: text }))}
      />

      {/* Selector de Hora */}
      <TouchableOpacity
        style={globalStyles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={globalStyles.timeButtonText}>
          Hora: {moment(newMedication.hora).format('HH:mm')}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={newMedication.hora}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) {
              setNewMedication((prev) => ({ ...prev, hora: selectedDate }));
            }
          }}
        />
      )}

      {/* Botones */}
      <View style={globalStyles.modalButtons}>
        <TouchableOpacity
          style={globalStyles.cancelButton}
          onPress={() => {
            setShowModal(false);
            setNewMedication({
              nombre: '',
              hora: new Date(),
              necesaria: true,
              historial: [],
              icono: 'pills',
            });
          }}
        >
          <Text style={globalStyles.buttonRed}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={handleAddMedication}>
          <Text style={globalStyles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


    </SafeAreaView>
  );
};

export default MedicationDetails;