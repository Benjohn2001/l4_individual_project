import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { query, get, ref, getDatabase } from "firebase/database";
import SearchBar from "react-native-dynamic-search-bar";
import { useIsFocused } from "@react-navigation/native";
import AppButtonPurple from "../components/AppButtonPurple";
import PressableIcon from "../components/PressableIcon";
import { auth } from "../../firebase";
import GroupButtonFB from "../components/GroupButtonFB";
import RowItem from "../components/RowItem";

function HomeScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [searchVis, setSearchVis] = React.useState(false);
  const [spinVis, setSpinVis] = React.useState(false);
  const [filtered, setFiltered] = React.useState([]);

  const isFocused = useIsFocused();

  const fetchData = async () => {
    setFetched(false);
    setGroups([]);
    const groupsRef = query(
      ref(getDatabase(), `/groups/${auth.currentUser.uid}`)
    );
    const data = await get(groupsRef);
    data.forEach((c) => {
      setGroups((a) => [...a, c]);
    });
    setFetched(true);
  };

  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
    fetchData();
  }, [isFocused]);

  const filterGroups = (name) => {
    setFiltered([]);
    groups.filter((str) => {
      if (str.val().name.toLowerCase().includes(name.toLowerCase())) {
        setFiltered((a) => [...a, str]);
      }
      return true;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      <View className="flex-row justify-between pt-14 mx-10">
        <Text className="font-bold text-3xl">My Groups</Text>
        <PressableIcon
          onPress={() => {
            if (searchVis) {
              setSearchVis(false);
              setFiltered([]);
              setSpinVis(false);
            } else {
              setSearchVis(true);
            }
          }}
          icon="search"
          size={40}
          color="black"
        />
      </View>
      <View className="flex-1 justify-center items-center pt-10">
        {searchVis ? (
          <View>
            <SearchBar
              className="bg-secondaryPurple  h-12 w-11/12"
              placeholder="Search for a group"
              iconColor="6B4EFF"
              spinnerVisibility={spinVis}
              onChangeText={(text) => {
                setFiltered([]);
                if (text.length === 0) {
                  setSpinVis(false);
                } else {
                  setSpinVis(true);
                }
                filterGroups(text);
              }}
              onClearPress={() => {
                filterGroups("");
                setSpinVis(false);
              }}
            />
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filtered}
                renderItem={({ item }) => (
                  <RowItem
                    title={item.val().name}
                    onPress={() => {
                      setSearchVis(false);
                      setFiltered([]);
                      setSpinVis(false);
                      navigation.navigate("GroupScreen", {
                        item,
                      });
                    }}
                    icon="users"
                    color="black"
                  />
                )}
              />
            </View>
          </View>
        ) : (
          <View>
            {fetched ? (
              <View className="items-center w-full h-full">
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="pb-3" />}
                  extraData={groups}
                  data={groups}
                  renderItem={({ item }) => (
                    <GroupButtonFB
                      groupName={item.val().name}
                      onPress={() => {
                        navigation.navigate("GroupScreen", {
                          item,
                        });
                      }}
                      membRef={item.val().membersRef}
                    />
                  )}
                />
              </View>
            ) : (
              <View className="justify-center items-center flex-1">
                <ActivityIndicator size="large" color="#6B4EFF" />
                <Text className="text-center">Loading Groups</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <View className="items-center py-3">
        <AppButtonPurple
          title="Add a Group"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        className="items-center"
      >
        <View className=" w-11/12 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
          <Text className="text-2xl font-bold  pb-2">Add a group</Text>
          <Text className="text-center text-gray-500 py-5">
            You can be added to an existing group by any current member in group
            settings {"\n\n"}
            or {"\n\n"}
            create a new group
          </Text>
          <View className="py-3 w-full items-center">
            <AppButtonPurple
              title="Create New Group"
              onPress={() => {
                navigation.push("CreateNewGroupScreen");
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default HomeScreen;
