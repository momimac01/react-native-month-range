import moment from 'moment';
import {COLORS} from '../constants/colors';
export const FORMAT = 'MM/YYYY';
export const getCurrentYear = () => {
  return moment().year();
};
export const getMonthYear = (month, year) => {
  return `${month}-${year}`;
};
export const getDisabledItem = ({start, end, year, value, maxRange}) => {
  if (!start && !end) return false;
  const currentMonthYear = getMonthYear(value, year);
  const previousValidMonth = moment(start, FORMAT)
    .subtract(maxRange - 1, 'M')
    .clone()
    .format(FORMAT);
  const nextValidMonth = moment(start, FORMAT)
    .add(maxRange - 1, 'M')
    .clone()
    .format(FORMAT);

  if (start && !end) {
    if (
      moment(currentMonthYear, FORMAT).isSameOrAfter(
        moment(previousValidMonth, FORMAT),
      ) &&
      moment(currentMonthYear, FORMAT).isSameOrBefore(
        moment(nextValidMonth, FORMAT),
      )
    ) {
      return false;
    }
    return true;
  }
  if (start && end) {
    if (
      moment(start, FORMAT).isSameOrBefore(moment(currentMonthYear, FORMAT)) &&
      moment(end, FORMAT).isSameOrAfter(moment(currentMonthYear, FORMAT))
    ) {
      return false;
    }
    return true;
  }
  return true;
};
export const isSameDate = (firtDate, secondDate) => {
  return moment(firtDate, FORMAT).isSame(moment(secondDate, FORMAT));
};
export const getBgColor = ({start, end, value, year, maxRange, activeColor, deactiveColor, itemColor}) => {
  let bgColor = itemColor ||  COLORS.ivory;
  const current = getMonthYear(value, year);
  const momentStart = moment(start, FORMAT);
  const momentEnd = moment(end, FORMAT);
  const momentCurrent = moment(current, FORMAT);
  const disabled = getDisabledItem({start, end, year, value, maxRange});
  if (disabled) {
    bgColor = deactiveColor || COLORS.border;
  }
  if (momentStart.isSame(momentCurrent) || momentEnd.isSame(momentCurrent)) {
    bgColor = activeColor || COLORS.danger;
  }
  if (
    momentCurrent.isSameOrAfter(momentStart) &&
    momentCurrent.isSameOrBefore(momentEnd)
  ) {
    bgColor = activeColor || COLORS.danger;
  }
  return bgColor;
};
