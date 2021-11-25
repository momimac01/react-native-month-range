import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BUTTON_ICON_ENUM} from '../constants/enum';
//styles
import styles from './styles';
// components
import ButtonItem from './ButtonItem';
import {COLORS} from '../constants/colors';
//
const ListHeaderComponent = ({start, end, onClearDate, year, onChangeYear}) => {
  return (
    <View>
      <ListHeader start={start} end={end} onPress={onClearDate} />
      <HeaderMonthRange year={year} onChangeYear={onChangeYear} />
    </View>
  );
};
const ListHeader = ({end, start, onPress}) => {
  let startBgColor = COLORS.darkGrey;
  let endBgColor = COLORS.darkGrey;

  if (start) {
    startBgColor = COLORS.orange;
  }
  if (end) {
    endBgColor = COLORS.orange;
  }
  return (
    <View style={styles.listFooterContainer}>
      <ButtonItem
        backgroundColor={startBgColor}
        title={start}
        defaultValue="Bắt đầu"
        disabled={true}
      />
      <ButtonItem
        backgroundColor={endBgColor}
        title={end}
        defaultValue="Kết thúc"
        disabled={true}
      />
      <ButtonItem
        title="xoá"
        onPress={onPress}
        backgroundColor={COLORS.secondary}
      />
    </View>
  );
};
const HeaderMonthRange = ({onChangeYear, year}) => {
  return (
    <View style={styles.yearContainer}>
      <ButtonIcon
        title="-"
        onPress={onChangeYear}
        type={BUTTON_ICON_ENUM.LEFT}
      />
      <View style={styles.yearTitleContainer}>
        <Text style={styles.headerYearTitle}>{year}</Text>
      </View>
      <ButtonIcon
        title="+"
        type={BUTTON_ICON_ENUM.RIGHT}
        onPress={onChangeYear}
      />
    </View>
  );
};
const ButtonIcon = ({title, type = BUTTON_ICON_ENUM.LEFT, onPress}) => {
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
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
export default ListHeaderComponent;
