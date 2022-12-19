import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import AppButtonPurple from '../components/AppButtonPurple'
import AppButtonLight from '../components/AppButtonLight';
import TwoButtonsSide from '../components/TwoButtonsSide';
import { COLOURS } from '../assets/colours';
import GroupButton from '../components/GroupButton';
import PressableIcon from '../components/PressableIcon';
import Modal from "react-native-modal";
import TwoButtonStack from '../components/TwoButtonStack';
import { auth } from '../../firebase';
import { query, get, ref, getDatabase } from 'firebase/database';
import SearchBar from "react-native-dynamic-search-bar";
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
    
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [groups, setGroups] = React.useState([])
    const [fetched, setFetched] = React.useState(false)
    const [searchVis, setSearchVis] = React.useState(false)
    const [spinVis, setSpinVis] = React.useState(false)
    const [filtered, setFiltered] = React.useState([])

    const isFocused = useIsFocused()

    React.useEffect(() =>{
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        })
        fetchData()
    },[isFocused] )

    const fetchData = async () =>{
        setFetched(false)
        setGroups([])
        const groupsRef = query(ref(getDatabase(), "/groups/"+auth.currentUser.uid))
        const data = await get(groupsRef)
        data.forEach(c => {
            setGroups(a => {return [...a , c]})
        })
        setFetched(true)
    }

    const filterGroups = (name) => {
        setFiltered([])
        groups.filter((str)=>{
                if(str.val()["name"].toLowerCase().includes(name.toLowerCase())){
                    setFiltered(a => {return [...a , str]}) 
                }
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-primaryPurple" >
            <View className="flex-row justify-between pt-14 mx-10">
                <Text className="font-bold text-3xl">
                    My Groups
                </Text>
                <PressableIcon
                    onPress={() => {
                        if (searchVis){
                            setSearchVis(false)
                            setFiltered([]) 
                            setSpinVis(false)
                        }else {
                            setSearchVis(true)
                        }
                    }}
                    icon="search"
                    size={40}
                    color="black"
                />
            </View>
            <View className="flex-1 justify-center items-center pt-10">
            {
                searchVis ?
                <View>
                    <SearchBar
                        className="bg-secondaryPurple  h-12 w-11/12"
                        placeholder="Search for a group"
                        iconColor="6B4EFF"
                        spinnerVisibility={spinVis}
                        onChangeText={text => {
                            setFiltered([])
                            if (text.length === 0) {
                                setSpinVis(false);
                            } else {
                                setSpinVis(true);
                            }
                            filterGroups(text);
                        } }

                        onClearPress={() => {
                            filterGroups('');
                            setSpinVis(false);
                        } } />
                        <View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={filtered}
                                renderItem={ ({item})=>(
                                    <GroupButton
                                        groupName={item.val()["name"]}
                                        onPress={() => {
                                            setSearchVis(false)
                                            setFiltered([]) 
                                            setSpinVis(false)
                                            navigation.navigate("GroupScreen",{
                                                item: item
                                            })
                                        }}
                                        avatar={require('../assets/ben-avatar.png')}
                                    />
                                )

                            
                                }
                            />
                        </View>
                </View>
                :
            <View>
                {fetched ?
                    <FlatList
                            showsVerticalScrollIndicator={false}
                            extraData={groups}
                            data={groups}
                            renderItem={({ item }) => (
                                <GroupButton
                                    groupName={item.val()["name"]}
                                    onPress={() => {
                                        navigation.navigate("GroupScreen",{
                                            item: item
                                        })
                                    }}
                                    avatar={require('../assets/ben-avatar.png')}
                                />
                            )} 
                        />
                    :
                    <View className="justify-center items-center flex-1">
                        <ActivityIndicator size="large" color="#6B4EFF"  />
                        <Text className="text-center">Loading Groups</Text>
                    </View>
                }
            </View>
            }       
            </View>
            
            <View className="items-center py-3">
                <AppButtonPurple
                    title="Add Another Group"
                    onPress={() => {
                        setModalVisible(true)
                    }
                    }
                />
            </View>
            <Modal 
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    setModalVisible(false)
                }}
                className="items-center"
            >
                <View className=" w-11/12 items-center py-3 px-3 bg-secondaryPurple rounded-2xl">
                    <Text className="text-2xl font-bold  pb-2">Add a group</Text>
                    <Text className="text-center text-gray-500 py-5">
                        You can be added to an existing group by any current member in group settings {"\n\n"} 
                        or {"\n\n"}  
                        create a new group
                    </Text>
                    <View className="py-3 w-full items-center">
                        <AppButtonPurple
                            title="Create New Group"
                            onPress={() => {
                                navigation.navigate("CreateNewGroupScreen")
                            }}
                        />
                    </View>
                </View>
            </Modal>
         
        </SafeAreaView>

    );
};

export default HomeScreen