import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";

const Tabs = {
  details: "My details",
  education: "Education",
  awards: "Awards",
  experience: "Experience",
};

const About = ({ about }) => {
  const [tab, setTab] = useState(Tabs.details);

  const handleTabChange = (e) => {
    setTab(() => {
      return e;
    });
  };

  const renderInfo = (label, text) => {
    return (
      <article className="my-2 text-sm md:text-base" key={text}>
        <div className="text-accent">{label}</div>
        <div className="font-semibold">{text}</div>
      </article>
    );
  };
  const getDetails = (details) => {
    return (
      <section className="grid grid-cols-2 gap-3">
        {renderInfo("Name", details.name)}
        {renderInfo("Phone", details.phone)}
        {renderInfo("Email", details.email)}
        {renderInfo("Address", details.address)}
        {renderInfo("Languages", details.languages)}
        {renderInfo("Nationalities", details.nationalities)}
      </section>
    );
  };
  const getEducation = (education) => {
    return (
      <section className="grid">
        {education.map((edu) => {
          return renderInfo(edu.institute + ", " + edu.time, edu.title);
        })}
      </section>
    );
  };
  const getExperience = (experience) => {
    return (
      <section className="grid">
        {experience.map((exp) => {
          return renderInfo(exp.time + ", " + exp.company, exp.title);
        })}
      </section>
    );
  };

  return (
    <section className="about max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-16 font-primary">
      <div className="grid gap-4 md:grid-cols-2">
        <div>Picture</div>
        <div>
          <div className="uppercase flex items-center">
            <BsFillGridFill />{" "}
            <span className="pl-1 text-primary">{about.title}</span>
          </div>
          <div className="font-secondary capitalize text-6xl font-semibold tracking-wide leading-tight py-4">
            {about.subtitle}
          </div>
          <div className="text-sm leading-relaxed">{about.description}</div>
          <div className="grid grid-cols-3 text-center border border-light mt-4 mb-2 rounded">
            <div
              className={`py-2 cursor-pointer ${
                tab === Tabs.details ? "bg-primary text-white rounded-l" : ""
              }`}
              onClick={() => handleTabChange(Tabs.details)}
            >
              {Tabs.details}
            </div>
            <div
              className={`py-2 cursor-pointer ${
                tab === Tabs.education ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleTabChange(Tabs.education)}
            >
              {Tabs.education}
            </div>
            <div
              className={`py-2 cursor-pointer ${
                tab === Tabs.experience ? "bg-primary text-white rounded-r" : ""
              }`}
              onClick={() => handleTabChange(Tabs.experience)}
            >
              {Tabs.experience}
            </div>
          </div>
          {tab === Tabs.details && getDetails(about.details)}
          {tab === Tabs.education && getEducation(about.education)}
          {tab === Tabs.experience && getExperience(about.experience)}
        </div>
      </div>
    </section>
  );
};

export default About;
