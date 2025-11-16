export enum EColor {
  RED = "Đỏ",
  BLUE = "Xanh nước biển",
  GREEN = "Xanh lá",
  BLACK = "Đen",
  WHITE = "Trắng",
  YELLOW = "Vàng",
  PINK = "Hồng",
  ORANGE = "Cam",
}

export const ColorLabel: Record<EColor, string> = {
  [EColor.RED]: "Màu Đỏ",
  [EColor.BLUE]: "Màu Xanh dương",
  [EColor.GREEN]: "Màu Xanh lá",
  [EColor.BLACK]: "Màu Đen",
  [EColor.WHITE]: "Màu Trắng",
  [EColor.YELLOW]: "Màu Vàng",
  [EColor.ORANGE]: "Màu cam",
  [EColor.PINK]: "Màu hồng",
};

interface ColorOption {
  label: string;
  value: EColor;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { label: "Màu Đỏ", value: EColor.RED },
  { label: "Màu Xanh dương", value: EColor.BLUE },
  { label: "Màu Xanh lá", value: EColor.GREEN },
  { label: "Màu Đen", value: EColor.BLACK },
  { label: "Màu Trắng", value: EColor.WHITE },
  { label: "Màu Vàng", value: EColor.YELLOW },
  { label: "Màu Hồng", value: EColor.PINK },
  { label: "Màu Cam", value: EColor.ORANGE },
];
