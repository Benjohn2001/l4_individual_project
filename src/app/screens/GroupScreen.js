import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { query, get, ref, getDatabase, set } from "firebase/database";
import { useIsFocused } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import AppButtonPurple from "../components/AppButtonPurple";
import TwoButtonsSide from "../components/TwoButtonsSide";
import PillButton from "../components/PillButton";
import PressableIcon from "../components/PressableIcon";
import GroupMemberBar from "../components/GroupMemberBar";
import { auth } from "../../firebase";
import Clock from "../components/Clock";

function GroupScreen({ route, navigation }) {
  const { item } = route.params;
  const { name } = item.val();
  const { membersRef } = item.val();

  const [membersKeys, setMembersKeys] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [showMembers, setShowMembers] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [clockface, setClockface] = React.useState("");
  const [myStatus, setMyStatus] = React.useState("");
  const [myColour, setMyColour] = React.useState("");
  const [updateStatus, setUpdateStatus] = React.useState(false);
  const [newStatusIndex, setNewStatusIndex] = React.useState();

  const isFocused = useIsFocused();
  const { uid } = auth.currentUser;

  const getLocats = async () => {
    setLocations([]);
    const locationsRef = query(ref(getDatabase(), `/locations/${membersRef}`));
    const locatData = await get(locationsRef);
    setLocations(locatData.val().locations);
  };

  const getClockFace = async () => {
    setClockface("");
    const faceRef = query(ref(getDatabase(), `/clockFace/${membersRef}`));
    const faceData = await get(faceRef);
    setClockface(faceData.val().background);
    setFetched(true);
  };

  const fetchData = async () => {
    setFetched(false);
    setMembersKeys([]);
    setMembers([]);
    const groupMembersRef = query(
      ref(getDatabase(), `/groupMembers/${membersRef}`)
    );
    const data = await get(groupMembersRef);
    data.forEach((c) => {
      setMembersKeys((a) => [...a, c]);
    });
    for (const i in membersKeys) {
      const userRef = query(
        ref(getDatabase(), `/users/${membersKeys[i].val().member}`)
      );
      const dataU = await get(userRef);
      if (membersKeys[i].val().member === uid) {
        setMyStatus(membersKeys[i].val().status);
        setMyColour(membersKeys[i].val().colour);
      }
      setMembers((a) => [...a, [dataU, membersKeys[i].val().colour]]);
    }
  };

  React.useEffect(() => {
    fetchData();
    getLocats();
    getClockFace();
  }, [isFocused, showMembers, updateStatus]);

  return (
    <SafeAreaView className="flex-1  bg-primaryPurple">
      {fetched ? (
        <>
          {updateStatus ? (
            <>
              <View className="flex-row justify-between pt-14 mx-10">
                <PressableIcon
                  onPress={() => {
                    setUpdateStatus(false);
                    setNewStatusIndex();
                  }}
                  icon="arrow-left"
                  size={40}
                  color="black"
                />
                <Text className="font-bold mr-auto ml-auto text-3xl">
                  Update Status
                </Text>
              </View>
              <View className="flex-1 items-center justify-center pb-14">
                <Text className="text-center text-xl pb-5">
                  Your current status: {locations[myStatus]}
                </Text>
                <View className="pt-7">
                  <SelectDropdown
                    buttonStyle={{
                      borderRadius: 8,
                      backgroundColor: "white",
                      width: "80%",
                    }}
                    data={locations}
                    renderDropdownIcon={(isOpened) => (
                      <Feather
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color="black"
                        size={18}
                      />
                    )}
                    dropdownIconPosition="right"
                    defaultButtonText="Select a new status"
                    onSelect={(selectedItem, index) => {
                      setNewStatusIndex(index);
                    }}
                  />
                </View>
                <Text className="text-center text-xl pb-5 pt-5">
                  Your new status: {locations[newStatusIndex]}
                </Text>
                <View className="pt-5 w-full items-center">
                  <AppButtonPurple
                    title="Update"
                    onPress={async () => {
                      const groupMembersRef = query(
                        ref(getDatabase(), `/groupMembers/${membersRef}`)
                      );
                      const dataMembers = await get(groupMembersRef);
                      if (dataMembers.val() !== null) {
                        dataMembers.forEach((c) => {
                          if (c.val().member === uid) {
                            set(
                              ref(
                                getDatabase(),
                                `/groupMembers/${membersRef}/${c.key}`
                              ),
                              {
                                colour: myColour,
                                member: uid,
                                status: newStatusIndex,
                              }
                            );
                          }
                        });
                      }
                      setUpdateStatus(false);
                      setNewStatusIndex();
                      setMyStatus(newStatusIndex);
                    }}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              {showMembers ? (
                <>
                  <View className="flex-row justify-between pt-14 mx-10">
                    <PressableIcon
                      onPress={() => {
                        setShowMembers(false);
                      }}
                      icon="arrow-left"
                      size={40}
                      color="black"
                    />
                    <Text className="font-bold mr-auto ml-auto text-3xl">
                      Group Members
                    </Text>
                  </View>
                  <View className="pt-14">
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      extraData={members}
                      data={members}
                      renderItem={({ item }) => (
                        <GroupMemberBar
                          title={`${item[0].val().firstName} ${
                            item[0].val().lastName
                          }`}
                          onPress={() => {
                            if (item[0].key === auth.currentUser.uid) {
                              navigation.navigate("HomeScreen", {
                                screen: "Me",
                              });
                            } else {
                              navigation.push("UserProfileScreen", {
                                user: item[0],
                              });
                            }
                          }}
                          avatar={item[0].val().profilePic}
                          color={item[1]}
                        />
                      )}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View className="flex-row justify-between pt-14 pb-5 mx-10">
                    <PressableIcon
                      onPress={() => {
                        navigation.goBack();
                      }}
                      icon="arrow-left"
                      size={40}
                      color="black"
                    />
                    <Text className="font-bold ml-auto mr-auto text-3xl">
                      {name}
                    </Text>
                  </View>
                  <View className="items-center flex-1">
                    <View className="justify-center items-center w-full pt-14 h-96">
                      <Clock
                        locations={locations}
                        face={clockface}
                        membs={membersKeys}
                      />
                    </View>

                    <View className="flex-row pt-10">
                      <PillButton
                        title="Show Members"
                        onPress={() => {
                          setShowMembers(true);
                        }}
                        icon="users"
                      />

                      <PillButton
                        title="Update Status"
                        onPress={() => {
                          setUpdateStatus(true);
                        }}
                        icon="upload"
                      />
                    </View>

                    <View className="items-center py-3 mt-auto">
                      <TwoButtonsSide
                        title1="Settings"
                        onPress1={() => {
                          navigation.navigate("GroupSettingsScreen", {
                            item,
                            dataMemb: membersKeys,
                          });
                          setShowMembers(false);
                        }}
                        icon1="settings"
                        color1="#E7E7FF"
                        title2="Customise"
                        onPress2={() => {
                          navigation.navigate("ClockCustomiseScreen", {
                            locations,
                            membersRef,
                          });
                          setShowMembers(false);
                        }}
                        icon2="clock"
                        color2="#6B4EFF"
                      />
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator size="large" color="#6B4EFF" />
          <Text className="text-center">Loading Group</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default GroupScreen;
