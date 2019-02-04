import { IClassNameProps } from "@bem-react/core";

export interface ICart {
  user?: Object;
  items?: Object[]
}

export interface IOrderProps extends IClassNameProps {
  isLoading: boolean;
  cart?: ICart;
  validation?: boolean;
  project?: "nevatrip";
  lang?: "ru";
}

