import * as React from "react";
import { cn } from "@bem-react/classname";
import "./Order-Content.css";
import * as cart from "../cart.json";
import {Service} from '../../Service/Service'

const cnOrder = cn("Order");

export const OrderContent: React.FunctionComponent = () => (
  <div className={cnOrder("Content")}>
    <blockquote>Cart's content…</blockquote>
    <ul className={cnOrder("List")}>
      {cart.items.map((cartItem, index) => (
        <li className={cnOrder("Item")} key={index}>
          <Service {...cartItem} />
        </li>
      ))}
    </ul>
    <fieldset className={cnOrder("User")}>
      <blockquote>Personal data</blockquote>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="name" />
      <input type="text" placeholder="phone" />
    </fieldset>
  </div>
);
