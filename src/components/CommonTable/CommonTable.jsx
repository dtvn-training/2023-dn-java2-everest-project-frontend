import React from "react";
import { Table } from "antd";

const CommonTable = ({ columns, dataSource, loading, pagination, onChange, onEdit, onDelete }) => {
  console.log("dataSource", dataSource);
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      onChange={onChange}
      rowKey={(record) => record.campaignId}
      bordered
    />
  );
};

export default CommonTable;
