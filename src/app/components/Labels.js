import { G, Line, Text } from "react-native-svg";
import React from "react";
import { polar2cart } from "./polar2cart";
import PropTypes from 'prop-types';

function Labels(props){
    const {radius, center, locations} = props
    const divisions=360/locations.length

    function textTransformHelper(i,x,y){
        if(i===0 || i===3 ){
            return("translate("+x+"," +y+") rotate(30)")
        }else if(i===1){
            return("translate("+x+"," +y+") rotate(90)")
        }else if(i===4){
            return("translate("+x+"," +y+") rotate(-90)")
        }else if(i===2 || i===5 ){
            return("translate("+x+"," +y+") rotate(-30)")
        }
        else{
            return("")
        }
    }
    const labelLines=locations.map((label,index)=>{
        const start = polar2cart(center,center,0,index*divisions)
        const end = polar2cart(center,center,radius+15,index*divisions)
        const locat = polar2cart(center, center, radius, (index+0.5)*60)
        return(
            <G key={index}>
                <Line
                    stroke={"black"}
                    strokeWidth={2}
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    strokeLinecap={"round"}
                    y2={end.y}
                />
                <Text
                    fontSize={15}
                    fontWeight="bold"
                    fill={"black"}
                    transform={textTransformHelper(index,locat.x, locat.y)}
                    alignmentBaseline="central"
                    textAnchor='middle'
                >
                    {label}

                </Text>
            </G>
        )
    })
    return(
        <G>
            {labelLines}
        </G>
    )
}

Labels.propTypes = {
    radius: PropTypes.number.isRequired,
    center: PropTypes.number.isRequired,
    locations: PropTypes.array.isRequired,
}

export default Labels