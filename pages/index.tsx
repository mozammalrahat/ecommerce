import dynamic from "next/dynamic";
const PopupModal = dynamic(() => import("@/components/PopupModal"), {
  ssr: false,
});
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartProvider";
import { CartContextType } from "../CartProvider";
import { useMemo } from "react";
import axios from "axios";
import ProductComponent from "@/components/Product";

interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  price: string;
  color: string;
}
interface User {
  phone: string;
  role?: string;
}
const Home: React.FC<{ user: User }> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  return (
    <div className="bg-white">
      {selectedProduct === null && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {error && <p className="text-red-500">{error}</p>}
            {products.map((product) => (
              <ProductComponent
                key={product.id}
                product={product}
                openProductModal={openProductModal}
              />
            ))}
          </div>
        </div>
      )}

      <PopupModal
        isOpen={isOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        buttonText="Add To Cart"
      ></PopupModal>
    </div>
  );
};
export default Home;
