import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import PressableIcon from "./PressableIcon";

class FriendsRow extends Component {
    render(){
        const { title, onPress, avatar} = this.props;
		return (
            <View className="pt-3 w-full items-center">
                <TouchableOpacity onPress={onPress} className="bg-secondaryPurple h-16 pt-1 w-11/12  rounded-2xl mx-1.5">
                    <View className="flex-row">
                        <View className="ml-3">
                            <Image 
                                className="w-14 h-14 rounded-full" 
                                source = {avatar}
                            />
                        </View>
                        <Text  className="text-black text-sm text-center ml-10 pt-4">{title}</Text>
                        <View className="ml-auto mr-5 pt-4">
                        <PressableIcon
                            onPress={() => {
                                alert("Delete")
                            }}
                            icon="trash-2"
                            size={20}
                            color="black"
                        /> 
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

FriendsRow.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    avatar: PropTypes.number.isRequired
};

export default FriendsRow;