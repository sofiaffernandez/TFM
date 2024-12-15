import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../styles/styles';

const Avatar = ({ navigation }) => {
    const openConfig = () => {
        console.log("se hizo click")
        navigation.navigate('confScreen');  
    };

    return (
      <View> 
        <TouchableOpacity onPress={openConfig} style={globalStyles.avatarButton}>
            <View style={globalStyles.avatarContainer}>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    size={40} 
                    color="#9AC9D8" 
                />
            </View>
        </TouchableOpacity>
      </View>
    );
}; 

export default Avatar;
