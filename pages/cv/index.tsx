import { IconType } from "react-icons";
import { HiMail, HiLightBulb } from "react-icons/hi";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLinkedin,
  FaLink,
  FaGithub,
  FaLuggageCart,
  FaCamera,
  FaGraduationCap,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import Image from "next/image";
import defaultCardImage from "../../public/nazmul2.png";
import profile from "@/src/data/profile";

interface Icon {
  FaMapMarkerAlt: IconType;
  HiMail: IconType;
  FaPhoneAlt: IconType;
  FaLinkedin: IconType;
  FaGithub: IconType;
  FaLink: IconType;
  FaLuggageCart: IconType;
  FaCamera: IconType;
}
const components: Icon = {
  FaMapMarkerAlt: FaMapMarkerAlt,
  HiMail: HiMail,
  FaPhoneAlt: FaPhoneAlt,
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
  FaLink: FaLink,
  FaLuggageCart: FaLuggageCart,
  FaCamera: FaCamera,
};

export default function CV() {
  const leftTitle = (title: string) => {
    return (
      <div className="flex w-full items-center">
        <div className="flex-grow h-px bg-gray-600"></div>
        <div className="flex-shrink  text-primary px-2 font-Semibold">
          {title}
        </div>
        <div className="flex-grow h-px bg-gray-600"></div>
      </div>
    );
  };

  const LeftEle = (obj: any) => {
    return (
      <div className="flex-initial md:w-72 h-fit md:sticky top-0 bottom-0 flex flex-col px-4 justify-center bg-lime-200">
        <div className="w-full h-60 px-6 overflow-hidden rounded-full">
          {/* <Image
            src={defaultCardImage}
            alt="image-alt-text"
            sizes="320 640 750"
            layout="responsive"
            objectFit="cover"
            priority
          /> */}
        </div>
        <h3 className="text-2xl py-2 text-center font-secondary font-semibold tracking-wider">
          {obj.name}
        </h3>
        <h5 className="text-lg py-2 text-center">{obj.designation}</h5>

        <div className="pt-2 pb-4">
          {leftTitle("Profile")}
          <p className="text-sm font-light text-justify text-primary">
            {obj.profile}
          </p>
        </div>

        <div className="py-2">
          {leftTitle("Contact")}
          {obj.contact.map(
            ({
              text,
              icon,
              link,
            }: {
              text: string;
              icon: string;
              link: string;
            }) => {
              const IconComponent: IconType =
                components[icon as keyof typeof components];
              return (
                <div className="flex items-center pb-1" key={icon}>
                  <IconComponent size={16} />
                  {link.length ? (
                    <a className="pl-2 text-sm text-primary" href={link}>
                      {text}
                    </a>
                  ) : (
                    <span className="pl-2 text-sm text-primary">{text}</span>
                  )}
                </div>
              );
            }
          )}
        </div>

        <div className="pt-2 pb-4">
          {leftTitle("Languages")}
          {obj.languages.map(
            ({ text, level }: { text: string; level: string }) => {
              return (
                <div
                  className="pl-4 grid grid-cols-2 items-center pb-1"
                  key={text}
                >
                  <span className="pl-2 text-sm text-primary">{text}</span>
                  <span className="pl-2 text-sm text-primary">{level}</span>
                </div>
              );
            }
          )}
        </div>

        <div className="pt-2 pb-4">
          {leftTitle("Interests")}
          {obj.interests.map(
            ({ text, icon }: { text: string; icon: string }) => {
              const IconComponent: IconType =
                components[icon as keyof typeof components];
              return (
                <div className="flex items-center pb-1" key={text}>
                  <IconComponent size={16} />
                  <span className="pl-2 text-sm text-primary">{text}</span>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  };

  const rightTitle = (title: string, IconComponent: IconType) => {
    return (
      <div className="flex w-full items-center">
        <IconComponent size={24} />
        <div className="ml-2 flex-1 text-xl w-full font-Semibold border-b-2 border-primary">
          <span> {title}</span>
        </div>
      </div>
    );
  };

  const RightEle = (obj: any) => {
    return (
      <div className="flex-1 ">
        <div className="pt-2 pb-4">
          {rightTitle("Strength", HiLightBulb)}
          <ul className="list-disc list-inside pr-10 text-sm text-gray-500 ml-8 mt-3 pb-1">
            {obj.strength.map((item: any, index: number) => {
              return (
                <li className="pb-1" key={`strength-${index}`}>
                  {item}
                </li>
              );
            })}
          </ul>

          {rightTitle("Education", FaGraduationCap)}
          <ol className="border-l border-gray-200 ml-8 mt-3 pr-10">
            {obj.education.map((item: any) => {
              return (
                <li className="mb-6 ml-6 relative" key={item.title}>
                  <span className="flex absolute -left-8 top-2 justify-center items-center w-4 h-4 bg-blue-200 rounded-full ring-8 ring-white">
                    <svg
                      className="w-2 h-2 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                    {item.time}
                  </time>
                  <div className="text-base font-normal text-gray-500">
                    {item.institute}
                  </div>
                  <p className="mb-4 text-base font-normal text-gray-500">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ol>

          {rightTitle("Experience", FaBriefcase)}
          <ol className="border-l border-gray-200 ml-8 mt-3 pr-10">
            {obj.experiences.map((item: any) => {
              return (
                <li
                  className="mb-6 ml-6 relative text-gray-600"
                  key={item.title}
                >
                  <span className="flex absolute -left-8 top-2 justify-center items-center w-4 h-4 bg-blue-200 rounded-full ring-8 ring-white">
                    <svg
                      className="w-2 h-2 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="flex items-center text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <div className="pb-1">
                    <a
                      className="uppercase font-secondary font-light tracking-wider"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.company},{" "}
                    </a>
                    {item.location}
                  </div>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                    {item.time}
                  </time>
                  <div className="text-base font-normal">{item.institute}</div>
                  <p className="mb-4 text-sm font-normal">
                    {item.descriptions}
                  </p>
                  <p className="text-sm pb-1">
                    {item.responsibilities.opening}
                  </p>
                  <ul className="list-disc list-inside">
                    {item.responsibilities.list.map(
                      (res: string, index: number) => {
                        return (
                          <li className="text-sm pb-1" key={`res-${index}`}>
                            {res}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </li>
              );
            })}
          </ol>

          {rightTitle("Skills", FaStar)}
          <ol className="ml-3 mt-3 pr-10">
            {obj.skills.map((item: any) => {
              return (
                <li className="mb-4 ml-6 relative" key={item.title}>
                  <h3 className="flex items-center mb-1 text-lg text-primary">
                    {item.title}
                  </h3>
                  <ul className="list-disc list-inside">
                    <li className="text-sm pb-1">{item.names.join(", ")}</li>
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {LeftEle(profile.cv.left)}
      {RightEle(profile.cv.right)}
    </div>
  );
}
