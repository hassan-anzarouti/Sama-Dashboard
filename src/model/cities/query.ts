import { IPagination } from "../pagination";

export interface ICityQuery extends IPagination {
  cityname?: string;
}
