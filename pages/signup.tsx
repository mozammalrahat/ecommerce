import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import { validateBangladeshiMobileNumber } from "@/utils/validateBangladeshiMobileNumber";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Example() {
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
    try {
      const { data } = await axios.post("/api/register", {
        phone,
        password,
        role: "user",
      });
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(event) => onSubmit(event)}
            method="POST"
          >
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <Input
                onChange={onChangeField}
                id="phone"
                name="phone"
                type="tel"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  ></a>
                </div>
              </div>
              <Input
                onChange={onChangeField}
                id="password"
                name="password"
                type="password"
              />
            </div>

            <SubmitButton>Sign Up</SubmitButton>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{" "}
            <a
              href="\login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
