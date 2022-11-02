import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import GroupButton from '../components/GroupButton';
import PressableIcon from '../components/PressableIcon';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-20 mx-10">
                <Text className="font-bold text-3xl">
                    My Groups
                </Text>
                <PressableIcon
                    onPress={() => {
                        alert("search")
                    }}
                    icon="search"
                    size={40}
                    color="black"
                />
            </View>
            <View className="flex-1 justify-center items-center pt-5">
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >
                        <GroupButton
                            groupName="The Boys"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="The Boys"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="The Boys"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="The Boys"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="The Boys"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                </ScrollView>
            </View>
            
            <View className="items-center py-3">
                <AppButtonPurple
                    title="Add Another Group"
                    onPress={() => {
                        alert("Add Another Group")
                    }}
                />
            </View>
        </SafeAreaView>

    );
};

export default HomeScreen