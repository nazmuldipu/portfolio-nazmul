import { FunctionComponent } from "react";
import SectionTitle from "./Molecules/sectionTitle";
import Image from "next/image";
import Button from "./Atoms/Button";

interface Project {
  title: string;
  image: string;
  client: string;
  role: string;
  start: string;
  end: string;
  description: string;
  link: string;
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
        <div className="md:w-32 text-xs text-accent md:px-3 pt-4 md:py-4 md:border-r border-dotted md:mr-4 relative">
          {project.start} - <br className="hidden md:block" /> {project.end}
          <div className="hidden md:block absolute top-5 -right-1 bg-primary p-1"></div>
        </div>
        <div className="py-4 border-b flex-1 grid md:grid-cols-2 gap-4 text-sm md:text-base">
          <div>
            <h3 className=" text-2xl">{project.title}</h3>
            <div className="py-1">{project.description}</div>
            <div className="py-1">
              For - <span className="italic">{project.client}</span>
            </div>
            <div className="py-1">
              I contributed as{" "}
              <span className=" font-bold">{project.role}</span>
            </div>
            {project.link.length > 0 && (
              <div className="py-1">
                <div>Link</div>
                <Button
                  href={project.link}
                  target="_blank"
                  type="text"
                  isBlock={false}
                >
                  {project.link}
                </Button>
              </div>
            )}
            <div className="py-1">Technology</div>
            <div className="flex flex-wrap gap-2">
              {project.technology.map((te, i) => (
                <span
                  key={`${te}-${i}`}
                  className="py-1 px-2 mb-2 bg-primary text-white text-sm rounded-md"
                >
                  {te}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-80">
            <Image
              src={`/${project.image}`}
              alt="image-alt-text"
              sizes="200 400 650 800"
              layout="fill"
              objectFit="contain"
              loading="lazy"
            />
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
          <article
            key={`${project.title}-${i}`}
            className="flex flex-col md:flex-row"
          >
            {renderProject(project)}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
