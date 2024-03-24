import http from "../../api/axios";
import { IPagination } from "../../model/pagination";

class CityService {
  getData = (params: IPagination): Promise<any> =>
    http.get("/City", { params });

  getRecord = (id: number): Promise<any> => http.get(`/City/record/${id}`);

  createCity = (data: any): Promise<any> => http.post("/City/create", data);

  updateCity = (data: any, id: number): Promise<any> =>
    http.put(`/City/update/${id}`, data);

  deleteCity = (id: number): Promise<any> => http.delete(`/City/delete/${id}`);
}

export default CityService;
