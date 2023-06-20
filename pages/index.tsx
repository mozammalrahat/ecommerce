import dynamic from "next/dynamic";
const PopupModal = dynamic(() => import("@/components/PopupModal"), {
  ssr: false,
});
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartProvider";
import { CartContextType } from "../CartProvider";
import { useMemo } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
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
  console.log("The user is : ", user);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
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
            {products.map((product) => (
              <div
                onClick={() => openProductModal(product)}
                key={product.id}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                  {/* <button onClick={() => openProductModal()}>Details</button> */}
                </div>
              </div>
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
