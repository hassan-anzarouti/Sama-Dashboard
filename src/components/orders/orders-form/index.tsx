import { Button, Col, Divider, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import EndPoints from "../../../services/end-points";
import OrderContext from "../../../contexts/orders/context";
import OrderContextProvider from "../../../contexts/orders/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(OrderContext);

  const { state } = useLocation();

  // get details depends On id (getting from url)
  useEffect(() => {
    const getDetails = async () => {
      await actions.getDetails(state);
    };

    if (id) {
      getDetails();
    }
  }, []);

  // Cities
  const [cities, setCities] = useState<any[]>([]);
  const [citiesLoading, setCiteisLoading] = useState(true);
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
  const [regionsLoading, setRegionsLoading] = useState(true);
  useEffect(() => {
    const getCiteies = async () => {
      try {
        const { data } = await EndPoints.region.getData({
          page: 1,
          pageSize: 999999,
        });

        setregions(data?.data ?? []);
      } catch (err) {
      } finally {
        setRegionsLoading(false);
      }
    };
    getCiteies();
  }, []);

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

  return (
    <>
      <PageHeader
        title={details ? "تعديل الطلب" : "انشاء طلب"}
        subTitle={details ? "يتم تعديل الطلب" : "اضافة طلب جديد"}
        extra={[
          <Button
            key={0}
            loading={loading.includes("create") || loading.includes("update")}
            onClick={() => {
              navigate(-1);
            }}
          >
            الغاء
          </Button>,
          <Divider key={1} type="vertical" />,
          <Button
            loading={loading.includes("create") || loading.includes("update")}
            form="order-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            حفظ
          </Button>,
        ]}
      />

      <MainForm
        formId="order-form"
        title="Create order"
        subTitle="Adding a new order"
        onSubmit={async (data) => {
          //   const formData = new FormData()
          //   Object.keys(data).forEach((key) => {
          //     if (Array.isArray(data[key])) {
          //       data[key]?.map((item: any) => {
          //         formData.append(key, item)
          //       })
          //     } else {
          //       formData.append(key, data[key] ?? "")
          //     }
          //   })
          details
            ? await actions.updateOrder(details?.id, data)
            : await actions.createOrder({ ...data, RegionID: 50000 });
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          {/* By default now */}
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="تاريخ الطلب"
              rules={{ required: true }}
              name="OrderDate"
              width="large"
              input={{
                type: "date-picker",
              }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="المدينة"
              rules={{ required: true }}
              name="City"
              width="large"
              input={{
                type: "select",
                loading: citiesLoading,
                allowSearch: true,

                options: cities?.map((item) => {
                  return {
                    value: item?.cityno,
                    label: item?.cityname,
                  };
                }),
              }}
            />
          </Col>
          {/* TODO selcet region based on city */}
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="المنطقة"
              rules={{ required: true }}
              name="Region"
              width="large"
              input={{
                type: "select",
                loading: regionsLoading,
                allowSearch: true,

                options: regions?.map((item) => {
                  return {
                    value: item?.RegionID,
                    label: item?.RegionName,
                  };
                }),
              }}
            />
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
          {/* By default 1 */}
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="الحالة"
              rules={{ required: true }}
              name="status"
              input={{ type: "number" }}
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
            <FieldBuilder
              label="أجرة المندوب"
              rules={{ required: true }}
              name="SalesRepCost"
              input={{ type: "number" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="التوصيل"
              rules={{ required: true }}
              name="Delivery"
              input={{ type: "number" }}
            />
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
      </MainForm>
    </>
  );
};

const OrderForm = () => {
  return (
    <OrderContextProvider>
      <Form />
    </OrderContextProvider>
  );
};

export default OrderForm;
