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
import { Table, Button, Image, Tag, Form, App } from "antd";
import { ProductFormModal } from "./components/ProductFormModal";
import ProductTable from "./components/ProductTable";
// Import component Modal mới
import FilterModal, { IFilterValues } from "./components/FilterModal";

export default function ProductPage() {
  const [products, setProducts] = useState<ISanpham[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<IFilterValues>({});
  const [form] = Form.useForm<IFilterValues>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { message } = App.useApp();
  const [selectedProduct, setSelectedProduct] = useState<ISanpham | null>(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters?: IFilterValues) => {
    try {
      let apiParams = {};
      if (filters && Object.keys(filters).length > 0) {
        apiParams = {
          customFilters: filters,
        };
      }
      setLoading(true);
      const res = await api.get("/products", {
        params: apiParams,
      });
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
    fetchProducts(values);
  };

  // Hàm xử lý khi bấm "Xóa lọc"
  const handleClearFilter = () => {
    setFilterValues({});
    form.resetFields();
    setIsModalVisible(false);
    fetchProducts({});
  };
  const handleSubmitAddForm = async (values: ISanpham) => {
    try {
      const res = await api.post("/products", values);
      if (res) {
        message.success("Tạo sản phẩm thành công");
        fetchProducts(filterValues); // Refresh lại danh sách
        setIsAddModalOpen(false);
      }
    } catch (err) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      console.log(err);
    }
  };
  const handleCloseAddForm = () => {
    setIsAddModalOpen(false);
  };
  const handleSubmitEditForm = async (values: ISanpham) => {
    if (!selectedProduct) return;

    try {
      setLoading(true);
      await api.patch(`/products/${selectedProduct.MaSP}`, values);
      message.success("Cập nhật sản phẩm thành công");
      fetchProducts(filterValues); // Refresh lại danh sách
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      message.error("Có lỗi máy chủ, vui lòng thử lại sau");
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProduct = async (productId: number) => {
    try {
      const confirmed = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if (!confirmed) return;
      setLoading(true);
      await api.delete(`/products/${productId}`);
      message.success("Xóa sản phẩm thành công");
      fetchProducts(filterValues);
    } catch (err) {
      message.error("Có lỗi máy chủ, vui lòng thử lại sau");
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleOpenEditModal = (product: ISanpham) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const handleIsAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };
  const columns = ProductTable(handleDeleteProduct, handleSubmitEditForm);

  return (
    <>
      <main className="p-6 flex-1 overflow-y-auto">
        <h1 className="text-[30px] font-bold mb-4 text-blue-500">
          Danh sách sản phẩm
        </h1>

        {/* Action buttons (Không thay đổi) */}
        <div className="flex items-center gap-3 mb-4">
          <button
            className="bg-gray-300 flex items-center gap-2 px-4 py-2 rounded-lg transition hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircleOutlined />
            <span>Thêm sản phẩm</span>
          </button>
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

      <FilterModal
        open={isModalVisible}
        form={form}
        initialValues={filterValues}
        onCancel={() => setIsModalVisible(false)}
        onFilter={handleFilterSubmit}
        onClear={handleClearFilter}
      />
      <ProductFormModal
        visible={isAddModalOpen}
        onClose={handleCloseAddForm}
        onSubmit={handleSubmitAddForm}
      />
      <ProductFormModal
        visible={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmitEditForm}
        productData={selectedProduct}
      />
    </>
  );
}
