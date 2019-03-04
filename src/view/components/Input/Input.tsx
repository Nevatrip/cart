import * as React from 'react';
import { MouseEventHandler } from 'react';
import { cn } from '@bem-react/classname';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

import { IHoverableComponentProps, withHover } from '../Hoverable/Hoverable';

const cnInput = cn('Input');

export interface IInputProps extends IHoverableComponentProps {
  className?: string;
  theme?: 'default';
  onClick?: MouseEventHandler<HTMLInputElement>;
  label?: any;
  value?: any;
  type?: any;
  placeholder?: any;
}

const InputPresenter: React.FunctionComponent<IInputProps> = props => (
  <div
    className={cnInput({
      theme: props.theme,
      hovered: props.hovered,
      disabled: props.disabled
    }, [props.className])}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    onClick={props.onClick}
  >
    <TextField
      label={props.label}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder} />
  </div>
);

export const Input = withHover(InputPresenter);
