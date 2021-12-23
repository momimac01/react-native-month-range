import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  yearContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  monthRangeBodyContainer: {
    paddingHorizontal: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: COLORS.grey5
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  monthRangeBody: {
    marginVertical: 10,
  },
  itemText: {
    paddingVertical: 10,
    color: COLORS.midnightblue,
    paddingHorizontal: 5,
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
  image: {
    width: 15,
    height: 15,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    paddingBottom: 10
  },
  emptyView: {
    height: 24
  },
  clearButton: {
    borderWidth: 1,
    borderColor: COLORS.clearTextColor
  },
  headerButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    opacity: 1
  }
});
export default styles;
