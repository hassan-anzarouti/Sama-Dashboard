import { Button, Col, Divider, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import FormItem from "../../general/form-item";
import EndPoints from "../../../services/end-points";
import Controller from "../../form-components/controller";
import RegionContext from "../../../contexts/regions/context";
import RegionContextProvider from "../../../contexts/regions/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(RegionContext);

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

  let statuses = [true, false];

  const [imageUrl, setImageUrl] = useState<string>();

  const [cities, setCities] = useState<any[]>([]);
  const [citiesLoading, setCiteisLoading] = useState(true);

  useEffect(() => {
    const getCiteies = async () => {
      try {
        const { data } = await EndPoints.city.getData({
          page: 1,
          pageSize: 999999,
        });

        setCities(data.City);
      } catch (err) {
      } finally {
        setCiteisLoading(false);
      }
    };
    getCiteies();
  }, []);

  return (
    <>
      <PageHeader
        title={details ? "تعديل منطقة" : "انشاء منطقة"}
        subTitle={details ? "يتم تعديل المنطقة" : "اضافة منطقة جديدة"}
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
            form="region-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            حفظ
          </Button>,
        ]}
      />

      <MainForm
        formId="region-form"
        title="Create region"
        subTitle="Adding a new region"
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
            ? await actions.updateRegion(details?.id, data)
            : await actions.createRegion({ ...data, RegionID: 50000 });
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="المنطقة"
              rules={{ required: true }}
              name="RegionName"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="المدينة"
              rules={{ required: true }}
              name="CityID"
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

const RegionForm = () => {
  return (
    <RegionContextProvider>
      <Form />
    </RegionContextProvider>
  );
};

export default RegionForm;
