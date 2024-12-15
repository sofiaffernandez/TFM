import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles, { theme } from '../../styles/styles';
import moment from 'moment';
import 'moment/locale/es';

const MedicationHistory = ({ route, navigation }) => {
  const [currentMedication, setCurrentMedication] = useState(route.params.medication);

  const toggleMedicationStatus = async () => {
    const action = currentMedication.dadoDeBaja ? 'alta' : 'baja';
    Alert.alert(
      `Confirmar ${action}`,
      `¿Estás seguro de que quieres dar de ${action} esta medicación?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: action === 'alta' ? 'Dar de Alta' : 'Dar de Baja',
          onPress: async () => {
            try {
              const medicationsString = await AsyncStorage.getItem('medicaciones');
              if (medicationsString) {
                const medications = JSON.parse(medicationsString);
                const updatedMedications = medications.map(med => {
                  if (med.id === currentMedication.id) {
                    const updatedMed = {
                      ...med,
                      dadoDeBaja: !med.dadoDeBaja,
                      necesaria: !med.dadoDeBaja ? false : true,
                      fechaBaja: !med.dadoDeBaja ? moment().format() : null,
                      historial: [
                        ...med.historial,
                        !med.dadoDeBaja ? 
                          `DADO_DE_BAJA_${moment().format()}` : 
                          `DADO_DE_ALTA_${moment().format()}`
                      ]
                    };
                    setCurrentMedication(updatedMed);
                    return updatedMed;
                  }
                  return med;
                });
                await AsyncStorage.setItem('medicaciones', JSON.stringify(updatedMedications));
              }
            } catch (error) {
              console.error(`Error ${action === 'alta' ? 'activando' : 'dando de baja'} medicación:`, error);
            }
          },
          style: action === 'alta' ? 'default' : 'destructive',
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }) => {
    if (item.startsWith('DADO_DE_BAJA_')) {
      const fecha = moment(item.replace('DADO_DE_BAJA_', ''));
      return (
        <View style={[globalStyles.historyItemCard, { backgroundColor: theme.colors.error }]}>
          <Text style={globalStyles.historyItemText}>
            DADO DE BAJA {fecha.format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      );
    } else if (item.startsWith('DADO_DE_ALTA_')) {
      const fecha = moment(item.replace('DADO_DE_ALTA_', ''));
      return (
        <View style={[globalStyles.historyItemCard, { backgroundColor: theme.colors.success }]}>
          <Text style={globalStyles.historyItemText}>
            DADO DE ALTA {fecha.format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      );
    }
    return (
      <View style={[
        globalStyles.historyItemCard,
        currentMedication.dadoDeBaja && { opacity: 0.7 }
      ]}>
        <Text style={globalStyles.historyItemText}>
          TOMADO {moment(item).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={globalStyles.medicationHistoryContainer}>
        <Text style={globalStyles.medicationHistoryTitle}>
          {currentMedication.nombre}
          {currentMedication.dadoDeBaja && (
            <Text style={globalStyles.medicationInactiveText}> (Inactivo)</Text>
          )}
        </Text>

        <FlatList
          data={currentMedication.historial.sort((a, b) => {
            const dateA = a.startsWith('DADO_DE_') ? 
              moment(a.split('_')[3]) : moment(a);
            const dateB = b.startsWith('DADO_DE_') ? 
              moment(b.split('_')[3]) : moment(b);
            return dateB.valueOf() - dateA.valueOf();
          })}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={globalStyles.noDataText}>
              No hay registros en el historial
            </Text>
          }
          contentContainerStyle={{ flexGrow: 1 }}
        />

        <TouchableOpacity 
          style={[
            globalStyles.deleteButton,
            currentMedication.dadoDeBaja && globalStyles.activateButton
          ]}
          onPress={toggleMedicationStatus}
        >
          <Text style={globalStyles.deleteButtonText}>
            {currentMedication.dadoDeBaja ? 'DAR DE ALTA' : 'DAR DE BAJA'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MedicationHistory; 