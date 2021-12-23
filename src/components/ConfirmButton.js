import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import ButtonItem from './ButtonItem';
const ConfirmButton = ({
  onLeftButton,
  onRightButton,
  confirmBgColor,
  leftBottomText,
  rightBottomText,
  disabledRightButton
}) => {
  return (
    <View style={styles.confirmButton}>
      <ButtonItem
        title={leftBottomText}
        backgroundColor={COLORS.darkGrey}
        onPress={onLeftButton}
        defaultValue="Close"
      />
      <ButtonItem
        title={rightBottomText}
        defaultValue="Confirm"
        backgroundColor={confirmBgColor}
        onPress={onRightButton}
        disabled={disabledRightButton}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  confirmButton: {
    flexDirection: 'row',
  },
});
ConfirmButton.defaultProps = {
  confirmBgColor: COLORS.primary,
};
export default ConfirmButton;
