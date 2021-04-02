import {ModalBaseProps, ModalPropsAndroid, ModalPropsIOS, ViewProps} from "react-native";

export interface BaseDialogProps extends ModalBaseProps, ModalPropsIOS, ModalPropsAndroid, ViewProps {

    //是否可以取消
    cancelAble?: Boolean,
    //弹窗小时
    onDismiss?: () => void,
}

export interface AlertDialogProps extends BaseDialogProps {
    //标题
    title?: String,
    //内容
    content?: String,
    //取消文本
    cancelText?: String,
    //确定文本
    ensureText?: String,
}