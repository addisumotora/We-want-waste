export interface WasteType {
  id: string | number;
  title: string;
  description: string;
  color: "emerald" | "blue" | "orange" | "purple";
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface Skip {
  size: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  price_before_vat: number;
  vat: number;
}