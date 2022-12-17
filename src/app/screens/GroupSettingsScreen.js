import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import RowItem from '../components/RowItem';
import PressableIcon from '../components/PressableIcon';
import Modal from "react-native-modal";
import TwoButtonStack from '../components/TwoButtonStack';
import { getDatabase, ref, set, onValue, orderByChild, query, equalTo, get, push, remove} from 'firebase/database';
import SearchBar from "react-native-dynamic-search-bar";
import FriendsRowSearch from '../components/FriendsRowSearch';
import { auth } from '../../firebase';
import AddFromFriends from '../components/AddFromFriends';


const GroupSettingsScreen = ({ route, navigation }) => {

    const membRef=route.params.membRef
    const name=route.params.name
    const [searchVis, setSearchVis] = React.useState(false)

    const [isLeaveModalVisible, setLeaveModalVisible] = React.useState(false)
    const [spinVis, setSpinVis] = React.useState(false)
    const [unames, setUnames] = React.useState([])
    const [friends, setFriends] = React.useState([])
    const [friendsKeys, setFriendsKeys] = React.useState([])
    const [filtered, setFiltered] = React.useState([])
    const [membersKeys, setMembersKeys] = React.useState([])
    const [fetched, setFetched]= React.useState(false)
    const uid = auth.currentUser.uid


    React.useEffect(()=>{
        fetchData()
        getFriends()
    }, [searchVis])

    const fetchData = async () =>{
        setUnames([])
        setMembersKeys([])
        const unamesRef = query(ref(getDatabase(), "/users"), orderByChild("userName"))
        const data = await get(unamesRef)
        data.forEach(c => {
            if(c.val()["email"].toLowerCase() != auth.currentUser.email.toLowerCase()){
                setUnames(a => {return [...a , c]})
            }
        })
        const groupMembersRef = query(ref(getDatabase(), "/groupMembers/"+membRef))
        const dataMem = await get(groupMembersRef)
        dataMem.forEach(c => {
            setMembersKeys(a => {return [...a , c.val()["member"]]})
        })

    }

    const getFriends = async () =>{
        setFetched(false)
        setFriendsKeys([])
        setFriends([])
        const friendsRef = ref(getDatabase(), "/friends/"+uid)
        const dataFr = await get(friendsRef)
        dataFr.forEach(c => {
            // console.log(membersKeys)
            // console.log(c.val()["user"])
            // console.log(!membersKeys.includes(c.val()["user"]))

            // trying to not show friends already in the group not working on first load, works after refresh
            if(!membersKeys.includes(c.val()["user"])){
                setFriendsKeys(a =>{return [...a, c.val()["user"]]})
            }
        })

        for(const i in unames){
            if(friendsKeys.includes(unames[i].key)){
                setFriends(a => {return [...a , unames[i]]})
            }
        }
        setFetched(true)
    }

    const filterUname = (name) => {
        setFiltered([])
        friends.filter((str)=>{
                if(str.val()["userName"].toLowerCase().includes(name.toLowerCase())){
            
                    setFiltered(a => {return [...a , str]}) 
                }
        })
    }




    return (      
        <SafeAreaView className="flex-1 bg-primaryPurple" >
             {searchVis ?

                <><View className="flex-row justify-between pt-14">
                    <View className="ml-auto">
                        <PressableIcon
                            onPress={() => {
                                setSearchVis(false)
                            } }
                            icon="arrow-left"
                            size={40}
                            color="black" />
                    </View>
                    <Text className="font-bold ml-auto mr-auto text-3xl">
                        Add From Friends
                    </Text>
                </View><View className="pt-10">
                        <SearchBar
                            className="bg-secondaryPurple h-12 w-11/12"
                            placeholder="Search for a username"
                            iconColor="6B4EFF"
                            spinnerVisibility={spinVis}
                            onChangeText={text => {
                                setFiltered([]);
                                if (text.length === 0) {
                                    setSpinVis(false);
                                } else {
                                    setSpinVis(true);
                                }
                                filterUname(text);
                            } }

                            onClearPress={() => {
                                filterUname('');
                                setSpinVis(false);
                            } } />
                        <FlatList
                            data={filtered}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <AddFromFriends
                                    title={item.val()["userName"]}
                                    onPress={async () => {
                                        const groupsRef = push(ref(getDatabase(), "/groups/" + item.key));
                                        const groupMembersRef = push(ref(getDatabase(), "/groupMembers/" + membRef));

                                        await set(groupsRef, {
                                            name: name,
                                            membersRef: membRef
                                        });
                                        await set(groupMembersRef, {
                                            member: item.key
                                        });

                                        setSearchVis(false)
                                    } }
                                    avatar={item.val()["profilePic"]} />
                            )} />
                    </View></>

            :
            <><View className="flex-row justify-between pt-14 mx-10">
                    <PressableIcon
                        onPress={() => {
                            navigation.goBack();
                        } }
                        icon="arrow-left"
                        size={40}
                        color="black" />
                    <Text className="font-bold ml-auto mr-auto text-3xl">
                        Group Settings
                    </Text>
                </View><Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
                        Add to Group
                    </Text><View className='items-center'>
                        <RowItem
                            title="From Friends"
                            icon="users"
                            onPress={() => {
                                setSearchVis(true);
                            } }
                            color="black" />
                        <RowItem
                            title="Invite Friends"
                            icon="share-2"
                            onPress={() => {
                                alert("invite Friends");
                            } }
                            color="black" />
                    </View><Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
                        Admin
                    </Text><View className='items-center'>
                        <RowItem
                            title="Change Group Name"
                            icon="edit-3"
                            onPress={() => {
                                alert("Change Group Name");
                            } }
                            color="black" />
                        <RowItem
                            title="Leave Group"
                            icon="trash-2"
                            onPress={() => {
                                setLeaveModalVisible(true);
                            } }
                            color="red" />
                    </View><Modal
                        isVisible={isLeaveModalVisible}
                        onBackdropPress={() => setLeaveModalVisible(false)}
                        className="items-center"
                    >
                        <View className=" w-full h-1/4 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                            <Text className="text-2xl font-bold  pb-2">Leave Group</Text>
                            <Text className="text-l pb-2">Are you sure you want to leave this group?</Text>
                            <View className="pt-5">
                                <TwoButtonsSide
                                    title1="Cancel"
                                    onPress1={() => { setLeaveModalVisible(false); } }
                                    icon1="x-circle"
                                    color1="#C6C4FF"
                                    title2="Leave"
                                    onPress2={async () => {
                                        const groupsRef = query(ref(getDatabase(), "/groups/" + uid));
                                        const groupMembersRef = query(ref(getDatabase(), "/groupMembers/" + membRef));

                                        const dataGroups = await get(groupsRef);
                                        if (dataGroups.val() !== null) {
                                            dataGroups.forEach(c => {
                                                if (c.val()["membersRef"] == membRef) {
                                                    remove(ref(getDatabase(), "/groups/" + uid + "/" + c.key));
                                                }
                                            });
                                        }
                                        const dataMembers = await get(groupMembersRef);
                                        if (dataMembers.val() !== null) {
                                            dataMembers.forEach(c => {
                                                if (c.val()["member"] == uid) {
                                                    remove(ref(getDatabase(), "/groupMembers/" + membRef + "/" + c.key));
                                                }
                                            });
                                        }
                                        setLeaveModalVisible(false);
                                        navigation.navigate("HomeScreen");
                                    } }
                                    icon2="trash-2"
                                    color2="red" />
                            </View>

                        </View>


                    </Modal></>
            }

        </SafeAreaView>

    );
};

export default GroupSettingsScreen;