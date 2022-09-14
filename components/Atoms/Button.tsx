import Link from "next/link";

interface Props {
  type?: "primary" | "secondary" | "text" | "social" | "nav";
  children: React.ReactNode;
  onClick?: () => void;
  isBlock?: boolean;
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;
  width?: string;
}

const textSize = "text-sm lg:text-base";

const padding = "px-4 py-2 rounded-md";

const color = {
  primary: "text-white dark:text-salt-200",
  secondary: "text-white dark:text-slate-200",
  text: "text-slate-700 hover:text-white dark:text-slate-200 dark:hover:text-white",
  social: "text-gray-400 hover:text-gray-500",
  nav: "text-gray-500 hover:text-gray-700",
};

const backgroundColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  text: "bg-light hover:bg-secondary dark:bg-gray-800 dark:hover:bg-blue-500",
  social:
    "bg-transparent hover:bg-light dark:bg-gray-800 dark:hover:bg-blue-500",
};

const border = {
  primary: "border border-transparent",
  secondary: "border border-transparent",
  text: "border border-transparent",
  social: "border border-transparent",
  nav: "!rounded-none border-transparent hover:border-gray-300 border-b-2",
};

const Button = ({
  type = "primary",
  children,
  onClick,
  className = "",
  disabled = false,
  href,
  target,
  isBlock = true,
  width,
}: Props): JSX.Element => {
  const disabledStyle = disabled
    ? "opacity-50 cursor-not-allowed"
    : "transition ease-in-out duration-300 hover:cursor-pointer";

  let baseClasses = [
    textSize,
    border[type],
    backgroundColors[type],
    color[type],
    padding,
    disabledStyle,
  ];

  if (className) {
    baseClasses = [...baseClasses, ...className.split(" ")];
  }
  if (isBlock) {
    baseClasses = [...baseClasses, "block w-full"];
  }
  if (!!width) {
    baseClasses = [...baseClasses, width];
  }

  if (href) {
    let linkClasses = [
      ...baseClasses,
      "flex items-center justify-center whitespace-nowrap",
    ];
    return (
      <Link href={href}>
        <a className={linkClasses.join(" ")}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses.join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
