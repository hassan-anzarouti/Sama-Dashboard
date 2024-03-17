import { Button, Col, Divider, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import CityContextProvider from "../../../contexts/cities/provider";
import CityContext from "../../../contexts/cities/context";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(CityContext);

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
        title={details ? "تعديل مدينة" : "انشاء مدينة"}
        subTitle={details ? "يتم تعديل المدينة" : "اضافة مدينة جديدة"}
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
            form="city-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            حفظ
          </Button>,
        ]}
      />

      <MainForm
        formId="city-form"
        title="Create city"
        subTitle="Adding a new city"
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
            ? await actions.updateCity(details?.id, data)
            : await actions.createCity({ ...data });
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="المدينة"
              rules={{ required: true }}
              name="cityname"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="سعر التوصيل"
              rules={{ required: true }}
              name="DelPrice"
              input={{ type: "number" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="أجرة المندوب"
              rules={{ required: true }}
              name="SRPrice"
              input={{ type: "number" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const CityForm = () => {
  return (
    <CityContextProvider>
      <Form />
    </CityContextProvider>
  );
};

export default CityForm;
