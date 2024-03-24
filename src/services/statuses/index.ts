import http from "../../api/axios";
import { IPagination } from "../../model/pagination";

class StatusService {
  getData = (params: IPagination): Promise<any> =>
    http.get("/Status", { params });

  createEmployee = (data: any): Promise<any> =>
    http.post("/Status/create", data);

  updateEmployee = (data: any, id: number): Promise<any> =>
    http.put(`/Status/update/${id}`, data);

  deleteEmployee = (id: number): Promise<any> =>
    http.delete(`/Status/delete/${id}`);
}

export default StatusService;
