import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import MonthRange from './MonthRange';
import {COLORS} from '../constants/colors';

function ModalView({isOpen, onCloseModal}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onCloseModal}>
      <View
        style={[
          styles.full,
          isOpen && {backgroundColor: COLORS.bgTransparent},
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
