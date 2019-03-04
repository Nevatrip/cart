export interface IOneTicket {
    category?: Object;
    count?: number
    price?: string
    type?: string;
    ticket?: Object[]
    _key?: string;
}

export interface ICompileTicket {
    date?: Date,
    isOpenDate?: boolean;
    isOpenTime?: boolean;
    tickets?: IOneTicket[];
    time?: Date;
    title?: string;
    point?: any;
}
