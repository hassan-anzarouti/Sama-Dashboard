import { IPagination } from "../pagination";

export interface IOrderQuery extends IPagination {
  RegionName?: string;
  CityID?: string;
  status?: string;
  clientname?: string;
  salesrep?: string;
  city?: string;
  region?: string;
  customerphone?: string;
  mindate?: string;
  maxdate?: string;
}
