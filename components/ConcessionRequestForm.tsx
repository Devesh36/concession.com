"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const requestSchema = z.object({
  from: z.string().min(2, "Starting station is required"),
  to: z.string().min(2, "Destination station is required"),
  period: z.number().min(1).max(12),
  class: z.enum(["FIRST", "SECOND"]),
  studentId: z.string().min(2, "Student ID is required"),
  dateOfBirth: z.string(),
  residentialAddress: z.string().min(10, "Full address is required"),
});

type RequestForm = z.infer<typeof requestSchema>;

const statusFlow = {
  PENDING: {
    next: "COLLEGE_APPROVED",
    reject: "COLLEGE_REJECTED",
    actor: "COLLEGE_STAFF",
  },
  COLLEGE_APPROVED: {
    next: "RAILWAY_APPROVED",
    reject: "RAILWAY_REJECTED",
    actor: "RAILWAY_STAFF",
  },
  RAILWAY_APPROVED: {
    next: "COMPLETED",
    actor: "RAILWAY_STAFF",
  },
};

export default function ConcessionRequestForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit = async (data: RequestForm) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/concession-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setSuccess(true);
      reset();
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold text-amber-900 mb-6">
        Request New Concession
      </h3>

      {error && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 text-sm text-green-800 bg-green-50 rounded-lg">
          Request submitted successfully!
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
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.to && (
              <p className="mt-2 text-sm text-red-600">{errors.to.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {months} {months === 1 ? "month" : "months"}
                </option>
              ))}
            </select>
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
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}