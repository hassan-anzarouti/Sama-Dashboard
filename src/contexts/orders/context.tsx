import { createContext } from "react";
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants";
import { IOrderQuery } from "../../model/orders/query";

export type OrdersLoading = "list" | "details" | "create" | "update" | "delete";

export interface IInternalState {
  loading: OrdersLoading[];

  list?: any;
  query: IOrderQuery;

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

    createOrder: (request: any, dontGetOrders?: boolean) => void;
    updateOrder: (id: number, request: any) => void;
    deleteOrder: (id: number) => void;
    setQuery: (query: IOrderQuery) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createOrder: DEFAULT_FUNCTION,
    updateOrder: DEFAULT_FUNCTION,
    deleteOrder: DEFAULT_FUNCTION,
    setQuery: DEFAULT_FUNCTION,
  },
};

const OrderContext = createContext(externalState);

export default OrderContext;
