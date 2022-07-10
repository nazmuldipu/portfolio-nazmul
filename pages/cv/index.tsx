import { IconType } from "react-icons";
import { HiMail } from "react-icons/hi";
import { FaMapMarkerAlt, FaPhoneAlt, FaLinkedin, FaLink, FaGithub, FaLuggageCart, FaCamera, FaGraduationCap } from "react-icons/fa";
import Image from "next/image"
import defaultCardImage from "../../public/nazmul2.png";
import profile from "../../data/profile";

interface Icon {
    "FaMapMarkerAlt": IconType,
    "HiMail": IconType,
    "FaPhoneAlt": IconType,
    "FaLinkedin": IconType,
    "FaGithub": IconType,
    "FaLink": IconType,
    "FaLuggageCart": IconType,
    "FaCamera": IconType,
}
const components: Icon = {
    "FaMapMarkerAlt": FaMapMarkerAlt,
    "HiMail": HiMail,
    "FaPhoneAlt": FaPhoneAlt,
    "FaLinkedin": FaLinkedin,
    "FaGithub": FaGithub,
    "FaLink": FaLink,
    "FaLuggageCart": FaLuggageCart,
    "FaCamera": FaCamera,
}

export default function CV() {
    const leftTitle = (title: string) => {
        return (
            <div className="flex w-full items-center">
                <div className="flex-grow h-px bg-gray-600"></div>
                <div className="flex-shrink  text-primary px-2 font-Semibold">{title}</div>
                <div className="flex-grow h-px bg-gray-600"></div>
            </div>
        )
    }

    const LeftEle = (obj: any) => {
        return (
            <div className="flex-initial w-72 sticky top-0 bottom-0 flex flex-col px-4 justify-center bg-lime-200">
                <div className="w-full h-60 px-6 overflow-hidden rounded-full">
                    <Image src={defaultCardImage} alt="image-alt-text" sizes="320 640 750" layout="responsive" objectFit="cover" priority />
                </div>
                <h3 className="text-2xl py-2 text-center font-primary">{obj.name}</h3>
                <h5 className="text-lg py-2">{obj.designation}</h5>

                <div className="pt-2 pb-4">
                    {leftTitle('Profile')}
                    <p className="text-sm font-light text-justify text-primary">{obj.profile}</p>
                </div>

                <div className="py-2">
                    {leftTitle("Contact")}
                    {obj.contact.map(({ text, icon, link }: { text: string, icon: string, link: string }) => {
                        const IconComponent: IconType = components[icon as keyof typeof components]
                        return (
                            <div className="flex items-center pb-1" key={icon}>
                                <IconComponent size={16} />
                                {link.length ?
                                    <a className="pl-2 text-sm text-primary" href={link}>{text}</a> :
                                    <span className="pl-2 text-sm text-primary">{text}</span>
                                }
                            </div>
                        )
                    })}

                </div>

                <div className="pt-2 pb-4">
                    {leftTitle('Languages')}
                    {obj.languages.map(({ text, level }: { text: string, level: string }) => {
                        return (
                            <div className="pl-4 grid grid-cols-2 items-center pb-1" key={text}>
                                <span className="pl-2 text-sm text-primary">{text}</span>
                                <span className="pl-2 text-sm text-primary">{level}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-2 pb-4">
                    {leftTitle('Interests')}
                    {obj.interests.map(({ text, icon }: { text: string, icon: string }) => {
                        const IconComponent: IconType = components[icon as keyof typeof components];
                        return (
                            <div className="flex items-center pb-1" key={text}>
                                <IconComponent size={16} />
                                <span className="pl-2 text-sm text-primary">{text}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const rightTitle = (title: string, IconComponent: IconType) => {
        return (
            <div className="flex w-full items-center">
                <IconComponent size={24} />
                <div className="ml-2 flex-1 text-xl w-full font-Semibold border-b-2 border-primary">
                    <span> {title}</span>
                </div>
            </div>
        )
    }

    const RightEle = (obj: any) => {
        return (
            <div className="flex-1">
                <div className="pt-2 pb-4">
                    {rightTitle('Education', FaGraduationCap)}
                    <ol className="border-l border-gray-200 dark:border-gray-700 ml-8 mt-3">
                        {obj.education.map((item: any) => {
                            return (
                                <li className="mb-6 ml-6 relative">
                                    <span className="flex absolute -left-8 top-2 justify-center items-center w-4 h-4 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <svg className="w-2 h-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                    </span>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.time}</time>
                                    <div className="text-base font-normal text-gray-500 dark:text-gray-400">{item.institute}</div>
                                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.text}</p>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }

    return (
        <div className="flex gap-4">
            {LeftEle(profile.left)}
            {RightEle(profile.right)}
        </div>
    )
}