import http from "../../api/axios";
import { IPagination } from "../../model/pagination";

class ClientService {
  getData = (params: IPagination): Promise<any> =>
    http.get("/clients", { params });

  createClient = (data: any): Promise<any> =>
    http.post("/clients/create", data);

  updateClient = (data: any, id: number): Promise<any> =>
    http.put(`/clients/update/${id}`, data);

  deleteClient = (id: number): Promise<any> =>
    http.delete(`/clients/delete/${id}`);
}

export default ClientService;
