import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { getDatabase, ref, orderByChild, query, get } from "firebase/database";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import PressableIcon from "../components/PressableIcon";
import PillButton from "../components/PillButton";
import FriendsRowSearch from "../components/FriendsRowSearch";

function FriendsScreen({ navigation }) {
  const [searchVis, setSearchVis] = useState(true);
  const [spinVis, setSpinVis] = useState(false);
  const [unames, setUnames] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsReq, setFriendsReq] = useState([]);
  const [friendsPend, setFriendsPend] = useState([]);
  const [friendsKeys, setFriendsKeys] = useState([]);
  const [friendsReqKeys, setFriendsReqKeys] = useState([]);
  const [friendsPendKeys, setFriendsPendKeys] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { uid } = getAuth().currentUser;
  const focused = useIsFocused();

  const fetchData = async () => {
    setUnames([]);
    const unamesRef = query(
      ref(getDatabase(), "/users"),
      orderByChild("userName")
    );
    const data = await get(unamesRef);
    data.forEach((c) => {
      if (
        c.val().email.toLowerCase() !== getAuth().currentUser.email.toLowerCase()
      ) {
        setUnames((a) => [...a, c]);
      }
    });
  };

  const getFriends = async () => {
    setFetched(false);
    setFriendsKeys([]);
    setFriendsReqKeys([]);
    setFriendsPendKeys([]);
    setFriends([]);
    setFriendsReq([]);
    setFriendsPend([]);
    const friendsRef = ref(getDatabase(), `/friends/${uid}`);
    const dataFr = await get(friendsRef);
    dataFr.forEach((c) => {
      if (c.val().state === "requested") {
        setFriendsReqKeys((a) => [...a, c.val().user]);
      } else if (c.val().state === "friend") {
        setFriendsKeys((a) => [...a, c.val().user]);
      } else if (c.val().state === "pending") {
        setFriendsPendKeys((a) => [...a, c.val().user]);
      }
    });

    for (const i in unames) {
      if (friendsKeys.includes(unames[i].key)) {
        setFriends((a) => [...a, unames[i]]);
      } else if (friendsReqKeys.includes(unames[i].key)) {
        setFriendsReq((a) => [...a, unames[i]]);
      } else if (friendsPendKeys.includes(unames[i].key)) {
        setFriendsPend((a) => [...a, unames[i]]);
      }
    }
    setFetched(true);
  };

  useEffect(() => {
    fetchData();
    getFriends();
  }, [searchVis, focused]);

  const filterUname = (uname) => {
    setFiltered([]);
    unames.filter((str) => {
      if (str.val().userName.toLowerCase().includes(uname.toLowerCase())) {
        setFiltered((a) => [...a, str]);
      }
      return true;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      <View className="flex-row justify-between pt-14 pb-10 mx-10">
        <PressableIcon
          onPress={() => {
            setSearchVis(false);
          }}
          icon="users"
          size={40}
          color="black"
        />
        {searchVis ? (
          <Text className="font-bold text-3xl">Search</Text>
        ) : (
          <Text className="font-bold text-3xl">My Friends</Text>
        )}
        <PressableIcon
          onPress={() => {
            setSearchVis(true);
          }}
          icon="search"
          size={40}
          color="black"
        />
      </View>
      {searchVis ? (
        <View>
          <SearchBar
            className="bg-secondaryPurple  h-12 w-11/12"
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
          <View>
            <FlatList
              data={filtered}
              renderItem={({ item }) => (
                <FriendsRowSearch
                  title={item.val().userName}
                  onPress={() => {
                    navigation.push("UserProfileScreen", {
                      user: item,
                    });
                  }}
                  data={item}
                />
              )}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1">
          {fetched ? (
            <>
              {friendsPend.length > 0 ? (
                <View className="pb-5">
                  <Text className="ml-2">Friend Requests Sent</Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    extraData={friendsPend}
                    data={friendsPend}
                    renderItem={({ item }) => (
                      <FriendsRowSearch
                        title={item.val().userName}
                        onPress={() => {
                          navigation.push("UserProfileScreen", {
                            user: item,
                          });
                        }}
                        data={item}
                      />
                    )}
                  />
                </View>
              ) : (
                <></>
              )}
              {friendsReq.length > 0 ? (
                <View className="pb-5">
                  <Text className="ml-2">Friend Requests Received</Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    extraData={friendsReq}
                    data={friendsReq}
                    renderItem={({ item }) => (
                      <FriendsRowSearch
                        title={item.val().userName}
                        onPress={() => {
                          navigation.push("UserProfileScreen", {
                            user: item,
                          });
                        }}
                        data={item}
                      />
                    )}
                  />
                </View>
              ) : (
                <></>
              )}
              <Text className="ml-2">Friends</Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                extraData={friends}
                data={friends}
                renderItem={({ item }) => (
                  <FriendsRowSearch
                    title={item.val().userName}
                    onPress={() => {
                      navigation.push("UserProfileScreen", {
                        user: item,
                      });
                    }}
                    data={item}
                  />
                )}
              />
              <View className="mt-auto py-1">
                <PillButton
                  title="Invite more friends"
                  onPress={() => {
                    alert("Invite more friends");
                  }}
                  icon="share-2"
                />
              </View>
            </>
          ) : (
            <View className="justify-center items-center flex-1">
              <ActivityIndicator size="large" color="#6B4EFF" />
              <Text className="text-center">Loading Friends</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

export default FriendsScreen;
