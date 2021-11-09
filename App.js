/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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

  const [userContacts, setUserContacts] = useState(initialState);

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
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerS}>
        <Text>Team members</Text>
      </View>
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
justifyContent:'center'
  },
  leftWrap: {
    flexDirection: 'row',
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
  },
  textST: {
    fontSize: 16,
    fontWeight: '800',
  },
  rightSw: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
});

export default App;
