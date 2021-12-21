import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';

import {BUTTON_ICON_ENUM} from '../constants/enum';
import {data} from '../constants/data';
import {
  getCurrentYear,
  getMonthYear,
  getDisabledItem,
  FORMAT,
  getBgColor,
  getNewDataByLocaleData,
} from '../utils';
import ConfirmButton from './ConfirmButton';
import ListHeaderComponent from './ListHeaderComponent';
import styles from './styles';
import {COLORS} from '../constants/colors';
const DEFAULT_NUM_COLUMNS = 3;
const MonthRange = ({
  onCloseModal,
  maxRange,
  onConfirm,
  activeColor = COLORS.danger,
  textColor = COLORS.grey2,
  deactivateColor = COLORS.border,
  itemColor = COLORS.ivory,
  defaultStartText,
  defaultEndText,
  colorBgStartActive,
  colorBgEndActive,
  clearText,
  clearBgColor,
  clearTextColor,
  colorTextStartActive,
  colorTextEndActive,
  numColumns = DEFAULT_NUM_COLUMNS,
  confirmBgColor,
  localeData = [],
  leftBottomText,
  rightBottomText,
  maxDate,
  minDate,
  startDefault,
  endDefault,
  textColorActive = COLORS.grey5,
}) => {
  const [start, setStart] = useState(startDefault);
  const [end, setEnd] = useState(endDefault);
  const [dataFlatLit, setData] = useState(data);
  useEffect(() => {
    if (localeData && localeData.length !== 0) {
      const newData = getNewDataByLocaleData(localeData);
      setData(newData);
    }
  }, [localeData]);
  const [year, setYear] = useState(getCurrentYear());
  const _onConfirm = () => {
    if (typeof onConfirm === 'function') {
      if (maxRange === 1) {
        onConfirm(start, start);
      } else {
        onConfirm(start, end);
      }
    }
  };
  const selectDate = value => {
    const currentMonthYear = getMonthYear(value, year);

    if (maxRange === 1) {
      setStart(currentMonthYear);
    } else {
      if (!start) {
        setStart(currentMonthYear);
      } else {
        if (moment(currentMonthYear, FORMAT).isBefore(moment(start, FORMAT))) {
          setEnd(start);
          setStart(currentMonthYear);
        } else {
          setEnd(currentMonthYear);
        }
      }
    }
  };
  const renderItem = ({item}) => {
    const {name, value} = item;
    const disabled = getDisabledItem({
      start,
      end,
      year,
      value,
      maxRange,
      minDate,
      maxDate,
    });
    const {bgColor, textColorItem} = getBgColor({
      value,
      start,
      end,
      maxRange,
      year,
      activeColor,
      deactivateColor: deactivateColor,
      itemColor,
      maxDate,
      minDate,
      textColorActive,
      textColor,
    });
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.monthRangeItem, {backgroundColor: bgColor}]}
        onPress={() => selectDate(value)}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.itemText, {color: textColorItem}]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };
  const onClearDate = () => {
    setEnd();
    setStart();
  };
  const onChangeYear = type => {
    switch (type) {
      case BUTTON_ICON_ENUM.LEFT:
        setYear(year - 1);
        break;
      case BUTTON_ICON_ENUM.RIGHT:
        setYear(year + 1);

        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={[styles.full, {marginHorizontal: 10}]}>
      <TouchableOpacity onPress={onCloseModal} style={styles.full} />
      <View style={styles.monthRangeBodyContainer} >
        <FlatList
          data={dataFlatLit}
          scrollEnabled={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={styles.contentContainer}
          style={styles.monthRangeBody}
          ListHeaderComponent={() => (
            <ListHeaderComponent
              start={start}
              end={end}
              onClearDate={onClearDate}
              year={year}
              onChangeYear={onChangeYear}
              defaultStartText={defaultStartText}
              defaultEndText={defaultEndText}
              colorBgStartActive={colorBgStartActive}
              colorBgEndActive={colorBgEndActive}
              clearBgColor={clearBgColor}
              clearTextColor={clearTextColor}
              clearText={clearText}
              colorTextStartActive={colorTextStartActive}
              colorTextEndActive={colorTextEndActive}
              maxRange={maxRange}
            />
          )}
          ListFooterComponent={() => (
            <ConfirmButton
              onLeftButton={onCloseModal}
              onRightButton={_onConfirm}
              confirmBgColor={confirmBgColor}
              rightBottomText={rightBottomText}
              leftBottomText={leftBottomText}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MonthRange;
