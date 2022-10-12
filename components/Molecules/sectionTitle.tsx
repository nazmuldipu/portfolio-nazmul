import { FunctionComponent } from "react";
import { BsFillGridFill } from "react-icons/bs";
interface PageProps {
  title: string;
  subtitle: string;
  description?: string;
}

const SectionTitle: FunctionComponent<PageProps> = ({title, subtitle, description}) => {
  return (
    <>
      <div className="uppercase flex items-center">
        <BsFillGridFill />
        <span className="pl-1 text-primary">{title}</span>
      </div>
      <div className="font-secondary capitalize text-3xl md:text-5xl font-semibold tracking-wide leading-tight py-4">
        {subtitle}
      </div>
      {description && (
        <div className="text-sm leading-relaxed">{description}</div>
      )}
    </>
  );
};

export default SectionTitle;
