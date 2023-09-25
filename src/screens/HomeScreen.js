import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Features from '../components/features'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function HomeScreen() {
    const [message, setMessage] = useState([])
    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/welcome.png')} style={{ height: hp(20), width: hp(18) }} />

                </View>

                {
                    message.length > 0 ? (
                        <View>

                        </View>
                    ) : (
                        <Features />
                    )
                }
            </SafeAreaView>
            <Text>HomeScreen</Text>
        </View>
    );
}