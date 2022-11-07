import React from 'react';
import { Text, View, Image, TextInput, SafeAreaView } from 'react-native';
import PressableIcon from '../components/PressableIcon';
import { COLOURS } from '../assets/colours';
import AppButtonPurple from '../components/AppButtonPurple';

const CreateNewGroupScreen = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1 bg-primaryPurple'>
            <View className='flex-row justify-between pt-14 mx-10'>
                <PressableIcon
                        onPress={() => {
                            navigation.navigate("HomeScreen")
                        }}
                        icon="arrow-left"
                        size={40}
                        color="black"
                />
                <Text className="font-bold mr-auto ml-auto text-3xl">
                    New Group
                </Text>
            </View>
            <View className='justify-center items-center'>
                <Image 
                    className="w-44 h-44" 
                    source = {require("../assets/clock.png")}
                />
            </View>
            <View className='items-center'>
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Group Name" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                />
                <AppButtonPurple
                    title="Create"
                    onPress={() => {
                        navigation.navigate("HomeScreen")
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
export default CreateNewGroupScreen;