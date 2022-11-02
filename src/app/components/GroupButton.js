import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import PressableIcon from "./PressableIcon";

class GroupButton extends Component {
    render(){
        const { groupName, onPress, avatar} = this.props;
		return (
            <View className="py-3">
                <TouchableOpacity onPress={onPress} className="bg-primaryDarker h-36 w-80 py-4 rounded-2xl mx-1.5">
                <View className="flex-row justify-evenly">
                    <Text  className="text-black text-2xl text-center">{groupName}</Text>
                    <PressableIcon
                        onPress={() => {
                            alert("Favourited")
                        }}
                        icon="star"
                        size={32}
                        color="gold"
                    />
                    <PressableIcon
                        onPress={() => {
                            alert("To Group")
                        }}
                        icon="arrow-right"
                        size={32}
                        color="black"
                    />   
                </View>
                <View className="flex-row justify-evenly pt-3">
                    <Image 
                        className="w-16 h-16 rounded-full" 
                        source = {avatar}
                    />
                    <Image 
                        className="w-16 h-16 rounded-full" 
                        source = {avatar}
                    />
                    <Image 
                        className="w-16 h-16 rounded-full" 
                        source = {avatar}
                    />
                    <Image 
                        className="w-16 h-16 rounded-full" 
                        source = {avatar}
                    />
                </View>
            </TouchableOpacity>

            </View>
            
        );
    }
}

GroupButton.propTypes = {
    groupName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    avatar: PropTypes.number.isRequired
};

export default GroupButton;