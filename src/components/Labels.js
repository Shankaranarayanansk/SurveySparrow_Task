import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <div className="mt-6 sm:mt-8">
      <p className="text-sm sm:text-base text-gray-500 font-semibold mb-4">Filter by Colors</p>
      <div className="space-y-2 sm:space-y-3">
        {labels.map(({ label: lbl, checked }, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 sm:gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => updateLabel({ label: lbl, checked: !checked })}
              className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-${lbl}-500 focus:ring-0 rounded-md transition duration-150 ease-in-out`}
            />
            <span className="text-gray-700 text-sm sm:text-base capitalize">{lbl}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
