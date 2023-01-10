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
import { getDatabase, update, ref, set, query, get, onValue } from 'firebase/database';
import ColorPicker from 'react-native-wheel-color-picker';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString, deleteObject } from "firebase/storage";
import {ref as stref} from "firebase/storage";
import TwoButtonStack from '../components/TwoButtonStack';
import { Alert } from 'react-native';
import { auth } from '../../firebase';
import { fetchUpdateAsync } from 'expo-updates';
import { async } from '@firebase/util';

const ClockCustomiseScreen = ({ route, navigation }) => {

    const locations=route.params.locations
    const membersRef=route.params.membersRef

    const [toBeChanged, setToBeChanged] = React.useState("")
    const [toBeChangedIndex, setToBeChangedIndex] = React.useState("")
    const [isLocatModalVisible, setIsLocatModalVisible] = React.useState(false)
    const [newLocationEntry, setNewLocationEntry] = React.useState(false)
    const [newLocation, setNewLocation] = React.useState("")
    const [newColourEntry, setNewColourEntry] = React.useState(false)
    const [newColour, setNewColour] = React.useState("")
    const [newImageEntry, setNewImageEntry] = React.useState(false)
    const [isFaceModalVisible, setIsFaceModalVisible] = React.useState(false)
    const [picUp, setPicUp] = React.useState("")
    const [newHandColour, setNewHandColour] = React.useState("")
    const [isHandModalVisible, setIsHandModalVisible] = React.useState(false)
    const [colours, setColours] = React.useState([])

    const uid = auth.currentUser.uid
    const groupMembersRef = query(ref(getDatabase(), "/groupMembers/"+membersRef))

    React.useEffect(()=>{
        fetchData()
    }, [isHandModalVisible])

    const fetchData = async () => {
        setColours([])
        const data = await get(groupMembersRef)
        data.forEach(c => {
            setColours(a => {return [...a , c.val()["colour"]]})
        })
    }


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
      
        const fileRef = stref(getStorage(),"images/clockFaces/"+membersRef)
        const uploadTask = await uploadBytes(fileRef, blob);
      
        blob.close();
      
        return await getDownloadURL(fileRef);
      }

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
                        setIsFaceModalVisible(true)
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
                        setIsHandModalVisible(true)
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

            <Modal 
                isVisible={isFaceModalVisible}
                onBackdropPress={() => {
                    setIsFaceModalVisible(false)
                    setNewColourEntry(false)
                    setNewImageEntry(false)
                }}
                className="items-center"
            >
                <View className=" w-full  items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold text-center  pb-2">Change Clock Face</Text>
                    {newColourEntry ?
                            <>
                            <View className="w-full h-1/2">
                                <ColorPicker
                                    color={newColour}
                                    onColorChange={(color) => { setNewColour(color); } } 
                                />
                            </View>
                            <View className="pt-10 w-11/12 items-center">
                                <AppButtonPurple
                                    title="Change Colour"
                                    onPress={async () => {
                                        await set(ref(getDatabase(), "/clockFace/" + membersRef), {
                                            background: newColour
                                        });
                                        const file = stref(getStorage(),"images/clockFaces/"+membersRef)
                                            await getDownloadURL(file).then(deleteObject(stref(getStorage(),"images/clockFaces/"+membersRef)))
                                            .catch(error =>{
                                                if(error.code === 'storage/object-not-found'){
                                                    console.log("no image in storage")
                                                }
                                            })
                                        navigation.navigate("HomeScreen");
                                        setNewColour("");
                                        setNewColourEntry(false)
                                        setIsFaceModalVisible(false);

                                    } } 
                                />
                            </View>
                            </>
                    :
                    <>
                    </>
                    }
                    {newImageEntry ?
                        <><Text className="text-center text-gray-500 py-4">Choose a new clockface</Text>
                        <View className="pb-5">
                            {picUp && <Image source={{ uri: picUp }} className="h-28 w-28 rounded-full" />}
                        </View>
                        <TwoButtonStack
                                title1="Upload new picture"
                                onPress1={() => {
                                    pickImage();
                                } }
                                title2="Save picture"
                                onPress2={async () => {
                                    if (picUp == "") {
                                        Alert.alert("No image selected", "Please upload an image");
                                    } else {
                                        setIsFaceModalVisible(false);
                                        const upload_url = await uploadImageAsync(picUp);
                                        await set(ref(getDatabase(), '/clockFace/' + membersRef), {
                                            background: "images/clockFaces/" + membersRef
                                        }).then(() => {
                                            Alert.alert("Success", "Clock face changed succesfully");
                                        });
                                    }
                                    setPicUp("");
                                    setNewImageEntry(false)
                                    navigation.navigate("HomeScreen")
                                } } /></>
                    :
                    <></>
                    }
                    {newColourEntry || newImageEntry ?
                    <></>
                    :
                    <><Text className="text-center text-gray-500 py-4">Choose either a colour or image</Text><TwoButtonsSide
                            title1="Colour"
                            onPress1={() => {
                                setNewColourEntry(true);
                            } }
                            color1="#C6C4FF"
                            icon1="droplet"
                            title2="Image"
                            onPress2={() => {
                                setNewImageEntry(true);
                            } }
                            icon2="image"
                            color2="#6B4EFF" /></>}
                </View>
            </Modal>

            <Modal 
                isVisible={isHandModalVisible}
                onBackdropPress={() => {
                    setIsHandModalVisible(false)
                }}
                className="items-center"
            >
                <View className=" w-full  items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold text-center  pb-2">Change Hand Colour</Text>
                        <View className="w-full h-1/2">
                            <ColorPicker
                                color={newHandColour}
                                onColorChange={(col) => { setNewHandColour(col); } } 
                            />
                        </View>
                        <View className="pt-10 w-11/12 items-center">
                            <AppButtonPurple
                                title="Change Hand Colour"
                                onPress={async () => {
                                    if(colours.includes(newHandColour)){
                                        Alert.alert("Hand Colour Taken", "Please select a different colour")
                                    }else{
                                        const groupMembersRef = query(ref(getDatabase(), "/groupMembers/" + membersRef));
                                        const dataMembers = await get(groupMembersRef);
                                            if (dataMembers.val() !== null) {
                                                dataMembers.forEach(async c => {
                                                    if (c.val()["member"] ===  uid) {
                                                        await update(ref(getDatabase(), "/groupMembers/" + membersRef + "/" + c.key),{
                                                            colour: newHandColour
                                                        })
                                                    }
                                                });
                                            }
                                        navigation.navigate("HomeScreen");
                                        setIsHandModalVisible(false);
                                        setNewHandColour("");
                                        }
                                } } 
                            />
                        </View>
                </View>
            </Modal>
                        
            

        </SafeAreaView>

        

    );
};

export default ClockCustomiseScreen;