import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

export const STREAK_LEVELS = {
  STARTER: { 
    icon: 'seedling', 
    name: 'Semilla', 
    days: 3,
    color: '#aad89a'
  },
  GROWING: { 
    icon: 'leaf', 
    name: 'Brote', 
    days: 7,
    color: '#aad89a'
  },
  SAPLING: { 
    icon: 'spa', 
    name: 'Plántula', 
    days: 14,
    color: '#3CB371'
  },
  CONSISTENT: { 
    icon: 'tree', 
    name: 'Árbol Joven', 
    days: 30,
    color: '#2E8B57'
  },
  COMMITTED: { 
    icon: 'bullseye', 
    name: 'Comprometido', 
    days: 60,
    color: '#9AC9D8'
  },
  DEDICATED: { 
    icon: 'star', 
    name: 'Dedicado', 
    days: 100,
    color: '#FFD700'
  },
  MASTER: { 
    icon: 'crown', 
    name: 'Maestro', 
    days: 180,
    color: '#FFA500'
  },
  LEGEND: { 
    icon: 'trophy', 
    name: 'Leyenda', 
    days: 365,
    color: '#FF4500'
  }
};

export const getStreakLevel = (days) => {
  if (days >= STREAK_LEVELS.LEGEND.days) {
    return { currentLevel: STREAK_LEVELS.LEGEND, nextLevel: null };
  } else if (days >= STREAK_LEVELS.MASTER.days) {
    return { currentLevel: STREAK_LEVELS.MASTER, nextLevel: STREAK_LEVELS.LEGEND };
  } else if (days >= STREAK_LEVELS.DEDICATED.days) {
    return { currentLevel: STREAK_LEVELS.DEDICATED, nextLevel: STREAK_LEVELS.MASTER };
  } else if (days >= STREAK_LEVELS.COMMITTED.days) {
    return { currentLevel: STREAK_LEVELS.COMMITTED, nextLevel: STREAK_LEVELS.DEDICATED };
  } else if (days >= STREAK_LEVELS.CONSISTENT.days) {
    return { currentLevel: STREAK_LEVELS.CONSISTENT, nextLevel: STREAK_LEVELS.COMMITTED };
  } else if (days >= STREAK_LEVELS.SAPLING.days) {
    return { currentLevel: STREAK_LEVELS.SAPLING, nextLevel: STREAK_LEVELS.CONSISTENT };
  } else if (days >= STREAK_LEVELS.GROWING.days) {
    return { currentLevel: STREAK_LEVELS.GROWING, nextLevel: STREAK_LEVELS.SAPLING };
  } else if (days >= STREAK_LEVELS.STARTER.days) {
    return { currentLevel: STREAK_LEVELS.STARTER, nextLevel: STREAK_LEVELS.GROWING };
  }
  return { currentLevel: null, nextLevel: STREAK_LEVELS.STARTER };
};

export const renderStreakIcon = (iconName, size = 24, color) => (
  <FontAwesome5 
    name={iconName} 
    size={size} 
    color={color} 
  />
); 