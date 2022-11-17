import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import FriendsRow from '../components/FriendsRow';
import PressableIcon from '../components/PressableIcon';
import PillButton from '../components/PillButton';
import SearchBar from "react-native-dynamic-search-bar";
import { getDatabase, ref, set, onValue, orderByChild, query, equalTo, get, child, update, startAt, endAt} from "firebase/database";
import { async } from '@firebase/util';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";
import FriendsRowSearch from '../components/FriendsRowSearch';
import { auth } from '../../firebase';


const FriendsScreen = ({ navigation }) => {

    const [searchVis, setSearchVis] = useState(false)
    const [spinVis, setSpinVis] = useState(false)
    const [unames, setUnames] = useState([])
    const [friends, setFriends] = useState([])
    const [filtered, setFiltered] = useState([])
    const [urls, setUrls] = useState([])
    const uid = auth.currentUser.uid

    useEffect(()=>{
        const fetchData = async () =>{
            setUnames([])
            const unamesRef = query(ref(getDatabase(), "/users"), orderByChild("userName"))
            const data = await get(unamesRef)
            data.forEach(c => {
                if(c.val()["email"] != auth.currentUser.email){
                    setUnames(a => {return [...a , c.val()]})
                }
            })
            setFriends([])
            const friendsRef = ref(getDatabase(), "/friends/"+uid)
            const dataFr = await get(friendsRef)
            dataFr.forEach(c => {
                setFriends(a => {return [...a , c.val().u]})
            })
        }
        fetchData()
    }, [])

    const filterUname = (name) => {
        setFiltered([])
        unames.filter((str)=>{
                if(str["userName"].toLowerCase().includes(name.toLowerCase())){
                    setFiltered(a => {return [...a , str]}) 
                }
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 pb-10 mx-10">
                <PressableIcon
                    onPress={() => {
                        setSearchVis(false)
                    }}
                    icon="users"
                    size={40}
                    color="black"
                />
                <Text className="font-bold text-3xl">
                    My Friends
                </Text>
                <PressableIcon
                    onPress={() => {
                        setSearchVis(true)
                    }}
                    icon="search"
                    size={40}
                    color="black"
                />
            </View>
            {
                searchVis ?
                <View>
                    <SearchBar
                        className="bg-secondaryPurple  h-12 w-11/12"
                        placeholder="Search for a username"
                        iconColor="6B4EFF"
                        spinnerVisibility={spinVis}
                        onChangeText={text => {
                            if (text.length === 0) {
                                setSpinVis(false);
                            } else {
                                setSpinVis(true);
                            }
                            filterUname(text);
                        } }

                        onClearPress={() => {
                            filterUname('');
                        } } />
                        <View>
                            <FlatList
                                data={filtered}
                                renderItem={ ({item})=>(
                                    <FriendsRowSearch
                                        title={item["userName"]}
                                        onPress={() => {
                                            navigation.push('UserProfileScreen', {
                                                user: item,
                                              });
                                        } }
                                        avatar={ item["profilePic"] }
                                    />
                                )
                                }
                            />
                        </View>
                </View>
            

                :

            <View>
                <FlatList
                    data={friends}
                    renderItem={ ({item})=>(
                        <FriendsRowSearch
                            title={item["userName"]}
                            onPress={() => {
                                navigation.push('UserProfileScreen', {
                                    user: item,
                                    });
                            } }
                            avatar={ item["profilePic"] }
                        />
                    )
                    }
                />
                <PillButton
                    title="Invite more friends"
                    onPress={() => {
                        alert("Invite more friends");
                    } } 
                />
            </View>
            }
        </SafeAreaView>

    );
};

export default FriendsScreen;