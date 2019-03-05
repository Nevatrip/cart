import * as React from "react";
import { cn } from "@bem-react/classname";
import "./Order-Content.css";
// import * as cart from "../cart.json";
import {Service} from '../../Service/Service'
import {IOrderProps} from '../index'
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import {Fieldset} from "../../Fieldset/Fieldset";
import {FormField} from "../../FormField/FormField";
import { withStyles } from '@material-ui/core/styles';

const cnOrder = cn("Order");

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
};

const StyledTextField = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(TextField);

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
        <Fieldset title="Персональные данные">
          <FormField title="Ваш email">
            <StyledTextField placeholder="info@email.com" type="email" onChange={this.handleEmail} />
          </FormField>
          <FormField title="Ваше имя и&nbsp;фамилия">
            <TextField placeholder="Иван Иванов" type="text" onChange={this.handleName} />
          </FormField>
          <FormField title="Ваш телефон">
            <TextField placeholder="+7 (9__) ___-__-__" type="tel" onChange={this.handlePhone} />
          </FormField>
        </Fieldset>
        <ul className={cnOrder("List")}>
          {(cart.items || []).map((cartItem, index) => (
            <li className={cnOrder("Item")} key={cartItem.id || String(index)}>
              <Service {...cartItem} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
