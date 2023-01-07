import { G, Line, Text, Defs, ClipPath, Circle, Image,   Svg, Pattern} from "react-native-svg";
import React from "react";
import { polar2cart } from "./polar2cart";
import PropTypes from 'prop-types';
import { getStorage, getDownloadURL, uploadBytesResumable, uploadBytes, uploadString } from "firebase/storage";
import {ref as stref} from "firebase/storage";

function Hand(props){
    const {index, point, center, member} = props

    const [pic, setPic] = React.useState("")


    React.useEffect(() =>{
        fetchData()
    },[] )

    const fetchData = () =>{
            getDownloadURL(stref(getStorage(),member[0].val()["profilePic"])).then((url)=>{
                setPic(url)
            })
    }

    return(
        <G key={index}>
            <Line
                stroke={member[1]}
                strokeWidth={5}
                x1={center}
                x2={point.x}
                y1={center}
                strokeLinecap={"round"}
                y2={point.y} 
            />
            <Circle cx={point.x} cy={point.y} r={22} stroke={member[1]}  fill={member[1]}/>

            <Svg width="50" height="50">
                <Defs>
                    <ClipPath id={"circleView"}>
                        <Circle cx={point.x} cy={point.y} r="20"  />
                    </ClipPath>
                </Defs>
                <Image 
                width="50" 
                height="50" 
                x={point.x-25} y={point.y-25}
                href={{uri: pic}}
                clipPath="url(#circleView)"
                />
            </Svg>                
    
            {/* <Text
                fontSize={15}
                fontWeight="bold"
                fill={member[1]}
                transform={textTransformHelper(labelPoint.x, labelPoint.y, angle)}
                alignmentBaseline="central"
                textAnchor='middle'
            >
                {member[0].val()["firstName"]}
            </Text> */}
        </G>
        
    )
}

Hand.propTypes = {
    index: PropTypes.number.isRequired,
    point: PropTypes.object.isRequired,
    center: PropTypes.number.isRequired,
    member: PropTypes.array.isRequired
}

export default Hand