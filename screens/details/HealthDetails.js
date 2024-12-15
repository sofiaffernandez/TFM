import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';
import moment from 'moment';
import 'moment/locale/es';

const HealthDetails = () => {
  const [healthEntries, setHealthEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    loadHealthEntries();
  }, []);

  const loadHealthEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem('healthEntries');
      if (storedEntries) {
        setHealthEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Error cargando entradas de salud:', error);
    }
  };

  const addHealthEntry = async () => {
    if (!newEntry.trim()) return;

    const newEntryObj = {
      id: Date.now(),
      description: newEntry,
      date: moment().format(),
    };

    const updatedEntries = [...healthEntries, newEntryObj];
    setHealthEntries(updatedEntries);
    await AsyncStorage.setItem('healthEntries', JSON.stringify(updatedEntries));
    setNewEntry('');
    setShowAddModal(false);
  };

  const renderHistoryItem = ({ item }) => (
    <View style={globalStyles.historyCard}>
      <Text style={globalStyles.historyCardText}>
        {item.description}
      </Text>
      <Text style={globalStyles.historyCardDate}>
        {moment(item.date).format('DD/MM/YYYY HH:mm')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}
    contentContainerStyle={{paddingBottom: 80 }}>
      <Text style={globalStyles.subtitle}>Diario de Salud</Text>
      <FlatList
        data={healthEntries}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={globalStyles.historyEmptyText}>
            No hay registros de salud
          </Text>
        }
      />

      <TouchableOpacity 
        style={globalStyles.button}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={globalStyles.buttonText}>Añadir Registro</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <TextInput
              style={globalStyles.input}
              placeholder="Describe cómo te sientes..."
              value={newEntry}
              onChangeText={setNewEntry}
              multiline
            />
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity 
                style={globalStyles.buttonRed}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={globalStyles.buttonRed}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={globalStyles.button}
                onPress={addHealthEntry}
              >
                <Text style={globalStyles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HealthDetails;
