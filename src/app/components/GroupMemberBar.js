import { Component} from "react";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Image, View, Vibration } from "react-native";
import { Feather } from '@expo/vector-icons';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";

function GroupMemberBar (props) {
    const [pic, setPic] = React.useState(Image.resolveAssetSource(require('../assets/defaultProfilePic.png')).uri);
    const { title, onPress, avatar, color} = props;

    React.useEffect(()=>{
        if(avatar !== undefined){
            getDownloadURL(stref(getStorage(), avatar)).then((url)=>{
                setPic(url)
            })
        }else{
            setPic(Image.resolveAssetSource(require('../assets/defaultProfilePic.png')).uri)
        }
    })

    
    return (
        <View className="items-center py-1">
            <TouchableOpacity onPress={onPress} className="bg-secondaryPurple h-14 w-80 rounded-2xl mx-1.5">
                <View className="flex-row justify-between items-center mx-3 pt-1">
                    <Image 
                        className="w-12 h-12 rounded-full" 
                        source = {{uri: pic}}
                    />
                    <Text  className="text-black text-lg text-center pt-1">{title}</Text>
                    <View className="h-8 w-8 rounded-full" style={{backgroundColor: color}}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}


GroupMemberBar.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    avatar: PropTypes.string,
    color: PropTypes.string.isRequired
};

export default GroupMemberBar;