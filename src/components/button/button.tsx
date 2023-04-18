import { ReactNode } from 'react';

import * as s from './styled-button';

export interface IButton {
  width?: string;
  height?: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}

const Button = ({ width, height, onClick, children, disabled }: IButton) => {
  return (
    <s.Button
      onClick={onClick}
      type="submit"
      width={width || '150px'}
      height={height || '45px'}
      disabled={disabled}
    >
      {children}
    </s.Button>
  );
};

export default Button;
