"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FileSearch } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  postcode: string;
  city: string;
  streetName: string;
  houseNumber: string;
};

const Home = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      postcode: "LE10 1SH",
      city: "Hinckley",
      streetName: "Ashby Road",
      houseNumber: "197",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("/waste"); // Redirect to the waste page on successful submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 text-gray-900 px-4">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            ♻️ Skip Hire
          </h1>
          <p className="text-md text-gray-500 italic mt-1">With A Difference</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Postcode */}
          <div className="relative">
            <input
              type="text"
              {...register("postcode", {
                required: "Postcode is required",
                pattern: {
                  value: /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i,
                  message: "Please enter a valid UK postcode",
                },
              })}
              placeholder="Postcode"
              className={`peer w-full px-12 py-3 bg-white border ${
                errors.postcode ? "border-red-400" : "border-gray-300"
              } rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <FileSearch
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.postcode.message}
              </p>
            )}
          </div>

          {/* City, Street, House Number */}
          {[
            { id: "city", label: "City" },
            { id: "streetName", label: "Street Name" },
            { id: "houseNumber", label: "House/Flat Number" },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type="text"
                {...register(field.id as keyof FormData, {
                  required: `${field.label} is required`,
                })}
                placeholder={`Enter ${field.label}`}
                className={`w-full px-4 py-3 bg-white text-gray-900 border ${
                  errors[field.id as keyof FormData]
                    ? "border-red-400"
                    : "border-gray-300"
                } rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors[field.id as keyof FormData] && (
                <p className="mt-1 text-sm text-red-500">
                  {(errors[field.id as keyof FormData] as any).message}
                </p>
              )}
            </div>
          ))}

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Loading..." : "Continue →"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Version 1.1.34
        </div>
      </div>
    </div>
  );
};

export default Home;
