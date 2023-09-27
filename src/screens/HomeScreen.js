import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import Features from '../components/features'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { dummyMessages } from '../constants';


export default function HomeScreen() {
    const [result, setResult] = useState('');
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(dummyMessages);
    const [speaking, setSpeaking] = useState(true);
    const scrollViewRef = useRef();

    const clear = () => {
        // Tts.stop();
        // setSpeaking(false);
        // setLoading(false);
        setMessages([]);
    };

    const stopSpeaking = () => {
        // Tts.stop();
        setSpeaking(false);
    }

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/welcome.png')} style={{ height: hp(20), width: hp(18) }} />

                </View>

                {
                    messages.length > 0 ? (
                        <View className="space-y-2 flex-1">
                            <Text className="text-green-800 font-extrabold ml-1"
                                style={{ fontSize: wp(5) }}>
                                Assistant
                            </Text>
                            <View
                                style={{ height: hp(58) }}
                                className="bg-neutral-300 rounded-3xl p-4">
                                <ScrollView
                                    // ref={scrollViewRef}
                                    bounces={false}
                                    className="space-y-4"
                                    showsVerticalScrollIndicator={false}
                                >
                                    {
                                        messages.map((message, index) => {
                                            if (message.role == 'assistant') {
                                                if (message.content.includes('https')) {
                                                    // result is an ai image
                                                    return (
                                                        <View key={index} className="flex-row justify-start">
                                                            <View
                                                                className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                                                <Image
                                                                    source={{ uri: message.content }}
                                                                    className="rounded-2xl"
                                                                    resizeMode="contain"
                                                                    style={{ height: wp(60), width: wp(60) }}
                                                                />
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                                else {
                                                    // chat gpt response
                                                    return (
                                                        <View
                                                            key={index} style={{ width: wp(70) }}
                                                            className="bg-emerald-100 p-2 rounded-xl rounded-tl-none">
                                                            <Text className="text-black font-black" style={{ fontSize: wp(4) }}  >
                                                                {message.content}
                                                            </Text>
                                                        </View>
                                                    )
                                                }
                                            } else {
                                                // user input text
                                                return (
                                                    <View key={index} className="flex-row justify-end">
                                                        <View
                                                            style={{ width: wp(70) }}
                                                            className="bg-white p-2 rounded-xl rounded-tr-none">
                                                            <Text className="text-black font-black" style={{ fontSize: wp(4) }}  >
                                                                {message.content}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                );
                                            }


                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    ) : (
                        <Features />
                    )
                }

                {/* recording, clear and stop buttons */}
                <View className="flex justify-center items-center">
                    {
                        // loading ? (
                        //     <Image
                        //         source={require('../../assets/images/loading.gif')}
                        //         style={{ width: hp(10), height: hp(10) }}
                        //     />
                        // ) :
                        recording ? (
                            <TouchableOpacity
                            // className="space-y-2"
                            // onPress={stopRecording}
                            >
                                {/* recording stop button */}
                                <Image
                                    className="rounded-full"
                                    source={require('../../assets/images/voiceLoading.gif')}
                                    style={{ width: hp(10), height: hp(10) }}
                                />
                            </TouchableOpacity>

                        ) : (
                            <TouchableOpacity
                            // onPress={startRecording}
                            >
                                {/* recording start button */}
                                <Image
                                    className="rounded-full"
                                    source={require('../../assets/images/recordingIcon.png')}
                                    style={{ width: hp(10), height: hp(10) }}
                                />
                            </TouchableOpacity>
                        )
                    }
                    {
                        messages.length > 0 && (
                            <TouchableOpacity
                                onPress={clear}
                                className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
                            >
                                <Text className="text-white font-semibold">Clear</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        speaking && (
                            <TouchableOpacity
                                onPress={stopSpeaking}
                                className="bg-red-400 rounded-3xl p-2 absolute left-10"
                            >
                                <Text className="text-white font-semibold">Stop</Text>
                            </TouchableOpacity>
                        )
                    }



                </View>




            </SafeAreaView>
            <Text>HomeScreen</Text>
        </View>
    );
}