import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../styles/styles';
import moment from 'moment';
import Avatar from '../components/avatar';
import 'moment/locale/es';

const ListDetailScreen = ({ route, navigation }) => {
  const { list } = route.params;
  const [items, setItems] = useState(list.items || []);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const saveItems = async (newItems) => {
    try {
      const savedLists = await AsyncStorage.getItem('userLists');
      let lists = JSON.parse(savedLists);
      const listIndex = lists.findIndex(l => l.name === list.name);
      lists[listIndex].items = newItems;
      await AsyncStorage.setItem('userLists', JSON.stringify(lists));
      setItems(newItems);
    } catch (error) {
      console.error('Error guardando items:', error);
    }
  };

  const addItem = () => {
    if (newItemTitle.trim()) {
      const newItem = {
        title: newItemTitle,
        description: newItemDescription,
        rating: rating,
        date: new Date().toISOString(),
      };
      const updatedItems = [...items, newItem];
      saveItems(updatedItems);
      setNewItemTitle('');
      setNewItemDescription('');
      setRating(0);
      setIsAdding(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <View style={globalStyles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => isAdding && setRating(star)}
          >
            <MaterialCommunityIcons
              name={star <= rating ? 'star' : 'star-outline'}
              size={20}
              color={star <= rating ? '#FFD700' : '#CCCCCC'}
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={globalStyles.listItemCard}>
      <View style={{ flex: 1 }}>
        <Text style={globalStyles.sectionTitle}>{item.title}</Text>
        <Text style={globalStyles.itemDescription}>{item.description}</Text>
        <Text style={globalStyles.historyCardDate}>
          {moment(item.date).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={{ alignSelf: 'flex-end', marginTop: 8 }}>
        {renderStars(item.rating)}
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Avatar navigation={navigation} />
      <Text style={globalStyles.title}>{list.name}</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={globalStyles.sectionTitle}>
            No hay elementos en esta lista. ¡Añade uno!
          </Text>
        }
      />

      {isAdding ? (
        <View style={globalStyles.addItemContainer}>
          <TextInput
            placeholder="Título"
            value={newItemTitle}
            onChangeText={setNewItemTitle}
            style={globalStyles.input}
          />
          <TextInput
            placeholder="Descripción"
            value={newItemDescription}
            onChangeText={setNewItemDescription}
            style={globalStyles.input}
            multiline
          />
          {renderStars(rating)}
          <TouchableOpacity 
            style={globalStyles.button}
            onPress={addItem}
          >
            <Text style={globalStyles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={() => setIsAdding(true)}
        >
          <Text style={globalStyles.buttonText}>Añadir nuevo elemento</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListDetailScreen;
