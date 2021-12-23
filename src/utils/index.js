import moment from 'moment';
import {COLORS} from '../constants/colors';
import {data} from '../constants/data';
export const FORMAT = 'MM/YYYY';
export const getCurrentYear = () => {
  return moment().year();
};
export const getMonthYear = (month, year) => {
  return `${month}/${year}`;
};
export const getDisabledItem = ({
  start,
  end,
  year,
  value,
  maxRange,
  maxDate,
  minDate,
}) => {
  const currentMonthYear = getMonthYear(value, year);

  if (
    maxDate &&
    moment(currentMonthYear, FORMAT).isAfter(moment(maxDate, FORMAT))
  ) {
    return true;
  }
  if (
    minDate &&
    moment(currentMonthYear, FORMAT).isBefore(moment(minDate, FORMAT))
  ) {
    return true;
  }
  if (maxRange === 1) {
    return false;
  }
  if (!start && !end) return false;
  const previousValidMonth = moment(start, FORMAT)
    .subtract(maxRange - 1, 'M')
    .clone()
    .format(FORMAT);
  const nextValidMonth = moment(start, FORMAT)
    .add(maxRange - 1, 'M')
    .clone()
    .format(FORMAT);

  // if (start && !end) {
  //   if (
  //     moment(currentMonthYear, FORMAT).isSameOrAfter(
  //       moment(previousValidMonth, FORMAT),
  //     ) &&
  //     moment(currentMonthYear, FORMAT).isSameOrBefore(
  //       moment(nextValidMonth, FORMAT),
  //     )
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  return false;
};
export const isSameDate = (firstDate, secondDate) => {
  return moment(firstDate, FORMAT).isSame(moment(secondDate, FORMAT));
};
export const getBgColor = ({
  start,
  end,
  value,
  year,
  maxRange,
  activeColor,
  deactivateColor,
  itemColor,
  maxDate,
  minDate,
  textColorActive = COLORS.headerTextColor,
  textColor,
}) => {
  let bgColor = itemColor || COLORS.headerTextColor;
  let textColorItem = textColor;
  const current = getMonthYear(value, year);
  const momentStart = moment(start, FORMAT);
  const momentEnd = moment(end, FORMAT);
  const momentCurrent = moment(current, FORMAT);
  const disabled = getDisabledItem({
    start,
    end,
    year,
    value,
    maxRange,
    maxDate,
    minDate,
  });
  if (disabled) {
    textColorItem= COLORS.grey5
  }
  if (momentStart.isSame(momentCurrent) || momentEnd.isSame(momentCurrent)) {
    bgColor = activeColor || COLORS.danger;
    textColorItem = textColorActive;
  }
  if (
    momentCurrent.isSameOrAfter(momentStart) &&
    momentCurrent.isSameOrBefore(momentEnd)
  ) {
    bgColor = activeColor || COLORS.danger;
    textColorItem = textColorActive;
  }
  return {bgColor, textColorItem};
};

export const getNewDataByLocaleData = (localeData = []) => {
  return data.map((e, i) => {
    return {
      ...e,
      name: localeData && localeData[i],
    };
  });
};
