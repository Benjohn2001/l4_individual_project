import React from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as stref,
} from "firebase/storage";
import {
  getDatabase,
  ref,
  set,
  orderByChild,
  query,
  get,
  push,
  remove,
  update,
} from "firebase/database";
import SearchBar from "react-native-dynamic-search-bar";
import randomColor from "randomcolor";
import AppButtonPurple from "../components/AppButtonPurple";
import TwoButtonsSide from "../components/TwoButtonsSide";
import COLOURS from "../assets/colours";
import RowItem from "../components/RowItem";
import PressableIcon from "../components/PressableIcon";
import { auth } from "../../firebase";
import AddFromFriends from "../components/AddFromFriends";

function GroupSettingsScreen({ route, navigation }) {
  const { item } = route.params;
  const { dataMemb } = route.params;
  const { name } = item.val();
  const membRef = item.val().membersRef;
  const { key } = item;

  const [searchVis, setSearchVis] = React.useState(false);

  const [isLeaveModalVisible, setLeaveModalVisible] = React.useState(false);
  const [isChangeModalVisible, setChangeModalVisible] = React.useState(false);
  const [spinVis, setSpinVis] = React.useState(false);
  const [unames, setUnames] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [friendsKeys, setFriendsKeys] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [membersKeys, setMembersKeys] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [nameNew, setNameNew] = React.useState("");
  const { uid } = auth.currentUser;

  const fetchData = async () => {
    setFetched(false);
    setUnames([]);
    setMembersKeys([]);
    const unamesRef = query(
      ref(getDatabase(), "/users"),
      orderByChild("userName")
    );
    const data = await get(unamesRef);
    data.forEach((c) => {
      if (
        c.val().email.toLowerCase() !== auth.currentUser.email.toLowerCase()
      ) {
        setUnames((a) => [...a, c]);
      }
    });
    for (const c in dataMemb) {
      setMembersKeys((a) => [...a, dataMemb[c].val().member]);
    }
  };

  const getFriends = async () => {
    setFriendsKeys([]);
    setFriends([]);
    const friendsRef = ref(getDatabase(), `/friends/${uid}`);
    const dataFr = await get(friendsRef);
    for (const c in dataFr.val()) {
      setFriendsKeys((a) => [...a, dataFr.val()[c].user]);
    }

    for (const i in unames) {
      if (friendsKeys.includes(unames[i].key)) {
        setFriends((a) => [...a, unames[i]]);
      }
    }
    setFetched(true);
  };

  React.useEffect(() => {
    fetchData();
    getFriends();
  }, [searchVis]);

  const filterUname = (uname) => {
    setFiltered([]);
    friends.filter((str) => {
      if (str.val().userName.toLowerCase().includes(uname.toLowerCase())) {
        setFiltered((a) => [...a, str]);
      }
      return true;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      {searchVis ? (
        <>
          {fetched ? (
            <>
              <View className="flex-row justify-between pt-14">
                <View className="ml-auto">
                  <PressableIcon
                    onPress={() => {
                      setSearchVis(false);
                    }}
                    icon="arrow-left"
                    size={40}
                    color="black"
                  />
                </View>
                <Text className="font-bold ml-auto mr-auto text-3xl">
                  Add From Friends
                </Text>
              </View>
              <View className="pt-10 pb-5 flex-1">
                <SearchBar
                  className="bg-secondaryPurple h-12 w-11/12"
                  placeholder="Search for a username"
                  iconColor="6B4EFF"
                  spinnerVisibility={spinVis}
                  onChangeText={(text) => {
                    setFiltered([]);
                    if (text.length === 0) {
                      setSpinVis(false);
                    } else {
                      setSpinVis(true);
                    }
                    filterUname(text);
                  }}
                  onClearPress={() => {
                    filterUname("");
                    setSpinVis(false);
                  }}
                />
                <FlatList
                  data={filtered}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <AddFromFriends
                      title={item.val().userName}
                      onPress={async () => {
                        if (!membersKeys.includes(item.key)) {
                          const groupsRef = ref(
                            getDatabase(),
                            `/groups/${item.key}/${key}`
                          );
                          const groupMembersRef = push(
                            ref(getDatabase(), `/groupMembers/${membRef}`)
                          );

                          await update(groupsRef, {
                            name,
                            membersRef: membRef,
                          });
                          await set(groupMembersRef, {
                            member: item.key,
                            colour: randomColor(),
                          });

                          setSearchVis(false);
                        } else {
                          Alert.alert(
                            "User Present",
                            "This user is already a member"
                          );
                        }
                      }}
                      data={item}
                      icon={membersKeys.includes(item.key) ? "check" : "plus"}
                    />
                  )}
                />
              </View>
            </>
          ) : (
            <View className="justify-center items-center flex-1">
              <ActivityIndicator size="large" color="#6B4EFF" />
              <Text className="text-center">Loading Friends</Text>
            </View>
          )}
        </>
      ) : (
        <>
          <View className="flex-row justify-between pt-14 mx-10">
            <PressableIcon
              onPress={() => {
                navigation.goBack();
              }}
              icon="arrow-left"
              size={40}
              color="black"
            />
            <Text className="font-bold ml-auto mr-auto text-3xl">
              Group Settings
            </Text>
          </View>
          <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
            Add to Group
          </Text>
          <View className="items-center">
            <RowItem
              title="From Friends"
              icon="users"
              onPress={() => {
                setSearchVis(true);
              }}
              color="black"
            />
            <RowItem
              title="Invite Friends"
              icon="share-2"
              onPress={() => {
                alert("invite Friends");
              }}
              color="black"
            />
          </View>
          <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
            Admin
          </Text>
          <View className="items-center">
            <RowItem
              title="Change Group Name"
              icon="edit-3"
              onPress={() => {
                setChangeModalVisible(true);
              }}
              color="black"
            />
            <RowItem
              title="Leave Group"
              icon="trash-2"
              onPress={() => {
                setLeaveModalVisible(true);
              }}
              color="red"
            />
          </View>
          <Modal
            isVisible={isLeaveModalVisible}
            onBackdropPress={() => setLeaveModalVisible(false)}
            className="items-center"
          >
            <View className=" w-full h-1/4 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
              <Text className="text-2xl font-bold  pb-2">Leave Group</Text>
              <Text className="text-l pb-2">
                Are you sure you want to leave this group?
              </Text>
              <View className="pt-5">
                <TwoButtonsSide
                  title1="Cancel"
                  onPress1={() => {
                    setLeaveModalVisible(false);
                  }}
                  icon1="x-circle"
                  color1="#C6C4FF"
                  title2="Leave"
                  onPress2={async () => {
                    const groupsRef = query(
                      ref(getDatabase(), `/groups/${uid}`)
                    );
                    const groupMembersRef = query(
                      ref(getDatabase(), `/groupMembers/${membRef}`)
                    );
                    const dataGroups = await get(groupsRef);
                    if (dataGroups.val() !== null) {
                      dataGroups.forEach((c) => {
                        if (c.val().membersRef === membRef) {
                          remove(ref(getDatabase(), `/groups/${uid}/${c.key}`));
                        }
                      });
                    }
                    const dataMembers = await get(groupMembersRef);
                    if (dataMembers.val() !== null) {
                      dataMembers.forEach((c) => {
                        if (c.val().member === uid) {
                          remove(
                            ref(
                              getDatabase(),
                              `/groupMembers/${membRef}/${c.key}`
                            )
                          );
                        }
                      });
                    }
                    if (dataMembers.size === 1) {
                      remove(ref(getDatabase(), `/locations/${membRef}`));
                      remove(ref(getDatabase(), `/clockFace/${membRef}`));

                      const file = stref(
                        getStorage(),
                        `images/clockFaces/${membRef}`
                      );
                      await getDownloadURL(file)
                        .then(
                          deleteObject(
                            stref(getStorage(), `images/clockFaces/${membRef}`)
                          )
                        )
                        .catch((error) => {
                          if (error.code === "storage/object-not-found") {
                            console.log("no image in storage");
                          }
                        });
                    }
                    setLeaveModalVisible(false);
                    navigation.navigate("HomeScreen");
                  }}
                  icon2="trash-2"
                  color2="red"
                />
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={isChangeModalVisible}
            onBackdropPress={() => setChangeModalVisible(false)}
            className="items-center"
          >
            <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
              <Text className="text-2xl font-bold  pb-2">
                Change group name
              </Text>
              <Text className="text-center text-gray-500 py-4">
                Enter a new group name
              </Text>
              <TextInput
                className="bg-white my-5 w-full mx-3 h-12 rounded-md"
                placeholder="group name"
                underlineColorAndroid="transparent"
                cursorColor={COLOURS.darkerPurple}
                maxLength={50}
                value={nameNew}
                onChangeText={(val) => setNameNew(val)}
              />
              <AppButtonPurple
                title="Change Name"
                onPress={async () => {
                  for (const i in membersKeys) {
                    await update(
                      ref(getDatabase(), `/groups/${membersKeys[i]}/${key}`),
                      {
                        name: nameNew,
                      }
                    );
                  }

                  setNameNew("");
                  setChangeModalVisible(false);
                  navigation.navigate("HomeScreen");
                }}
              />
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
