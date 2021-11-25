import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
const ButtonItem = ({
  title,
  onPress,
  backgroundColor = COLORS.orange,
  textColor = COLORS.white,
  defaultValue,
  disabled = false,
}) => {
  const _onPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };
  return (
    <TouchableOpacity
     disabled={disabled}
      style={[styles.buttonItem, {backgroundColor}]}
      onPress={_onPress}>
      <Text style={[styles.buttonItemTitle, {color: textColor}]}>
        {title || defaultValue}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonItem: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 2,
    backgroundColor: COLORS.orange,
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonItemTitle: {
    color: COLORS.white,
  },
});
export default ButtonItem;
