import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import ProfileBox from '../components/ProfileBox';
import RowItem from '../components/RowItem';
import PillButton from '../components/PillButton';
import PressableIcon from '../components/PressableIcon';
import GroupMemberBar from '../components/GroupMemberBar';

const GroupScreen = ({ route, navigation }) => {

    const name=route.params.name

    return (
        <SafeAreaView className="flex-1  bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 mx-10">
                <PressableIcon
                        onPress={() => {
                            navigation.navigate("HomeScreen")
                        }}
                        icon="arrow-left"
                        size={40}
                        color="black"
                    />
                <Text className="font-bold ml-auto mr-auto text-3xl">
                    {name}
                </Text>
            </View>
            <ScrollView 
                    showsVerticalScrollIndicator={false}
            >
                <View className="justify-center items-center">
                    <Image 
                        className="w-full h-96" 
                        source = {require("../assets/clock.png")}
                    />
                    <GroupMemberBar
                        title="Bill Smith"
                        onPress={() => {
                            alert("View Profile")
                        }}
                        avatar={require('../assets/ben-avatar.png')}
                        color="red"
                    />
                    <GroupMemberBar
                        title="Colin Star"
                        onPress={() => {
                            alert("View Profile")
                        }}
                        avatar={require('../assets/ben-avatar.png')}
                        color="blue"
                    />
                    <GroupMemberBar
                        title="Dave Spiers"
                        onPress={() => {
                            alert("View Profile")
                        }}
                        avatar={require('../assets/ben-avatar.png')}
                        color="green"
                    />
                    <GroupMemberBar
                        title="James Daring"
                        onPress={() => {
                            alert("View Profile")
                        }}
                        avatar={require('../assets/ben-avatar.png')}
                        color="yellow"
                    />
                    <GroupMemberBar
                        title="Thomas Spink"
                        onPress={() => {
                            alert("View Profile")
                        }}
                        avatar={require('../assets/ben-avatar.png')}
                        color="pink"
                    />
                    <GroupMemberBar
                        title="Greg Star"
                        onPress={() => {
                            alert("View Profile")
                        }}
                        avatar={require('../assets/ben-avatar.png')}
                        color="orange"
                    />
                </View>
            </ScrollView>
            <View className="items-center py-3">
                <TwoButtonsSide
                    title1="Settings"
                    onPress1={() => {
                        navigation.navigate("GroupSettingsScreen")
                    }}
                    icon1="settings"
                    title2="Customise"
                    onPress2={() => {
                        navigation.navigate("ClockCustomiseScreen")
                    }}
                    icon2="clock"
                />
            </View>
        </SafeAreaView>

    );
};

export default GroupScreen;