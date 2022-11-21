import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import ProfileBox from '../components/ProfileBox';
import RowItem from '../components/RowItem';
import PillButton from '../components/PillButton';
import { auth } from '../../firebase';
import { getDatabase, ref, set, onValue, orderByChild, query, equalTo, get, child, update, push, remove } from "firebase/database";
import { useRef } from 'react';
import Modal from "react-native-modal";
import TwoButtonStack from '../components/TwoButtonStack';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";
import PressableIcon from '../components/PressableIcon';


const UserProfileScreen = ({ route, navigation }) => {
    
    const [nameFull, setNameFull] = useState("")
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
    const [pic, setPic] = useState("")
    const [friend, setFriend] = useState(false)
    const db=getDatabase()
    const uid=auth.currentUser.uid

    const user = route.params.user

    useEffect(()=>{
        setNameFull(user.val()["firstName"]+" "+user.val()["lastName"])
        setUserName(user.val()["userName"])
        setBio(user.val()["bio"])
        if(user.val()["profilePic"]!== undefined){
            getDownloadURL(stref(getStorage(), user.val()["profilePic"])).then((url)=>{
                setPic(url)
            })
        }else{
            setPic(Image.resolveAssetSource(require('../assets/defaultProfilePic.png')).uri)
        }
        const checkFriend = async () =>{
            const friendsRef = ref(getDatabase(), "/friends/"+uid)
            const dataFr = await get(friendsRef)
            if(dataFr.val() !== null){
                dataFr.forEach(c => {
                    if(c.val()["user"]==user.key){
                        setFriend(true)
                    }
                })
            }
        }

        checkFriend()
        
    },[])
    
    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 mx-10">
                <PressableIcon
                        onPress={() => {
                            navigation.push('HomeScreen', { screen: 'Friends' })
                        }}
                        icon="arrow-left"
                        size={40}
                        color="black"
                    />
                <Text className="font-bold ml-auto mr-auto text-3xl">
                    User Profile
                </Text>
            </View>
            {pic ? <View className="items-center justify-center pt-14">
                <Image 
                    className="w-44 h-44 rounded-full" 
                    source = {{uri: pic}}
                />
                <View className="py-12">
                    <ProfileBox
                        name={nameFull}
                        username={userName}
                        bio={bio}
                    />
                </View>
                {friend ? 
                    <AppButtonPurple
                        title={"Remove friend"}
                        onPress={async ()=>{
                            const dref=query(ref(db, "/friends/"+uid))
                            const data = await get(dref)
                            if(data.val() !== null){
                                data.forEach(c => {

                                    if(c.val()["user"]==user.key){
                                        remove(ref(db, "/friends/"+uid+"/"+c.key))
                                    }
                                })
                            }
                            Alert.alert("Success","Friend removed succesfully")
                            setFriend(false)
                            }
                        }
                    />
                :
                <AppButtonPurple
                    title={"Add friend"}
                    onPress={async ()=>{
                        const pref=push(ref(db, '/friends/' + uid ))
                        await set(pref,{
                            user: user.key
                        })
                        Alert.alert("Success","Friend added succesfully")
                        setFriend(true)
                    }}
                />
                }
            </View> : 
            <View className="justify-center items-center flex-1">
                <ActivityIndicator size="large" color="#6B4EFF"  />
                <Text className="text-center">Loading Profile</Text>
            </View>
            }
        </SafeAreaView>
    );
};

export default UserProfileScreen;