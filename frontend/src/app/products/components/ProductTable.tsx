/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Image, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ISanpham, IHang } from "@/types/product-interfaces";
import formatCurrency from "@/lib/format-currency";
import Link from "next/link";

export default function ProductTable(
  onDelete: (productId: number) => Promise<void>,
  onEdit: (product: ISanpham) => void 
) {
  return [
    {
      title: "Ảnh",
      dataIndex: "HinhAnh",
      key: "HinhAnh",
      width: 100,
      render: (hinhAnh: string) => {
        if (!hinhAnh) return <span className="text-gray-400 text-xs">—</span>;
        const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${hinhAnh}`;
        return (
          <Image
            src={fullUrl}
            alt="product"
            width={70}
            height={50}
            style={{ objectFit: "cover", borderRadius: 6 }}
            preview
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
            className="text-blue-600 hover:underline font-medium"
          >
            {text}
          </Link>
        ) : (
          text
        ),
    },
    {
      title: "Giá",
      dataIndex: "Gia",
      key: "Gia",
      render: (gia: number) => (
        <span className="font-semibold">{formatCurrency(gia)}</span>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "SoluongTon",
      key: "SoluongTon",
      align: "center" as const,
    },
    {
      title: "Mục đích",
      dataIndex: "MucDich",
      key: "MucDich",
    },
    {
      title: "Hãng",
      dataIndex: ["hang", "TenHang"],
      key: "hang",
      render: (tenHang: string) => tenHang || "—",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      render: (status: string) => (
        <Tag
          color={
            status === "Còn bán"
              ? "green"
              : status === "Hết hàng"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center" as const,
      render: (_: any, record: ISanpham) => (
        <div className="flex justify-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="text-blue-600 hover:bg-blue-50"
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            danger
            onClick={() => record.MaSP && onDelete(record.MaSP)}
            className="hover:bg-red-50"
          />
        </div>
      ),
    },
  ];
}
