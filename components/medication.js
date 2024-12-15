import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import globalStyles from '../styles/styles';

const MedicationModal = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');

  const handleSave = () => {
    onSave({ name, dose, time });
    setName('');
    setDose('');
    setTime('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={globalStyles.container}>
        <Text>Agregar Medicación</Text>
        <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
        <TextInput placeholder="Dosis" value={dose} onChangeText={setDose} />
        <TextInput placeholder="Hora (HH:MM)" value={time} onChangeText={setTime} />
        <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
          <Text>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.buttonRed} onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MedicationModal;
