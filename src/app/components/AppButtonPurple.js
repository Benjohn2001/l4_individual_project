import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from "react-native";

class AppButtonPurple extends Component {
    render(){
        const { title, onPress} = this.props;
		return (
            <TouchableOpacity onPress={onPress} className="bg-darkerPurple h-12 w-80 pt-4 rounded-full mx-1.5">
                <Text  className="text-white text-center">{title}</Text>
            </TouchableOpacity>
        );
    }
}

AppButtonPurple.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default AppButtonPurple;