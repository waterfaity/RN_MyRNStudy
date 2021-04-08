import {ModalBaseProps, ModalPropsAndroid, ModalPropsIOS, TextInputProps, ViewProps} from "react-native";
import Dialog from "./Dialog"
import * as React from "react";

export interface DialogInterfaceProps {
    onClick?: (dialog: Dialog, which: 'BUTTON_NEGATIVE' | 'BUTTON_NEUTRAL' | 'BUTTON_POSITIVE') => {}
    onDismiss?: () => void,
}

export interface DialogProps extends ModalBaseProps, ModalPropsIOS, ModalPropsAndroid, DialogInterfaceProps, ViewProps {
    //是否可以取消
    cancelAble?: Boolean,
}

/**
 *
 */
export interface AlertDialogProps extends DialogProps {
    //标题
    title?: String,
    //内容
    message?: String,
    //中立按钮文本
    neutralText?: String,
    //取消文本
    negationText?: String,
    //确定文本
    positiveText?: String,
    //
    contentView?: React.Component
}

export interface InputDialogProps extends AlertDialogProps {
    inputProps?: TextInputProps
    onInput?: (dialog: Dialog, which: 'BUTTON_NEGATIVE' | 'BUTTON_NEUTRAL' | 'BUTTON_POSITIVE', text: String) => {}
}
