import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';

class TwoButtonsSide extends Component {
    render(){
        const { title1, onPress1, icon1, title2, onPress2, icon2 } = this.props;
		return (
            <View className="flex-row">
                <TouchableOpacity onPress={onPress1} className="bg-secondaryPurple h-12 w-40 pt-3 rounded-full mx-1.5">
                    <View className="flex-row justify-center">
                        <Feather name={icon1} size={20} color="#6B4EFF" />
                        <Text  className="text-darkerPurple text-sm text-center ml-5">{title1}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress2} className="bg-darkerPurple h-12 w-40 pt-3 rounded-full mx-1.5">
                    <View className="flex-row justify-center">
                        <Feather name={icon2} size={20} color="white" />
                        <Text  className="text-white text-sm text-center ml-5">{title2}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

TwoButtonsSide.propTypes = {
    title1: PropTypes.string.isRequired,
    onPress1: PropTypes.func.isRequired,
    icon1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    onPress2: PropTypes.func.isRequired,
    icon2: PropTypes.string.isRequired
};
        
export default TwoButtonsSide;