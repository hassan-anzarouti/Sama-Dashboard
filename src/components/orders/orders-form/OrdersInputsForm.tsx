import { Col, DatePicker, InputNumber, Row, Select } from "antd";
import FormItem from "../../general/form-item";
import Controller from "../../form-components/controller";
import { useEffect, useContext, useState } from "react";
import EndPoints from "../../../services/end-points";
import dayjs from "dayjs";
import { filterOption } from "../../../utils/helpers/functions";
import FieldBuilder from "../../form-components/field-builder";
import { useFormContext } from "react-hook-form";
import OrderContext from "../../../contexts/orders/context";

const OrdersInputsForm = () => {
  // Cities
  const [cities, setCities] = useState<any[]>([]);
  const [citiesLoading, setCiteisLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(undefined);
  useEffect(() => {
    const getCiteies = async () => {
      try {
        const { data } = await EndPoints.city.getData({
          page: 1,
          pageSize: 999999,
        });

        setCities(data?.City ?? []);
      } catch (err) {
      } finally {
        setCiteisLoading(false);
      }
    };
    getCiteies();
  }, []);

  // regions
  const [regions, setregions] = useState<any[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);
  useEffect(() => {
    const getRegions = async () => {
      if (selectedCity) {
        setregions([]);
        setRegionsLoading(true);
        try {
          const { data } = await EndPoints.region.getData({
            page: 1,
            pageSize: 999999,
            CityID: selectedCity,
          });

          setregions(data?.data ?? []);
        } catch (err) {
        } finally {
          setRegionsLoading(false);
        }
      }
    };
    getRegions();
  }, [selectedCity]);

  // employees
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { data } = await EndPoints.employee.getData({
          page: 1,
          pageSize: 999999,
        });

        setEmployees(data?.Employees ?? []);
      } catch (err) {
      } finally {
        setEmployeesLoading(false);
      }
    };
    getEmployees();
  }, []);

  // employees
  const [clients, setClients] = useState<any[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  useEffect(() => {
    const getClients = async () => {
      try {
        const { data } = await EndPoints.client.getData({
          page: 1,
          pageSize: 999999,
        });

        setClients(data?.clients ?? []);
      } catch (err) {
      } finally {
        setClientsLoading(false);
      }
    };
    getClients();
  }, []);

  // statueses
  const [statuses, setStatuses] = useState<any[]>([]);
  const [statuesesLoading, setStatusesLoading] = useState(true);
  useEffect(() => {
    const getStatuses = async () => {
      try {
        const { data } = await EndPoints.status.getData({
          page: 1,
          pageSize: 999999,
        });

        setStatuses(data?.Status ?? []);
      } catch (err) {
      } finally {
        setStatusesLoading(false);
      }
    };
    getStatuses();
  }, []);

  const disabledDate = (current: any) => {
    // Disable dates before today and more than 2 days in the past
    return (
      current &&
      (current.isBefore(dayjs().subtract(3, "day")) || current.isAfter(dayjs()))
    );
  };

  const [city, setCity] = useState<any>();
  const { setValue } = useFormContext();
  useEffect(() => {
    const getCity = async () => {
      try {
        if (selectedCity) {
          const { data } = await EndPoints.city.getRecord(Number(selectedCity));
          console.log(data);
          setValue("Delivery", data.DelPrice);
          setValue("SalesRepCost", data.SRPrice);
          setCity(data);
        }
      } catch (err) {}
    };

    getCity();
  }, [selectedCity]);

  const { details } = useContext(OrderContext);

  return (
    <>
      <Row gutter={[16, 8]}>
        {/* By default now */}
        <Col xs={24} lg={12}>
          <FormItem label="تاريخ الطلب" required>
            <Controller
              rules={{
                required: { value: true, message: "تاريخ الطلب مطلوب" },
              }}
              name="OrderDate"
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    disabledDate={disabledDate}
                    style={{ width: "100%" }}
                    value={field.value ? dayjs(field.value) : undefined}
                  />
                );
              }}
            />
          </FormItem>
        </Col>
        <Col xs={24} lg={12}>
          <FormItem label="المدينة" required>
            <Controller
              name="City"
              rules={{ required: { value: true, message: "المدينة مطلوبة" } }}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    loading={citiesLoading}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="المدينة"
                    filterOption={filterOption}
                    onChange={(val) => {
                      setSelectedCity(val);
                      field.onChange(val);
                    }}
                    options={cities?.map((item) => {
                      return {
                        value: item?.cityno,
                        label: item?.cityname,
                      };
                    })}
                  />
                );
              }}
            />
          </FormItem>
        </Col>

        <Col xs={24} lg={12}>
          <FormItem label="المنطقة" required>
            <Controller
              name="Region"
              rules={{ required: { value: true, message: "المنطقة مطلوبة" } }}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    loading={regionsLoading}
                    disabled={!selectedCity ? true : false}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="المنطقة"
                    filterOption={filterOption}
                    options={regions?.map((item) => {
                      return {
                        value: item?.RegionID,
                        label: item?.RegionName,
                      };
                    })}
                  />
                );
              }}
            />
          </FormItem>
        </Col>

        <Col xs={24} lg={12}>
          <FieldBuilder
            label="العميل"
            rules={{ required: true }}
            name="ClientName"
            width="large"
            input={{
              type: "select",
              loading: clientsLoading,
              allowSearch: true,

              options: clients?.map((item) => {
                return {
                  value: item?.CustNo,
                  label: item?.customername,
                };
              }),
            }}
          />
        </Col>

        <Col xs={24} lg={12}>
          <FieldBuilder
            label="الموظف"
            rules={{ required: true }}
            name="Employee"
            width="large"
            input={{
              type: "select",
              loading: employeesLoading,
              allowSearch: true,

              options: employees?.map((item) => {
                return {
                  value: item?.EmployeeID,
                  label: item?.EmployeeName,
                };
              }),
            }}
          />
        </Col>

        <Col xs={24} lg={12}>
          <FieldBuilder
            label="اسم الزبون"
            rules={{ required: true }}
            name="CustomerName"
            input={{ type: "text" }}
          />
        </Col>

        <Col xs={24} lg={12}>
          <FieldBuilder
            label="رقم الزبون"
            rules={{ required: true }}
            name="CustomerPhone"
            input={{ type: "text" }}
          />
        </Col>
        <Col xs={24} lg={12}>
          <FieldBuilder
            label="الحالة"
            rules={{ required: true }}
            name="status"
            width="large"
            input={{
              type: "select",
              loading: statuesesLoading,
              allowSearch: true,

              options: statuses?.map((item) => {
                return {
                  value: item?.Statusno,
                  label: item?.Status,
                };
              }),
            }}
          />
        </Col>
        <Col xs={24} lg={12}>
          <FieldBuilder
            label="المندوب"
            rules={{ required: true }}
            name="SalesRep"
            input={{ type: "number" }}
          />
        </Col>
        {/* TODO when selecting a city the fields chang auto and the are disabled */}
        <Col xs={24} lg={12}>
          <FormItem label="أجرة المندوب" required>
            <Controller
              name="SalesRepCost"
              rules={{
                required: { value: true, message: "أجرة المندوب مطلوب" },
              }}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    disabled={details ? false : true}
                  />
                );
              }}
            />
          </FormItem>
        </Col>
        <Col xs={24} lg={12}>
          <FormItem label="التوصيل" required>
            <Controller
              name="Delivery"
              rules={{ required: { value: true, message: "التوصيل مطلوب" } }}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    disabled={details ? false : true}
                  />
                );
              }}
            />
          </FormItem>
        </Col>
        <Col xs={24} lg={12}>
          <FieldBuilder
            label="السعر الكلي"
            rules={{ required: true }}
            name="TotalPrice"
            input={{ type: "number" }}
          />
        </Col>
        <Col xs={24} lg={24}>
          <FieldBuilder
            label="الملاحظات"
            rules={{ required: false }}
            name="Notes"
            input={{ type: "text-area", rows: 5 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrdersInputsForm;
