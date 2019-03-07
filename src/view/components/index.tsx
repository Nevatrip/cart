export interface IOneTicket {
    category: {
        title: string
    };
    count?: number
    price?: string
    type?: string;
    ticket: {
        title: string
    };
    _key?: string;
    title?: string;
}

export interface ICompileTicket {
    date?: Date,
    isOpenDate?: boolean;
    isOpenTime?: boolean;
    tickets?: IOneTicket[];
    time?: Date;
    title?: string;
    point?: any;
    id: string;
}
