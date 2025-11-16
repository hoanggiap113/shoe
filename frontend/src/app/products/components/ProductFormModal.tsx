"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Upload,
  App,
  UploadFile, // Import UploadFile
} from "antd";
import type { UploadProps } from "antd"; // Import UploadProps
import { ISanpham } from "@/types/product-interfaces";
import { PlusOutlined } from "@ant-design/icons";
import { COLOR_OPTIONS } from "@/types/color-interface";
import { MUC_DICH_OPTIONS } from "@/types/type-interface";
import { BRAND_OPTIONS } from "@/types/brand-type";
import api from "@/lib/api";

interface ProductFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ISanpham) => void;
  productData?: ISanpham | null;
}

export const ProductFormModal: React.FC<ProductFormProps> = ({
  visible,
  onClose,
  onSubmit,
  productData,
}) => {
  const GIOITINH = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];
  const TRANGTHAI = [
    { label: "Còn bán", value: "Còn bán" },
    { label: "Hết hàng", value: "Hết hàng" },
  ];

  const [form] = Form.useForm();
  // SỬA: State của antd Upload nên là một mảng (UploadFile[])
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { message } = App.useApp();
  const isEditMode = !!productData;

  useEffect(() => {
    if (visible && productData) {
      // Set giá trị cho form
      form.setFieldsValue({
        ...productData,
        // Đảm bảo MaHang được set nếu tên trường trong form là MaHang
        MaHang: productData.MaHang,
      });

      // Hiển thị ảnh cũ
      if (productData.HinhAnh) {
        const uploadFile: UploadFile = {
          uid: "old-image",
          name: productData.HinhAnh.split("/").pop() || "image.jpg",
          status: "done",
          // Giả sử API_URL của bạn là biến môi trường
          url: `${process.env.NEXT_PUBLIC_API_URL}${productData.HinhAnh}`,
          response: productData.HinhAnh, // Lưu đường dẫn ảnh cũ vào response
        };
        // SỬA: setFileList là một mảng
        setFileList([uploadFile]);
      } else {
        setFileList([]);
      }
    } else {
      // Reset khi mở modal Thêm mới
      form.resetFields();
      setFileList([]);
    }
  }, [visible, productData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      let finalImageUrl = "";

      // 1. Upload ảnh mới (nếu có file mới được chọn)
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("files", fileList[0].originFileObj);
        const res = await api.post("/files", formData);
        finalImageUrl = res.data.files[0];
      }
      // 2. Giữ ảnh cũ (nếu đang edit và không chọn ảnh mới)
      else if (isEditMode && fileList.length > 0 && fileList[0].response) {
        finalImageUrl = fileList[0].response as string;
      }
      // (Nếu không thuộc 2 TH trên, ảnh sẽ là chuỗi rỗng "")

      const finalData: ISanpham = {
        ...values,
        HinhAnh: finalImageUrl,
      };

      onSubmit(finalData);
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errorFields" in err) {
        // Lỗi validate
        message.error("Vui lòng kiểm tra lại các trường thông tin");
      } else {
        message.error("Có lỗi khi lưu sản phẩm");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // SỬA: Logic xử lý fileList cho Upload component
  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    // Chỉ giữ lại 1 file cuối cùng
    setFileList(
      newFileList.length > 0 ? [newFileList[newFileList.length - 1]] : []
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <Modal
      title={isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={isEditMode ? "Cập nhật" : "Thêm"}
      confirmLoading={uploading}
      width={700}
      centered
    >
      <div className="max-h-[70vh] overflow-y-auto pr-4 pt-4">
        <Form form={form} layout="vertical">
          {/* === CÁC TRƯỜNG FULL-WIDTH === */}
          <Form.Item
            label="Tên sản phẩm"
            name="TenSP"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>

          <Form.Item label="Mô tả" name="MoTa">
            <Input.TextArea rows={3} placeholder="Mô tả chi tiết sản phẩm" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá"
                name="Gia"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Số lượng"
                name="SoLuongTon"
                rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Kích cỡ" name="KichCo">
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Màu sắc" name="MauSac">
                <Select placeholder="Chọn màu" options={COLOR_OPTIONS} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Mục đích" name="MucDich">
                <Select
                  placeholder="Chọn mục đích"
                  options={MUC_DICH_OPTIONS}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Hãng" name="MaHang">
                <Select placeholder="Chọn hãng giày" options={BRAND_OPTIONS} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Giới tính" name="GioiTinh">
                <Select placeholder="Chọn giới tính" options={GIOITINH} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng Thái"
                name="TrangThai"
                initialValue={"Còn bán"} // Dùng initialValue thay vì defaultValue
              >
                <Select placeholder="Chọn trạng thái" options={TRANGTHAI} />
              </Form.Item>
            </Col>
          </Row>
          {/* === THÊM: COMPONENT UPLOAD === */}
          <Form.Item label="Hình ảnh">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Ngăn tự động upload
              onChange={handleFileChange}
              onRemove={() => setFileList([])}
              maxCount={1}
            >
              {fileList.length < 1 && uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
