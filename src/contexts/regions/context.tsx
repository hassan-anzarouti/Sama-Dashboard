import { createContext } from "react";
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants";
import { IPagination } from "../../model/pagination";
import { IRegionQuery } from "../../model/regions/query";

export type RegionsLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: RegionsLoading[];

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

    createRegion: (request: any) => void;
    updateRegion: (id: number, request: any) => void;
    deleteRegion: (id: number) => void;
    setQuery: (query: IRegionQuery) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createRegion: DEFAULT_FUNCTION,
    updateRegion: DEFAULT_FUNCTION,
    deleteRegion: DEFAULT_FUNCTION,
    setQuery: DEFAULT_FUNCTION,
  },
};

const RegionContext = createContext(externalState);

export default RegionContext;
