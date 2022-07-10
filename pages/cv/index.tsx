import { IconType } from "react-icons";
import { HiMail } from "react-icons/hi";
import { FaMapMarkerAlt, FaPhoneAlt, FaLinkedin, FaGithub, FaLuggageCart, FaCamera } from "react-icons/fa";
import Image from "next/image"
import defaultCardImage from "../../public/nazmul2.png";
import profile from "../../data/profile";

const components = {
    "FaMapMarkerAlt": FaMapMarkerAlt,
    "HiMail": HiMail,
    "FaPhoneAlt": FaPhoneAlt,
    "FaLinkedin": FaLinkedin,
    "FaGithub": FaGithub,
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
                        const IconComponent: IconType = components[icon];
                        return (
                            <div className="flex items-center pb-1">
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
                            <div className="pl-4 grid grid-cols-2 items-center pb-1">
                                <span className="pl-2 text-sm text-primary">{text}</span>
                                <span className="pl-2 text-sm text-primary">{level}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-2 pb-4">
                    {leftTitle('Interests')}
                    {obj.interests.map(({ text, icon }: { text: string, icon: string }) => {
                        const IconComponent: IconType = components[icon];
                        return (
                            <div className="flex items-center pb-1">
                                <IconComponent size={16} />
                                <span className="pl-2 text-sm text-primary">{text}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="flex gap-4">
            {LeftEle(profile.left)}
            <div className="flex-1">
                Right
            </div>
        </div>
    )
}