import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import GroupButton from '../components/GroupButton';
import PressableIcon from '../components/PressableIcon';
import Modal from "react-native-modal";
import TwoButtonStack from '../components/TwoButtonStack';


const HomeScreen = ({ navigation }) => {
    
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        }
          )
    )

    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 mx-10">
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
            <View className="flex-1 justify-center items-center pt-10">
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >
                        <GroupButton
                            groupName="The Boys"
                            onPress={() => {
                                navigation.navigate("GroupScreen")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="Film People"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="Uni Mates"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="Work People"
                            onPress={() => {
                                alert("Access Group")
                            }}
                            avatar={require('../assets/ben-avatar.png')}
                        />
                        <GroupButton
                            groupName="Football"
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
                        setModalVisible(true)
                    }
                    }
                />
            </View>
            <Modal 
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                className="items-center"
            >
                <View className=" w-11/12 h-1/2 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Add a group</Text>
                    <Text className="text-center text-gray-500 py-5">Add with invite code or create a new group</Text>
                    <TextInput 
                        className="bg-white my-5 w-full mx-3 h-12 rounded-md" 
                        placeholder="Invite Code" 
                        underlineColorAndroid = "transparent"
                        cursorColor={COLOURS.darkerPurple}
                    />
                    <View className="pt-5">
                        <TwoButtonStack
                            title1="Add Group"
                            onPress1={() => {
                                alert("Add Group")
                            }}
                            title2="Create New Group"
                            onPress2={() => {
                                navigation.navigate("CreateNewGroupScreen")
                            }}
                        />
                    </View>
                </View>
            </Modal>
         
        </SafeAreaView>

    );
};

export default HomeScreen