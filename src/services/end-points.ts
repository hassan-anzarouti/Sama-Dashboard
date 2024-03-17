import AuthService from "./auth";
import CityService from "./cities";
import RegionService from "./regions";

export default class EndPoints {
  public static auth = new AuthService();
  public static region = new RegionService();
  public static city = new CityService();
}
