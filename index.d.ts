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
}
export class MonthRange extends React.Component<MonthRangeProps> {}