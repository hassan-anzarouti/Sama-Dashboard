import AuthService from "./auth";
import CityService from "./cities";
import ClientService from "./clients";
import EmployeeService from "./employees";
import OrdersService from "./orders";
import RegionService from "./regions";
import StatusService from "./statuses";

export default class EndPoints {
  public static auth = new AuthService();
  public static region = new RegionService();
  public static city = new CityService();
  public static employee = new EmployeeService();
  public static client = new ClientService();
  public static order = new OrdersService();
  public static status = new StatusService();
}
