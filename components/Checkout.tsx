import SubmitButton from "./SubmitButton";

interface CheckoutProps {
  name: string;
  onChangehandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  address: string;
  calculateSubtotal: () => number;
  handleOrder: (e: any) => void;
}
const Checkout: React.FC<CheckoutProps> = ({
  name,
  address,
  onChangehandler,
  calculateSubtotal,
  handleOrder,
}) => {
  return (
    <div className="leading-loose">
      <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
        <p className="text-gray-800 font-medium">Customer information</p>
        <div className="">
          <label className="block text-sm text-gray-00" for="cus_name">
            Name
          </label>
          <input
            onChange={onChangehandler}
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Your Name"
            aria-label="Name"
          />
        </div>
        <div className="mt-2">
          <label className=" block text-sm text-gray-600" for="cus_email">
            Address
          </label>
          <input
            onChange={onChangehandler}
            value={address}
            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
            id="address"
            name="address"
            type="text"
            placeholder="Street"
          />
        </div>
        <div className="mt-2">
          <label className="hidden text-sm block text-gray-600">City</label>
        </div>
        <p className="mt-4 text-gray-800 font-medium">Payment information</p>
        <div className="flex justify-between items-center">
          <p className="text-base font-medium text-gray-900">Subtotal</p>
          <p className="text-gray-700">{calculateSubtotal()}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base font-medium text-gray-900">Method</p>
          <p className="text-gray-700">Cash on Delivery</p>
        </div>

        <div className="mt-4">
          <SubmitButton onClick={(e) => handleOrder(e)}>
            Confirm Order
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
