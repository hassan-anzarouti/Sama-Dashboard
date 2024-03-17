import AuthService from "./auth";
import CityService from "./cities";
import ClientService from "./clients";
import EmployeeService from "./employees";
import RegionService from "./regions";

export default class EndPoints {
  public static auth = new AuthService();
  public static region = new RegionService();
  public static city = new CityService();
  public static employee = new EmployeeService();
  public static client = new ClientService();
}
