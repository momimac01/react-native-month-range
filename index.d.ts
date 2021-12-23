import React, { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface MonthRangeProps {
  isOpen: boolean,
  onCloseModal: () => void,
  maxRange?: number,
  onConfirm: (start: string, end: string) => void,
  activeColor?: string,
  textColor?: string,
  itemColor?: string,
  defaultStartText?: string,
  defaultEndText?: string,
  colorBgStartActive?: string,
  colorBgEndActive?: string,
  clearText?: string,
  clearBgColor?: string,
  clearTextColor?: string,
  numColumns?: number,
  confirmBgColor?: string,
  leftBottomText?: string,
  rightBottomText?: string,
  maxDate?: string,
  minDate?: string
}
export class MonthRange extends React.Component<MonthRangeProps> {}