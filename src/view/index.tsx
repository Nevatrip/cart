import * as React from "react";
import * as ReactDOM from "react-dom";
import { withRegistry, Registry } from "@bem-react/di";

import { IStore } from "../typings";
import * as serviceWorker from "./components/ServiceWorker/ServiceWorker";
import { IPageProps } from "./components/Page/Page";

serviceWorker.unregister();

export const render = (
  Component: React.ComponentType<IPageProps>,
  registry: Registry
) => {
  const Platformed = withRegistry(registry)(Component);

  const store: IStore = {
    hello: ["world"]
  };

  ReactDOM.render(
    <Platformed store={store} />,
    document.getElementById("root")
  );
};
