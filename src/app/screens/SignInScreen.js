import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';

const SignInScreen = ({ navigation }) => {
    return (
        <View className="flex-1 items-center pt-20 bg-primaryPurple" >
            <Image 
                className="w-64 h-64" 
                source = {require("../assets/clock.png")}
            />
            <TextInput 
                className="bg-secondaryPurple my-5 w-80 h-12 rounded-md" 
                placeholder="Email" 
                underlineColorAndroid = "transparent"
                cursorColor={COLOURS.darkerPurple}
            />
            <TextInput 
                className="bg-secondaryPurple mt-5 w-80 h-12 rounded-md" 
                placeholder="Password" 
                underlineColorAndroid = "transparent"
                cursorColor={COLOURS.darkerPurple}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => {
                    alert("Forgotten Password")
                }}>
                <Text className="mt-2 mb-20 underline text-darkerPurple">
                    Forgotten Password
                </Text>
            </TouchableOpacity>
            <TwoButtonsSide
                title1="Register"
                onPress1={() => {
                    navigation.navigate("RegisterScreen")
                }}
                icon1="edit"
                title2="Sign In"
                onPress2={() => {
                    alert("Sign In")
                }}
                icon2="arrow-right-circle"
            />     
        </View>
    );
}

export default SignInScreen;