"use client";
import Link from "next/link";
import {
  EditOutlined,
  UndoOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import api from "@/lib/api";
import { ISanpham, IHang } from "@/types/product-interfaces";
import { useEffect, useState } from "react";
import { Table, Button, Image, Tag, Form } from "antd"; // Bỏ Modal, Input, Select...
import formatCurrency from "@/lib/format-currency";

// Import component Modal mới
import FilterModal, { IFilterValues } from "./FilterModal";

export default function ProductPage() {
  const [products, setProducts] = useState<ISanpham[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<IFilterValues>({});
  const [form] = Form.useForm<IFilterValues>(); // Hook Ant Form vẫn giữ ở đây

  // Định nghĩa cột (Không thay đổi)
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "HinhAnh",
      key: "HinhAnh",
      render: (hinhAnh: string) => {
        if (!hinhAnh) return "Không có ảnh";
        const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${hinhAnh}`;
        return (
          <Image
            src={fullImageUrl}
            alt="Ảnh sản phẩm"
            width={80}
            height={60}
            style={{ objectFit: "cover" }}
            preview={true}
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "TenSP",
      key: "TenSP",
      render: (text: string, record: ISanpham) =>
        record.MaSP ? (
          <Link
            href={`/products/${record.MaSP}`}
            className="text-blue-600 hover:underline"
          >
            {text}
          </Link>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Giá",
      dataIndex: "Gia",
      key: "Gia",
      render: (gia: number) => formatCurrency(gia),
    },
    {
      title: "Số lượng tồn",
      dataIndex: "SoluongTon",
      key: "SoluongTon",
    },
    {
      title: "Hãng",
      dataIndex: "hang",
      key: "hang",
      render: (hang: IHang) => hang?.TenHang || "Không rõ",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      render: (trangThai: string) => (
        <Tag color={trangThai === "Còn bán" ? "green" : "red"}>{trangThai}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: (record: ISanpham) => (
        <div className="flex justify-center gap-3">
          <Link href={`/products/edit/${record.MaSP}`}>
            <Button
              type="text"
              icon={<EditOutlined />}
              className="text-blue-600"
            />
          </Link>
          <Button type="text" icon={<DeleteOutlined />} danger />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchProducts(filterValues);
  }, [filterValues]);

  const fetchProducts = async (filters: IFilterValues = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("filter[include]", "hang");

      if (filters.ten) params.append("ten", filters.ten);
      if (filters.giaTu) params.append("giaTu", filters.giaTu.toString());
      if (filters.giaDen) params.append("giaDen", filters.giaDen.toString());
      if (filters.maHang && filters.maHang.length > 0) {
        params.append("mauSac", filters.maHang.join(","));
      }
      if (filters.mucDich && filters.mucDich.length > 0) {
        params.append("mucDich", filters.mucDich.join(","));
      }
      console.log(params);
      const queryString = params.toString();
      console.log(queryString)
      const res = await api.get(`/products?${queryString}`);
      setProducts(res.data as ISanpham[]);
    } catch (err) {
      console.log("Lỗi khi tải sản phẩm", err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi bấm "Lọc" trong Modal
  const handleFilterSubmit = (values: IFilterValues) => {
    setFilterValues(values);
    setIsModalVisible(false);
  };

  // Hàm xử lý khi bấm "Xóa lọc"
  const handleClearFilter = () => {
    setFilterValues({});
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <main className="p-6 flex-1 overflow-y-auto">
        <h1 className="text-[30px] font-bold mb-4 text-blue-500">
          Danh sách sản phẩm
        </h1>

        {/* Action buttons (Không thay đổi) */}
        <div className="flex items-center gap-3 mb-4">
          <Link href={"/products/add"}>
            <button className="bg-gray-300 flex items-center gap-2 px-4 py-2 rounded-lg transition hover:bg-gray-200 cursor-pointer">
              <PlusCircleOutlined />
              <span>Thêm sản phẩm</span>
            </button>
          </Link>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            disabled={loading}
            onClick={() => fetchProducts(filterValues)}
          >
            <UndoOutlined
              className={loading ? "animate-spin text-gray-400" : ""}
            />
            <span>{loading ? "Đang tải..." : "Refresh"}</span>
          </button>

          <button
            className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition hover:bg-blue-600"
            onClick={() => setIsModalVisible(true)}
          >
            <FilterOutlined />
            <span>Bộ lọc</span>
          </button>

          {Object.keys(filterValues).length > 0 && (
            <Tag color="blue" closable onClose={handleClearFilter}>
              Đang lọc
            </Tag>
          )}

          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 ml-auto w-64 shadow-sm">
            <SearchOutlined className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Table (Không thay đổi) */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <Table
            columns={columns}
            dataSource={products}
            loading={loading}
            pagination={{ pageSize: 5 }}
            rowKey="MaSP"
          />
        </div>
      </main>

      {/* === MODAL LỌC (Đã được tách) === */}
      <FilterModal
        open={isModalVisible}
        form={form}
        initialValues={filterValues}
        onCancel={() => setIsModalVisible(false)}
        onFilter={handleFilterSubmit}
        onClear={handleClearFilter}
      />
    </>
  );
}