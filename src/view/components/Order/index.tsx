import { IClassNameProps } from "@bem-react/core";

interface ICartItem {
  id: string;
}

interface ICart {
  user?: Object;
  items?: ICartItem[]
}

export interface IOrderProps extends IClassNameProps {
  cart: ICart;
  isLoading?: boolean;
  validation?: boolean;
  project?: "nevatrip" | "moskvatrip" | "busguide";
  lang?: "ru" | "en" | "zh";
}

export interface ITicket {
  count: number;
  type: string;
  price: number;
}

export interface IOrder {
  title: string;
  date?: Date;
  time?: Date;
  isOpenDate?: boolean;
  isOpenTime?: boolean;
  point?: {
    title: string;
    map: string;
  };
  tickets?: ITicket[]
}
