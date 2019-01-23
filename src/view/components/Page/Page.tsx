import * as React from "react";
import { cn } from "@bem-react/classname";
import { RegistryConsumer } from "@bem-react/di";
import { IStore } from "../../../typings";

import "./Page.css";
import { IExampleProps, cnExample } from "../Example/Example";

export const cnPage = cn("Page");

export interface IPageProps {
  store: IStore;
}

export const Page: React.SFC<IPageProps> = props => (
  <RegistryConsumer>
    {registries => {
      const platform = registries["platform"];
      const Example = platform.get<IExampleProps>(cnExample());

      return (
        <>
          <div className={cnPage("Header")}>Header!</div>
          <div className={cnPage("Content")}>
            <Example myProp="hello" />
          </div>
        </>
      );
    }}
  </RegistryConsumer>
);
