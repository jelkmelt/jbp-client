import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);

  return (
    <div className="text-center lg:text-end lg:mr-10">
      <span className="">
        {/* Search */}
        <input
          type="text"
          className="ml-3 px-3 py-1.5 outline-none border border-slate-300 focus:border-cyan-500 text-slate-800 bg-white rounded-md"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="Search"
        />
      </span>
    </div>
  );
};
