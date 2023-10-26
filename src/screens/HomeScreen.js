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
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/openAi';
import Tts from 'react-native-tts';

export default function HomeScreen() {
    const [result, setResult] = useState('');
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [speaking, setSpeaking] = useState(false);
    const scrollViewRef = useRef();


    const speechStartHandler = e => {
        console.log('speech start event', e);
    };
    const speechEndHandler = e => {
        setRecording(false);
        console.log('speech stop event', e);
    };
    const speechResultsHandler = e => {
        console.log('speech event: ', e);
        const text = e.value[0];
        setResult(text);

    };

    const speechErrorHandler = e => {
        console.log('speech error: ', e);
    }


    const startRecording = async () => {
        setRecording(true);
        Tts.stop();
        try {
            await Voice.start('en-US'); // en-US

        } catch (error) {
            console.log('error', error);
        }
    };
    const stopRecording = async () => {

        try {
            await Voice.stop();
            setRecording(false);
            fetchResponse();
        } catch (error) {
            console.log('error', error);
        }
    };



    const fetchResponse = async () => {
        if (result.trim().length > 0) {
            setLoading(true);
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: result.trim() });
            setMessages([...newMessages]);

            // scroll to the bottom of the view
            updateScrollView();

            // fetching response from chatGPT with our prompt and old messages
            apiCall(result.trim(), newMessages).then(res => {
                console.log('got api data', res);
                setLoading(false);
                if (res.success) {
                    setMessages([...res.data]);
                    setResult('');
                    updateScrollView();

                    // now play the response to user
                    startTextToSpeach(res.data[res.data.length - 1]);

                } else {
                    Alert.alert('Error', res.msg);
                }

            })
        }
    }

    const startTextToSpeach = message => {
        if (!message.content.includes('https')) {
            setSpeaking(true);
            // playing response with the voice id and voice speed
            Tts.speak(message.content, {
                iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
                rate: 0.5,
            });
        }
    }


    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }

    const clear = () => {
        Tts.stop();
        setSpeaking(false);
        setLoading(false);
        setMessages([]);
    };

    const stopSpeaking = () => {
        Tts.stop();
        setSpeaking(false);
    }

    useEffect(() => {

        // voice handler events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        // // text to speech events
        Tts.setDefaultLanguage('en-IE');
        Tts.addEventListener('tts-start', event => console.log('start', event));
        Tts.addEventListener('tts-finish', event => { console.log('finish', event); setSpeaking(false) });
        Tts.addEventListener('tts-cancel', event => console.log('cancel', event));



        return () => {
            // destroy the voice instance after component unmounts
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    console.log("Results", result)

    return (
        <View className="flex-1 bg-[#E5E5E5]">
            <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center pt-8">
                    <Image source={require('../../assets/images/ai.png')} style={{ height: hp(14), width: hp(14) }} />

                </View>

                {
                    messages.length > 0 ? (
                        <View className="space-y-2 flex-1">
                            <Text className="text-red-700 font-extrabold ml-1"
                                style={{ fontSize: wp(5) }}>
                                Assistant
                            </Text>
                            <View
                                style={{ height: hp(62) }}
                                className="bg-gray-300 rounded-3xl p-4">
                                <ScrollView
                                    ref={scrollViewRef}
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
                                                                className="p-3 flex rounded-2xl bg-teal-100 rounded-tl-none">
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
                                                            className="bg-teal-100 p-2 rounded-xl rounded-tl-none">
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
                                                            className="bg-[#ABBBFF] p-2 rounded-xl rounded-tr-none">
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
                <View className="flex justify-center items-center mb-3">
                    {
                        loading ? (
                            <Image
                                source={require('../../assets/images/instagram-stories.png')}
                                style={{ width: hp(7), height: hp(7) }}
                            />
                        ) :
                            recording ? (
                                <TouchableOpacity
                                    // className="space-y-2"
                                    onPress={stopRecording}
                                >
                                    {/* recording stop button */}
                                    <Image
                                        className="rounded-full"
                                        source={require('../../assets/images/record.png')}
                                        style={{ width: hp(8), height: hp(8) }}
                                    />
                                </TouchableOpacity>

                            ) : (
                                <TouchableOpacity
                                    onPress={startRecording}
                                >
                                    {/* recording start button */}
                                    <Image
                                        className="rounded-full mb-4 bg-[#F0FBFF] px-4"
                                        source={require('../../assets/images/voice-recording.png')}
                                        style={{ width: hp(7), height: hp(7) }}
                                    />
                                </TouchableOpacity>
                            )
                    }
                    {
                        messages.length > 0 && (
                            <TouchableOpacity
                                onPress={clear}
                                className="bg-[#003954] rounded-3xl p-2 absolute right-10"
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

        </View>
    );
}