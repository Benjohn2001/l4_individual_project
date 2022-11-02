import { Component } from "react";
import PropTypes from 'prop-types';
import { Pressable, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

class PressableIcon extends Component {
    render(){
        const { onPress , icon } = this.props;
		return (
            <View className="flex-row">
                <Pressable onPress={onPress}>
                        <Feather name={icon} size={40} color="black" />
                </Pressable>
            </View>
        );
    }
}

PressableIcon.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
};
        
export default PressableIcon;