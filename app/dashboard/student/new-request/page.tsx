"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const requestSchema = z.object({
  from: z.string().min(2, "Starting station is required"),
  to: z.string().min(2, "Destination station is required"),
  period: z.number().min(1).max(12),
  class: z.enum(["FIRST", "SECOND"]),
  studentId: z.string().min(2, "Student ID is required"),
  dateOfBirth: z.string(),
  residentialAddress: z.string().min(10, "Full address is required"),
  aadharNumber: z.string().length(12, "Aadhar number must be exactly 12 digits"),
  collegeIdNumber: z.string().min(2, "College ID number is required")
});

export default function NewRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requestSchema)
  });

  const onSubmit = async (data: RequestForm) => {
    setLoading(true);
    setError("");

    try {
      // Format the data before sending
      const formattedData = {
        ...data,
        period: Number(data.period),
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      };

      const response = await fetch("/api/concession-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Server response:", responseData);
        throw new Error(responseData.error || "Failed to submit request");
      }

      // Success - redirect and show success message
      router.push("/dashboard/student/requests");
      router.refresh();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              From Station
            </label>
            <input
              {...register("from")}
              placeholder="Enter starting station"
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.from && (
              <p className="mt-2 text-sm text-red-600">{errors.from.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              To Station
            </label>
            <input
              {...register("to")}
              placeholder="Enter destination station"
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.to && (
              <p className="mt-2 text-sm text-red-600">{errors.to.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Period (months)
            </label>
            <select
              {...register("period", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {[1, 3, 6, 12].map((months) => (
                <option key={months} value={months}>
                  {months} {months === 1 ? 'month' : 'months'}
                </option>
              ))}
            </select>
            {errors.period && (
              <p className="mt-2 text-sm text-red-600">{errors.period.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Class
            </label>
            <select
              {...register("class")}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="FIRST">First Class</option>
              <option value="SECOND">Second Class</option>
            </select>
            {errors.class && (
              <p className="mt-2 text-sm text-red-600">{errors.class.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Student ID
            </label>
            <input
              {...register("studentId")}
              placeholder="Enter your student ID"
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.studentId && (
              <p className="mt-2 text-sm text-red-600">{errors.studentId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              {...register("dateOfBirth")}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.dateOfBirth && (
              <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Residential Address
            </label>
            <textarea
              {...register("residentialAddress")}
              rows={3}
              placeholder="Enter your full residential address"
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.residentialAddress && (
              <p className="mt-2 text-sm text-red-600">{errors.residentialAddress.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Aadhar Number
            </label>
            <input
              {...register("aadharNumber")}
              placeholder="Enter 12-digit Aadhar number"
              maxLength={12}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.aadharNumber && (
              <p className="mt-2 text-sm text-red-600">{errors.aadharNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              College ID Number
            </label>
            <input
              {...register("collegeIdNumber")}
              placeholder="Enter college ID number"
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.collegeIdNumber && (
              <p className="mt-2 text-sm text-red-600">{errors.collegeIdNumber.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-amber-600 text-white text-sm font-semibold rounded-lg 
                   hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 
                   focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}