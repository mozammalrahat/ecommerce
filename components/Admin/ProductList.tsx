import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import PopupModal from "../PopupModal";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="items-center py-2 px-4 border-b text-center">
                ID
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Name
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Image
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Price
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Color
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr
                  className="w-full cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <td className="items-center py-2 px-4 border-b text-center">
                    {product.id}
                  </td>
                  <td className="items-center py-2 px-4 border-b text-center">
                    {product.name}
                  </td>
                  <td className="items-center py-2 px-4 border-b text-center">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="items-center py-2 px-4 border-b text-center">
                    {product.price}
                  </td>
                  <td className="items-center py-2 px-4 border-b text-center">
                    {product.color}
                  </td>
                  <td className="items-center py-2 px-4 border-b text-center">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <PopupModal
        isOpen={isOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        buttonText="Delete"
      ></PopupModal>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Add Product</h3>
        <div className="flex items-center">
          <div className="flex flex-col mr-2">
            <input
              placeholder="Product Name"
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              placeholder="Price"
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col mr-2">
            <input
              placeholder="Image URL"
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              placeholder="Color"
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <SubmitButton onClick={() => null}>Add Product</SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
