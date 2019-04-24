import * as React from "react";
import { cn } from "@bem-react/classname";
import "./Order-Content.css";
import {Service} from '../../Service/Service'
import {IOrderProps} from '../index'
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import {Fieldset} from "../../Fieldset/Fieldset";
import {FormField} from "../../FormField/FormField";

const cnOrder = cn("Order");

const textFieldStyles = {
  textField: {
    position: 'relative',
  },
  input: {
    background: '#FFFFFF',
    border: '1px solid #C4C4C4',
    borderRadius: '3px',
    width: '235px',
    height: '40px',
    fontSize: '14px',
    letterSpacing: '0.04em',
  }
};

export class OrderContent extends React.Component<IOrderProps, {}> {
  constructor(props: IOrderProps) {
    super(props);

    this.handleEmail = this.handleEmail.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  handleEmail( event: React.ChangeEvent<HTMLInputElement> ) {
    console.log( event );
  }
  handleName( event: React.ChangeEvent<HTMLInputElement> ) {
    console.log( event );
  }
  handlePhone( event: React.ChangeEvent<HTMLInputElement> ) {
    console.log( event );
  }

  render() {
    const {
      cart
    } = this.props;

    return (
      <div className={cnOrder("Content")}>
        <ul className={cnOrder("List")}>
          {(cart.items || []).map((cartItem, index) => (
            <li className={cnOrder("Item")} key={cartItem.id || String(index)}>
              <Service {...cartItem} />
            </li>
          ))}
        </ul>
        <Fieldset title="Персональные данные">
          <FormField title="Ваш email">
            <TextField
              InputProps={{style: textFieldStyles.input}}
              placeholder="info@email.com"
              type="email"
              onChange={this.handleEmail} />
          </FormField>
          <FormField title="Ваше имя и&nbsp;фамилия">
            <TextField
              InputProps={{style: textFieldStyles.input}}
              placeholder="Иван Иванов"
              type="text"
              onChange={this.handleName} />
          </FormField>
          <FormField title="Ваш телефон">
            <TextField
              InputProps={{style: textFieldStyles.input}}
              placeholder="+7 (9__) ___-__-__"
              type="tel"
              onChange={this.handlePhone}
            />
          </FormField>
        </Fieldset>
      </div>
    )
  }
}
