import React from "react";
import PropTypes from "prop-types";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";

function PressableIcon(props) {
  const { onPress, icon, size, color } = props;
  return (
    <View className="flex-row">
      <Pressable onPress={onPress}>
        <Feather name={icon} size={size} color={color} />
      </Pressable>
    </View>
  );
}

PressableIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default PressableIcon;
