export type Product = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
};

export type Item = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
  quantity: number;
};

export type Order = {
  id: string;
  customerId: string;
  phone: string;
  cart: Item[];
  totalPrice: string;
  totalQuantity: number;
  address: string;
  name: string;
};

export type summaryDetails = {
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
} | null;
export type summaryProps = {
  summary: summaryDetails;
};

export type CartProduct = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  quantity: number;
};
