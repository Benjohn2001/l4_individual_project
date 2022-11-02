import React from 'react';
import { Text, View, Image, TextInput, SafeAreaView } from 'react-native';
import PressableIcon from '../components/PressableIcon';
import { COLOURS } from '../assets/colours';
import AppButtonPurple from '../components/AppButtonPurple';

const RegisterScreen = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1 bg-primaryPurple'>
            <View className='pt-10 pl-5'>
                <PressableIcon
                        onPress={() => {
                            navigation.navigate("SignInScreen")
                        }}
                        icon="arrow-left"
                    />
            </View>
            <View className='flex-row justify-center items-center'>
                <Image 
                    className="w-44 h-44" 
                    source = {require("../assets/clock.png")}
                />
                <View className='items-center'>
                    <Text className='font-bold text-2xl'>
                        Weasley Clock
                    </Text>
                    <Text className='text-base'>
                        Join today. It's free!
                    </Text>
                </View>
            </View>
            <View className='items-center'>
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="First Name" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                />
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Last Name" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                />
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Username" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                />
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Email" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                />
                <TextInput 
                    className="bg-secondaryPurple mt-4 w-80 h-12 rounded-md" 
                    placeholder="Password" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    secureTextEntry={true}
                />
                <Text className='text-sm text-left pt-2 pb-2 text-gray-500'>
                Password must be at least 8 characters and {'\n'}
                contain at least 1 upper-case character 
                </Text>
                <AppButtonPurple
                    title="Submit"
                    onPress={() => {
                        navigation.navigate("HomeScreen")
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
export default RegisterScreen;