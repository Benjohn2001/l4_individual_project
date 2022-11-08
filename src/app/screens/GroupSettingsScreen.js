import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import RowItem from '../components/RowItem';
import PressableIcon from '../components/PressableIcon';

const GroupSettingsScreen = ({ navigation }) => {
    return (      
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 mx-10">
                <PressableIcon
                        onPress={() => {
                            navigation.navigate("GroupScreen")
                        }}
                        icon="arrow-left"
                        size={40}
                        color="black"
                    />
                <Text className="font-bold ml-auto mr-auto text-3xl">
                    Group Settings
                </Text>
            </View>
            <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
                    Add to Group
            </Text>
            <View className='items-center'>
                <RowItem
                    title="From Friends"
                    icon="users"
                    onPress={() => {
                        alert("From Friends")
                    }}
                    color="black"
                />
                <RowItem
                    title="Invite Friends"
                    icon="share-2"
                    onPress={() => {
                        alert("invite Friends")
                    }}
                    color="black"
                />
            </View>

            <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
                    Admin
            </Text>
            <View className='items-center'>
                <RowItem
                    title="Change Group Name"
                    icon="edit-3"
                    onPress={() => {
                        alert("Change Group Name")
                    }}
                    color="black"
                />
            </View>

        </SafeAreaView>

    );
};

export default GroupSettingsScreen;