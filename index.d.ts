import React, { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface MonthRangeProps {
  isOpen: boolean,
  onCloseModal: () => void,
}

type ButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  title: string,
  onPress: () => void
}

export class MonthRange extends React.Component<MonthRangeProps> {}