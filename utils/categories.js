
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import globalStyles, { theme } from '../styles/styles';

const categories = {
  tiempo: [
    { label: "Soleado", icon: <Icon name="sun-o" size={30} color={theme.colors.mediumGray} /> }, 
    { label: "Nublado", icon: <Icon name="cloud" size={30} color={theme.colors.mediumGray} /> },
    { label: "Lluvia", icon: <MaterialCommunityIcons name="weather-rainy" size={30} color={theme.colors.mediumGray} /> }, 
    { label: "Tormenta", icon: <MaterialCommunityIcons name="weather-lightning-rainy" size={30} color={theme.colors.mediumGray} /> }, 
  ],
  ocio: [
    { label: "Pareja", icon: <Icon name="heart" size={30} color={theme.colors.mediumGray} /> },  
    { label: "Familia", icon: <MaterialIcons name="family-restroom" size={30} color={theme.colors.mediumGray} /> },   
    { label: "Películas", icon: <Icon name="film" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Libros", icon: <Icon name="book" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Juegos", icon: <Icon name="gamepad" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Andar", icon: <MaterialCommunityIcons name="walk" size={30} color={theme.colors.mediumGray}/> }, 
    { label: "Deporte", icon: <Icon name="soccer-ball-o" size={30} color={theme.colors.mediumGray}/> },
  ],
  tareas: [
    { label: "Sueño", icon: <MaterialIcon name="access-time" size={30} color={theme.colors.mediumGray}/> },
    { label: "Compras", icon: <Icon name="shopping-bag" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Limpiar", icon: <MaterialCommunityIcons name="broom" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Trabajar", icon: <MaterialIcons name="work" size={30} color={theme.colors.mediumGray}/> }, 
    { label: "Estudiar", icon: <Icon name="book" size={30} color={theme.colors.mediumGray}/> },  
  ],
  comida: [
    { label: "Comida Saludable", icon: <MaterialCommunityIcons name="food-apple-outline" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Comida Rápida", icon: <Ionicons name="fast-food-outline" size={30} color={theme.colors.mediumGray}/> }, 
    { label: "Ayuno", icon: <MaterialCommunityIcons name="food-off-outline" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Dulces", icon: <MaterialCommunityIcons name="candy-outline" size={30} color={theme.colors.mediumGray}/> },  
  ],
  salud: [
    { label: "Menstruación", icon: <FontAwesome5 name="tint" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Buena salud", icon: <MaterialIcons name="health-and-safety" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Constipado", icon: <MaterialCommunityIcons name="emoticon-sick-outline" size={30} color={theme.colors.mediumGray}/> },  
    { label: "Hospital", icon: <MaterialIcon name="local-hospital" size={30} color={theme.colors.mediumGray}/> },  
  ]
};

export default categories;