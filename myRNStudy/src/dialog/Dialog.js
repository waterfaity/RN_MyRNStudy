import React from 'react';
import { Modal } from 'react-native';
import type { DialogProps } from './index';

class Dialog extends React.Component<DialogProps> {
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
      visible={ this.state.visible }
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

export default Dialog;