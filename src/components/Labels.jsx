import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import GlobalContext from "../context/GlobalContext";

// Color mapping for Tailwind classes
const colorMapping = {
  indigo: "text-indigo-500 border-indigo-500",
  gray: "text-gray-500 border-gray-500",
  green: "text-green-500 border-green-500",
  blue: "text-blue-500 border-blue-500",
  red: "text-red-500 border-red-500",
  purple: "text-purple-500 border-purple-500",
  yellow: "text-yellow-500 border-yellow-500",
  pink: "text-pink-500 border-pink-500"
};

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Labels</h3>
      <div className="space-y-2">
        {labels.map(({ label: lbl, checked }, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <Checkbox 
              id={`label-${lbl}`}
              checked={checked}
              onCheckedChange={() => updateLabel({ label: lbl, checked: !checked })}
              className={cn(
                "data-checked:bg-white data-checked:border-2",
                checked && colorMapping[lbl]
              )}
            />
            <div className="flex items-center space-x-2">
              <div 
                className={cn(
                  "w-3 h-3 rounded-full",
                  `bg-${lbl}-500`
                )}
              />
              <label 
                htmlFor={`label-${lbl}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
              >
                {lbl}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}