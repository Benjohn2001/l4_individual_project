import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";

function AppButtonPurple(props) {
  const { title, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-darkerPurple h-12 w-10/12 pt-3 rounded-full mx-1.5"
    >
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}

AppButtonPurple.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AppButtonPurple;
