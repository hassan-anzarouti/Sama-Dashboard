import { createContext } from "react";
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants";
import { ISalesRepQuery } from "../../model/salesRep/query";

export type SalesRepLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: SalesRepLoading[];

  list?: any;
  query: ISalesRepQuery;

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

    createSalesRep: (request: any) => void;
    updateSalesRep: (id: number, request: any) => void;
    deleteSalesRep: (id: number) => void;
    setQuery: (query: ISalesRepQuery) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createSalesRep: DEFAULT_FUNCTION,
    updateSalesRep: DEFAULT_FUNCTION,
    deleteSalesRep: DEFAULT_FUNCTION,
    setQuery: DEFAULT_FUNCTION,
  },
};

const SalesRepContext = createContext(externalState);

export default SalesRepContext;
