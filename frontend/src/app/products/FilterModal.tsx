"use client";

import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Button,
  FormInstance,
} from "antd";

// Interface cho các giá trị lọc
export interface IFilterValues {
  ten?: string;
  giaTu?: number;
  giaDen?: number;
  maHang?: number[];
  mucDich?: string[];
}

// === CÁC LỰA CHỌN CHO FILTER (VÍ DỤ) ===
const MAU_SAC_OPTIONS = [
  { label: "Trắng", value: "Trắng" },
  { label: "Đen", value: "Đen" },
  { label: "Xanh", value: "Xanh" },
  { label: "Đỏ", value: "Đỏ" },
  { label: "Hồng", value: "Hồng" },
];
const MUC_DICH_OPTIONS = [
  { label: "Đi chơi", value: "Đi chơi" },
  { label: "Chạy bộ", value: "Chạy bộ" },
  { label: "Văn phòng", value: "Văn phòng" },
  { label: "Thể thao", value: "Thể thao" },
];
const HANG_OPTION = [
  { label: "Nike", value: 1 },
  { label: "Adidas", value: 2 },
  { label: "Puma", value: 3 },
  { label: "Converse", value: 4 },
];

interface FilterModalProps {
  open: boolean;
  form: FormInstance<IFilterValues>;
  initialValues: IFilterValues;
  onCancel: () => void;
  onFilter: (values: IFilterValues) => void;
  onClear: () => void;
}

export default function FilterModal({
  open,
  form,
  initialValues,
  onCancel,
  onFilter,
  onClear,
}: FilterModalProps) {
  return (
    <Modal
      title="Bộ lọc sản phẩm"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFilter} // Gọi khi bấm nút "Lọc"
        initialValues={initialValues}
      >
        <Form.Item name="ten" label="Tên sản phẩm">
          <Input placeholder="Nhập tên sản phẩm..." />
        </Form.Item>

        <Space>
          <Form.Item name="giaTu" label="Giá từ">
            <InputNumber
              min={0}
              placeholder="0"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
          <Form.Item name="giaDen" label="Giá đến">
            <InputNumber
              min={0}
              placeholder="Không giới hạn"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
        </Space>

        <Form.Item name="mucDich" label="Mục đích sử dụng">
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn mục đích"
            options={MUC_DICH_OPTIONS}
          />
        </Form.Item>

        <Form.Item name="maHang" label="Hãng">
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn hãng"
            options={HANG_OPTION}
          />
        </Form.Item>

        <Space className="flex justify-end w-full mt-4">
          <Button onClick={onClear}>Xóa lọc</Button>
          <Button type="primary" htmlType="submit">
            Áp dụng
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
