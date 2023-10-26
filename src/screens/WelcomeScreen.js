import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 flex justify-around bg-[#E5E5E5]">
            {/* title */}
            <View className="space-y-2">
                <Text style={{ fontSize: wp(10) }} className="text-center text-red-700 font-extrabold">
                    ASTRA
                </Text>
                <Text style={{ fontSize: wp(4) }} className="text-center tracking-wider font-semibold text-[#003954]">
                    Embracing the AI-Powered Future.
                </Text>
            </View>

            {/* assistant image */}
            <View className="flex-row justify-center">
                <Image
                    source={require('../../assets/images/ai.png')}
                    style={{ height: hp(40), width: hp(40) }}
                />
            </View>

            {/* start button */}
            <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-[#003954] mx-5 p-4 rounded-2xl width: 100px">
                <Text style={{ fontSize: wp(6) }} className="text-center font-bold text-white">
                    Get Started
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
