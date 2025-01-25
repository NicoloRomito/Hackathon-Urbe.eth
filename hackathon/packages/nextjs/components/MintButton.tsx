"use client"

import { useState, Fragment } from "react"
import { Dialog, Transition, Tab } from "@headlessui/react"
import { PlusCircleIcon, DocumentTextIcon, BriefcaseIcon } from "@heroicons/react/24/outline"

export function MintButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState("")
  const [elapsionTime, setElapsionTime] = useState("")

  /*const SendNFTData = (type: "work" | "certificate") => {
  }*/

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Mint New NFT
                  </Dialog.Title>
                  <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-4">
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
                              selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            }`}
                          >
                            <BriefcaseIcon className="w-5 h-5 inline-block mr-2" />
                            Work
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
                              selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            }`}
                          >
                            <DocumentTextIcon className="w-5 h-5 inline-block mr-2" />
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
          <label htmlFor={`${type}-receiver`} className="block text-sm font-medium text-gray-700">
            Receiver Address
          </label>
          <input
            type="text"
            id={`${type}-receiver`}
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor={`${type}-title`} className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id={`${type}-title`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor={`${type}-date`} className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id={`${type}-date`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor={`${type}-image`} className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id={`${type}-image`}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor={`${type}-elapsion`} className="block text-sm font-medium text-gray-700">
            Elapsion Time
          </label>
          <input
            type="text"
            id={`${type}-elapsion`}
            value={elapsionTime}
            onChange={(e) => setElapsionTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          //onClick={() => SendNFTData(type)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Mint {type === "work" ? "Work" : "Certificate"}
        </button>
      </div>
    )
  }
}

