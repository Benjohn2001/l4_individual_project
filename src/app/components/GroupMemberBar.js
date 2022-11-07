import { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Image, View, Vibration } from "react-native";
import { Feather } from '@expo/vector-icons';

class GroupMemberBar extends Component {
    render(){
        const { title, onPress, avatar, color} = this.props;
		return (
            <View className="items-center py-1">
                <TouchableOpacity onPress={onPress} className="bg-secondaryPurple h-14 w-80 rounded-2xl mx-1.5">
                    <View className="flex-row justify-between items-center mx-3 pt-1">
                        <Image 
                            className="w-12 h-12 rounded-full" 
                            source = {avatar}
                        />
                        <Text  className="text-black text-lg text-center pt-1">{title}</Text>
                        <View className="h-8 w-8 rounded-full" style={{backgroundColor: color}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

GroupMemberBar.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    avatar: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
};

export default GroupMemberBar;