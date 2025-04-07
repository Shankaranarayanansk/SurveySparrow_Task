// EditModal.js
import React, { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function EditModal({ isOpen, onClose, labelToEdit }) {
  const { updateLabel } = useContext(GlobalContext);
  const [labelName, setLabelName] = useState(labelToEdit?.label || "");
  const [labelColor, setLabelColor] = useState(labelToEdit?.color || "");

  const handleUpdate = () => {
    updateLabel({ label: labelName, checked: true });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-md w-72">
        <h2 className="text-lg font-semibold mb-3">Edit Label</h2>
        <input
          className="border w-full px-2 py-1 rounded mb-3"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder="Label name"
        />
        <input
          className="border w-full px-2 py-1 rounded mb-3"
          value={labelColor}
          onChange={(e) => setLabelColor(e.target.value)}
          placeholder="Color (e.g., blue, red)"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
