/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
  ToastAndroid
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Modal from 'react-native-modal';
import {EntryForm} from './src/assets/views/EntryForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const initialState = [
    {name: 'Test1', number: 9999999999},
    {name: 'Test2', number: 9999999998},
    {name: 'ATest3', number: 9999999997},
    {name: 'BTest4', number: 9999999996},
    {name: 'CTest5', number: 9999999995},
    {name: 'DTest6', number: 9999999994},
    {name: 'ETest7', number: 9999999993},
    {name: 'FTest8', number: 9999999992},
    {name: 'GTest9', number: 9999999991},
    {name: 'HTest10', number: 9999999990},
    {name: 'ITest11', number: 9999999981},
    {name: 'JTest12', number: 9999999982},
    {name: 'KTest13', number: 9999999983},
    {name: 'LTest14', number: 9999999984},
    {name: 'MTest15', number: 9999999985},
    {name: 'NTest16', number: 9999999986},
    {name: 'OTest17', number: 9999999987},
    {name: 'PTest18', number: 9999999988},
    {name: 'QTest19', number: 9999999989},
    {name: 'RTest20', number: 9999999970},
  ];

  const [userContacts, setUserContacts] = useState([]);

  const [isModalVisible, setModal] = useState(false);

  const KEY = 'ARRAY_DATA';

  //didmount
  useEffect(() => {
    saveToAsyncInitial()
  }, []);

  const saveToAsyncInitial = async () => {
    const ifExist = await checkIfAsyncExists();
    if (ifExist) {
      const value = await AsyncStorage.getItem(KEY);
      const jsonarr = JSON.parse(value);
      setUserContacts(jsonarr)
      return null;
    }

    setUserContacts(initialState)
    const stringi = await JSON.stringify(initialState);
    await AsyncStorage.setItem(KEY, stringi);
  };

  const saveToDB = async(arrayData) => {
    const stringi = await JSON.stringify(arrayData);
    await AsyncStorage.setItem(KEY, stringi);
  }

  const checkIfAsyncExists = async () => {
    try  {
      const value = await AsyncStorage.getItem(KEY);
      if (value) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  };

  const deleteItem = (item) => {
    const newArray = userContacts.filter((data) => data.name != item.name);
    
    setUserContacts(newArray);
    saveToDB(newArray)
    
  }

  const renderEach = ({item, index}) => {
    const firstInitial = item?.name[0] ?? 'Z';

    const name = item?.name ?? '';
    const number = item?.number ?? 0;

    return (
      <View style={styles.eachView}>
        <View style={styles.leftWrap}>
          <View style={styles.roundIni}>
            <Text style={styles.textST}>{firstInitial}</Text>
          </View>
          <View style={styles.rightSw}>
            <Text style={styles.textST}>{name}</Text>
            <Text>{number}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.youchable}
        onPress={() => deleteItem(item)}
        >
          <Image
            height={20}
            width={20}
            source={require('./src/assets/trash.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerS}>
        <Image
        source={require('./src/assets/group.png')}
          height={20}
          width={20}
          resizeMode="contain"
        />
        <Text style={styles.newTra}>Team members</Text>
      </View>
    );
  };

  const onBurPress = () => {
    setModal(true);
  };

  const onSavePress = (text,number) => {
    setModal(false)
    if(!text || !number){
      ToastAndroid.show("Enter valid input", ToastAndroid.LONG);
      return null
    }

    const checkIfTextOrNumber = userContacts.some((data) =>{
      if(data.name === text){
        return true
      }
      if(data.number === number){
        return true
      }
    });

    if(checkIfTextOrNumber){
      ToastAndroid.show("Entry already exists", ToastAndroid.LONG);
      return null
    }

    const newObj = {
      name:text,
      number:number
    }

    ToastAndroid.show("Data saved!", ToastAndroid.SHORT);

    const newArrya = [...userContacts,newObj];
    setUserContacts(newArrya);
    saveToDB(newArrya)


  }
  const renderButton = () => {
    return (
      <TouchableOpacity style={styles.buttonWra} onPress={onBurPress}>
        <Text style={styles.adiR}>Add Members</Text>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    return (
      <Modal isVisible={isModalVisible}
      onBackdropPress={() => setModal(false)}
      >
        <EntryForm 
        onSave={onSavePress}
        />
      </Modal>
    );
  };

  return (
    <View style={styles.safeStyle}>
      <FlatList
        data={userContacts}
        renderItem={renderEach}
        contentContainerStyle={styles.vewiSt}
        ListHeaderComponent={renderHeader()}
        horizontal={false}
        initialNumToRender={5}
      />
      {renderButton()}
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  safeStyle: {
    flex: 1,
  },
  vewiSt: {
    // flex: 1,
    paddingHorizontal: 20,
  },
  eachView: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#6b050c',
    borderRadius: 5,
    marginVertical: 5,
    padding: 15,
    height: (Dimensions.get('window').height - 100) / 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundIni: {
    backgroundColor: 'rgba(107, 5, 12,0.4)',
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerS: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textST: {
    fontSize: 16,
    fontWeight: '800',
  },

  rightSw: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  newTra: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 10,
  },
  youchable: {
    justifyContent: 'center',
  },
  buttonWra: {
    position: 'absolute',
    bottom: 30,
    zIndex: 4,
    alignItems: 'center',
    backgroundColor: 'rgba(107, 5, 12,1)',
    alignSelf: 'center',
    borderRadius: 20,
  },
  adiR: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default App;
