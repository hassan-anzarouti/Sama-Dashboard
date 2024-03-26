import http from "../../api/axios";
import { IPagination } from "../../model/pagination";
import { ISalesRepQuery } from "../../model/salesRep/query";

class SalesRepService {
  getData = (params: ISalesRepQuery): Promise<any> =>
    http.get("/SalesReps", { params });

  createSalesRep = (data: any): Promise<any> =>
    http.post("/SalesReps/create", data);

  updateSalesRep = (data: any, id: number): Promise<any> =>
    http.put(`/SalesReps/update/${id}`, data);

  deleteSalesRep = (id: number): Promise<any> =>
    http.delete(`/SalesReps/delete/${id}`);
}

export default SalesRepService;
