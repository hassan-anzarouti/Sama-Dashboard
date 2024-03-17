import { Pagination as AntdPagination, PaginationProps } from "antd";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface Props extends PaginationProps {}

const Pagination: React.FC<Props> = (props) => {
  return (
    <AntdPagination
      style={{ direction: "rtl" }}
      className={classNames("shadow", styles.pagination)}
      showTotal={(total, range) => {
        return `عرض ${
          range[0] && range[1] ? `${range[0]}-${range[1]} من` : ""
        } ${total} أغراض`;
      }}
      // hideOnSinglePage
      defaultPageSize={10}
      showQuickJumper
      showSizeChanger
      responsive
      {...props}
      pageSize={props.pageSize ?? 10}
    />
  );
};

export default Pagination;
