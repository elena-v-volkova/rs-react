import React from 'react';

interface ButtonProps {
  btnName: string;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return <button>{this.props.btnName}</button>;
  }
}

export default Button;
