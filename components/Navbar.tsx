import React, { useContext, useState } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartIcon } from "./cartIcon";
import Cart from "./Cart";
import { useRouter } from "next/router";
import { CartContext, CartContextType } from "../CartProvider";
import { logoutUser } from "@/utils/authUser";
import SubmitButton from "./SubmitButton";
interface User {
  phone: string;
  role?: string;
}
const Navbar: React.FC<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const cartContext = useContext(CartContext) as CartContextType;
  const { cart } = cartContext;
  const router = useRouter();
  const getTotalCartItems = () => {
    const totalItems = cart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );
    return totalItems > 0 ? totalItems : null;
  };
  console.log("The user is : ", user);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-200 p-4">
        {router.asPath === "/" ? (
          user.role === "user" ? (
            <Link legacyBehavior href="/">
              <a className="flex items-center font-semibold text-gray-800">
                <span>Ecommerce</span>
              </a>
            </Link>
          ) : (
            <Link legacyBehavior href="/admin">
              <a className="flex items-center font-semibold text-gray-800">
                <span>Admin</span>
              </a>
            </Link>
          )
        ) : (
          <Link legacyBehavior href="/">
            <a className="flex items-center font-semibold text-gray-800">
              <span>Ecommerce</span>
            </a>
          </Link>
        )}
        <ul className="flex space-x-4">
          {user.role === "user" && (
            <li>
              <div className="flex items-center justify-between">
                <button onClick={() => setOpen(true)} className="text-gray-800">
                  Cart {getTotalCartItems() && `(${getTotalCartItems()})`}
                </button>
                <CartIcon />
              </div>
            </li>
          )}
          <li>
            <SubmitButton onClick={() => logoutUser()}>Logout</SubmitButton>
          </li>
        </ul>
      </nav>

      <div className="pt-14"></div>

      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={() => setOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-screen max-w-md">
                  <Cart user={user} onClose={() => setOpen(false)} />
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Navbar;
