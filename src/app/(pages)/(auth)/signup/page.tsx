"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {Fields} from "../(login)/page"


type Field = Fields & {
  name: string;
  confirmPassword: string;
};


export default function Page() {

  const [fields, setFields] = useState<Field>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name_err: "",
    email_err: "",
    password_err: "",
    confirmPassword_err: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isValid: boolean = validation();
    if (isValid) {
      console.log('login');
    }
  };




  // const validation = () => {

  //   if (!fields.name.trim()) {
  //     setError({ ...error, name_err: "Name is required" })

  //   }

  //   if (fields.name.trim().length < 3) {
  //     setError({ ...error, name_err: "Name must be at least 3 characters long" })

  //   }


  //   if (!fields.email.trim()) {
  //     setError({ ...error, email_err: "Email is required" })
  //   }

  //   const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!emailRegEx.test(fields.email.trim())) {
  //     setError({ ...error, email_err: "Email is not valid" })

  //   }

  //   if (!fields.password.trim()) {
  //     setError({ ...error, password_err: "Password is required" })

  //   }
  //   if (!fields.confirmPassword.trim()) {
  //     setError({ ...error, confirmPassword_err: "Confirm Password is required" })

  //   }

  //   if (fields.password.trim().length < 6) {
  //     setError({ ...error, password_err: "Password must be at least 6 characters long" })

  //   }

  //   if (fields.confirmPassword.trim().length < 6) {
  //     setError({ ...error, confirmPassword_err: "Confirm Password must be at least 6 characters long" })
  //     return false
  //   }

  //   if (fields.password != fields.confirmPassword) {
  //     setError({ ...error, password_err: "Password and Confirm Password must be same" })

  //   }
  // }


  const validation = (): boolean => {
    let isValid = true;
    let newErrors = {
      name_err: "",
      email_err: "",
      password_err: "",
      confirmPassword_err: "",
    };


    if (!fields.name.trim()) {
      newErrors.name_err = "Name is required";
      isValid = false;
    } else if (fields.name.trim().length < 3) {
      newErrors.name_err = "Name must be at least 3 characters long";
      isValid = false;
    }


    if (!fields.email.trim()) {
      newErrors.email_err = "Email is required";
      isValid = false;
    } else {
      const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegEx.test(fields.email.trim())) {
        newErrors.email_err = "Email is not valid";
        isValid = false;
      }
    }

    if (!fields.password.trim()) {
      newErrors.password_err = "Password is required";
      isValid = false;
    } else if (fields.password.trim().length < 6) {
      newErrors.password_err = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!fields.confirmPassword.trim()) {
      newErrors.confirmPassword_err = "Confirm Password is required";
      isValid = false;
    } else if (fields.confirmPassword.trim().length < 6) {
      newErrors.confirmPassword_err = "Confirm Password must be at least 6 characters long";
      isValid = false;
    }

    if (fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword_err = "Password and Confirm Password not matched";
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  };



  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold text-gray-900 md:text-2xl">Register</h1>

            <div className="space-y-4 md:space-y-6" >
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={fields.name}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name"
                  required
                />
                <span className="text-red-700 text-sm">{error.name_err}</span>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={fields.email}

                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  placeholder="***@gmail.com"
                  required
                />
                <span className="text-red-700 text-sm">{error.email_err}</span>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full  flex items-center">
                  <input
                    onChange={handleChange}
                    type={!showPass ? "password" : "text"}
                    name="password"
                    value={fields.password}
                    id="password"
                    placeholder="*****"
                    className="w-full bg-transparent text-gray-900 text-sm rounded-lg  h-full  pr-10 p-2.5"
                    required
                  />
                  <span onClick={() => setShowPass(!showPass)} className="absolute right-3">
                    <Image className="cursor-pointer" src={!showPass ? "/eye-close.svg" : "/eye-open.svg"} alt="Eye Open" width={20} height={20} />
                  </span>
                </div>
                <span className="text-red-700 text-sm">{error.password_err}</span>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  value={fields.confirmPassword}
                  id="confirm-password"
                  placeholder="*****"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
                <span className="text-red-700 text-sm">{error.confirmPassword_err}</span>
              </div>

              <button onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Register
              </button>


              <p className="text-sm font-light text-gray-500"> If you have an account?{" "}
                <Link href="/" className="font-medium text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
