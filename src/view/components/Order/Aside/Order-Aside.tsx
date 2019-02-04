import * as React from "react";
import { cn } from "@bem-react/classname";
import './Order-Aside.css';


const cnOrder = cn('Order');

export const OrderAside: React.FunctionComponent = () => (
  <div className={cnOrder('Aside')}>
    <blockquote>Sidebar</blockquote>
    <div className={cnOrder('Tickets')}>
      <blockquote>Ticket's preview</blockquote>
    </div>
    <div className={cnOrder('Footer')}>
      <blockquote>Sum, promocode, submit</blockquote>
    </div>
  </div>
)
