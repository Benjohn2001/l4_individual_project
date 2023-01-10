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
import { getDatabase, ref, set, onValue, orderByChild, query, equalTo, get, child, update} from "firebase/database";
import { useRef } from 'react';
import Modal from "react-native-modal";
import TwoButtonStack from '../components/TwoButtonStack';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";

const MeScreen = ({ navigation }) => {

    const db = getDatabase()
    const user = auth.currentUser
    const uid = user.uid
    const unamesRef = query(ref(db, "/users/"+uid))
    
    const [nameFull, setNameFull] = useState("")
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
    const [bioNew, setBioNew] = useState("")
    const [pic, setPic] = useState("")
    const [isBioModalVisible, setBioModalVisible] = React.useState(false);
    const [userNameNew, setuserNameNew] = useState("")
    const [isuserNameModalVisible, setuserNameModalVisible] = React.useState(false);
    const [isPicModalVisible, setPicModalVisible] = React.useState(false);
    const [picUp, setPicUp] = React.useState("")
    const [uploading, setUploading] = React.useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.2,
        });

        if (!result.cancelled) { 
            setPicUp(result.uri);
        }
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        const fileRef = stref(getStorage(),"images/profilePics/"+uid)
        const uploadTask = await uploadBytes(fileRef, blob);
      
        blob.close();
      
        return await getDownloadURL(fileRef);
      }

    useEffect(()=>{
        onValue(unamesRef, (snapshot) => {
            if(snapshot.exists){
                const data = snapshot.val()
                setNameFull(data["firstName"]+" "+data["lastName"])
                setUserName(data["userName"])
                setBio(data["bio"])
                if(data["profilePic"]!== undefined){
                    getDownloadURL(stref(getStorage(), data["profilePic"])).then((url)=>{
                        setPic(url)
                    })
                }else{
                    setPic(Image.resolveAssetSource(require('../assets/defaultProfilePic.png')).uri)
                }
            }
        },{}
        )
        
    },[])
    
    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            {pic ? <View className="items-center pt-14">
                <Image 
                    className="w-44 h-44 rounded-full" 
                    source = {{uri: pic}}
                />
                <View className="py-3">
                    <ProfileBox
                        name={nameFull}
                        username={userName}
                        bio={bio}
                    />
                </View>
                <RowItem
                        title="Change my username"
                        icon="edit-3"
                        onPress={() => {
                            setuserNameModalVisible(true)
                        }}
                        color="black"
                />
                <RowItem
                        title="Change my profile picture"
                        icon="camera"
                        onPress={() => {
                            setPicModalVisible(true)
                        }}
                        color="black"
                />
                <RowItem
                        title="Change my bio"
                        icon="edit-3"
                        onPress={() => {
                            setBioModalVisible(true)
                        }}
                        color="black"
                />
            </View> : 
            <View className="justify-center items-center flex-1">
                <ActivityIndicator size="large" color="#6B4EFF"  />
                <Text className="text-center">Loading Profile</Text>
            </View>
            }
            <View className="mt-auto py-3">
                <PillButton
                    title="Share my profile"
                    onPress={() => {
                        alert("Share my profile")
                    }}
                    icon="share-2"
                />
            </View>

            <Modal 
                isVisible={isBioModalVisible}
                onBackdropPress={() => setBioModalVisible(false)}
                className="items-center"
            >
                <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Change my bio</Text>
                    <Text className="text-center text-gray-500 py-4">Enter a new bio {'\n'} Max 50 characters</Text>
                    <TextInput 
                        className="bg-white my-5 w-full mx-3 h-12 rounded-md" 
                        placeholder="bio" 
                        underlineColorAndroid = "transparent"
                        cursorColor={COLOURS.darkerPurple}
                        maxLength={50}
                        value={bioNew}
                        onChangeText={(val) => setBioNew(val)}
                    />
                    <AppButtonPurple
                        title="Change Bio"
                        onPress={async ()=>{
                            await update(ref(db, '/users/' + uid ), {
                                bio: bioNew
                            }).then(()=>{
                                Alert.alert("Success","Bio changed succesfully")
                                setBioModalVisible(false)
                            })
                            setBioNew("")
                        }}
                    />
                    
                </View>
            </Modal>
            <Modal 
                isVisible={isuserNameModalVisible}
                onBackdropPress={() => setuserNameModalVisible(false)}
                className="items-center"
            >
                <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Change my username</Text>
                    <Text className="text-center text-gray-500 py-4">Enter a new username</Text>
                    <TextInput 
                        className="bg-white my-5 w-full mx-3 h-12 rounded-md" 
                        placeholder="username" 
                        underlineColorAndroid = "transparent"
                        cursorColor={COLOURS.darkerPurple}
                        maxLength={15}
                        value={userNameNew}
                        onChangeText={(val) => setuserNameNew(val)}
                    />
                    <AppButtonPurple
                        title="Change Username"
                        onPress={async ()=>{
                            const unamesRef = query(ref(db, "/users"), orderByChild("userName"), equalTo(userNameNew))
                            const snapshot = await get(unamesRef)
                                if(snapshot.val() !== null){
                                    console.log("snapshot exists")
                                    Alert.alert("Username taken", "Please select a new username")
                                }else{
                                    await update(ref(db, '/users/' + uid ), {
                                        userName: userNameNew
                                    }).then(()=>{
                                        Alert.alert("Success","Username changed succesfully")
                                    })
                                    setuserNameModalVisible(false)
                                }
                                setuserNameNew("")
                        }}
                    />
                    
                </View>
            </Modal>
            {uploading ? 
            <View className="justify-center items-center flex-1">
                <ActivityIndicator size="large" color="#6B4EFF"  />
                <Text className="text-center">Uploading</Text>
            </View>
            :
            <Modal 
                isVisible={isPicModalVisible}
                onBackdropPress={() => setPicModalVisible(false)}
                className="items-center"
            >
                <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Change profile pic</Text>
                    <Text className="text-center text-gray-500 py-4">Select a new profile pic</Text>
                    <View className="pb-5">
                        {picUp && <Image source={{ uri: picUp }} className="h-28 w-28 rounded-full" />}
                    </View>
                    <TwoButtonStack
                        title1="Upload new picture"
                        onPress1={() => {
                            pickImage()
                        }}
                        title2="Save picture"
                        onPress2={async () => {
                            if(picUp==""){
                                Alert.alert("No image selected","Please upload an image")
                            }else{
                                setUploading(true)
                                setPicModalVisible(false)
                                const upload_url= await uploadImageAsync(picUp)
                                setUploading(false)
                                console.log(upload_url)
                                setPic(upload_url)
                                await update(ref(db, '/users/' + uid ), {
                                    profilePic: "images/profilePics/"+uid
                                }).then(()=>{
                                    Alert.alert("Success","Profile pic changed succesfully")
                                })
                            }
                            setPicUp("")
                        }}
                    
                    />
                    
                </View>
            </Modal> }   
        </SafeAreaView>
    );
};

export default MeScreen;