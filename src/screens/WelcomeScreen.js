import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 flex justify-around bg-white">
            {/* title */}
            <View className="space-y-2">
                <Text style={{ fontSize: wp(10) }} className="text-center text-gray-700 font-extrabold">
                    ASTRA
                </Text>
                <Text style={{ fontSize: wp(4) }} className="text-center tracking-wider font-semibold text-gray-500">
                    Embracing the AI-Powered Future.
                </Text>
            </View>

            {/* assistant image */}
            <View className="flex-row justify-center">
                <Image
                    source={require('../../assets/images/welcome.png')}
                    style={{ height: wp(97), width: wp(75), flex: 1 }}
                />
            </View>

            {/* start button */}
            <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-emerald-600 mx-5 p-4 rounded-2xl width: 100px">
                <Text style={{ fontSize: wp(6) }} className="text-center font-bold text-white">
                    Get Started
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
