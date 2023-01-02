import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import RowItem from '../components/RowItem';
import PressableIcon from '../components/PressableIcon';
import Modal from "react-native-modal";
import SelectDropdown from 'react-native-select-dropdown'
import { getDatabase, update, ref, set } from 'firebase/database';

const ClockCustomiseScreen = ({ route, navigation }) => {

    const locations=route.params.locations
    const membersRef=route.params.membersRef

    const [toBeChanged, setToBeChanged] = React.useState("")
    const [toBeChangedIndex, setToBeChangedIndex] = React.useState("")
    const [isLocatModalVisible, setIsLocatModalVisible] = React.useState(false)
    const [newLocationEntry, setNewLocationEntry] = React.useState(false)
    const [newLocation, setNewLocation] = React.useState("")
    return (      
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 mx-10">
                <PressableIcon
                        onPress={() => {
                            navigation.goBack()
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
                        setIsLocatModalVisible(true)
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

            <Modal 
                isVisible={isLocatModalVisible}
                onBackdropPress={() => {
                    setIsLocatModalVisible(false)
                    setNewLocationEntry(false)
                }}
                className="items-center"
            >
                <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Change Locations</Text>
                    <Text className="text-center text-gray-500 py-4">Select which location to change</Text>
                    <SelectDropdown
                        buttonStyle={{borderRadius:8, backgroundColor:"white"}}
                        data={locations}
                        renderDropdownIcon={isOpened => {
                            return <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} color={"black"} size={18}/>
                        }}
                        dropdownIconPosition={'right'}
                        defaultButtonText={'Select a location'}
                        onSelect={(selectedItem, index) => {
                            setToBeChanged(selectedItem)
                            setToBeChangedIndex(index)
                            setNewLocationEntry(true)
                        }}
                    />
                    {newLocationEntry ?
                        <>
                        <TextInput 
                            className="bg-white my-5 w-full mx-3 h-12 rounded-md" 
                            placeholder="New location" 
                            underlineColorAndroid = "transparent"
                            cursorColor={COLOURS.darkerPurple}
                            maxLength={12}
                            value={newLocation}
                            onChangeText={(val) => setNewLocation(val)}
                        />
                        <AppButtonPurple
                            title="Change Location"
                            onPress={async () => {
                                locations[toBeChangedIndex]=newLocation
                                await set(ref(getDatabase(), "/locations/"+membersRef),{
                                    locations: locations
                                })
                                navigation.navigate("HomeScreen");
                                setNewLocation("")
                                setToBeChanged("")
                                setToBeChangedIndex("")
                                setIsLocatModalVisible(false);

                            } } 
                        />
                        </>
                        :
                        <></>
                    }
                        
                    
                </View>
            </Modal>

        </SafeAreaView>

        

    );
};

export default ClockCustomiseScreen;