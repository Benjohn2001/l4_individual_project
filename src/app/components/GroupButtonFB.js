import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getStorage, getDownloadURL, ref as stref } from "firebase/storage";
import { query, get, ref, getDatabase } from "firebase/database";
import { auth } from "../../firebase";

function GroupButtonFB(props) {
  const { groupName, onPress, membRef } = props;
  const [pics, setPics] = useState([]);
  const [fetched, setFetched] = useState(false);

  const fetchData = async () => {
    setFetched(false);
    setPics([]);
    const groupMembersRef = query(
      ref(getDatabase(), `/groupMembers/${membRef}`)
    );
    const data = await get(groupMembersRef);
    for (const c in data.val()) {
      if (data.val()[c].member !== auth.currentUser.uid) {
        const refV = query(
          ref(getDatabase(), `/users/${data.val()[c].member}`)
        );
        const dataV = await get(refV);
        if (dataV.val().profilePic !== undefined) {
          getDownloadURL(stref(getStorage(), dataV.val().profilePic)).then(
            (url) => {
              setPics((a) => [...a, url]);
            }
          );
        }
      }
    }
    setFetched(true);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="items-center w-full">
      <View className="py-3 w-11/12 bg-primaryDarker h-36 rounded-2xl">
        <TouchableOpacity onPress={onPress}>
          <View className="flex-row w-11/12 pb-3">
            <Text className="text-black text-2xl text-center ml-5 mr-3">
              {groupName}
            </Text>
            <View className="ml-auto mr-5">
              <Feather name="arrow-right" size={32} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View className="items-center">
          {fetched ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={pics}
              extraData={pics}
              renderItem={({ item }) => (
                <View className="mx-1">
                  <Image
                    className="w-16 h-16 rounded-full"
                    source={{ uri: item }}
                  />
                </View>
              )}
            />
          ) : (
            <ActivityIndicator size="large" color="#6B4EFF" />
          )}
        </View>
      </View>
    </View>
  );
}

GroupButtonFB.propTypes = {
  groupName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  membRef: PropTypes.string.isRequired,
};

export default GroupButtonFB;
