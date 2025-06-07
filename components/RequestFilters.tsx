"use client";

import { useState } from "react";

interface RequestFiltersProps {
  onFilterChange: (filters: {
    status: string;
    dateRange: string;
  }) => void;
}

export default function RequestFilters({ onFilterChange }: RequestFiltersProps) {
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        className="px-3 py-2 border border-amber-200 rounded-lg text-sm"
        onChange={(e) => handleFilterChange("status", e.target.value)}
        value={filters.status}
      >
        <option value="all">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <select
        className="px-3 py-2 border border-amber-200 rounded-lg text-sm"
        onChange={(e) => handleFilterChange("dateRange", e.target.value)}
        value={filters.dateRange}
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  );
}