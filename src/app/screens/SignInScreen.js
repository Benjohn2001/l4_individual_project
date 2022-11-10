import React,  { useState }  from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signinUser = () => {
        if(email == "" || password == ""){
            Alert.alert("Incomplete form","Please fill out the full form")
        }else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                console.log("Sign in successful!")
                console.log(userCred)
                navigation.navigate("HomeScreen")
            })
            .catch((error) => {
                if(error.code == "auth/user-not-found"){
                    Alert.alert("User not found","Please retry entering your email")
                }else if (error.code == "auth/wrong-password"){
                    Alert.alert("Wrong password","Please retry entering your password")
                }
                console.log(error)
            })
        }
    }

    const passwordRef = useRef();

    return (
        <SafeAreaView className="flex-1 items-center pt-20 bg-primaryPurple" >
            <Image 
                className="w-64 h-64" 
                source = {require("../assets/clock.png")}
            />
            <View className='pt-10'>
                <TextInput 
                    className="bg-secondaryPurple my-5 w-80 h-12 rounded-md" 
                    placeholder="Email" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        passwordRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoCapitalize = 'none'
                />
                <TextInput 
                    className="bg-secondaryPurple mt-5 w-80 h-12 rounded-md" 
                    placeholder="Password" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                    ref={passwordRef}
                    autoCapitalize = 'none'
                />
                <TouchableOpacity onPress={() => {
                        alert("Forgotten Password")
                    }}>
                    <Text className="mt-2 mb-20 underline text-darkerPurple">
                        Forgotten Password
                    </Text>
                </TouchableOpacity>
            </View>
            <TwoButtonsSide
                title1="Register"
                onPress1={() => {
                    navigation.navigate("RegisterScreen")
                }}
                icon1="edit"
                title2="Sign In"
                onPress2={() => {
                    signinUser()
                }}
                icon2="arrow-right-circle"
            />     
        </SafeAreaView>
    );
}

export default SignInScreen;