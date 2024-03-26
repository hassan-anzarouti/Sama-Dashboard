import http from "../../api/axios";
import { IPagination } from "../../model/pagination";

class EmployeeService {
  getData = (params: IPagination): Promise<any> =>
    http.get("/employees", { params });

  createEmployee = (data: any): Promise<any> =>
    http.post("/employees/create", data);

  updateEmployee = (data: any, id: number): Promise<any> =>
    http.put(`/employees/update/${id}`, data);

  deleteEmployee = (id: number): Promise<any> =>
    http.delete(`/employees/delete/${id}`);
}

export default EmployeeService;
