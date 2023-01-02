import { G, Line, Text } from "react-native-svg";
import React from "react";
import { polar2cart } from "./polar2cart";
import PropTypes from 'prop-types';

function Labels(props){
    const {radius, center, locations} = props
    const divisions=360/locations.length
    const labelLines=locations.map((label,index)=>{
        const start = polar2cart(center,center,0,index*divisions)
        const end = polar2cart(center,center,radius-10,index*divisions)
        const locat = polar2cart(center, center, radius+10, index*divisions)
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
                    alignmentBaseline="central"
                    textAnchor="middle"
                    x={locat.x}
                    y={locat.y}
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