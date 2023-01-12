import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";

function AppButtonLight(props) {
  const { title, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-secondaryPurple h-12 w-40 pt-4 rounded-full mx-1.5"
    >
      <Text className="text-darkerPurple text-center">{title}</Text>
    </TouchableOpacity>
  );
}

AppButtonLight.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AppButtonLight;
