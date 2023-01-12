import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  getDatabase,
  ref,
  set,
  query,
  get,
  push,
  remove,
} from "firebase/database";
import { getStorage, getDownloadURL, ref as stref } from "firebase/storage";
import AppButtonPurple from "../components/AppButtonPurple";
import ProfileBox from "../components/ProfileBox";
import { auth } from "../../firebase";
import PressableIcon from "../components/PressableIcon";
import AppButtonRed from "../components/AppButtonRed";

function UserProfileScreen({ route, navigation }) {
  const [nameFull, setNameFull] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const [friend, setFriend] = useState(false);
  const db = getDatabase();
  const { uid } = auth.currentUser;

  const { user } = route.params;

  useEffect(() => {
    setNameFull(`${user.val().firstName} ${user.val().lastName}`);
    setUserName(user.val().userName);
    setBio(user.val().bio);
    if (user.val().profilePic !== undefined) {
      getDownloadURL(stref(getStorage(), user.val().profilePic)).then((url) => {
        setPic(url);
      });
    } else {
      setPic(
        Image.resolveAssetSource(require("../assets/defaultProfilePic.png")).uri
      );
    }
    const checkFriend = async () => {
      const friendsRef = ref(getDatabase(), `/friends/${uid}`);
      const dataFr = await get(friendsRef);
      if (dataFr.val() !== null) {
        dataFr.forEach((c) => {
          if (c.val().user === user.key) {
            setFriend(true);
          }
        });
      }
    };

    checkFriend();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      <View className="flex-row justify-between pt-14 mx-10">
        <PressableIcon
          onPress={() => {
            navigation.goBack();
          }}
          icon="arrow-left"
          size={40}
          color="black"
        />
        <Text className="font-bold ml-auto mr-auto text-3xl">User Profile</Text>
      </View>
      {pic ? (
        <View className="items-center justify-center pt-14">
          <Image className="w-44 h-44 rounded-full" source={{ uri: pic }} />
          <View className="py-12">
            <ProfileBox name={nameFull} username={userName} bio={bio} />
          </View>
          {friend ? (
            <AppButtonRed
              title="Remove friend"
              onPress={async () => {
                const dref = query(ref(db, `/friends/${uid}`));
                const data = await get(dref);
                if (data.val() !== null) {
                  data.forEach((c) => {
                    if (c.val().user === user.key) {
                      remove(ref(db, `/friends/${uid}/${c.key}`));
                    }
                  });
                }
                Alert.alert("Success", "Friend removed succesfully");
                setFriend(false);
              }}
            />
          ) : (
            <AppButtonPurple
              title="Add friend"
              onPress={async () => {
                const pref = push(ref(db, `/friends/${uid}`));
                await set(pref, {
                  user: user.key,
                });
                Alert.alert("Success", "Friend added succesfully");
                setFriend(true);
              }}
            />
          )}
        </View>
      ) : (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator size="large" color="#6B4EFF" />
          <Text className="text-center">Loading Profile</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default UserProfileScreen;
