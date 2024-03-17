import { IPagination } from "../pagination";

export interface IRegionQuery extends IPagination {
  RegionName?: string;
  CityID?: string;
}
