import { Disclosure } from '@headlessui/react'
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

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
                                        className="block lg:hidden h-8 w-auto"
                                        src="./nazmul.svg"
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src="./nazmul.svg"
                                        alt="Workflow"
                                    />
                                </div>
                            </div>
                            <div className="flex">


                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <a
                                        href="#"
                                        className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="#"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Blog
                                    </a>
                                    <a
                                        href="#"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Contact
                                    </a>
                                    <a
                                        href="#"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        CV
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center mr-4">
                                    <a
                                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        href="https://www.linkedin.com/in/nazmuldipu/"
                                        aria-label="LinkedIn"
                                        target="_blank"
                                    >
                                        <FaLinkedin />
                                    </a>
                                    <a
                                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        href="https://github.com/nazmuldipu"
                                        aria-label="GitHub"
                                        target="_blank"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <FaGithub />
                                    </a>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="./nazmul_alam_cv.pdf" >
                                        <a className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><span>Download CV</span></a>
                                    </Link>                                   
                                </div>

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
                                href="#"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                            >
                                CV
                            </Disclosure.Button>
                        </div>

                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}