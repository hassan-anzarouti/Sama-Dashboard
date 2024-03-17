import http from "../../api/axios";
import { IOrderQuery } from "../../model/orders/query";
import { IPagination } from "../../model/pagination";

class OrdersService {
  getData = (params: IOrderQuery): Promise<any> =>
    http.get("/Orders", { params });

  createOrder = (data: any): Promise<any> => http.post("/Orders/create", data);

  updateOrder = (data: any, id: number): Promise<any> =>
    http.put(`/Orders/update/${id}`, data);

  deleteOrder = (id: number): Promise<any> =>
    http.delete(`/Orders/delete/${id}`);
}

export default OrdersService;
