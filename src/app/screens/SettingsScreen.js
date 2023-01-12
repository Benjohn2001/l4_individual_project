import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import RowItem from "../components/RowItem";
import { auth } from "../../firebase";

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      <Text className="font-bold text-3xl justify-start pt-14 mx-10">
        Settings
      </Text>
      <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
        General
      </Text>
      <View className="items-center">
        <RowItem
          title="Account"
          icon="user"
          onPress={() => {
            alert("Account");
          }}
          color="black"
        />
        <RowItem
          title="Notifications"
          icon="bell"
          onPress={() => {
            alert("Notifications");
          }}
          color="black"
        />
        <RowItem
          title="Log Out"
          icon="log-out"
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                navigation.push("SignInScreen");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          color="red"
        />
      </View>

      <Text className="font-bold text-2xl justify-start pt-10 mx-5 ">
        Feedback
      </Text>
      <View className="items-center">
        <RowItem
          title="Send Feedback"
          icon="send"
          onPress={() => {
            alert("Send Feedback");
          }}
          color="black"
        />
        <RowItem
          title="Report a bug"
          icon="alert-triangle"
          onPress={() => {
            alert("Report a bug");
          }}
          color="black"
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
