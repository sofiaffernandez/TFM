import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';
import moment from 'moment';
import 'moment/locale/es';

const MealsDetails = () => {
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ type: '', description: '' });

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const storedMeals = await AsyncStorage.getItem('meals');
      if (storedMeals) {
        const parsedMeals = JSON.parse(storedMeals);
        // Asegurarse de que cada comida tenga un ID válido
        const validatedMeals = parsedMeals.map((meal, index) => ({
          ...meal,
          id: meal.id || `meal-${index}-${Date.now()}`
        }));
        setMeals(validatedMeals);
      }
    } catch (error) {
      console.error('Error cargando comidas:', error);
      setMeals([]);
    }
  };

  const addMeal = async () => {
    if (!newMeal.type.trim() || !newMeal.description.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const newMealObj = {
        id: `meal-${Date.now()}`,
        type: newMeal.type.trim(),
        description: newMeal.description.trim(),
        date: moment().format(),
      };

      const updatedMeals = [...meals, newMealObj];
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
      
      setNewMeal({ type: '', description: '' });
      setShowAddModal(false);
      Alert.alert('Éxito', 'Comida registrada correctamente');
    } catch (error) {
      console.error('Error guardando comida:', error);
      Alert.alert('Error', 'No se pudo guardar la comida');
    }
  };

  const renderHistoryItem = ({ item }) => {
    if (!item) return null; // Protección contra items undefined
    
    return (
      <View style={globalStyles.historyCard}>
        <Text style={globalStyles.historyCardTitle}>{item.type || 'Sin tipo'}</Text>
        <Text style={globalStyles.historyCardText}>{item.description || 'Sin descripción'}</Text>
        <Text style={globalStyles.historyCardDate}>
          {moment(item.date).isValid() 
            ? moment(item.date).format('DD/MM/YYYY HH:mm')
            : 'Fecha no disponible'
          }
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}
    contentContainerStyle={{paddingBottom: 80 }}
    >
      <Text style={globalStyles.subtitle}>Historial de Comidas</Text>
      <FlatList
        data={Array.isArray(meals) ? meals.sort((a, b) => {
          if (!a || !b || !a.date || !b.date) return 0;
          return moment(b.date).valueOf() - moment(a.date).valueOf();
        }) : []}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => (item?.id || index).toString()}
        ListEmptyComponent={
          <Text style={globalStyles.historyEmptyText}>
            No hay registros de comidas
          </Text>
        }
        
      />

      <TouchableOpacity 
        style={globalStyles.button}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={globalStyles.buttonText}>Añadir Comida</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setNewMeal({ type: '', description: '' });
          setShowAddModal(false);
        }}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <TextInput
              style={globalStyles.input}
              placeholder="Tipo de comida (desayuno, almuerzo, cena...)"
              value={newMeal.type}
              onChangeText={(text) => setNewMeal(prev => ({...prev, type: text}))}
            />
            <TextInput
              style={[globalStyles.input, { height: 100 }]}
              placeholder="Descripción de la comida"
              value={newMeal.description}
              onChangeText={(text) => setNewMeal(prev => ({...prev, description: text}))}
              multiline
              numberOfLines={4}
            />
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity 
                style={globalStyles.buttonCancel}
                onPress={() => {
                  setNewMeal({ type: '', description: '' });
                  setShowAddModal(false);
                }}
              >
                <Text style={globalStyles.buttonRed}>Cancelar</Text>
              </TouchableOpacity>
             
              <TouchableOpacity 
                style={globalStyles.button}
                onPress={addMeal}
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

export default MealsDetails;