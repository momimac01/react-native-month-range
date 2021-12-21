import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {BUTTON_ICON_ENUM} from '../constants/enum';
//styles
import styles from './styles';
// components
import ButtonItem from './ButtonItem';
import {COLORS} from '../constants/colors';
// images link
const leftIcon = require('../../assets/left.png');
const rightIcon = require('../../assets/right.png');
// text default
const TEXT_DEFAULT = 'MM/YYYY';
//
const ListHeaderComponent = props => {
  const {year, onChangeYear, onClearDate} = props;
  return (
    <View>
      <ListHeader {...props} onPress={onClearDate} />
      <HeaderMonthRange year={year} onChangeYear={onChangeYear} />
    </View>
  );
};
const ListHeader = ({
  end,
  start,
  onPress,
  defaultEndText,
  defaultStartText,
  colorBgStartActive,
  colorBgEndActive,
  colorTextStartActive,
  colorTextEndActive,
  clearText = 'Clear',
  clearBgColor,
  clearTextColor,
  maxRange,
}) => {
  let startBgColor = COLORS.darkGrey;
  let endBgColor = COLORS.darkGrey;

  if (start) {
    startBgColor = colorBgStartActive || COLORS.orange;
  }
  if (end) {
    endBgColor = colorBgEndActive || COLORS.orange;
  }
  return (
    <View style={styles.listFooterContainer}>
      <ButtonItem
        backgroundColor={startBgColor}
        title={start}
        defaultValue={defaultStartText}
        disabled={true}
        textColor={colorTextStartActive}
      />
      {maxRange !== 1 && (
        <ButtonItem
          backgroundColor={endBgColor}
          title={end}
          defaultValue={defaultEndText}
          disabled={true}
          textColor={colorTextEndActive}
        />
      )}
      <ButtonItem
        title={clearText}
        onPress={onPress}
        backgroundColor={clearBgColor || COLORS.secondary}
        textColor={clearTextColor}
      />
    </View>
  );
};
const HeaderMonthRange = ({onChangeYear, year}) => {
  return (
    <View style={styles.yearContainer}>
      <ButtonIcon
        onPress={onChangeYear}
        type={BUTTON_ICON_ENUM.LEFT}
        source={leftIcon}
      />
      <View style={styles.yearTitleContainer}>
        <Text style={styles.headerYearTitle}>{year}</Text>
      </View>
      <ButtonIcon
        type={BUTTON_ICON_ENUM.RIGHT}
        onPress={onChangeYear}
        source={rightIcon}
      />
    </View>
  );
};
const ButtonIcon = ({source, type = BUTTON_ICON_ENUM.LEFT, onPress}) => {
  const style =
    type === BUTTON_ICON_ENUM.LEFT
      ? styles.buttonLeftIcon
      : styles.buttonRightIcon;
  const onPressButton = () => {
    if (typeof onPress === 'function') {
      onPress(type);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.buttonIconContainer, {...style}]}
      onPress={onPressButton}>
      <Image style={styles.image} source={source} />
    </TouchableOpacity>
  );
};
ListHeaderComponent.defaultProps = {
  defaultStartText: TEXT_DEFAULT,
  defaultEndText: TEXT_DEFAULT,
};
export default ListHeaderComponent;
