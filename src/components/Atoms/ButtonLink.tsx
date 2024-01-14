export default function ButtonLink({
  label,
  link,
}: {
  label: string;
  link: string;
}) {
  return (
    <div className="flex-shrink-0">
      <a
        href={link}
        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>{label}</span>
      </a>
    </div>
  );
}
