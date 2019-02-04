import * as React from "react";
import { cn } from "@bem-react/classname";
import "./Order-Content.css";
import * as cart from "../cart.json";

const cnOrder = cn("Order");

export const OrderContent: React.FunctionComponent = () => (
  <div className={cnOrder("Content")}>
    <blockquote>Cart's content…</blockquote>
    <ul className={cnOrder("List")}>
      {cart.items.map((cartItem, index) => (
        <li className={cnOrder("Item")} key={index}>
          <h3>
            {cartItem.title} <small>({cartItem.tourId})</small>
          </h3>
          <dl>
            {cartItem.periods && (
              <div>
                <dt>periods:</dt>
                <dd>
                  <ul>
                    {cartItem.periods.map((period, index) => (
                      <li key={index}>
                        <span>{period.eventId}</span> —
                          from <span>{(new Date(period.start * 1000).toLocaleDateString())}</span> —
                          to <span>{(new Date(period.end * 1000).toLocaleDateString())}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {cartItem.dates && (
              <div>
                <dt>dates:</dt>
                <dd>{cartItem.dates.join(", ")}</dd>
              </div>
            )}
          </dl>
        </li>
      ))}
    </ul>
    <fieldset className={cnOrder("User")}>
      <blockquote>Personal data</blockquote>
    </fieldset>
  </div>
);
