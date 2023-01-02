import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import ProfileBox from '../components/ProfileBox';
import RowItem from '../components/RowItem';
import PillButton from '../components/PillButton';
import PressableIcon from '../components/PressableIcon';
import GroupMemberBar from '../components/GroupMemberBar';
import { query, get, ref, getDatabase } from 'firebase/database';
import { auth } from '../../firebase';
import { useIsFocused } from '@react-navigation/native';
import Clock from '../components/Clock';

const GroupScreen = ({ route, navigation }) => {

    const item=route.params.item
    const name=item.val()["name"]
    const membersRef=item.val()["membersRef"]
    const key=item.key

    const [membersKeys, setMembersKeys] = React.useState([])
    const [members, setMembers] = React.useState([])
    const [showMembers, setShowMembers] = React.useState(false)
    const [fetched, setFetched] = React.useState(false)
    const [locations, setLocations] =React.useState([])

    const isFocused= useIsFocused()

    React.useEffect(()=>{
        fetchData()
    },[isFocused, showMembers])

    const fetchData = async () =>{
        setMembersKeys([])
        setMembers([])
        setLocations([])
        const locationsRef = query(ref(getDatabase(), "/locations/"+membersRef))
        const locatData=await get(locationsRef)
        locatData.forEach(val => {
            setLocations(val.val()["locations"])
        })
        const groupMembersRef = query(ref(getDatabase(), "/groupMembers/"+membersRef))
        const data = await get(groupMembersRef)
        data.forEach(c => {
            setMembersKeys(a => {return [...a , c]})
        })
        for (const i in membersKeys) {
            const userRef = query(ref(getDatabase(), "/users/"+membersKeys[i].val()["member"]))
            const data = await get(userRef)
            setMembers(a => {return [...a , data]})
        }
        setFetched(true)
    }


    return (
        <SafeAreaView className="flex-1  bg-primaryPurple" >
        {fetched ?
            <><View className="flex-row justify-between pt-14 pb-5 mx-10">
                    <PressableIcon
                        onPress={() => {
                            navigation.goBack();
                        } }
                        icon="arrow-left"
                        size={40}
                        color="black" />
                    <Text className="font-bold ml-auto mr-auto text-3xl">
                        {name}
                    </Text>
                </View>
                <View className="justify-center items-center w-full h-96 px-2 py-2">
                    <Clock
                        locations={locations}
                    />
                </View>
                                    
                    { showMembers ?
                        <>
                        <View className="flex-1">
                            <PillButton
                                title="Hide Members"
                                onPress={() => {
                                    setShowMembers(false);
                                    setMembersKeys([])
                                    setMembers([])
                                } }
                                icon="users" 
                            />
                        
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    extraData={members}
                                    data={members}
                                    renderItem={({ item }) => (
                                        <GroupMemberBar
                                            title={item.val()["firstName"] + " " + item.val()["lastName"]}
                                            onPress={() => {
                                                if (item.key == auth.currentUser.uid) {
                                                    navigation.navigate("HomeScreen", { screen: "Me" });
                                                } else {
                                                    navigation.push('UserProfileScreen', {
                                                        user: item,
                                                    });
                                                }
                                            } }
                                            avatar={item.val()["profilePic"]}
                                            color="red" />
                                    )} 
                                />
                            </View>
                        </>
                    :
                        <PillButton
                            title="Show Members"
                            onPress={()=>{
                                setShowMembers(true)
                            }}
                            icon="users"
                        />
                    }
                    
                    <View className="items-center py-3 mt-auto">
                        <TwoButtonsSide
                            title1="Settings"
                            onPress1={() => {
                                navigation.navigate("GroupSettingsScreen",{
                                    item: item,
                                });
                                setShowMembers(false)
                            } }
                            icon1="settings"
                            color1="#E7E7FF"
                            title2="Customise"
                            onPress2={() => {
                                navigation.navigate("ClockCustomiseScreen");
                                setShowMembers(false)
                            } }
                            icon2="clock" 
                            color2="#6B4EFF"/>
                    </View></>
        :
            <View className="justify-center items-center flex-1">
                <ActivityIndicator size="large" color="#6B4EFF"  />
                <Text className="text-center">Loading Group</Text>
            </View>
        }
        </SafeAreaView>

    );
};

export default GroupScreen;