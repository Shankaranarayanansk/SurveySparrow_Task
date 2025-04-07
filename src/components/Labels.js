import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <div className="mt-6 sm:mt-8 font-poppins">
      <p className="text-sm sm:text-base text-gray-400 font-semibold mb-3">
        Filter by Label Colors
      </p>
      <div className="flex flex-wrap gap-2">
        {labels.map(({ label: lbl, checked }, idx) => (
          <div key={idx}>
            <button
              onClick={() => updateLabel({ label: lbl, checked: !checked })}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition text-sm sm:text-base
                ${checked
                  ? `bg-${lbl}-500 text-white border-${lbl}-500`
                  : `bg-white text-gray-700 border-gray-300 hover:bg-${lbl}-100`
                }`}
            >
              <span className={`w-3 h-3 rounded-full bg-${lbl}-500`} />
              <span className="capitalize">{lbl}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
