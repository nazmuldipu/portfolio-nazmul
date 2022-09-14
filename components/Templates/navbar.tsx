import { Disclosure } from "@headlessui/react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import ButtonLink from "../Atoms/ButtonLink";
import Button from "../Atoms/Button";

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <FaTimes className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <FaBars className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="./nazmul.svg"
                    alt="Workflow"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="hidden md:ml-6 md:flex md:space-x-4">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Button href="/" type="nav" className="!border-indigo-500 !text-gray-900">
                    Home
                  </Button>
                  <Button href="/blog" type="nav">
                    Blog
                  </Button>
                  <Button href="/contact" type="nav">
                    Contact
                  </Button>
                  <Button href="/cv" type="nav">
                    CV
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center mr-4">
                  <Button
                    href="https://www.linkedin.com/in/nazmuldipu/"
                    type="social"
                    className="text-base !p-1"
                    target="_blank"
                  >
                    <span className="sr-only">Linkedin Link</span>
                    <FaLinkedin />
                  </Button>
                  <Button
                    href="https://github.com/nazmuldipu"
                    type="social"
                    className="text-base !p-1"
                    target="_blank"
                  >
                    <span className="sr-only">Github Link</span>
                    <FaGithub />
                  </Button>
                </div>
                <Button href="/nazmul_alam_cv.pdf" type="primary">
                  Download CV
                </Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Blog
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Contact
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/cv"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                CV
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
