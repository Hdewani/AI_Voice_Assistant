import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const features = [
    {
        icon: require("../../assets/images/chatgptIcon.png"),
        title: "ChatGPT",
        description:
            "ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.",
        color: "bg-emerald-300",
    },
    {
        icon: require("../../assets/images/dalleIcon.png"),
        title: "DALL-E",
        description:
            "DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.",
        color: "bg-purple-300",
    },
    {
        icon: require("../../assets/images/smartaiIcon.png"),
        title: "Smart AI",
        description:
            "A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.",
        color: "bg-cyan-300",
    },
];

export default function Features() {
    return (
        <ScrollView style={{ height: hp(60) }} bounces={false} showsVerticalScrollIndicator={false} className="space-y-4">
            <Text style={{ fontSize: wp(7.5), fontFamily: "Roboto" }} className="font-extrabold mt-2 text-center underline text-red-700">
                Features
            </Text>

            {features.map((feature) => (
                <View className={`${feature.color} p-4 rounded-xl space-y-2 border border-gray-200`} key={feature.title}>
                    <View className="flex flex-row justify-content-center space-x-1">
                        <Image source={feature.icon} style={{ height: hp(4), width: hp(4) }} />
                        <Text style={{ fontSize: wp(4.8), fontFamily: "Roboto" }} className="font-semibold text-gray-700">
                            {feature.title}
                        </Text>
                    </View>

                    <Text style={{ fontSize: wp(3.8), marginTop: 20, fontFamily: "Roboto" }} className="text-gray-700 font-medium">
                        {feature.description}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
}
