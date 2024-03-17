import {
  Avatar,
  Button,
  Col,
  Divider,
  Image,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
// import FilterCard from "../../components/general/filter-card";
import { useContext, useState, useEffect } from "react";
import RefreshBtn from "../../components/general/header-actions/refresh-btn";
import { ColumnProps } from "antd/lib/table";
import PageHeader from "../../components/general/page-header";
import Table from "../../components/general/table-components/table";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FilterCard from "../../components/general/filter-card";
import FieldBuilder from "../../components/form-components/field-builder";
import { Controller, useForm } from "react-hook-form";
import EndPoints from "../../services/end-points";
import FormItem from "../../components/general/form-item";
import OrderContext from "../../contexts/orders/context";
import OrderContextProvider from "../../contexts/orders/provider";
import dayjs from "dayjs";
// import { tableOnChange } from "../../utils/helpers/table-sorts-filters";

const Orders = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "تاريخ الطلب",
      dataIndex: "OrderDate",
      key: "OrderDate",
      align: "center",
      render: (val) => {
        if (val) return <>{dayjs(val).format("YYYY-MM-DD")}</>;
        else return "-";
      },
    },
    {
      title: "رقم العميل",
      dataIndex: "CustomerPhone",
      align: "center",
      key: "CustomerPhone",
    },
    {
      title: "مكان التوصيل",
      dataIndex: "City_Orders_CityToCity",
      align: "center",
      key: "City_Orders_CityToCity",
      render: (_, record) => {
        return <>{record?.City_Orders_CityToCity?.cityname}</>;
      },
    },
    {
      title: "الحالة",
      dataIndex: "Status_Orders_StatusToStatus",
      align: "center",
      key: "Status_Orders_StatusToStatus",
      render: (_, record) => {
        return <Tag>{record?.Status_Orders_StatusToStatus?.Status}</Tag>;
      },
    },
    {
      title: "اسم العميل",
      dataIndex: "CustomerName",
      align: "center",
      key: "CustomerName",
    },
    {
      title: "المبلغ الكامل",
      dataIndex: "TotalPrice",
      align: "center",
      key: "CustomerName",
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
              navigate(`details/${record?.RegionID}`, { state: record });
            }}
          />
          <EditBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              actions.getDetails(record);
              navigate(`update/${record?.RegionID}`, { state: record });
            }}
          />

          <DeleteBtn
            onConfirm={async () => {
              await actions.deleteOrder(record?.RegionID);
            }}
            loading={loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading, query } = useContext(OrderContext);

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
        title={"الطلبات"}
        subTitle={"جميع الطلبات المسجلة"}
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
              navigate(`/orders/create`);
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
            CityID: undefined,
            RegionName: undefined,
          });
        }}
        applyLoading={loading.includes("list")}
        resetLoading={loading.includes("list")}
        formId="form"
      >
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <FormItem label="رقم العميل">
                <Controller
                  control={control}
                  name="customerphone"
                  render={({ field }) => {
                    return <Input {...field} placeholder="رقم العميل" />;
                  }}
                />
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem label="المدينة">
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        size="middle"
                        style={{ width: "100%" }}
                        placeholder={"المدينة"}
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
          dataSource={list?.data ?? []}
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

const OrdersPage = () => {
  return (
    <OrderContextProvider>
      <Orders />
    </OrderContextProvider>
  );
};

export default OrdersPage;
