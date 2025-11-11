/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Row,
  Col,
  Card,
  Typography,
  InputNumber,
  Space,
  message,
} from "antd";
import api from "@/lib/api";
import { TRoomFormInput } from "@/types/room.type";


const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

export default function AddRoomPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Dùng hook Form của Ant Design
   const [form] = Form.useForm();

  const onFinish = async (values: TRoomFormInput) => {
    setIsSubmitting(true);
    console.log("Dữ liệu từ Antd Form:", values);

    const formData = new FormData();

    if (values.image && values.image[0] && values.image[0].originFileObj) {
      formData.append("image", values.image[0].originFileObj as any);
    }

    Object.keys(values).forEach((key) => {
      const value = (values as any)[key];
      if (key === "image") {
        // Bỏ qua
      } else if (key === "location" && value) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      // File `lib/api.ts` sẽ tự động đính kèm token vào request này
      const response = await api.post("/rooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response từ server:", response.data);
      message.success("Thêm phòng thành công!");
      form.resetFields();
      
    } catch (error: any) {
      console.error("Lỗi khi thêm phòng:", error);
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

    const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const cities = [
    { value: "Hanoi", label: "Hà Nội" },
    { value: "HCM", label: "TP. Hồ Chí Minh" },
    { value: "Danang", label: "Đà Nẵng" },
  ];

  // Lý tưởng nhất, danh sách này sẽ thay đổi dựa trên thành phố được chọn
  const districts = [
    { value: "DongDa", label: "Đống Đa" },
    { value: "BaDinh", label: "Ba Đình" },
    { value: "HoanKiem", label: "Hoàn Kiếm" },
    { value: "Quan1", label: "Quận 1" },
  ];
  return (
    <main className="p-6">
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-6">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/rooms")}
          >
            Trở về
          </Button>
          <Button
            type="primary"
            htmlType="submit" // Nút này sẽ trigger 'onFinish'
            form="addProductForm"
            icon={<PlusCircleOutlined />}
            loading={isSubmitting}
          >
            Thêm Phòng
          </Button>
        </Space>
      </div>

      {/* 5. Gắn 'form', 'onFinish' và 'initialValues' */}
      <Form
        id="addProductForm"
        form={form} // Kết nối form instance
        layout="vertical"
        onFinish={onFinish} // Hàm xử lý khi submit
        initialValues={{
          // Đặt giá trị mặc định
          status: "active",
        }}
      >
        <Row gutter={24}>
          {/* Cột trái */}
          <Col xs={24} lg={16}>
            <Card title="Thông tin chung" className="shadow-sm">
              {/* 6. Dùng 'name' và 'rules' */}
              <Form.Item
                label="Tên phòng"
                name="name" // Tên trường
                rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]} // Luật lệ
              >
                <Input placeholder="Nhập tên phòng" />
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  {/* 1. Dùng name lồng nhau */}
                  <Form.Item
                    label="Thành phố"
                    name={["location", "city"]} // -> values.location.city
                    rules={[
                      { required: true, message: "Vui lòng chọn thành phố" },
                    ]}
                  >
                    <Select placeholder="Chọn thành phố">
                      {cities.map((city) => (
                        <Option key={city.value} value={city.value}>
                          {city.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  {/* 2. Dùng name lồng nhau */}
                  <Form.Item
                    label="Quận/Huyện"
                    name={["location", "ward"]} // -> values.location.ward
                    rules={[
                      { required: true, message: "Vui lòng chọn quận/huyện" },
                    ]}
                  >
                    <Select placeholder="Chọn quận/huyện">
                      {/* GHI CHÚ: Lý tưởng nhất, danh sách này nên được lọc
                          dựa trên thành phố đã chọn ở trên */}
                      {districts.map((district) => (
                        <Option key={district.value} value={district.value}>
                          {district.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Địa chỉ"
                name={["location","address"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ phòng",
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ phòng"></Input>
              </Form.Item>
              <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={8} placeholder="Nhập mô tả sản phẩm..." />
              </Form.Item>

              {/* 7. Xử lý Upload */}
              <Form.Item
                label="Ảnh sản phẩm"
                name="image"
                valuePropName="fileList" // Chỉ định prop để truyền file list
                getValueFromEvent={normFile} // Hàm để lấy giá trị
              >
                <Dragger
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false} // Ngăn upload tự động
                  accept="image/*"
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấn hoặc kéo file vào khu vực này để tải lên
                  </p>
                  <p className="ant-upload-hint">Chỉ hỗ trợ 1 ảnh.</p>
                </Dragger>
              </Form.Item>
            </Card>
          </Col>

          {/* Cột phải */}
          <Col xs={24} lg={8}>
            <Card
              title="Phân loại & Giá"
              bordered={false}
              className="shadow-sm"
            >
              <Form.Item label="Loại phòng" name="roomType">
                <Select placeholder="Chọn loại phòng">
                  <Option value="suite">Phòng SUT</Option>
                  <Option value="deluxe">Phòng sang trọng</Option>
                  <Option value="single">Phòng đơn</Option>
                  <Option value="double">Phòng đôi</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Kiểu giường"
                name="bedType"
                rules={[{ required: true, message: "Chọn kiểu giường" }]}
              >
                <Select placeholder="-- Chọn loại giường --">
                  <Option value="">-- Chọn nhãn hiệu --</Option>
                  <Option value="king">King</Option>
                  <Option value="queen">Queen</Option>
                  <Option value="twin">Đôi</Option>
                  <Option value="single">Đơn</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Giá thuê phòng" name="price">
                <InputNumber
                  placeholder="Nhập giá phòng/ đêm"
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
                />
              </Form.Item>
              <Form.Item label="Số lượng người" name="capacity">
                <InputNumber
                  placeholder="Nhập số lượng người"
                  style={{ width: "100%" }}
                  min={0}
                  max={6}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </main>
  );
}
