/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Table } from "antd"

interface DataTableProps<T> {
  columns: any[];
  data: T[];
  loading?: boolean;
  pageSize?: number;
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  pageSize = 10,
}: DataTableProps<T>) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize }}
      rowKey={(record: any) => record.id || record.key}
    />
  );
}