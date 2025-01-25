"use client"

import { useState, Fragment } from "react"
import { Dialog, Transition, Tab } from "@headlessui/react"
import { PlusIcon, DocumentIcon, BriefcaseIcon } from "@heroicons/react/24/outline"

export function MintButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState("")
  const [elapsionTime, setElapsionTime] = useState("")

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center shadow-sm hover:shadow-md"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Mint NFT
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 mb-4">
                    Mint New NFT
                  </Dialog.Title>
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-100/50 p-1 mb-4">
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`w-full py-2.5 text-sm font-medium rounded-lg focus:outline-none 
                              ${selected 
                                ? "bg-white text-blue-700 shadow-sm" 
                                : "text-blue-600 hover:bg-blue-100/75"}`}
                          >
                            <BriefcaseIcon className="w-5 h-5 inline-block mr-2" />
                            Work
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`w-full py-2.5 text-sm font-medium rounded-lg focus:outline-none 
                              ${selected 
                                ? "bg-white text-blue-700 shadow-sm" 
                                : "text-blue-600 hover:bg-blue-100/75"}`}
                          >
                            <DocumentIcon className="w-5 h-5 inline-block mr-2" />
                            Certificate
                          </button>
                        )}
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>{renderForm("work")}</Tab.Panel>
                      <Tab.Panel>{renderForm("certificate")}</Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )

  function renderForm(type: "work" | "certificate") {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor={`${type}-receiver`} className="block text-sm font-medium text-gray-700 mb-1">
            Receiver Address
          </label>
          <input
            type="text"
            id={`${type}-receiver`}
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {/* Similar styling for other input fields */}
        <button
          className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Mint {type === "work" ? "Work" : "Certificate"}
        </button>
      </div>
    )
  }
}