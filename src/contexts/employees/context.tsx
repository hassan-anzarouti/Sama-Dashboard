import { createContext } from "react";
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants";
import { IPagination } from "../../model/pagination";

export type EmployeesLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: EmployeesLoading[];

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

    createEmployee: (request: any) => void;
    updateEmployee: (id: number, request: any) => void;
    deleteEmployee: (id: number) => void;
    setQuery: (query: IPagination) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createEmployee: DEFAULT_FUNCTION,
    updateEmployee: DEFAULT_FUNCTION,
    deleteEmployee: DEFAULT_FUNCTION,
    setQuery: DEFAULT_FUNCTION,
  },
};

const EmployeeContext = createContext(externalState);

export default EmployeeContext;
