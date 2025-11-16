export enum EMucDich {
  FASHION = "Thời trang",
  RUNNING = "Chạy bộ",
  OFFICE = "Đi làm", 
  TRAINING = "Tập luyện", 
}
export const MucDichLabel: Record<EMucDich, string> = {
  [EMucDich.FASHION]: "Thời trang",
  [EMucDich.RUNNING]: "Chạy bộ",
  [EMucDich.OFFICE]: "Đi làm / Công sở",
  [EMucDich.TRAINING]: "Tập luyện",
};

interface MucDichOption {
  label: string;
  value: EMucDich;
}

export const MUC_DICH_OPTIONS: MucDichOption[] = [
  { label: "Thời trang", value: EMucDich.FASHION },
  { label: "Chạy bộ", value: EMucDich.RUNNING },
  { label: "Đi làm / Công sở", value: EMucDich.OFFICE },
  { label: "Tập luyện", value: EMucDich.TRAINING },
];
