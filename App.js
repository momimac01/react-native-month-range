import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import MonthRange from './src';
import ModalExample from './src/Modal';
const App = () => {
  return (
    <View style={styles.container}>
      <ModalExample/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  yearContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  buttonIconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearTitleContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeftIcon: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'yellow',
  },
  buttonRightIcon: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default App;
