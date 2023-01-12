import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  orderByChild,
  query,
  equalTo,
  get,
} from "firebase/database";
import PressableIcon from "../components/PressableIcon";
import COLOURS from "../assets/colours";
import AppButtonPurple from "../components/AppButtonPurple";
import { auth } from "../../firebase";

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = getDatabase();

  const registerUser = async () => {
    const unamesRef = query(
      ref(db, "/users"),
      orderByChild("userName"),
      equalTo(userName)
    );

    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      email === "" ||
      password === ""
    ) {
      Alert.alert("Incomplete Form", "One or more fields are empty");
    } else if (password.length < 8 || password.search(/[A-Z]/) < 0) {
      Alert.alert(
        "Improper Password",
        "Password must be at least 8 characters and contain at least 1 upper-case character"
      );
    } else if (userName !== "") {
      const snapshot = await get(unamesRef);
      if (snapshot.val() !== null) {
        Alert.alert("Username taken", "Please select a new username");
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCred) => {
            set(ref(db, `users/${userCred.user.uid}`), {
              firstName,
              lastName,
              userName,
              email,
              bio: "Add a bio!",
            });
            setFirstName("");
            setLastName("");
            setUserName("");
            setEmail("");
            setPassword("");
            navigation.navigate("SignInScreen");
          })
          .catch((error) => {
            if (error.code === "auth/invalid-email") {
              Alert.alert(
                "Invalid E-mail",
                "Please enter a valid email address"
              );
            } else if (error.code === "auth/email-already-in-use") {
              Alert.alert("Email taken", "This email is already in use");
            }
          });
      }
    }
  };

  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <SafeAreaView className="flex-1 bg-primaryPurple">
      <View className="pt-10 pl-5">
        <PressableIcon
          onPress={() => {
            navigation.navigate("SignInScreen");
          }}
          icon="arrow-left"
          size={40}
          color="black"
        />
      </View>
      <View className="flex-row justify-center items-center">
        <Image className="w-44 h-44" source={require("../assets/clock.png")} />
        <View className="items-center">
          <Text className="font-bold text-2xl">Weasley Clock</Text>
          <Text className="text-base">Join today. It's free!</Text>
        </View>
      </View>
      <View className="items-center">
        <TextInput
          className="bg-secondaryPurple my-4 w-80 h-12 rounded-md"
          placeholder="First Name"
          underlineColorAndroid="transparent"
          cursorColor={COLOURS.darkerPurple}
          value={firstName}
          onChangeText={(val) => setFirstName(val)}
          returnKeyType="next"
          onSubmitEditing={() => {
            lastNameRef.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          className="bg-secondaryPurple my-4 w-80 h-12 rounded-md"
          placeholder="Last Name"
          underlineColorAndroid="transparent"
          cursorColor={COLOURS.darkerPurple}
          value={lastName}
          onChangeText={(val) => setLastName(val)}
          ref={lastNameRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            usernameRef.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          className="bg-secondaryPurple my-4 w-80 h-12 rounded-md"
          placeholder="Username"
          underlineColorAndroid="transparent"
          cursorColor={COLOURS.darkerPurple}
          value={userName}
          onChangeText={(val) => setUserName(val)}
          ref={usernameRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            emailRef.current.focus();
          }}
          autoCapitalize="none"
          blurOnSubmit={false}
        />
        <TextInput
          className="bg-secondaryPurple my-4 w-80 h-12 rounded-md"
          placeholder="Email"
          underlineColorAndroid="transparent"
          cursorColor={COLOURS.darkerPurple}
          value={email}
          onChangeText={(val) => setEmail(val)}
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          blurOnSubmit={false}
          autoCapitalize="none"
        />
        <TextInput
          className="bg-secondaryPurple mt-4 w-80 h-12 rounded-md"
          placeholder="Password"
          underlineColorAndroid="transparent"
          cursorColor={COLOURS.darkerPurple}
          secureTextEntry
          value={password}
          onChangeText={(val) => setPassword(val)}
          ref={passwordRef}
          autoCapitalize="none"
        />
        <Text className="text-sm text-left pt-2 pb-2 text-gray-500">
          Password must be at least 8 characters and {"\n"}
          contain at least 1 upper-case character
        </Text>
        <AppButtonPurple
          title="Submit"
          onPress={() => {
            registerUser();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default RegisterScreen;
