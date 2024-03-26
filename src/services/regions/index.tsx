import http from "../../api/axios";
import { IRegionQuery } from "../../model/regions/query";

class RegionService {
  getData = (params: IRegionQuery): Promise<any> =>
    http.get("/Region", { params });

  createRegion = (data: any): Promise<any> => http.post("/Region/create", data);

  updateRegion = (data: any, id: number): Promise<any> =>
    http.put(`/Region/update/${id}`, data);

  deleteRegion = (id: number): Promise<any> =>
    http.delete(`/Region/delete/${id}`);
}

export default RegionService;
