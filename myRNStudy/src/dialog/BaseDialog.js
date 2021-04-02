import React from 'react';
import { Modal } from 'react-native';
import type { BaseDialogProps } from '../index';

class BaseDialog extends React.Component<BaseDialogProps> {
  static defaultProps = {
    visible: false,
    cancelAble: true,
    statusBarTranslucent: true,
    transparent: true,
    animationType: 'fade'
  };
  state = {
    visible: false
  };

  constructor(props) {
    super(props);
    this.state.visible = this.props.visible;
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  render(): React.ReactNode {
    return <Modal
      { ...this.props }
      //显示
      visible={ this.state.visible }
      //返回请求
      onRequestClose={ () => {
        if (this.props.cancelAble) {
          this.setState({ visible: false });
          if (this.props.onDismiss !== undefined)
            this.props.onDismiss();
        }
      } }
    />;
  }
}

export default BaseDialog;