import { FunctionComponent } from "react";
import SectionTitle from "./Molecules/sectionTitle";
import Image from "next/image";

interface Project {
  title: string;
  image: string;
  client: string;
  role: string;
  start: string;
  end: string;
  description: string;
  technology: string[];
}

interface Contribution {
  title: string;
  subtitle: string;
  description: string;
  projects: Project[];
}

interface PageProps {
  contribution: Contribution;
}

const Experience: FunctionComponent<PageProps> = ({ contribution }) => {
  const renderProject = (project: Project) => {
    return (
      <>
        <div className="md:w-32 text-xs text-accent md:px-3 pt-4 md:py-4 md:border-r border-dotted md:mr-4 ">
          {project.start} - <br className="hidden md:block" /> {project.end}
        </div>
        <div className="py-4 border-b flex-1 grid md:grid-cols-2 gap-4 text-sm md:text-base">
          <div>
            <h3 className=" text-2xl">{project.title}</h3>
            <div className="">{project.description}</div>
            <div>
              For - <span className="italic">{project.client}</span>
            </div>
            <div>
              I contributed as{" "}
              <span className=" font-bold">{project.role}</span>
            </div>
            <div className="pt-3">Technology</div>
            <div className="flex flex-wrap gap-2">
              {project.technology.map((te, i) => (
                <span key={`${te}-${i}`} className="p-1 mb-2 bg-primary text-white text-sm rounded-md">
                  {te}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-80">
            <Image src={`/${project.image}`} alt="image-alt-text" sizes="200 400 650 800" layout="fill" objectFit="contain"
              loading="lazy"/>
            {/* <Image
              src="/booking_widget.png"
              alt="image-alt-text"
              sizes="200 400 650 800"
              layout="responsive"
              objectFit="cover"
              loading="lazy"
            /> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <section className="about max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-16 font-primary">
      <SectionTitle
        title={contribution.title}
        subtitle={contribution.subtitle}
        description={contribution.description}
      />
      <div className="py-4">
        {contribution.projects.map((project, i) => (
          <article key={`${project.title}-${i}`} className="flex flex-col md:flex-row">
            {renderProject(project)}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
