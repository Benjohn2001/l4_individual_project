import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import FriendsRow from '../components/FriendsRow';
import PressableIcon from '../components/PressableIcon';
import PillButton from '../components/PillButton';

const FriendsScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 pb-10 mx-10">
                <PressableIcon
                        onPress={() => {
                            alert("add")
                        }}
                        icon="plus-circle"
                        size={40}
                        color="black"
                />
                <Text className="font-bold text-3xl">
                    My Friends
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
            <ScrollView 
                    showsVerticalScrollIndicator={false}
            >
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
                <FriendsRow
                    title="Bill Smith"
                    onPress={() => {
                        alert("View Profile")
                    }}
                    avatar={require('../assets/ben-avatar.png')}
                />
            </ScrollView>
            <PillButton
                title="Invite more friends"
                onPress={() => {
                    alert("Invite more friends")
                }}
            />
        </SafeAreaView>

    );
};

export default FriendsScreen;