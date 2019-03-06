import * as React from "react";
import { cn } from "@bem-react/classname";
import { RegistryConsumer } from "@bem-react/di";
import { IStore } from "../../../typings";

import "./Page.css";
import { IExampleProps, cnExample } from "../Example/Example";

import {Order} from '../Order/Order'
import cart from "../Order/cart.json";

export const cnPage = cn("Page");

export interface IPageProps {
  store: IStore;
}

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../../../reducers'

const store = createStore(rootReducer)

export const Page: React.FunctionComponent<IPageProps> = props => (
  <Provider store={store}>
    <RegistryConsumer>
      {registries => {
        const platform = registries["platform"];
        const Example = platform.get<IExampleProps>(cnExample());

        return (
          <>
            <div className={cnPage("Content")}>
              {/*
                При инициализации страницы запрашиваем по сессии корзину
                текущего пользователя, которую пропсом передаём в Order
              */}
              <Order isLoading={!!cart} cart={cart} />
            </div>
          </>
        );
      }}
    </RegistryConsumer>
  </Provider>
);
