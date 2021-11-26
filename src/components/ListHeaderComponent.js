import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {BUTTON_ICON_ENUM} from '../constants/enum';
//styles
import styles from './styles';
// components
import ButtonItem from './ButtonItem';
import {COLORS} from '../constants/colors';
// images link
const leftIcon = require('../../assets/left.png')
const rightIcon = require('../../assets/right.png')
// text default
const TEXT_DEFAULT = 'MM-YYYY';
const ListHeaderComponent = ({
  start, end, onClearDate, year, onChangeYear,
  dafaultStartText = TEXT_DEFAULT,
  dafaultEndText = TEXT_DEFAULT,
  colorStartActive,
  colorEndActive,
  clearText,
  clearBgColor,
  clearTextColor
}) => {
  return (
    <View>
      <ListHeader
        start={start}
        end={end}
        onPress={onClearDate}
        dafaultStartText={dafaultStartText}
        dafaultEndText={dafaultEndText}
        colorStartActive={colorStartActive}
        colorEndActive={colorEndActive}
        clearText={clearText}
        clearBgColor={clearBgColor}
        clearTextColor={clearTextColor}
      />
      <HeaderMonthRange year={year} onChangeYear={onChangeYear} />
    </View>
  );
};
const ListHeader = ({
  end,
  start, 
  onPress,
  dafaultEndText,
  dafaultStartText,
  colorStartActive,
  colorEndActive,
  clearText = "Clear",
  clearBgColor,
  clearTextColor
}) => {
  let startBgColor = COLORS.darkGrey;
  let endBgColor = COLORS.darkGrey;

  if (start) {
    startBgColor = colorStartActive || COLORS.orange;
  }
  if (end) {
    endBgColor = colorEndActive || COLORS.orange;
  }
  return (
    <View style={styles.listFooterContainer}>
      <ButtonItem
        backgroundColor={startBgColor}
        title={start}
        defaultValue={dafaultStartText}
        disabled={true}

      />
      <ButtonItem
        backgroundColor={endBgColor}
        title={end}
        defaultValue={dafaultEndText}
        disabled={true}
      />
      <ButtonItem
        title={clearText}
        onPress={onPress}
        backgroundColor={ clearBgColor || COLORS.secondary}
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
export default ListHeaderComponent;
