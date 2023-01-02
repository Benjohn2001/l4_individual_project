import { Component, useState } from "react";
import React from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import PressableIcon from "./PressableIcon";
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";
import { query, get, ref, getDatabase } from 'firebase/database';

function GroupButtonFB (props) {

    const { groupName, onPress, membRef} = props;
    const [pics, setPics] = useState([]);
    const [urls, setUrls] = useState([])
    const [membersKeys, setMembersKeys] = useState([])
    const [fetched, setFetched]=useState(false)

    React.useEffect(() =>{
        fetchData()
    },[] )

    const fetchData = async () =>{
        //console.log("in fetchdata")
        setFetched(false)
        setMembersKeys([])
        setUrls([])
        setPics([])
        const groupMembersRef = query(ref(getDatabase(), "/groupMembers/"+membRef))
        const data = await get(groupMembersRef)
        //console.log(data)
        //only looping though first object, data has all the members however, when using memberskeys array, and looping through this
        //all photos load after multiple refreshes

        //ThIS LOADS JUST THE FIRST IMAGE BUT WORKS ON OPEN OF HOM E PAGE
        data.forEach( async c => {
            //console.log(c)
            const userRef = query(ref(getDatabase(), "/users/"+c.val()["member"]))
            const data = await get(userRef)
            //console.log(data)
            await getDownloadURL(stref(getStorage(),data.val()["profilePic"])).then((url)=>{
                setPics(a => {return [...a , url]})
            })
        })

        //THIS SHOWS ALL AFTER REFRESHIG THIS FILE, but not with home
        
        // data.forEach(  c => {
        //     console.log(c)
        //     setMembersKeys(a => {return [...a , c]})
        // })
        // for(const i in membersKeys ){
        //     const userRef = query(ref(getDatabase(), "/users/"+membersKeys[i].val()["member"]))
        //     const data = await get(userRef)
        //     console.log(data)
        //     await getDownloadURL(stref(getStorage(),data.val()["profilePic"])).then((url)=>{
        //         setPics(a => {return [...a , url]})
        //     })
        // }
        setFetched(true)
    }
    //console.log("pics")
    //console.log(pics)
    //console.log("-----------------------")
    
    return (
        <View className="items-center w-full">
        <View className="py-3 w-11/12 bg-primaryDarker h-36 rounded-2xl">
            <TouchableOpacity onPress={onPress} >
            <View className="flex-row w-11/12 pb-3">
                <Text  className="text-black text-2xl text-center ml-5 mr-3">{groupName}</Text>
                <View  className="ml-auto mr-5">
                    <Feather
                        name="arrow-right"
                        size={32}
                        color="black"
                    /> 
                </View>  
            </View>
            </TouchableOpacity>
            <View className="items-center">
            {fetched ? 
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={pics}
                        extraData={pics}
                        renderItem={ ({item})=>(
                            <View className="mx-1">
                                <Image 
                                    className="w-16 h-16 rounded-full" 
                                    source = {{uri: item}}
                                />
                            </View>
                        )}
                    />
                :
                    <ActivityIndicator size="large" color="#6B4EFF"  />
                }
            </View>

        </View>
        </View>
        
    );
}

GroupButtonFB.propTypes = {
    groupName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    membRef: PropTypes.string.isRequired
};

export default GroupButtonFB;