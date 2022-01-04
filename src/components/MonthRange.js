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
const EMPTY_ERROR = 'Vui lòng chọn khoảng thời gian bạn muốn tìm kiếm';
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
  textColorActive = COLORS.headerTextColor,
}) => {
  const [start, setStart] = useState(startDefault);
  const [end, setEnd] = useState(endDefault);
  const [dataFlatLit, setData] = useState(data);
  const [error, setError] = useState();
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
      if (error) {
        setError(null)
      }
    } else {
      if (!start) {
        setStart(currentMonthYear);
        if (error) {
          setError(null)
        }
      } else {
        const currentRange = Math.abs(moment(currentMonthYear, FORMAT).diff(moment(start, FORMAT), 'month'))
        if (currentRange >= maxRange) {
          setError(`Thời gian chọn tối đa là ${maxRange} tháng`)
        } else {
          setError(null)
        }
        if (moment(currentMonthYear, FORMAT).isSame(moment(start, FORMAT))) {
          setEnd(null);
          setStart(null);
          setError(EMPTY_ERROR);
        } else if (moment(currentMonthYear, FORMAT).isBefore(moment(start, FORMAT))) {
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
        style={[styles.monthRangeItem, { borderWidth:1, borderColor: bgColor}]}
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
    setError(EMPTY_ERROR);
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
              maxRange={maxRange}
            />
          )}
          ListFooterComponent={() => (
            <>
              <RenderErrorView error={error} maxRange={maxRange} />
              <ConfirmButton
                onLeftButton={onCloseModal}
                onRightButton={_onConfirm}
                confirmBgColor={confirmBgColor}
                rightBottomText={rightBottomText}
                leftBottomText={leftBottomText}
                disabledRightButton={error}
            />
            </>

          )}
        />
      </View>
    </SafeAreaView>
  );
};

const RenderErrorView = ({error}) => {
  if (!error) {
    return <View style={styles.emptyView} />
  }
  return <Text style={styles.error} >{error}</Text>
}

export default MonthRange;
