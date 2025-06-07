"use client";

import { format } from "date-fns";
import RequestFilters from "@/components/RequestFilters";
import { useState } from "react";
import RequestDetailsModal from "./RequestDetailsModal";

interface DashboardContentProps {
  initialRequests: any[];
  totalRequests: number;
}

export default function DashboardContent({ initialRequests, totalRequests }: DashboardContentProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const stats = {
    pending: requests.filter(r => r.status === "PENDING").length,
    approved: requests.filter(r => r.status === "APPROVED").length,
    rejected: requests.filter(r => r.status === "REJECTED").length
  };

  const handleFilterChange = async (filters: { status: string; dateRange: string }) => {
    try {
      const params = new URLSearchParams({
        status: filters.status,
        dateRange: filters.dateRange
      });

      const response = await fetch(`/api/concession-requests?${params}`);
      const data = await response.json();
      setRequests(data.requests);
    } catch (error) {
      console.error("Error filtering requests:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        status: "all",
        dateRange: "all"
      });

      const response = await fetch(`/api/concession-requests?${params}`);
      const data = await response.json();
      setRequests(data.requests);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error changing page:", error);
    }
  };

  const openRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-amber-100">
          <h3 className="text-sm font-medium text-amber-600">Pending Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-amber-900">{stats.pending}</p>
          <div className="mt-2 text-sm text-amber-600">Awaiting approval</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-amber-100">
          <h3 className="text-sm font-medium text-green-600">Approved Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-green-900">{stats.approved}</p>
          <div className="mt-2 text-sm text-green-600">Ready for collection</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-amber-100">
          <h3 className="text-sm font-medium text-amber-600">Total Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-amber-900">{totalRequests}</p>
          <div className="mt-2 text-sm text-amber-600">All time</div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-amber-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-amber-900">Recent Requests</h2>
            <RequestFilters onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">From - To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-200">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                      {format(new Date(request.createdAt), 'dd MMM yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                      {request.from} - {request.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                      {request.period} {request.period === 1 ? 'month' : 'months'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${request.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                          request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                      <button 
                        onClick={() => openRequestDetails(request)}
                        className="text-amber-600 hover:text-amber-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-amber-600">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-amber-200 flex items-center justify-between">
          <p className="text-sm text-amber-600">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalRequests)} of {totalRequests} requests
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border border-amber-200 rounded-lg hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * ITEMS_PER_PAGE >= totalRequests}
              className="px-4 py-2 text-sm border border-amber-200 rounded-lg hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Request Details Modal */}
      <RequestDetailsModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}