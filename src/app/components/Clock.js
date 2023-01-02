import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Image, View, Vibration } from "react-native";
import { Feather } from '@expo/vector-icons';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";
import { Dimensions } from 'react-native';
import Svg from 'react-native-svg';
import Labels from './Labels';

function Clock (props){

    const {locations} = props
    const spaceBetween = (Math.PI * 2) / locations.length
    const windowWidth = Dimensions.get("window").width

    const diameter = windowWidth-40
    const center=windowWidth/2
    const radius = diameter/2


    return(
        <Svg height={windowWidth} width={windowWidth}>
            <Labels
                radius={radius}
                center={center}
                locations={locations}
            />
        </Svg>

    ); 
}

Clock.propTypes = {
    locations: PropTypes.array.isRequired,
}

export default Clock