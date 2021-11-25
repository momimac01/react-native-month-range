import React, {useState} from 'react';
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
} from '../utils';
import ConfirmButton from './ConfirmButton';
import ListHeaderComponent from './ListHeaderComponent';
import styles from './styles';
const MonthRange = ({onCloseModal, maxRange, onConfirm}) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const [year, setYear] = useState(getCurrentYear());
  const _onConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(start, end);
    }
  };
  const selectDate = value => {
    const currentMonthYear = getMonthYear(value, year);
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
  };
  const renderItem = ({item}) => {
    const {name, value} = item;
    const disabled = getDisabledItem({start, end, year, value, maxRange});
    const backgroundColor = getBgColor({value, start, end, maxRange, year});
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.monthRangeItem, {backgroundColor}]}
        onPress={() => selectDate(value)}>
        <Text style={styles.itemText}>{name}</Text>
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
          data={data}
          scrollEnabled={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={styles.contentContainer}
          style={styles.monthRangeBody}
          ListHeaderComponent={() => (
            <ListHeaderComponent
              start={start}
              end={end}
              onClearDate={onClearDate}
              year={year}
              onChangeYear={onChangeYear}
            />
          )}
          ListFooterComponent={() => (
            <ConfirmButton
              onLeftButton={onCloseModal}
              onRightButton={_onConfirm}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MonthRange;
