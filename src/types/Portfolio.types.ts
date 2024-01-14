import { PortableTextBlock } from "sanity";

export type About = {
  title: string;
  subtitle: string;
  details: {
    title: string;
    value: string;
  }[];
};
export type Experience = {
  designation: string;
  starts: string;
  ends: string;
  roles: PortableTextBlock[];
  company: string;
};
export type Socials = {
  name: string;
  href: string;
  slug: string;
};
export type Nav = {
  name: string;
  href: string;
  isSubMenu: boolean;
};
export type Navbar = {
  logo: string;
  socials: Socials[];
  names: Nav[];
};
export type Location = {
  country: string;
  city: string;
};
export type Skills = {
  level: string;
  skill: PortableTextBlock[];
};

export type Education = {
  degree: string;
  academy: string;
  ends: string;
  starts: string;
  major: PortableTextBlock[];
};
export type PortFolio = {
  about: About;
  experience: Experience[];
  lastEducation: string;
  navbar: Navbar;
  location: Location;
  image: string;
  skills: Skills[];
  education: Education[];
  headline: PortableTextBlock[];
  title: PortableTextBlock[];
  name: string;
};
