"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Hook để lấy ID từ URL
import Link from 'next/link'; // Hook để điều hướng
import api from '@/lib/api'; // Client Axios của bạn
import { ISanpham } from '@/types/product-interfaces'; // Interface của bạn

// Các component và icon của Ant Design
import { Image, Spin, Tag, Button } from 'antd';
import { ArrowLeftOutlined, ShoppingCartOutlined, CreditCardOutlined } from '@ant-design/icons';
import formatCurrency from '@/lib/format-currency';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000";



// Component helper để hiển thị chi tiết (Label: Value)
const DetailItem = ({ label, value, isTag = false }: { label: string, value?: string | number, isTag?: boolean }) => {
  // Không hiển thị nếu giá trị là null, undefined, hoặc chuỗi rỗng (nhưng hiển thị số 0)
  if (!value && value !== 0) return null; 
  
  const displayValue = value.toString();

  return (
    <div className="mb-2">
      <span className="font-semibold text-gray-500">{label}: </span>
      {isTag ? (
        <Tag color={displayValue.toLowerCase().includes('Còn b') ? 'green' : 'red'}>
          {displayValue}
        </Tag>
      ) : (
        <span className="text-gray-800">{displayValue}</span>
      )}
    </div>
  );
};


export default function ProductDetailPage() {
  const params = useParams();
  const id = params.productId; // Lấy ID từ URL (ví dụ: '123')

  const [product, setProduct] = useState<ISanpham | null>(null);
  const [loading, setLoading] = useState(true); // Bắt đầu ở trạng thái loading

  useEffect(() => {
    if (!id) {
      // NHƯNG PHẢI TẮT LOADING ĐỂ TRANG KHÔNG BỊ TREO
      setLoading(false);
      return;
    }

    // Định nghĩa hàm gọi API
    const fetchProduct = async () => {
      try {
        setLoading(true); // Bật loading  
        const res = await api.get(`/products/${id}?filter[include][]=hang`);
        
        setProduct(res.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      } finally {
        setLoading(false); // Tắt loading, dù thành công hay thất bại
      }
    };

    fetchProduct();
  }, [id]); // Hook này sẽ chạy lại nếu 'id' từ URL thay đổi

  // === 1. Trạng thái Đang Tải ===
  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '80vh' }}>
        {/* Sửa cảnh báo Antd bằng cách xóa 'tip' */}
        <Spin size="large" />
      </div>
    );
  }

  // === 2. Trạng thái Không Tìm Thấy Sản Phẩm ===
  if (!product) {
    return (
      <main className="p-6">
         <Link href="/products">
            <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
          </Link>
        <div className="text-center mt-10 text-xl text-red-600">
          Không tìm thấy sản phẩm. Có thể ID không đúng hoặc đã bị xóa.
        </div>
      </main>
    );
  }

  // === 3. Trạng thái Hiển thị (Thành công) ===
  
  // Xử lý URL hình ảnh (đề phòng HinhAnh lưu có / hoặc không)
  const imageUrl = product.HinhAnh.startsWith('http') 
    ? product.HinhAnh 
    : `${API_URL}${product.HinhAnh.startsWith('/') ? '' : '/'}${product.HinhAnh}`;

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* Nút quay lại */}
      <div className="mb-4">
        <Link href="/products">
          <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
        </Link>
      </div>
      
      {/* Box chi tiết */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Cột trái: Hình ảnh */}
          <div>
            <Image
              src={imageUrl}
              alt={product.TenSP}
              className="w-full h-auto object-cover rounded-lg shadow-md border border-gray-100"
            />
          </div>

          {/* Cột phải: Thông tin */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Tên hãng (lấy từ "hang" include) */}
              <Tag color="blue" className="text-lg mb-2">
                {product.hang?.TenHang || 'Thương hiệu'}
              </Tag>
              
              {/* Tên sản phẩm */}
              <h1 className="text-4xl font-bold text-gray-800 my-2">
                {product.TenSP}
              </h1>
              
              {/* Mô tả */}
              <p className="text-gray-600 text-base mb-4">
                {product.MoTa}
              </p>
              
              {/* Giá */}
              <div className="text-3xl font-bold text-blue-600 mb-6">
                {formatCurrency(product.Gia)}
              </div>

              {/* Thông tin chi tiết (dùng component helper) */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <DetailItem label="Trạng thái" value={product.TrangThai} isTag={true} />
                <DetailItem label="Số lượng tồn" value={product.SoluongTon} />
                <DetailItem label="Màu sắc" value={product.MauSac} />
                <DetailItem label="Kích cỡ" value={product.KichCo} />
                <DetailItem label="Giới tính" value={product.GioiTinh} />
                <DetailItem label="Mục đích" value={product.MucDich} />
                <DetailItem label="Mã SP" value={product.MaSP} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}