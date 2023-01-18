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
  update,
} from "firebase/database";
import { getStorage, getDownloadURL, ref as stref } from "firebase/storage";
import AppButtonPurple from "../components/AppButtonPurple";
import ProfileBox from "../components/ProfileBox";
import { auth } from "../../firebase";
import PressableIcon from "../components/PressableIcon";
import AppButtonRed from "../components/AppButtonRed";
import TwoButtonsSide from "../components/TwoButtonsSide";

function UserProfileScreen({ route, navigation }) {
  const [nameFull, setNameFull] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const [friend, setFriend] = useState(false);
  const [requested, setRequested] = useState(false);
  const [pending, setPending] = useState(false);
  const [userKey, setUserKey] = useState("");
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
            if (c.val().state === "friend") {
              setFriend(true);
            } else if (c.val().state === "requested") {
              setRequested(true);
              setUserKey(c.key);
            } else if (c.val().state === "pending") {
              setFriend(true);
              setPending(true);
              setUserKey(c.key);
            }
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
          {requested ? (
            <>
              <TwoButtonsSide
                title1="Reject"
                icon1="trash"
                color1="red"
                onPress1={async () => {
                  const dref = query(ref(db, `/friends/${uid}`));
                  const data = await get(dref);
                  if (data.val() !== null) {
                    data.forEach((c) => {
                      if (c.val().user === user.key) {
                        remove(ref(db, `/friends/${uid}/${c.key}`));
                      }
                    });
                  }
                  const dataF = await get(ref(db, `/friends/${user.key}`));
                  if (dataF.val() !== null) {
                    dataF.forEach((c) => {
                      if (c.val().user === uid) {
                        remove(ref(db, `/friends/${user.key}/${c.key}`));
                      }
                    });
                  }
                  Alert.alert("Success", "Friend removed succesfully");
                  setRequested(false);
                  setFriend(false);
                }}
                fontColor1="white"
                title2="Accept"
                icon2="users"
                onPress2={async () => {
                  await update(ref(db, `/friends/${uid}/${userKey}`), {
                    state: "friend",
                  });
                  const dataF = await get(ref(db, `/friends/${user.key}`));
                  if (dataF.val() !== null) {
                    dataF.forEach((c) => {
                      if (c.val().user === uid) {
                        update(ref(db, `/friends/${user.key}/${c.key}`), {
                          state: "friend",
                        });
                      }
                    });
                  }
                  Alert.alert("Success", "Friend accepted succesfully");
                  setRequested(false);
                  setFriend(true);
                }}
                color2="green"
              />
            </>
          ) : (
            <>
              {friend ? (
                <>
                  {pending ? (
                    <>
                      <AppButtonRed
                        title="Cancel Request"
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
                          const dataF = await get(
                            ref(db, `/friends/${user.key}`)
                          );
                          if (dataF.val() !== null) {
                            dataF.forEach((c) => {
                              if (c.val().user === uid) {
                                remove(
                                  ref(db, `/friends/${user.key}/${c.key}`)
                                );
                              }
                            });
                          }
                          Alert.alert(
                            "Success",
                            "Request cancelled succesfully"
                          );
                          setFriend(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
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
                          const dataF = await get(
                            ref(db, `/friends/${user.key}`)
                          );
                          if (dataF.val() !== null) {
                            dataF.forEach((c) => {
                              if (c.val().user === uid) {
                                remove(
                                  ref(db, `/friends/${user.key}/${c.key}`)
                                );
                              }
                            });
                          }
                          Alert.alert("Success", "Friend removed succesfully");
                          setFriend(false);
                        }}
                      />
                    </>
                  )}
                </>
              ) : (
                <AppButtonPurple
                  title="Request friend"
                  onPress={async () => {
                    const pref = push(ref(db, `/friends/${uid}`));
                    await set(pref, {
                      user: user.key,
                      state: "pending",
                    });
                    const prefReq = push(ref(db, `/friends/${user.key}`));
                    await set(prefReq, {
                      user: uid,
                      state: "requested",
                    });
                    Alert.alert("Success", "Friend requested succesfully");
                    setFriend(true);
                    setPending(true);
                  }}
                />
              )}
            </>
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
