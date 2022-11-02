import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 items-center pt-20 bg-primaryPurple" >
            <Text>
                Home
            </Text>
        </SafeAreaView>

    );
};

export default HomeScreen