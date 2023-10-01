import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import AppNavigation from './src/navigation';
import React, { useEffect } from 'react'
import { apiCall } from './src/api/openAi';

// nativewind approach
export default function App() {
  useEffect(() => {
    // apiCall("generate image of rice balls");
  }, [])
  return (
    <AppNavigation />
  );
}
