import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

import tw from 'twrnc';

// nativewind approach
export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-black ">
      <TouchableOpacity className="bg-teal-500 p-3 rounded-lg shadow-md shadow-gray-400">
        <Text className="text-black text-3xl">React Native hitika</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
}
