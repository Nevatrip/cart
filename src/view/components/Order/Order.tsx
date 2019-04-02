import React, { PureComponent } from "react";
import { IOrderProps } from './index';
import { cn } from "@bem-react/classname";
import { connect } from 'react-redux'
import { ApplicationState } from '../../../reducers/index'

import { OrderAside } from './Aside/Order-Aside';
import { OrderContent } from './Content/Order-Content';

import "./Order.css";

const cnOrder = cn('Order');

class OrderComponent extends PureComponent<IOrderProps, {}> {
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

export const Order = connect((state: ApplicationState) => ({
  isLoading: state.order.orders ? true : false,
  cart: {
    items: state.order.orders
  }
}))(OrderComponent)