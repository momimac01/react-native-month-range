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
  dafaultStartText?: string,
  dafaultEndText?: string,
  colorStartActive?: string,
  colorEndActive?: string,
  clearText?: string,
  clearBgColor?: string,
  clearTextColor?: string
}
export class MonthRange extends React.Component<MonthRangeProps> {}