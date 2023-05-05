import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import * as s from './styled-button';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  fontSize?: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
}

const Button = ({
  width,
  height,
  fontSize,
  onClick,
  children,
  disabled,
  style,
}: IButton) => {
  return (
    <s.Button
      onClick={onClick}
      type="submit"
      width={width || '150px'}
      height={height || '45px'}
      fontSize={fontSize || '1rem'}
      disabled={disabled}
      style={style}
    >
      {children}
    </s.Button>
  );
};

export default Button;
