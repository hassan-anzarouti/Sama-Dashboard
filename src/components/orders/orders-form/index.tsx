import { Button, Col, DatePicker, Divider, Row, Select } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import EndPoints from "../../../services/end-points";
import OrderContext from "../../../contexts/orders/context";
import OrderContextProvider from "../../../contexts/orders/provider";
import dayjs from "dayjs";
import FormItem from "../../general/form-item";
import Controller from "../../form-components/controller";
import { filterOption } from "../../../utils/helpers/functions";
import OrdersInputsForm from "./OrdersInputsForm";

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
        dontNavigate={true}
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
        defaultValues={{
          ...details,
          status: !details ? 1 : details.status,
          OrderDate: !details
            ? dayjs(new Date()).format("YYYY-MM-DD")
            : details.OrderDate,
        }}
      >
        <OrdersInputsForm />
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
