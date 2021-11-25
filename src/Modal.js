import React, {useState} from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MonthRange from '.';
import {COLORS} from './constants/colors';

function ModalExample() {
  const [modalVisible, setModalVisible] = useState(false);
  const onCloseModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.full}>
      <ModalView modalVisible={modalVisible} onCloseModal={onCloseModal} />
      <TouchableOpacity onPress={onCloseModal} style={{marginTop: 50}}>
        <Text>open</Text>
      </TouchableOpacity>
    </View>
  );
}

function ModalView({modalVisible, onCloseModal}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCloseModal}>
      <View
        style={[
          styles.full,
          modalVisible && {backgroundColor: COLORS.bgTransparent},
        ]}>
        <MonthRange onCloseModal={onCloseModal} maxRange={5} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});
export default ModalExample;
