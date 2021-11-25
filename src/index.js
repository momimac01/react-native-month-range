import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';

import {BUTTON_ICON_ENUM} from '../src/constants/enum';
import {COLORS} from './constants/colors';
import {data} from '../src/constants/data';
import {
  getCurrentYear,
  getMonthYear,
  getDisabledItem,
  FORMAT,
  getBgColor,
} from './utils';
import ConfirmButton from './components/ConfirmButton';
import ListHeaderComponent from './components/ListHeaderComponent';
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  yearContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonIconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.ivory,
    backgroundColor: COLORS.ivory,
  },
  yearTitleContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.ivory,
    backgroundColor: COLORS.ivory,
  },
  buttonLeftIcon: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonRightIcon: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  monthRangeItem: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 2,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    backgroundColor: COLORS.ivory,
  },
  monthRangeBody: {
    marginVertical: 10,
  },
  itemText: {
    paddingVertical: 10,
    color: COLORS.midnightblue,
    fontWeight: 'bold',
  },
  listFooterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
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
  headerYearTitle: {
    color: COLORS.midnightblue,
    fontWeight: 'bold',
  },
  full: {
    flex: 1,
  },
  contentContainer: {
    borderRadius: 5,
  },
  confirmButton: {
    flexDirection: 'row',
  },
});

export default MonthRange;
