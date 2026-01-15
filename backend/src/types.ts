export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  presentation: string;
  features: string[];
  usage: string;
  inStock: boolean;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
