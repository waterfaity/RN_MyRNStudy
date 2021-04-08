import {ColorValue, TextProps, TouchableOpacityProps} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
    textProps?: ButtonTextProps
}

export interface ButtonTextProps extends TextProps {
    value?: String
    color?: ColorValue
}