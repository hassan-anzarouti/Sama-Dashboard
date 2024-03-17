import { Button, Col, Input, Row, Select, Space } from "antd";
import { useContext, useState, useEffect } from "react";
import { ColumnProps } from "antd/lib/table";
import PageHeader from "../../components/general/page-header";
import Table from "../../components/general/table-components/table";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FilterCard from "../../components/general/filter-card";
import { Controller, useForm } from "react-hook-form";
import EndPoints from "../../services/end-points";
import FormItem from "../../components/general/form-item";
import CityContext from "../../contexts/cities/context";
import CityContextProvider from "../../contexts/cities/provider";

const Cities = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "المدينة",
      dataIndex: "cityname",
      key: "cityname",
      align: "right",
    },
    {
      title: "سعر التوصيل",
      dataIndex: "DelPrice",
      align: "center",
      key: "DelPrice",
    },
    {
      title: "أجرة المندوب",
      dataIndex: "SRPrice",
      align: "center",
      key: "SRPrice",
    },
    {
      title: "الاجرائات",
      dataIndex: "",
      width: 200,
      align: "center",
      key: "x",
      render: (_: any, record) => (
        <Space>
          <ViewBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              actions.getDetails(record);
              navigate(`details/${record?.cityno}`, { state: record });
            }}
          />
          <EditBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              actions.getDetails(record);
              navigate(`update/${record?.cityno}`, { state: record });
            }}
          />

          <DeleteBtn
            onConfirm={async () => {
              await actions.deleteCity(record?.cityno);
            }}
            loading={loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading, query } = useContext(CityContext);

  useEffect(() => {
    console.log(query);

    actions.getData();
  }, [query]);

  // Filters && Sorts
  //   let tableFiltersProps = {};
  //   const [sorts, setSorts] = useState<ISort[]>([]);
  //   const [, setStaticFilters] = useState<IStaticFilter[]>(query?.filters ?? []);
  //   const [loadingPage, setLoading] = useState(true);

  //   useEffect(() => {
  //     sorts.length > 0 &&
  //       actions.setQuery({
  //         ...query,
  //         orders: sorts,
  //       });
  //   }, [sorts]);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data: any) => {
    actions.setQuery({ ...query, ...data });
  };

  return (
    <>
      <PageHeader
        title={"المدن"}
        subTitle={"جميع المدن المسجلة"}
        extra={[
          <Button
            loading={loading.includes("list")}
            key={3}
            onClick={() => actions.getData()}
          >
            تحديث
          </Button>,
          <Button
            type="primary"
            key={2}
            onClick={() => {
              navigate(`/cities/create`);
            }}
            icon={<PlusOutlined />}
          >
            اضافة
          </Button>,
        ]}
      />
      <FilterCard
        onReset={() => {
          reset();
          actions.setQuery({
            page: 1,
            pageSize: 10,
            cityname: undefined,
          });
        }}
        applyLoading={loading.includes("list")}
        resetLoading={loading.includes("list")}
        formId="form"
      >
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <FormItem label="بحث">
                <Controller
                  control={control}
                  name="cityname"
                  render={({ field }) => {
                    return <Input.Search {...field} placeholder="البحث" />;
                  }}
                />
              </FormItem>
            </Col>
          </Row>
        </form>
      </FilterCard>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0.125rem 0.25rem rgba(28, 43, 54, 0.075)",
        }}
      >
        <Table<any>
          rowKey="id"
          showPagination={true}
          size="small"
          columns={columns}
          dataSource={list?.City ?? []}
          loading={loading.includes("list")}
          total={list?.pagination?.count}
          pageSize={query.pageSize}
          page={query.page}
          onPaginationChange={(page, pageSize) => {
            actions.setQuery({
              ...query,
              page,
              pageSize: pageSize,
            });
          }}
          // onChange={(_, tableFilters, tabelSorters) => {
          //   tableOnChange(
          //     tableFilters,
          //     tabelSorters,
          //     tableFiltersProps,
          //     setSorts,
          //     setStaticFilters
          //   );
          // }}
        />
      </div>
    </>
  );
};

const CitiesPage = () => {
  return (
    <CityContextProvider>
      <Cities />
    </CityContextProvider>
  );
};

export default CitiesPage;
