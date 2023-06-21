import React from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, onClick }) => (
  <div>
    <button
      onClick={onClick}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {children}
    </button>
  </div>
);
export default SubmitButton;
