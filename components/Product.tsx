interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
}
interface ProductProps {
  product: Product;
  openProductModal: (product: Product) => void;
}
const Product: React.FC<ProductProps> = ({ product, openProductModal }) => (
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
        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
      </div>
      <p className="text-sm font-medium text-gray-900">{product.price}</p>
      {/* <button onClick={() => openProductModal()}>Details</button> */}
    </div>
  </div>
);

export default Product;
