import { createContext } from "react";
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants";
import { IPagination } from "../../model/pagination";

export type ClientsLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: ClientsLoading[];

  list?: any;
  query: IPagination;

  details?: any;
}

export const internalState: IInternalState = {
  loading: [],
  query: DEFAULT_QUERY,
  // query: DEFAULT_QUERY,
};

export interface IExternalState extends IInternalState {
  actions: {
    getData: () => void;
    getDetails: (id: number) => void;

    createClient: (request: any) => void;
    updateClient: (id: number, request: any) => void;
    deleteClient: (id: number) => void;
    setQuery: (query: IPagination) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createClient: DEFAULT_FUNCTION,
    updateClient: DEFAULT_FUNCTION,
    deleteClient: DEFAULT_FUNCTION,
    setQuery: DEFAULT_FUNCTION,
  },
};

const ClientContext = createContext(externalState);

export default ClientContext;
