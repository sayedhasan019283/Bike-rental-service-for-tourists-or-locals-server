// bike.interface.ts
export interface IBike {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;  // Required
  cc: number;
  year: number;
  model: string;
  brand: string;
  photo: string;
}
