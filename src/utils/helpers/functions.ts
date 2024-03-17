import { isArray, xor } from "lodash";

export const toggleLoading = (loading: any[], toggle: any[] | any) => {
  return xor(loading, isArray(toggle) ? toggle : [toggle]);
};

export const a2e = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

export const getpage = (page: number, pageSize: number) => {
  return page / pageSize;
};
export const nextPage = (page: number, pageSize: number) => {
  return page * pageSize;
};
