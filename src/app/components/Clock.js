import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text,  View, Vibration } from "react-native";
import { Feather } from '@expo/vector-icons';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";
import { Dimensions } from 'react-native';
import Svg, { Circle, Defs, Pattern, Image, ClipPath } from 'react-native-svg';
import Labels from './Labels';
import ClockHand from './ClockHand';
import { query, get, ref, getDatabase } from 'firebase/database';


function Clock (props){

    const {locations, face, membs} = props

    const [members, setMembers] = React.useState([])
    const [fetched, setFetched] = React.useState(false)

    React.useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () =>{
        setFetched(false)
        setMembers([])
        for (const i in membs) {
            const userRef = query(ref(getDatabase(), "/users/"+membs[i].val()["member"]))
            const data = await get(userRef)
            setMembers(a => {return [...a , [data,membs[i].val()["colour"],membs[i].val()["status"]]]})
        }
        setFetched(true)
    }

    const windowWidth = Dimensions.get("window").width

    const [pic, setPic] = React.useState("")

    const diameter = windowWidth-40
    const center=windowWidth/2
    const radius = diameter/2

    if(face.length===7){
        return(
            <Svg height={windowWidth} width={windowWidth}>
            <Circle cx={center} cy={center} r={radius+15} stroke={"black"} strokeWidth={2} fill="#6B4EFF"/>
            <Circle cx={center} cy={center} r={radius-15} stroke={"black"} strokeWidth={2} fill={face}/>
            <Circle cx={center} cy={center} r={radius-15} stroke={"black"} strokeWidth={2}/>
            <Labels
                radius={radius}
                center={center}
                locations={locations}
            />
            {fetched ? 
                <ClockHand
                    radius={radius}
                    center={center}
                    members={members}
                />
            :
            <></>
            }
        </Svg>
        )
    }else{
        getDownloadURL(stref(getStorage(), face)).then((url)=>{
            setPic(url)
        })
    return(
        <Svg height={windowWidth} width={windowWidth}>

            <Defs>
                <ClipPath id="clip" >
                    <Circle cx={center} cy={center} r={radius-15} stroke={"black"} strokeWidth={2} fill="url(#image)"/>
                </ClipPath>
            </Defs>
            <Circle cx={center} cy={center} r={radius+15} stroke={"black"} strokeWidth={2} fill="#6B4EFF"/>
            
            <Image width={windowWidth} height={windowWidth} preserveAspectRatio="none" href={{uri: pic}} clipPath="url(#clip)"/>
            <Circle cx={center} cy={center} r={radius-15} stroke={"black"} strokeWidth={2}/>

            <Labels
                radius={radius}
                center={center}
                locations={locations}
            />

            {fetched ? 
                <ClockHand
                    radius={radius}
                    center={center}
                    members={members}
                />
            :
            <></>
            }
        </Svg>

    ); 
    }
}

Clock.propTypes = {
    locations: PropTypes.array.isRequired,
    face: PropTypes.string.isRequired,
    membs: PropTypes.array.isRequired
}

export default Clock