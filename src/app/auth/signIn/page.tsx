"use client";
import FormInput from "@/app/components/FormInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    username,
    password,
  }: IFormInput) => {
    console.log(`${username} ${password}`);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="bg-gray-50">
      <form
        className="h-screen flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-7 py-4 w-1/3 shadow bg-white rounded-md flex flex-col gap-2">
          <p className="text-center text-gray-900 text-xl">Login</p>
          <div className="border-b-2 mb-6 w-2/3 mx-auto"></div>
          <FormInput
            register={register}
            type="text"
            id="username"
            label="Username"
          />
          <FormInput
            register={register}
            type="password"
            id="password"
            label="Password"
          />
          <button
            type="submit"
            className="w-full rounded bg-orange-500/80 mt-4 px-6 py-2 text-sm font-medium uppercase
            leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-500/90
          active:bg-orange-500 active:shadow-lg"
          >
            Login
          </button>
          <div className="flex gap-2 mt-4 text-md">
            <p className="text-gray-600">New to site?</p>
            <Link href="/auth/register" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
