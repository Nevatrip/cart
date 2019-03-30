import * as React from "react";
import * as ReactDOM from "react-dom";
import { withRegistry, Registry } from "@bem-react/di";

import * as serviceWorker from "./components/ServiceWorker/ServiceWorker";
import { IPageProps } from "./components/Page/Page";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer, ApplicationState } from '../reducers/index'
import { getService } from '../actions/order'

serviceWorker.unregister();
const root = document.getElementById("root")
const sessionId = root && root.dataset.sessionid
export const store = createStore(rootReducer, {session: {sessionId}})
getService(store.dispatch, sessionId || null)

export const render = (
  Component: React.ComponentType<IPageProps>,
  registry: Registry
) => {
  const Platformed = withRegistry(registry)(Component);

  ReactDOM.render(
    <Provider store={store}>
      <Platformed store={store}/>
    </Provider>,
    root
  );
};
