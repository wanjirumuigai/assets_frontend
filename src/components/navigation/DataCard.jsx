import { Link } from "react-router-dom";

export default function DataCard({
  title,
  number,
  icon: Component,
  cardColor,
  link,
}) {
  return (
    <Link to={link}>
      <div
        className={`${cardColor} data-card flex flex-row p-3 w-80 justify-around rounded-md mb-10`}
      >
        <div className="title-and-number flex flex-col rounded">
          <h1 className="text-5xl font-bold text-slate-200">{number}</h1>
          <h1 className="text-lg font-bold text-slate-200">{title}</h1>
        </div>
        <Component size={74} />
      </div>
    </Link>
  );
}
