import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import ProfileBox from '../components/ProfileBox';
import RowItem from '../components/RowItem';
import PillButton from '../components/PillButton';
import PressableIcon from '../components/PressableIcon';
import GroupMemberBar from '../components/GroupMemberBar';
import { query, get, ref, getDatabase, update, set } from 'firebase/database';
import { auth } from '../../firebase';
import { useIsFocused } from '@react-navigation/native';
import Clock from '../components/Clock';
import Modal from "react-native-modal";
import SelectDropdown from 'react-native-select-dropdown'

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
    const [clockface, setClockface] =React.useState("")
    const [isUpdateStatusModal, setIsUpdateStatusModal] = React.useState(false)
    const [newStatusIndex, setNewStatusIndex]=React.useState()

    const isFocused= useIsFocused() 
    const uid = auth.currentUser.uid

    React.useEffect(()=>{
        fetchData()
    },[isFocused, showMembers])

    React.useEffect(()=>{
        getLocats()
        getClockFace()
    },[isFocused])

    const getLocats = async () =>{
        setLocations([])
        const locationsRef = query(ref(getDatabase(), "/locations/"+membersRef))
        const locatData=await get(locationsRef)
        setLocations(locatData.val()["locations"])
    }

    const getClockFace = async () =>{
        setFetched(false)
        setClockface("")
        const faceRef = query(ref(getDatabase(), "/clockFace/"+membersRef))
        const faceData=await get(faceRef)
        setClockface(faceData.val()["background"])
        setFetched(true)
    }

    const fetchData = async () =>{
        setMembersKeys([])
        setMembers([])
        const groupMembersRef = query(ref(getDatabase(), "/groupMembers/"+membersRef))
        const data = await get(groupMembersRef)
        data.forEach(c => {
            setMembersKeys(a => {return [...a , c]})
        })
        for (const i in membersKeys) {
            const userRef = query(ref(getDatabase(), "/users/"+membersKeys[i].val()["member"]))
            const data = await get(userRef)
            data.val().col=membersKeys[i].val()["colour"]
            setMembers(a => {return [...a , [data,membersKeys[i].val()["colour"]]]})
        }
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
                <View className="justify-center items-center w-full h-96">
                        <Clock
                            locations={locations}
                            face={clockface}
                            membs={membersKeys}
                        />
                </View>
                                    
                    { showMembers ?
                        <>
                        <View className="flex-1">
                            <View className="flex-row">
                                <PillButton
                                    title="Hide Members"
                                    onPress={() => {
                                        setShowMembers(false);
                                        setMembersKeys([])
                                        setMembers([])
                                    } }
                                    icon="users" 
                                />
                                <PillButton
                                    title="Update Status"
                                    onPress={() => {
                                       setIsUpdateStatusModal(true)
                                    } }
                                    icon="upload" 
                                />
                            </View>
                            
                        
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    extraData={members}
                                    data={members}
                                    renderItem={({ item }) => (
                                        <GroupMemberBar
                                            title={item[0].val()["firstName"] + " " + item[0].val()["lastName"]}
                                            onPress={() => {
                                                if (item[0].key == auth.currentUser.uid) {
                                                    navigation.navigate("HomeScreen", { screen: "Me" });
                                                } else {
                                                    navigation.push('UserProfileScreen', {
                                                        user: item[0],
                                                    });
                                                }
                                            } }
                                            avatar={item[0].val()["profilePic"]}
                                            color={item[1]} />
                                    )} 
                                />
                            </View>
                        </>
                    :
                        <View className="flex-row">
                            <PillButton
                                title="Show Members"
                                onPress={()=>{
                                    setShowMembers(true)
                                }}
                                icon="users"
                            />

                            <PillButton
                                title="Update Status"
                                onPress={() => {
                                    setIsUpdateStatusModal(true)
                                } }
                                icon="upload" 
                            />
                        </View>
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
                                navigation.navigate("ClockCustomiseScreen",{
                                    locations: locations,
                                    membersRef: membersRef,
                                });
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

            <Modal 
                isVisible={isUpdateStatusModal}
                onBackdropPress={() => setIsUpdateStatusModal(false)}
                className="items-center"
            >
                <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-5">Update Status</Text>
                    <SelectDropdown
                        buttonStyle={{borderRadius:8, backgroundColor:"white"}}
                        data={locations}
                        renderDropdownIcon={isOpened => {
                            return <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} color={"black"} size={18}/>
                        }}
                        dropdownIconPosition={'right'}
                        defaultButtonText={'Select a status'}
                        onSelect={(selectedItem, index) => {
                            setNewStatusIndex(index)
                        }}
                    />
                   <View className="pt-5 w-full items-center">
                        <AppButtonPurple
                            title="Update Status"
                            onPress={async ()=>{
                                const groupMembersRef = query(ref(getDatabase(), "/groupMembers/" + membersRef));
                                const dataMembers = await get(groupMembersRef);
                                    if (dataMembers.val() !== null) {
                                        dataMembers.forEach(async c => {
                                            if (c.val()["member"] ===  uid) {
                                                await update(ref(getDatabase(), "/groupMembers/" + membersRef + "/" + c.key),{
                                                    status: newStatusIndex
                                                })
                                            }
                                        });
                                    }
                                setIsUpdateStatusModal(false)
                                navigation.navigate("HomeScreen")
                            }}
                        />
                    </View>
                    
                </View>
            </Modal>
        </SafeAreaView>

    );
};

export default GroupScreen;