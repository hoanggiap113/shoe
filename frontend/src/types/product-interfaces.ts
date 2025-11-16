import { Interface } from "readline";

export interface IHang {
  MaHang?: number;
  TenHang: string;
  Mota?: string;
}
// Interface cho model Sanpham (Sản phẩm)
// Lưu ý: Chúng ta thêm 'hang?: IHang' để nhận dữ liệu quan hệ
// khi gọi API với bộ lọc 'include'.
export interface ISanpham {
  MaSP?: number;
  TenSP: string;
  MoTa: string;
  Gia: number;
  SoluongTon?: number;
  KichCo?: string;
  MauSac?: string;
  HinhAnh: string; // Đây là một chuỗi (string) như trong model, không phải mảng
  MaHang: number;
  GioiTinh?: string;
  MucDich: string;
  TrangThai: string;
  hang?: IHang; 
}

