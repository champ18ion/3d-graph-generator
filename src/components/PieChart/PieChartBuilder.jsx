import React, { useState } from "react";

const PieChartBuilder = ({ onUpdate }) => {
  const [slices, setSlices] = useState([
    { label: "Slice 1", value: 30, color: "#ff0000" },
    { label: "Slice 2", value: 70, color: "#00ff00" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlice, setCurrentSlice] = useState(null);
  const [newSliceData, setNewSliceData] = useState({
    label: "",
    value: 0,
    color: "#000000",
  });

  const openModal = (slice, index) => {
    setCurrentSlice(index !== undefined ? { ...slice, index } : null);
    setNewSliceData(slice || { label: "", value: 0, color: "#000000" });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedSlices = [...slices];
    if (currentSlice) {
      updatedSlices[currentSlice.index] = newSliceData;
    } else {
      updatedSlices.push(newSliceData);
    }
    setSlices(updatedSlices);
    onUpdate(updatedSlices);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedSlices = slices.filter((_, i) => i !== index);
    setSlices(updatedSlices);
    onUpdate(updatedSlices);
  };

  return (
    <div className="p-4 bg-transparent rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Pie Chart Builder
      </h2>

      {/* Scrollable Slice Pills */}
      <div className="h-60 overflow-y-auto flex flex-wrap gap-3 p-2 bg-transparent rounded-lg">
        {slices.map((slice, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 h-10 py-2 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-700"
            onClick={() => openModal(slice, index)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: slice.color }}
              title={`Color: ${slice.color}`}
            ></div>
            <span className="font-medium">
              {slice.label} ({slice.value})
            </span>
          </div>
        ))}
      </div>

      {/* Fixed Add Slice Button */}
      <div className="mt-4">
        <button
          onClick={() => openModal()}
          className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          + Add Slice
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-medium">
              {currentSlice ? "Edit Slice" : "Add Slice"}
            </h3>
            <div>
              <label className="block text-sm font-medium mb-1">Label</label>
              <input
                type="text"
                value={newSliceData.label}
                onChange={(e) =>
                  setNewSliceData({ ...newSliceData, label: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Value</label>
              <input
                type="number"
                value={newSliceData.value}
                onChange={(e) =>
                  setNewSliceData({
                    ...newSliceData,
                    value: +e.target.value || 0,
                  })
                }
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                value={newSliceData.color}
                onChange={(e) =>
                  setNewSliceData({ ...newSliceData, color: e.target.value })
                }
                className="w-16 h-10 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              {currentSlice && (
                <button
                  onClick={() => handleDelete(currentSlice.index)}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartBuilder;
