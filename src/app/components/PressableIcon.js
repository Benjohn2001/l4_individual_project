import { Component } from "react";
import PropTypes from 'prop-types';
import { Pressable, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

class PressableIcon extends Component {
    render(){
        const { onPress , icon, size, color } = this.props;
		return (
            <View className="flex-row">
                <Pressable onPress={onPress}>
                        <Feather name={icon} size={size} color={color} />
                </Pressable>
            </View>
        );
    }
}

PressableIcon.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
};
        
export default PressableIcon;