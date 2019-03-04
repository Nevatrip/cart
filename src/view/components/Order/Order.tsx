import React, { PureComponent } from "react";
import { IOrderProps } from './index';
import { cn } from "@bem-react/classname";

import { OrderAside } from './Aside/Order-Aside';
import { OrderContent } from './Content/Order-Content';

import "./Order.css";

const cnOrder = cn('Order');

export class Order extends PureComponent<IOrderProps, {}> {
  constructor(props: IOrderProps) {
    super(props);

  }

  render() {
    const {
      cart,
      isLoading
    } = this.props;

    return (
      <div className={cnOrder()}>
        {
          isLoading
          ? <OrderContent cart={cart}/>
          : 'Loading…'
        }
        <OrderAside/>
      </div>
    )
  }
}
