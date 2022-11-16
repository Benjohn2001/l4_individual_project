import React,  { useState }  from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import { useRef } from 'react';
import Modal from "react-native-modal";

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailReset, setEmailReset] = useState("")
    const [isModalVisible, setModalVisible] = React.useState(false);

    const signinUser = () => {
        if(email == "" || password == ""){
            Alert.alert("Incomplete form","Please fill out the full form")
        }else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                console.log("Sign in successful!")
                setEmail("")
                setPassword("")
                console.log(userCred)
                navigation.push("HomeScreen")
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
                        setModalVisible(true)
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

            <Modal 
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                className="items-center"
            >
                <View className=" w-11/12 h-50 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Forgotten Password</Text>
                    <Text className="text-center text-gray-500 py-4">Enter the email of the account to be reset</Text>
                    <TextInput 
                        className="bg-white my-5 w-full mx-3 h-12 rounded-md" 
                        placeholder="Email" 
                        underlineColorAndroid = "transparent"
                        cursorColor={COLOURS.darkerPurple}
                        value={emailReset}
                        onChangeText={(val) => setEmailReset(val)}
                    />
                    <AppButtonPurple
                        title="Send Email"
                        onPress={()=>{
                            sendPasswordResetEmail(auth, emailReset)
                            .then(()=>{
                                Alert.alert("Email sent","Reset email has been sent to "+emailReset )
                                console.log("Email sent to "+emailReset)
                                setModalVisible(false)
                                setEmailReset("")
                            })
                        }}
                    />
                    
                </View>
            </Modal>     
        </SafeAreaView>
    );
}

export default SignInScreen;