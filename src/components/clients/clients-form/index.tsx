import { Button, Col, Divider, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import ClientContext from "../../../contexts/clients/context";
import ClientContextProvider from "../../../contexts/clients/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(ClientContext);

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
        title={details ? "تعديل عميل" : "انشاء عميل"}
        subTitle={details ? "يتم تعديل العميل" : "اضافة عميل جديد"}
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
            form="client-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            حفظ
          </Button>,
        ]}
      />

      <MainForm
        formId="client-form"
        title="Create client"
        subTitle="Adding a new client"
        onSubmit={async (data) => {
          console.log("r", data);

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
            ? await actions.updateClient(details?.CustNo, data)
            : await actions.createClient({ ...data, CustNo: 60000 });
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="الاسم"
              rules={{ required: true }}
              name="customername"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="النوع"
              rules={{ required: true }}
              name="type"
              input={{ type: "text" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const ClientForm = () => {
  return (
    <ClientContextProvider>
      <Form />
    </ClientContextProvider>
  );
};

export default ClientForm;
