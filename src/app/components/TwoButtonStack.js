import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';

class TwoButtonStack extends Component {
    render(){
        const { title1, onPress1, title2, onPress2 } = this.props;
		return (
            <View className="flex-col space-y-2">
                    <TouchableOpacity onPress={onPress1} className="bg-primaryPurple h-12 w-52 pt-3 rounded-full mx-1.5">
                        <Text  className="text-darkerPurple text-sm text-center">{title1}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPress2} className="bg-darkerPurple h-12 w-52 pt-3 rounded-full mx-1.5">
                        <Text  className="text-white text-sm text-center">{title2}</Text>
                    </TouchableOpacity>
            
            </View>
        );
    }
}

TwoButtonStack.propTypes = {
    title1: PropTypes.string.isRequired,
    onPress1: PropTypes.func.isRequired,
    title2: PropTypes.string.isRequired,
    onPress2: PropTypes.func.isRequired
};
        
export default TwoButtonStack;