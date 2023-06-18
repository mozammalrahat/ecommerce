import React from "react";
import Link from "next/link";
import { CartIcon } from "./cartIcon";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4">
      <Link legacyBehavior href="/">
        <a className="flex items-center font-semibold text-gray-800">
          <span>Ecommerce</span>
        </a>
      </Link>
      <ul className="flex space-x-4">
        <li>
          <div className="flex items-center justify-between">
            <Link legacyBehavior href="/cart">
              <a className="text-gray-800">Cart</a>
            </Link>
            <CartIcon />
          </div>
        </li>
        <li>
          <Link legacyBehavior href="/login">
            <a className="text-gray-800">Log Out</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
