import {
  Avatar,
  Button,
  Col,
  DatePicker,
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
import { filterOption } from "../../utils/helpers/functions";
// import { tableOnChange } from "../../utils/helpers/table-sorts-filters";

const { RangePicker } = DatePicker;

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
      title: "اسم الزبون",
      dataIndex: "CustomerName",
      align: "center",
      key: "CustomerName",
    },
    {
      title: "رقم الزبون",
      dataIndex: "CustomerPhone",
      align: "center",
      key: "CustomerPhone",
    },
    {
      title: "المدينة",
      dataIndex: "City_Orders_CityToCity",
      align: "center",
      key: "City_Orders_CityToCity",
      render: (_, record) => {
        return <>{record?.City_Orders_CityToCity?.cityname}</>;
      },
    },
    {
      title: "المنطقة",
      dataIndex: "RegionName",
      align: "center",
      key: "RegionName",
      render: (_, record) => {
        return <>{record?.Region_Orders_RegionToRegion?.RegionName}</>;
      },
    },
    {
      title: "المندوب",
      dataIndex: "salesRep",
      align: "center",
      key: "salesRep",
      render: (_, record) => {
        return <>{record?.SalesReps?.SalesRepName}</>;
      },
    },
    {
      title: "الحالة",
      dataIndex: "Status_Orders_StatusToStatus",
      align: "center",
      key: "Status_Orders_StatusToStatus",
      render: (_, record) => {
        return (
          <Tag
            color={
              record?.Status_Orders_StatusToStatus?.Status === "تم التسليم"
                ? "green"
                : ""
            }
          >
            {record?.Status_Orders_StatusToStatus?.Status}
          </Tag>
        );
      },
    },

    {
      title: "كلف إضافية",
      dataIndex: "ExtraFees",
      align: "center",
      key: "ExtraFees",
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
              navigate(`details/${record?.OrderNo}`, { state: record });
            }}
          />
          <EditBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              actions.getDetails(record);
              navigate(`update/${record?.OrderNo}`, { state: record });
            }}
          />

          <DeleteBtn
            onConfirm={async () => {
              await actions.deleteOrder(record?.OrderNo);
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
    setValue,
  } = useForm();
  const onSubmit = (data: any) => {
    let submitedData = data;
    delete submitedData.min;
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

  const [regions, setRegions] = useState<any[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(true);
  useEffect(() => {
    const getStatuses = async () => {
      try {
        const { data } = await EndPoints.region.getData({
          page: 1,
          pageSize: 999999,
        });

        setRegions(data?.data ?? []);
      } catch (err) {
      } finally {
        setRegionsLoading(false);
      }
    };
    getStatuses();
  }, []);

  // Sales Rep
  const [salesReps, setSalesReps] = useState<any[]>([]);
  const [salesRepsLoading, setSalesRepsLoading] = useState(true);
  useEffect(() => {
    const getSalesReps = async () => {
      try {
        const { data } = await EndPoints.salesRep.getData({
          page: 1,
          pageSize: 999999,
        });

        setSalesReps(data?.SalesReps ?? []);
      } catch (err) {
      } finally {
        setSalesRepsLoading(false);
      }
    };
    getSalesReps();
  }, []);

  // clients
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
          // <Button
          //   type="primary"
          //   key={2}
          //   onClick={() => {
          //     navigate(`/orders/create`);
          //   }}
          //   icon={<PlusOutlined />}
          // >
          //   اضافة
          // </Button>,
        ]}
      />
      <FilterCard
        onReset={() => {
          reset();
          setValue("mindate", undefined);
          setValue("maxdate", undefined);
          setValue("min", undefined);
          actions.setQuery({
            page: 1,
            pageSize: 10,
            CityID: undefined,
            RegionName: undefined,
            mindate: undefined,
            maxdate: undefined,
            city: undefined,
            clientname: undefined,
            customerphone: undefined,
            region: undefined,
            salesrep: undefined,
            status: undefined,
          });
        }}
        applyLoading={loading.includes("list")}
        resetLoading={loading.includes("list")}
        formId="form"
      >
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <FormItem label="رقم الزبون">
                <Controller
                  control={control}
                  name="customerphone"
                  render={({ field }) => {
                    return <Input {...field} placeholder="رقم الزبون" />;
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
                        showSearch
                        filterOption={filterOption}
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
            <Col xs={24} lg={12}>
              <FormItem label="المنطقة">
                <Controller
                  control={control}
                  name="region"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        size="middle"
                        showSearch
                        filterOption={filterOption}
                        style={{ width: "100%" }}
                        loading={regionsLoading}
                        placeholder={"المنطقة"}
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
              <FormItem label="العميل">
                <Controller
                  control={control}
                  name="clientname"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        size="middle"
                        showSearch
                        filterOption={filterOption}
                        style={{ width: "100%" }}
                        loading={clientsLoading}
                        placeholder={"العميل"}
                        options={clients?.map((item) => {
                          return {
                            value: item?.CustNo,
                            label: item?.customername,
                          };
                        })}
                      />
                    );
                  }}
                />
              </FormItem>
            </Col>

            <Col xs={24} lg={12}>
              <FormItem label="المندوب">
                <Controller
                  control={control}
                  name="salesrep"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        size="middle"
                        showSearch
                        filterOption={filterOption}
                        style={{ width: "100%" }}
                        loading={salesRepsLoading}
                        placeholder={"المندوب"}
                        options={salesReps?.map((item) => {
                          return {
                            value: item?.RepNo,
                            label: item?.SalesRepName,
                          };
                        })}
                      />
                    );
                  }}
                />
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem label="الحالة">
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        size="middle"
                        style={{ width: "100%" }}
                        loading={statuesesLoading}
                        placeholder={"الحالة"}
                        options={statuses?.map((item) => {
                          return {
                            value: item?.Statusno,
                            label: item?.Status,
                          };
                        })}
                      />
                    );
                  }}
                />
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem label="من و الى التاريخ">
                <Controller
                  control={control}
                  name="min"
                  render={({ field }) => {
                    return (
                      <RangePicker
                        {...field}
                        style={{ width: "100%" }}
                        popupStyle={{ direction: "ltr" }}
                        allowClear={true}
                        onReset={() => {
                          setValue("mindate", undefined);
                          setValue("maxdate", undefined);
                        }}
                        onChange={(val) => {
                          setValue(
                            "mindate",
                            val ? val[0]?.format("YYYY-MM-DD") : undefined
                          );
                          setValue(
                            "maxdate",
                            val ? val[1]?.format("YYYY-MM-DD") : undefined
                          );
                          field.onChange(val);
                        }}
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
