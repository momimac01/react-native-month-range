import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import MonthRange from './MonthRange';
import {COLORS} from '../constants/colors';

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
export default ModalView;
