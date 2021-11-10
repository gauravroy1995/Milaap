import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';


export const EntryForm = (props) => {
    const [name,setName] = useState('');
    const [number,setPhone] = useState('');


    const onCHangeName = (text) => {
        setName(text)
    }

    const onCHangeNum = (text) => {
        setPhone(text)
    }

    return(
        <View style={styles.neas} >
            <TextInput 
            value={name}
            onChangeText={onCHangeName}
            placeholder="Enter Name"
            style={styles.textST}
            />
              <TextInput 
            value={number}
            onChangeText={onCHangeNum}
            placeholder="Enter Number"
            style={styles.textST}
            keyboardType="numeric"
            />
            <Button 
            title="SAVE"
            onPress={() => props.onSave(name,number)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    neas:{
        flex: 1 ,backgroundColor:'#fff' ,marginVertical:100,
        marginHorizontal:20   
    },
    textST:{
        marginLeft:20,
        marginVertical:10
    }
})