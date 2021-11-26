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
const DEFAUT_NUM_COLUMNS = 3;
const MonthRange = ({
  onCloseModal,
  maxRange,
  onConfirm,
  activeColor = COLORS.danger,
  textColor = COLORS.black,
  deactiveColor = COLORS.border,
  itemColor = COLORS.ivory,
  dafaultStartText,
  dafaultEndText,
  colorBgStartActive,
  colorBgEndActive,
  clearText,
  clearBgColor,
  clearTextColor,
  colorTextStartActive,
  colorTextEndActive,
  numColumns = DEFAUT_NUM_COLUMNS,
  confirmBgColor,
  localeData = [],
  leftBottomText,
  rightBottomText,
  maxDate,
  minDate,
}) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
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
    const backgroundColor = getBgColor({
      value,
      start,
      end,
      maxRange,
      year,
      activeColor,
      deactiveColor,
      itemColor,
      maxDate,
      minDate,
    });
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.monthRangeItem, {backgroundColor}]}
        onPress={() => selectDate(value)}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.itemText, {color: textColor}]}>
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
      <View>
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
              dafaultStartText={dafaultStartText}
              dafaultEndText={dafaultEndText}
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
