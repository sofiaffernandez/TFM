import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons';

const moods = [
  { label: "Feliz", icon: <Ionicons name="happy-outline" size={40} color="#aad89a" /> },
  { label: "Contento", icon: <MaterialCommunityIcons name="emoticon-happy-outline" size={40} color="#e5e52f" /> },
  { label: "Neutral", icon: <MaterialCommunityIcons name="emoticon-neutral-outline" size={40} color="#FFC300" /> },
  { label: "Triste", icon: <MaterialCommunityIcons name="emoticon-sad-outline" size={40} color="#d89a9a" /> },
  { label: "Muy triste", icon: <MaterialCommunityIcons name="emoticon-cry-outline" size={40} color="#434242" /> },
];

export default moods;