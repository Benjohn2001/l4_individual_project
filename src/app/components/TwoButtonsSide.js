import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

function TwoButtonsSide(props) {
  const {
    title1,
    onPress1,
    icon1,
    color1,
    fontColor1,
    title2,
    onPress2,
    icon2,
    color2,
    fontColor2,
  } = props;
  return (
    <View className="flex-row">
      <TouchableOpacity
        onPress={onPress1}
        style={{ backgroundColor: color1 }}
        className=" h-12 w-40 pt-3 rounded-full mx-1.5"
      >
        <View className="flex-row justify-center">
          <Feather name={icon1} size={20} color={fontColor1} />
          <Text
            className=" text-sm text-center ml-5"
            style={{ color: fontColor1 }}
          >
            {title1}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress2}
        style={{ backgroundColor: color2 }}
        className=" h-12 w-40 pt-3 rounded-full mx-1.5"
      >
        <View className="flex-row justify-center">
          <Feather name={icon2} size={20} color={fontColor2} />
          <Text
            className=" text-sm text-center ml-5"
            style={{ color: fontColor2 }}
          >
            {title2}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

TwoButtonsSide.propTypes = {
  title1: PropTypes.string.isRequired,
  onPress1: PropTypes.func.isRequired,
  icon1: PropTypes.string.isRequired,
  color1: PropTypes.string,
  fontColor1: PropTypes.string,
  title2: PropTypes.string.isRequired,
  onPress2: PropTypes.func.isRequired,
  icon2: PropTypes.string.isRequired,
  color2: PropTypes.string,
  fontColor2: PropTypes.string,
};

export default TwoButtonsSide;
