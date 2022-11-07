import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import ProfileBox from '../components/ProfileBox';
import RowItem from '../components/RowItem';
import PillButton from '../components/PillButton';

const MeScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="items-center pt-14">
                <Image 
                    className="w-44 h-44 rounded-full" 
                    source = {require('../assets/ben-avatar.png')}
                />
                <View className="py-3">
                    <ProfileBox
                        name="Joe Bloggs"
                        username="JoeGoat123"
                        bio="25 Year old | Scotland | Living my best life :)"
                    />
                </View>
                <RowItem
                        title="Change my username"
                        icon="edit-3"
                        onPress={() => {
                            alert("Change my username")
                        }}
                        color="black"
                />
                <RowItem
                        title="Change my profile picture"
                        icon="camera"
                        onPress={() => {
                            alert("Change my profile picture")
                        }}
                        color="black"
                />
                <RowItem
                        title="Change my bio"
                        icon="edit-3"
                        onPress={() => {
                            alert("Change my bio")
                        }}
                        color="black"
                />
            </View>
            <View className="mt-auto py-3">
                <PillButton
                    title="Share my profile"
                    onPress={() => {
                        alert("Share my profile")
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default MeScreen;