import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

function ProfileBox(props) {
  const { name, username, bio } = props;
  return (
    <View className="py-3 w-full h-7/12 items-center mx-1.5 bg-secondaryPurple rounded-2xl">
      <Text className="text-black text-2xl py-1 text-center mx-3">{name}</Text>
      <Text className="text-black text-xl py-1 text-center mx-3">
        @{username}
      </Text>
      <Text className="text-black text-xl py-1 text-center mx-3">{bio}</Text>
    </View>
  );
}

ProfileBox.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default ProfileBox;
