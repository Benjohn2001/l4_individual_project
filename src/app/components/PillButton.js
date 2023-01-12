import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

function PillButton(props) {
  const { title, onPress, icon } = props;
  return (
    <View className="items-center py-3">
      <TouchableOpacity
        onPress={onPress}
        className="bg-darkerPurple h-8 w-44 justify-between rounded-full mx-1.5"
      >
        <View className="flex-row justify-center">
          <View className="pt-2">
            <Feather name={icon} size={16} color="white" />
          </View>
          <View className="pt-1">
            <Text className="text-white text-sm text-center ml-5">{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

PillButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default PillButton;
