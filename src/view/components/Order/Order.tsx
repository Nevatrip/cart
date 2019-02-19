import React, { PureComponent } from "react";
import { IOrderProps, IOrder } from './index';
import { cn } from "@bem-react/classname";

import { OrderAside } from './Aside/Order-Aside';
import { OrderContent } from './Content/Order-Content';

import "./Order.css";

const cnOrder = cn('Order');

export class Order extends PureComponent<IOrderProps, { order?: IOrder[]}> {
  constructor(props: IOrderProps) {
    super(props);

    this.state = {
      order: []
    }
  }

  render() {
    const {
      cart,
      isLoading
    } = this.props;

    // В `order` передаём выбранные значения каждого <Service>
    const { order } = this.state;

    return (
      <div className={cnOrder()}>
        {
          isLoading
          ? <OrderContent cart={cart} orderUpdate={(order: any) => {this.setState({order})}}/>
          : 'Loading…'
        }
        <OrderAside order={order || []} />
      </div>
    )
  }
}
