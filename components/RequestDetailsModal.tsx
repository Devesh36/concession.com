"use client";

import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface RequestDetailsModalProps {
  request: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestDetailsModal({
  request,
  isOpen,
  onClose,
}: RequestDetailsModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-amber-900 mb-4">
                  Request Details
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-amber-600">Status</h4>
                    <span className={`mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${request?.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                        request?.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {request?.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-amber-600">Journey Details</h4>
                    <p className="mt-1 text-sm text-amber-900">
                      From: {request?.from}<br />
                      To: {request?.to}<br />
                      Period: {request?.period} {request?.period === 1 ? 'month' : 'months'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-amber-600">Request Date</h4>
                    <p className="mt-1 text-sm text-amber-900">
                      {request?.createdAt ? format(new Date(request.createdAt), 'dd MMM yyyy, HH:mm') : '-'}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}