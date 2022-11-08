import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import RowItem from '../components/RowItem';
import PressableIcon from '../components/PressableIcon';

const ClockCustomiseScreen = ({ navigation }) => {
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
                    Customise
                </Text>
            </View>
            <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
                    Clock Customisation
            </Text>
            <View className='items-center'>
                <RowItem
                    title="Clock Face"
                    icon="clock"
                    onPress={() => {
                        alert("Clock Face")
                    }}
                    color="black"
                />
                <RowItem
                    title="Locations"
                    icon="map-pin"
                    onPress={() => {
                        alert("Locations")
                    }}
                    color="black"
                />
            </View>

            <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
                    Hand Customisation
            </Text>
            <View className='items-center'>
                <RowItem
                    title="Hand Colour"
                    icon="arrow-down-right"
                    onPress={() => {
                        alert("Hand Colour")
                    }}
                    color="black"
                />
            </View>

        </SafeAreaView>

    );
};

export default ClockCustomiseScreen;