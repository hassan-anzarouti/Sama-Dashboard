import { createContext } from "react";
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants";
import { IPagination } from "../../model/pagination";
import { IRegionQuery } from "../../model/regions/query";
import { ICityQuery } from "../../model/cities/query";

export type CitiesLoading = "list" | "details" | "create" | "update" | "delete";

export interface IInternalState {
  loading: CitiesLoading[];

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

    createCity: (request: any) => void;
    updateCity: (id: number, request: any) => void;
    deleteCity: (id: number) => void;
    setQuery: (query: ICityQuery) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createCity: DEFAULT_FUNCTION,
    updateCity: DEFAULT_FUNCTION,
    deleteCity: DEFAULT_FUNCTION,
    setQuery: DEFAULT_FUNCTION,
  },
};

const CityContext = createContext(externalState);

export default CityContext;
