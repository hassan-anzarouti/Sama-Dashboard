import { Button, Col, Divider, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import SalesRepContext from "../../../contexts/salesRep/context";
import SalesRepContextProvider from "../../../contexts/salesRep/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(SalesRepContext);

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
        title={details ? "تعديل مندوب" : "انشاء مندوب"}
        subTitle={details ? "يتم تعديل المندوب" : "اضافة مندوب جديد"}
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
            form="sales-rep-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            حفظ
          </Button>,
        ]}
      />

      <MainForm
        formId="sales-rep-form"
        title="Create sales rep"
        subTitle="Adding a new sales rep"
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
            ? await actions.updateSalesRep(details?.id, data)
            : await actions.createSalesRep({ ...data, id: 60000 });
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="الاسم"
              rules={{ required: true }}
              name="SalesRepName"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="رقم الهاتف"
              rules={{ required: true }}
              name="Phone"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="تغطية المناطق"
              rules={{ required: true }}
              name="CoveredRegions"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="SRSN"
              rules={{ required: true }}
              name="SRSN"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="SRpwd"
              rules={{ required: true }}
              name="SRpwd"
              input={{ type: "password" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const SalesRepForm = () => {
  return (
    <SalesRepContextProvider>
      <Form />
    </SalesRepContextProvider>
  );
};

export default SalesRepForm;
