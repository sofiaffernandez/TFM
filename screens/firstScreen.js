import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Tutorial = ({ onFinish }) => {
  const DoneButton = ({ isLight, ...props }) => (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      {...props}
    >
      <Text style={styles.buttonText}>Comenzar</Text>
    </TouchableOpacity>
  );

  const NextButton = ({ isLight, ...props }) => (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      {...props}
    >
      <Text style={styles.buttonText}>Siguiente</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      showSkip={false}
      NextButtonComponent={NextButton}
      DoneButtonComponent={DoneButton}
      onDone={onFinish}
      pages={[
        {
          backgroundColor: theme.colors.background,
          image: (
            <View style={styles.iconContainer}>
              <Icon name="home" size={100} color={theme.colors.primary} />
            </View>
          ),
          title: 'Pantalla Principal',
          subtitle: 'Aquí verás un resumen de tu semana y podrás añadir nuevos hábitos para mejorar tu rutina diaria',
        },
        {
          backgroundColor: theme.colors.background,
          image: (
            <View style={styles.iconContainer}>
              <Icon name="person-circle" size={100} color={theme.colors.primary} />
            </View>
          ),
          title: 'Tu Perfil',
          subtitle: 'Personaliza tu perfil y configura tus preferencias de la aplicación',
        },
        {
          backgroundColor: theme.colors.background,
          image: (
            <View style={styles.iconContainer}>
              <Icon name="calendar" size={100} color={theme.colors.primary} />
            </View>
          ),
          title: 'Calendario',
          subtitle: 'En el calendario podrás ver tu estado de ánimo día a día y añadir nuevos registros',
        },
        {
          backgroundColor: theme.colors.background,
          image: (
            <View style={styles.iconContainer}>
              <Icon name="list" size={100} color={theme.colors.primary} />
            </View>
          ),
          title: 'Tus Listas',
          subtitle: 'Crea y gestiona tus listas personalizadas para organizar tus tareas',
        },
        {
          backgroundColor: theme.colors.background,
          image: (
            <View style={styles.iconContainer}>
              <Icon name="heart" size={100} color={theme.colors.primary} />
            </View>
          ),
          title: 'Salud',
          subtitle: 'Aquí encontrarás un resumen de tu salud y podrás registrar tus pasos, medicamentos y horas de sueño',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: width * 0.3,
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tutorial;
