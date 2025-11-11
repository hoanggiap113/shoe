export default function formatCurrency(amount: number) {
  if (isNaN(amount)) {
    return "Đang cập nhật";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
