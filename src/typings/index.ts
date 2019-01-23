export interface IStore {
  hello: string[];
}

export interface IRouterMatch {
  match: {
    params: {
      query: string;
    }
  }
}
