import * as React from "react";
import { cn } from "@bem-react/classname";
import "./Order-Content.css";
// import * as cart from "../cart.json";
import {Service} from '../../Service/Service'
import {IOrderProps} from '../index'
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const cnOrder = cn("Order");

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
        <blockquote>Cart's content…</blockquote>
        <fieldset className={cnOrder("User")}>
          <TextField label="Email" type="email" onChange={this.handleEmail} />
          <TextField label="Name" type="text" onChange={this.handleName} />
          <TextField label="Phone" type="tel" onChange={this.handlePhone} />
          {/* <input type="text" placeholder="email" /> */}
          {/* <input type="text" placeholder="name" /> */}
          {/* <input type="text" placeholder="phone" /> */}
        </fieldset>
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
