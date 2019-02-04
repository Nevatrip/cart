import * as React from "react";
import { IOrderProps, ICart } from './index';
import { cn } from "@bem-react/classname";

import { OrderAside } from './Aside/Order-Aside';
import { OrderContent } from './Content/Order-Content';

import "./Order.css";

const cnOrder = cn('Order');

export const Order: React.FunctionComponent<IOrderProps> = ({
  className
}) => (
  <form className={cnOrder()}>
    <OrderContent/>
    <OrderAside />
  </form>
);
