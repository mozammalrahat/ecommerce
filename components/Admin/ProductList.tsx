import React from "react";
import SubmitButton from "../SubmitButton";

type Product = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
};

const products = [
  {
    id: 1,
    name: "Product 1",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Product 2",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$350",
    color: "Black",
  },
  {
    id: 3,
    name: "Product 3",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$445",
    color: "Black",
  },
  {
    id: 4,
    name: "Product 4",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$3555",
    color: "Black",
  },
  {
    id: 5,
    name: "Product 5",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$45435",
    color: "Black",
  },
  {
    id: 6,
    name: "Product 6",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$364645",
    color: "Black",
  },
  {
    id: 7,
    name: "Product 7",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$3465645",
    color: "Black",
  },
  {
    id: 8,
    name: "Product 8",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$999",
    color: "Black",
  },
  // Add more products with different names as needed
];

const ProductList: React.FC = () => {
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
              <tr key={product.id}>
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
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
