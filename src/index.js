import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {BUTTON_ICON_ENUM} from '../src/constants/enum';
import {COLORS} from './constants/colors';
import {data} from '../src/constants/data';
import {
  getCurrentYear,
  getMonthYear,
  getDisabledItem,
  FORMAT,
  isSameDate,
  getBgColor,
} from './utils';
import moment from 'moment';
const MonthRange = ({onCloseModal, maxRange}) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const [year, setYear] = useState(getCurrentYear());

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
  const onClearDate = () => {
    setEnd();
    setStart();
  };
  const HeaderMonthRange = () => {
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
  const ListHeaderComponent = () => {
    return (
      <View>
        <ListHeader start={start} end={end} onPress={onClearDate} />
        <HeaderMonthRange />
      </View>
    );
  };
  return (
    <View style={[styles.full, {marginHorizontal: 10}]}>
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
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
    </View>
  );
};
const ListHeader = ({end, start, onPress}) => {
  return (
    <View style={styles.listFooterContainer}>
      <ButtonItem title={start || 'Bắt đầu'} />
      <ButtonItem title={end || 'Kết thúc'} />
      <ButtonItem title="xoá" onPress={onPress} />
    </View>
  );
};
const ButtonItem = ({title, onPress}) => {
  const _onPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };
  return (
    <TouchableOpacity style={styles.buttonItem} onPress={_onPress}>
      <Text style={styles.buttonItemTitle}>{title}</Text>
    </TouchableOpacity>
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
});

export default MonthRange;
