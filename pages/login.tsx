import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import { validateBangladeshiMobileNumber } from "@/utils/validateBangladeshiMobileNumber";
import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
export default function LogIn() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateBangladeshiMobileNumber(phone)) {
      alert("Invalid Phone Number");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    const { data } = await axios.post("/api/login", {
      phone,
      password,
    });
    cookie.set("token", data.token);
    router.push("/");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => onSubmit(e)}
            method="POST"
          >
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
            </div>
            <Input
              onChange={onChangeField}
              id="phone"
              name="phone"
              type="tel"
            />
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <Input
                onChange={onChangeField}
                id="password"
                name="password"
                type="password"
              />
            </div>

            <SubmitButton>Sign In</SubmitButton>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a
              href="\signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
