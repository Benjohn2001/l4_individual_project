import { Component } from "react";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import PressableIcon from "./PressableIcon";
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";

function AddFromFriends (props) {
    const [pic, setPic] = useState(Image.resolveAssetSource(require('../assets/defaultProfilePic.png')).uri);
    const { title, onPress, avatar} = props;
    
    if(avatar!== ""){
        getDownloadURL(stref(getStorage(), avatar)).then((url)=>{
            setPic(url)
        })
    }else{
        setPic(Image.resolveAssetSource(require('../assets/defaultProfilePic.png')).uri)
    }
    return (
        <View className="pt-3 w-full items-center">
            <TouchableOpacity className="bg-primaryPurple h-16 pt-1 w-11/12  rounded-2xl mx-1.5">
                <View className="flex-row">
                    <View className="ml-3">
                        <Image 
                            className="w-14 h-14 rounded-full" 
                            source = {{uri: pic}}
                        />
                    </View>
                    <Text  className="text-black text-sm text-center ml-10 pt-4">{title}</Text>
                    <View className="ml-auto mr-5 pt-3">
                    <PressableIcon
                        onPress={onPress}
                        icon="plus-square"
                        size={30}
                        color="black"
                    /> 
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        );
}

AddFromFriends.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired
};

export default AddFromFriends;