import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../components/avatar';
import globalStyles from '../styles/styles';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; 

const ListScreen = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const navigation = useNavigation();

  const icons = [
    { name: 'book', label: 'Libros' },
    { name: 'youtube-tv', label: 'Series' },
    { name: 'film', label: 'Películas' },
    { name: 'food-apple', label: 'Recetas' },
  ];

  useEffect(() => {
    const loadLists = async () => {
      try {
        const savedLists = await AsyncStorage.getItem('userLists');
        if (savedLists) {
          let parsedLists = JSON.parse(savedLists);
          sortLists(parsedLists);
          setLists(parsedLists);
        }
      } catch (error) {
        console.error('Error cargando las listas', error);
      }
    };
    loadLists();
  }, []);

  const saveLists = async (newLists) => {
    try {
      await AsyncStorage.setItem('userLists', JSON.stringify(newLists));
      setLists(newLists);
    } catch (error) {
      console.error('Error guardando la lista', error);
    }
  };

  const addList = () => {
    if (newListName.trim() && selectedIcon) {
      const newList = {
        name: newListName,
        icon: selectedIcon, 
        items: [],
        createdAt: new Date().toISOString(), // Asignamos la fecha de creación
      };
      const updatedLists = [...lists, newList];
      saveLists(updatedLists);
      setNewListName('');
      setSelectedIcon(null); 
      setIsAdding(false);
    } else {
      Alert.alert('Error', 'Por favor, introduce un nombre para la lista y selecciona un ícono.');
    }
  };

  const handleAddList = () => {
    setIsAdding(true);
  };

  const openList = (list) => {
    navigation.navigate('ListDetailScreen', { list });
  };

  const sortLists = (listsToSort) => {
    return listsToSort.sort((a, b) => {
      const comparison = new Date(b.createdAt) - new Date(a.createdAt);
      return isNewestFirst ? comparison : -comparison;
    });
  };

  const toggleOrder = () => {
    setIsNewestFirst(!isNewestFirst);
    const sortedLists = [...lists];
    sortLists(sortedLists);
    setLists(sortedLists);
  };

  return (
    <View 
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom:20 }}
    >
      <Avatar navigation={navigation} />
      <View >
        <Text style={globalStyles.title}>Tus listas</Text>
        <TouchableOpacity onPress={toggleOrder} style={{ padding: 10 }}>
          <MaterialCommunityIcons 
            style={globalStyles.sortButton}
            name={isNewestFirst ? 'sort-descending' : 'sort-ascending'} 
            size={24} 
            color="#9AC9D8" 
          />
        </TouchableOpacity>
      </View>

      {lists.length > 0 ? (
        <FlatList
          data={lists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openList(item)} style={{...globalStyles.card, flexDirection: 'row', alignItems:'center'}}>
              <MaterialCommunityIcons name={item.icon} size={40} color="#9AC9D8" style={{ marginRight: 12 }}/>
              <Text style={globalStyles.sectionTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ marginTop: 20 }}>Aún no tienes ninguna lista, crea una nueva</Text>
      )}

      {isAdding ? (
        <View>
          <TextInput
            placeholder="Nombre de la lista"
            value={newListName}
            onChangeText={setNewListName}
            style={globalStyles.input}
          />
          
          {/* Mostrar opciones de íconos */}
          <View style={globalStyles.iconSelection}>
            {icons.map((icon) => (
              <TouchableOpacity key={icon.name} onPress={() => setSelectedIcon(icon.name)}>
                <MaterialCommunityIcons 
                  name={icon.name} 
                  size={40} 
                  color={selectedIcon === icon.name ? '#9AC9D8' : '#333'} 
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={globalStyles.button} onPress={addList}>
            <Text style={globalStyles.buttonText}>Guardar lista</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={globalStyles.button} onPress={handleAddList}>
          <Text style={globalStyles.buttonText}>Añadir nueva lista</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListScreen;
