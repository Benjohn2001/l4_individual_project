import { G, Line, Text } from "react-native-svg";
import React from "react";
import { polar2cart } from "./polar2cart";
import PropTypes from 'prop-types';

function ClockHand(props){
    const {radius, center, members} = props

    function textTransformHelper(x,y,a){
        return("translate("+x+"," +y+") rotate("+a+")")
    }

    function randInterval(a,b){
        return (Math.floor(Math.random() * (b-a+1) + a))
    }

    function getAngle(i){
        switch(i){
            case 0:
                return randInterval(5,55)
            case 1:
                return randInterval(65,115)
            case 2:
                return randInterval(125,175)
            case 3:
                return randInterval(185,235)
            case 4:
                return randInterval(245,295)
            case 5:
                return randInterval(305,355)
        }
    }


    const clockHands=members.map((member,index)=>{
        if(member[2]===undefined){
            <></>
        }else{
        const angle=getAngle(member[2]) //change to the number of the status selected
        const point = polar2cart(center,center,radius-40,angle)
        const labelPoint = polar2cart(center,center,radius-25,angle)
        return(
            <G key={index}>
                <Line
                    stroke={member[1]}
                    strokeWidth={10}
                    x1={center}
                    x2={point.x}
                    y1={center}
                    strokeLinecap={"round"}
                    y2={point.y} 
                />
                <Text
                    fontSize={15}
                    fontWeight="bold"
                    fill={member[1]}
                    transform={textTransformHelper(labelPoint.x, labelPoint.y, angle)}
                    alignmentBaseline="central"
                    textAnchor='middle'
                >
                    {member[0].val()["firstName"]}
                </Text>
            </G>
        )
        }
    })

    return(
        <G>
            {clockHands}
        </G>
    )
}

ClockHand.propTypes = {
    radius: PropTypes.number.isRequired,
    center: PropTypes.number.isRequired,
    members: PropTypes.array.isRequired
}

export default ClockHand