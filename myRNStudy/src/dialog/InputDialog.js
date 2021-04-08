import React from 'react';
import type { InputDialogProps } from './index';
import AlertDialog from './AlertDialog';
import { TextInput } from 'react-native';
import { ColorTheme } from '../../resources/Colors';

class InputDialog extends React.Component<InputDialogProps> {
  static  defaultProps = {
    inputProps: {}
  };
  state = {
    inputText: ''
  };
  inputText = '';

  clearText() {
    this.setState({ inputText: '' });
  }

  constructor(props) {
    super(props);
  }

  render(): React.ReactNode {
    return <AlertDialog
      { ...this.props }
      onClick={ (dialog, which) => {
        this.props.onInput(dialog, which, this.inputText);
      } }
      contentView={
        (<TextInput onChangeText={ (text) => {this.inputText = text;} } multiline={ true } { ...this.props.inputProps } style={ [{ borderRadius: 5, borderColor: ColorTheme, borderWidth: 1, width: '100%' }, this.props.inputProps.style] }>
        </TextInput>)
      }
    />;
  }
}

export default InputDialog;