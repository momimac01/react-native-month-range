import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import MonthRange from './MonthRange';
import {COLORS} from '../constants/colors';

function ModalView(props) {
  const { onCloseModal, isOpen } = props;
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
        <MonthRange {...props} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});
ModalView.defaultProps = {
  maxRange: 3
}
export default ModalView;
