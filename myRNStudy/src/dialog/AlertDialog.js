import Dialog from './Dialog';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AlertDialogProps } from '../index';
import { ColorTheme } from '../../resources/Colors';

const shadowDialog = '#00000066';

class AlertDialog extends React.Component<AlertDialogProps> {

  constructor(props) {
    super(props);
  }

  render(): React.ReactNode {
    return <Dialog
      { ...this.props }>
      <View style={ { backgroundColor: shadowDialog, width: '100%', height: '100%', justifyContent: 'center' } }>
        <View style={ { padding: 15, borderRadius: 10, backgroundColor: '#FFFFFF', marginLeft: 25, marginRight: 25 } }>
          {/*标题*/ }
          { this.props.title && <Text style={ { fontSize: 20, color: '#333333' } }>{ this.props.title }</Text> }
          {/*内容*/ }
          { this.props.message && <Text style={ { marginTop: 8, fontSize: 16, color: '#444444' } }>{ this.props.message }</Text> }
          {/*按钮*/ }
          { (this.props.positiveText || this.props.negationText || this.props.negationText) && <View style={ { marginTop: 20, flexDirection: 'row-reverse' } }>
            {/*positive 按钮*/ }
            <Pressable onPress={ () => {
              if (this.props.onClick !== undefined)
                this.props.onClick(this, 'BUTTON_POSITIVE');
            } }>
              { this.props.positiveText && <Text style={ { fontSize: 14, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: ColorTheme } }>{ this.props.positiveText }</Text> }
            </Pressable>
            {/*negative 按钮*/ }
            <Pressable onPress={ () => {
              if (this.props.onClick !== undefined)
                this.props.onClick(this, 'BUTTON_NEGATIVE');
            } }>
              { this.props.negationText && <Text style={ { fontSize: 14, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 } }>{ this.props.negationText }</Text> }
            </Pressable>
            {/*neutrol 按钮*/ }
            <Pressable style={ { position: 'absolute', marginLeft: 'auto', right: 0 } } onPress={ () => {
              if (this.props.onClick !== undefined)
                this.props.onClick(this, 'BUTTON_NEUTRAL');
            } }>
              { this.props.neutralText && <Text style={ { fontSize: 14, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 } }>{ this.props.neutralText }</Text> }
            </Pressable>
          </View> }

        </View>
      </View>
    </Dialog>;
  }
}

export default AlertDialog;