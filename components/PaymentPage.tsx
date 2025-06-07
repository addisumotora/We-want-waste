"use client";

import React, { useState } from "react";
import { useForm as usePaymentForm } from "react-hook-form";
import { useForm as useModalForm } from "react-hook-form";
import { MapPin, CalendarDays } from "lucide-react";

type PaymentFormInputs = {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  country: string;
  saveCard: boolean;
};

type PaymentPageProps = {
  back?: () => void;
};

const PaymentPage = ({ back }: PaymentPageProps) => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = usePaymentForm<PaymentFormInputs>({
    defaultValues: {
      country: "United Kingdom",
      saveCard: false,
    },
  });

  const {
    register: registerModal,
    handleSubmit: handleModalSubmit,
    formState: { errors: modalErrors },
  } = useModalForm();

  const onSubmit = (data: PaymentFormInputs) => {
    console.log("Payment Data:", data);
    setShowModal(true);
  };

  const onModalSubmit = (data: any) => {
  console.log("Modal Info:", data);
  setShowModal(false);
};

  const PaymentIcons = () => (
    <div className="flex space-x-2">
      <img src="/visa.svg" alt="Visa" style={{ width: 40 }} />
      <img src="/mastercard.svg" alt="Mastercard" style={{ width: 40 }} />
      <img src="/am-express.svg" alt="American Express" style={{ width: 40 }} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600 mt-2">
            Review your order and enter your payment details below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <section className="bg-white shadow-sm rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-1">
                <MapPin size={20} className="text-indigo-600" />
                Delivery Address
              </h2>
              <p className="text-sm text-gray-600">
                197 Ashby Road, Hinckley
                <br />
                LE10 1SH
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-1">
                <CalendarDays size={20} className="text-indigo-600" />
                Delivery & Collection
              </h2>
              <p className="text-sm text-gray-600">
                Delivery: Wednesday 25 June 2025
                <br />
                Collection: Wednesday 2 July 2025
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Items
              </h2>
              <div className="flex justify-between text-sm text-gray-700">
                <span>5 Yard Skip</span>
                <span>£241.00</span>
              </div>
              <p className="text-xs text-gray-500">14-day hire period</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Additional Charges
              </h2>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Road Permit Fee</span>
                <span>£84.00</span>
              </div>
              <p className="text-xs text-gray-500">+ VAT £16.80</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Subtotal (excl. VAT)</span>
                <span>£325.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>VAT (20%)</span>
                <span>£65.00</span>
              </div>
              <div className="flex justify-between font-semibold text-base text-gray-900 mt-2">
                <span>Total</span>
                <span>£390.00</span>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Payment Details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Card Number
                </label>
                <div className="relative">
                  <input
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^[0-9\s]{13,19}$/,
                        message: "Invalid card number format",
                      },
                    })}
                    type="text"
                    id="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    className={`w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2 pointer-events-none">
                    <PaymentIcons />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="expirationDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiration Date
                  </label>
                  <input
                    {...register("expirationDate", {
                      required: "Expiration date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/,
                        message: "Expiration date must be MM / YY",
                      },
                    })}
                    type="text"
                    id="expirationDate"
                    placeholder="MM / YY"
                    className={`w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.expirationDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.expirationDate && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.expirationDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVC
                  </label>
                  <input
                    {...register("cvc", {
                      required: "CVC is required",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "CVC must be 3 or 4 digits",
                      },
                    })}
                    type="text"
                    id="cvc"
                    placeholder="123"
                    className={`w-full px-4 py-2 border text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cvc ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cvc && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.cvc.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <select
                  {...register("country", { required: "Country is required" })}
                  id="country"
                  className={`w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Ethiopia">Ethiopia</option>
                </select>
                {errors.country && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="mb-6 flex items-center">
                <input
                  {...register("saveCard")}
                  id="saveCard"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="saveCard" className="text-sm text-gray-700">
                  Save card for future payments
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
              >
                Complete Payment
              </button>
              <button
                type="button"
                className="w-full py-3 mt-3 bg-gray-100 text-indigo-600 rounded-lg hover:bg-gray-200 font-medium transition"
                onClick={() => back ? back() : window.history.back()}
              >
                Back
              </button>
            </form>
          </section>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Your Details
            </h2>
            <form onSubmit={handleModalSubmit(onModalSubmit)}>
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  {...registerModal("firstName", {
                    required: "First name is required",
                  })}
                  className="w-full mt-1 px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md border-gray-300 focus:ring-indigo-500 focus:outline-none"
                />
                {typeof modalErrors.firstName?.message === "string" && (
                  <p className="text-sm text-red-600">
                    {modalErrors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  {...registerModal("lastName", {
                    required: "Last name is required",
                  })}
                  className="w-full mt-1 px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md border-gray-300 focus:ring-indigo-500 focus:outline-none"
                />
                {typeof modalErrors.lastName?.message === "string" && (
                  <p className="text-sm text-red-600">
                    {modalErrors.lastName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...registerModal("email", { required: "Email is required" })}
                  className="w-full mt-1 px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md border-gray-300 focus:ring-indigo-500 focus:outline-none"
                />
                {typeof modalErrors.email?.message === "string" && (
                  <p className="text-sm text-red-600">
                    {modalErrors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Email
                </label>
                <input
                  type="email"
                  {...registerModal("confirmEmail", {
                    required: "Please confirm your email",
                    validate: (value, formValues) =>
                      value === formValues.email || "Emails do not match",
                  })}
                  className="w-full mt-1 px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md border-gray-300 focus:ring-indigo-500 focus:outline-none"
                />
                {typeof modalErrors.confirmEmail?.message === "string" && (
                  <p className="text-sm text-red-600">
                    {modalErrors.confirmEmail.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
