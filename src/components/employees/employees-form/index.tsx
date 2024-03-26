import { Button, Col, Divider, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import EmployeeContext from "../../../contexts/employees/context";
import EmployeeContextProvider from "../../../contexts/employees/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(EmployeeContext);

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
        title={details ? "تعديل موظف" : "انشاء موظف"}
        subTitle={details ? "يتم تعديل الموظف" : "اضافة موظف جديد"}
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
            form="employee-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            حفظ
          </Button>,
        ]}
      />

      <MainForm
        formId="employee-form"
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
            ? await actions.updateEmployee(details?.id, data)
            : await actions.createEmployee({ ...data, id: 60000 });
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="الاسم"
              rules={{ required: true }}
              name="name"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="الاسم الكامل"
              rules={{ required: true }}
              name="full_name"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="الصلاحية"
              rules={{ required: true }}
              name="privilege"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="كلمة السر"
              rules={{ required: true }}
              name="password"
              input={{ type: "password" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const EmployeeForm = () => {
  return (
    <EmployeeContextProvider>
      <Form />
    </EmployeeContextProvider>
  );
};

export default EmployeeForm;
