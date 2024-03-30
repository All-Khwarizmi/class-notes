import { twMerge } from "tailwind-merge";
import Criteria from "./Criteria";
import Evaluations from "./Evaluations";
import Fields from "./Fields";

export default function Main() {
  return (
    <div
      className={twMerge(`
      h-full w-full grid grid-cols-1  md:grid-cols-2 grid-rows-2 gap-2 `)}
    >
      {" "}
      <Evaluations />
      <Criteria />
      <Fields />
    </div>
  );
}
