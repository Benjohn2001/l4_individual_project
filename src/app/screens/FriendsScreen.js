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


const FriendsScreen = ({ navigation }) => {

    const [searchVis, setSearchVis] = useState(false)
    const [spinVis, setSpinVis] = useState(false)
    const [unames, setUnames] = useState([])
    const [filtered, setFiltered] = useState([])
    const [urls, setUrls] = useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            setUnames([])
            const unamesRef = query(ref(getDatabase(), "/users"), orderByChild("userName"))
            const data = await get(unamesRef)
            data.forEach(c => {
                setUnames(a => {return [...a , c.val()]})
            })
        }
        fetchData()
    }, [])

    const filterUname = (name) => {
        setFiltered([])
        unames.filter((str)=>{
                if(str["userName"].includes(name)){
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
                        placeholder="Search for a user"
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
                                            alert("View Profile");
                                        } }
                                        avatar={ item["profilePic"] }
                                    />
                                )
                                }
                            />
                        </View>
                </View>
            

                :

            <><ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                       
                        <FriendsRow
                            title="Bill Smith"
                            onPress={() => {
                                alert("View Profile");
                            } }
                            avatar={require('../assets/ben-avatar.png')} />
                        <FriendsRow
                            title="Bill Smith"
                            onPress={() => {
                                alert("View Profile");
                            } }
                            avatar={require('../assets/ben-avatar.png')} />
                    </ScrollView><PillButton
                            title="Invite more friends"
                            onPress={() => {
                                alert("Invite more friends");
                            } } /></>
            }
        </SafeAreaView>

    );
};

export default FriendsScreen;