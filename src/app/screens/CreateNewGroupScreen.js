import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { getDatabase, set, ref, push } from "firebase/database";
import randomColor from "randomcolor";
import PressableIcon from "../components/PressableIcon";
import COLOURS from "../assets/colours";
import AppButtonPurple from "../components/AppButtonPurple";
import { auth } from "../../firebase";

function CreateNewGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");

  const createGroup = async () => {
    if (groupName === "") {
      Alert.alert("Incomplete Form", "One or more fields are empty");
    } else {
      const groupsRef = push(
        ref(getDatabase(), `/groups/${auth.currentUser.uid}`)
      );
      const groupMembersRef = push(
        ref(getDatabase(), `/groupMembers/${groupsRef.key}`)
      );
      const locationsRef = ref(getDatabase(), `/locations/${groupsRef.key}`);
      const faceRef = ref(getDatabase(), `/clockFace/${groupsRef.key}`);

      await set(groupsRef, {
        name: groupName,
        membersRef: groupsRef.key,
      });
      await set(groupMembersRef, {
        member: auth.currentUser.uid,
        colour: randomColor(),
      });
      await set(locationsRef, {
        locations: ["Uni", "Work", "Out", "Free", "Busy", "Home"],
      });
      await set(faceRef, {
        background: "#FFFFFF",
      });
      setGroupName("");
      navigation.push("HomeScreen");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      <View className="flex-row justify-between pt-14 mx-10">
        <PressableIcon
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          icon="arrow-left"
          size={40}
          color="black"
        />
        <Text className="font-bold mr-auto ml-auto text-3xl">New Group</Text>
      </View>
      <View className="justify-center items-center">
        <Image className="w-44 h-44" source={{uri: require("../assets/clock.png").uri}} />
      </View>
      <View className="items-center">
        <TextInput
          className="bg-secondaryPurple my-4 w-80 h-12 rounded-md"
          placeholder="Group Name"
          underlineColorAndroid="transparent"
          cursorColor={COLOURS.darkerPurple}
          value={groupName}
          onChangeText={(val) => setGroupName(val)}
          testID="groupname"
        />
        <AppButtonPurple
          title="Create"
          onPress={() => {
            createGroup();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default CreateNewGroupScreen;
