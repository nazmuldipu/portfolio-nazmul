import { useRouter } from "next/router";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

import { Disclosure } from "@headlessui/react";
import { Navbar } from "@/src/types/Portfolio.types";

import Button from "../Atoms/Button";

export default function NavbarComponent({ navbar }: { navbar: Navbar }) {
  const route = useRouter();

  const getNavIcon = (slug: string) => {
    switch (slug) {
      case "github":
        return <FaGithub />;
      case "linkedin":
        return <FaLinkedin />;
      default:
        return <FaGithub />;
    }
  };
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
                  <Image
                    className="h-8 w-auto"
                    src={navbar.logo}
                    alt="Profile Logo"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="hidden md:ml-6 md:flex items-center md:space-x-4">
                  {navbar.names.map((item) => (
                    <Button
                      key={item.name}
                      href={item.href}
                      type="nav"
                      className={
                        route.asPath === item.href
                          ? "!border-indigo-500 !text-gray-900"
                          : ""
                      }
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center mr-4">
                  {navbar.socials.map((item) => (
                    <Button
                      key={item.name}
                      href={item.href}
                      type="social"
                      className="text-base !p-1"
                      target="_blank"
                    >
                      <span className="sr-only">{item.name}</span>
                      {getNavIcon(item.slug)}
                    </Button>
                  ))}
                </div>
                <Button href="/nazmul_alam_cv.pdf" type="primary">
                  Download CV
                </Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navbar.names.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`${
                    route.asPath === item.href
                      ? "!bg-indigo-50 !border-indigo-500 !text-indigo-700"
                      : ""
                  } border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
