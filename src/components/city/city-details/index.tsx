import {
  Col,
  Descriptions as AntdDescriptions,
  Descriptions,
  Image,
  Row,
  Spin,
  Tag,
} from "antd";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageHeader from "../../general/page-header";
import styles from "./style.module.scss";
import CityContext from "../../../contexts/cities/context";
import CityContextProvider from "../../../contexts/cities/provider";

interface Props {}

const CityDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(CityContext);
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      id && (await actions.getDetails(state));
    };
    getDetails();
  }, []);

  return (
    <>
      <PageHeader
        title={"تفاصيل المدينة"}
        subTitle={"تفاصيل المدينة المحددة"}
      />
      <div className={styles.container}>
        {loading.includes("details") ? (
          <div className={styles.spinner}>
            <div>
              <Spin />
            </div>
          </div>
        ) : (
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Descriptions size="middle" column={1} bordered>
                <AntdDescriptions.Item label={"المعرف"}>
                  {details?.cityno}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"المدينة"}>
                  {details?.cityname}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"سعر التوصيل"}>
                  {details?.DelPrice}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"أجرة المندوب"}>
                  {details?.SRPrice}
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const CityDetailsPage = () => {
  return (
    <CityContextProvider>
      <CityDetails />
    </CityContextProvider>
  );
};
export default CityDetailsPage;
