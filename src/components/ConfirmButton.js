import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import ButtonItem from './ButtonItem';
const ConfirmButton = ({onLeftButton, onRightButton}) => {
  return (
    <View style={styles.confirmButton}>
      <ButtonItem
        title="Đóng"
        backgroundColor={COLORS.darkGrey}
        onPress={onLeftButton}
      />
      <ButtonItem
        title="Xác nhận"
        backgroundColor={COLORS.primaryLight}
        onPress={onRightButton}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  confirmButton: {
    flexDirection: 'row',
  },
});
export default ConfirmButton;
