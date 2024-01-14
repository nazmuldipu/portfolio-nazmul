import {
  About,
  Education,
  Experience,
  Navbar,
  PortFolio,
  Skills,
} from "@/src/types/Portfolio.types";
import { PortableTextBlock } from "sanity";

const getAbout = (about: any): About => {
  const details = about.details.map((detail: any) => {
    return {
      title: detail.title,
      value: detail.value,
    };
  });
  return {
    title: about.title,
    subtitle: about.subtitle,
    details,
  };
};

const getExperience = (experience: any): Experience[] => {
  const experiences = experience.map((exp: any) => {
    return {
      company: exp.company,
      designation: exp.designation,
      starts: exp.starts,
      ends: exp.ends,
      roles: exp.roles,
    };
  });
  return experiences;
};

const getEducation = (education: any): Education[] => {
  const educations = education.map((edu: any) => {
    return {
      academy: edu.academy,
      degree: edu.degree,
      ends: edu.ends,
      starts: edu.starts,
      major: edu.major,
    };
  });
  return educations;
};

const getNavbar = (navbar: any): Navbar => {
  const socials = navbar.socials.map((social: any) => {
    return {
      name: social.name,
      href: social.href,
      slug: social.slug.current,
    };
  });
  const names = navbar.names.map((name: any) => {
    return {
      name: name.name,
      href: name.href,
      isSubMenu: name.isSubMenu,
    };
  });
  return {
    logo: navbar.logo,
    socials,
    names,
  };
};

const getSkills = (skillSet: any): Skills[] => {
  const skills = skillSet.map((skill: any) => {
    return { level: skill.level, skill: skill.skill };
  });
  return skills;
};

export const formatSanityData = (data: any): PortFolio => {
  const about = getAbout(data.about);
  const education = getEducation(data.education);
  const experience = getExperience(data.experience);
  const headline: PortableTextBlock[] = data.headline;
  const image: string = data.image.url;
  const lastEducation: string = data.lastEducation;
  const location = { country: data.location.country, city: data.location.city };
  const name: string = data.name;
  const navbar = getNavbar(data.navbar);
  const skills = getSkills(data.skills);
  const title: PortableTextBlock[] = data.title;
  return {
    about,
    education,
    experience,
    headline,
    image,
    lastEducation,
    location,
    name,
    navbar,
    skills,
    title,
  };
};
