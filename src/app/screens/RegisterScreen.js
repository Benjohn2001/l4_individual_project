import React, { useState } from 'react';
import { Text, View, Image, TextInput, SafeAreaView } from 'react-native';
import PressableIcon from '../components/PressableIcon';
import { COLOURS } from '../assets/colours';
import AppButtonPurple from '../components/AppButtonPurple';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase';
import { getDatabase, ref, set } from "firebase/database";


const RegisterScreen = ({ navigation }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerUser = () => {
        if(firstName == "" || lastName == "" || userName == "" || email == "" || password == ""){
            alert("Please fill out the full form")
        }else{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                console.log("Registration successful!")
                console.log(userCred)
                const db=getDatabase()
                set(ref(db, 'users/' + userCred.user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    email: email
                })
                navigation.navigate("SignInScreen")
            })
            .catch((error) => {
                console.log(error)
            })
        }

    }



    return (
        <SafeAreaView className='flex-1 bg-primaryPurple'>
            <View className='pt-10 pl-5'>
                <PressableIcon
                        onPress={() => {
                            navigation.navigate("SignInScreen")
                        }}
                        icon="arrow-left"
                        size={40}
                        color="black"
                    />
            </View>
            <View className='flex-row justify-center items-center'>
                <Image 
                    className="w-44 h-44" 
                    source = {require("../assets/clock.png")}
                />
                <View className='items-center'>
                    <Text className='font-bold text-2xl'>
                        Weasley Clock
                    </Text>
                    <Text className='text-base'>
                        Join today. It's free!
                    </Text>
                </View>
            </View>
            <View className='items-center'>
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="First Name" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    value={firstName}
                    onChangeText={(val) => setFirstName(val)}
                />
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Last Name" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    value={lastName}
                    onChangeText={(val) => setLastName(val)}
                />
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Username" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    value={userName}
                    onChangeText={(val) => setUserName(val)}
                />
                <TextInput 
                    className="bg-secondaryPurple my-4 w-80 h-12 rounded-md" 
                    placeholder="Email" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <TextInput 
                    className="bg-secondaryPurple mt-4 w-80 h-12 rounded-md" 
                    placeholder="Password" 
                    underlineColorAndroid = "transparent"
                    cursorColor={COLOURS.darkerPurple}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
                <Text className='text-sm text-left pt-2 pb-2 text-gray-500'>
                Password must be at least 8 characters and {'\n'}
                contain at least 1 upper-case character 
                </Text>
                <AppButtonPurple
                    title="Submit"
                    onPress={() => {
                        registerUser()
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
export default RegisterScreen;