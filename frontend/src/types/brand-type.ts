export enum EBrand {
  NIKE = 1,
  ADIDAS = 2,
  PUMA = 3,
  CONVERSE = 4,
}

export const BrandLabel: Record<EBrand, string> = {
  [EBrand.NIKE]: "Nike",
  [EBrand.ADIDAS]: "Adidas",
  [EBrand.PUMA]: "Puma",
  [EBrand.CONVERSE]: "Converse",
};

interface BrandOption {
  label: string;
  value: EBrand; 
}

export const BRAND_OPTIONS: BrandOption[] = [
  { label: "Nike", value: EBrand.NIKE },
  { label: "Adidas", value: EBrand.ADIDAS },
  { label: "Puma", value: EBrand.PUMA },
  { label: "Converse", value: EBrand.CONVERSE },
];
