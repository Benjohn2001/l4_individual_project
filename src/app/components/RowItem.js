import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';

class RowItem extends Component {
    render(){
        const { title, onPress, icon, color} = this.props;
		return (
            <View className="pt-3 w-full items-center">
                <TouchableOpacity onPress={onPress} className="bg-secondaryPurple  h-14 w-11/12 pt-4 rounded-2xl mx-1.5">
                    <View className="flex-row">
                        <View className="ml-5">
                            <Feather name={icon} size={20} color={color} />
                        </View>
                        <Text  className="text-black text-sm text-center ml-10">{title}</Text>
                        <View className="ml-auto mr-5">
                            <Feather name="arrow-right" size={20} color={"black"} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

RowItem.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default RowItem;