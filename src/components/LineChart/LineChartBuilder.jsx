import React, { useState } from "react";
import Modal from "react-modal";

// Set up react-modal's accessibility properties
Modal.setAppElement("#root");

const LineChartBuilder = ({ onUpdate }) => {
  const [lines, setLines] = useState([
    {
      label: "Line 1",
      data: [
        { label: "Point 1", value: 30 },
        { label: "Point 2", value: 50 },
        { label: "Point 3", value: 70 },
      ],
      color: "#FF5733", // Initial color
      smooth: false,
      stack: false,
      area: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [newLineData, setNewLineData] = useState({
    label: "",
    data: [{ label: "Point 1", value: 0 }],
    color: "#FF5733", // Default color
    smooth: false,
    stack: false,
    area: false,
  });

  const openModal = (line, index) => {
    setCurrentLine(index !== undefined ? { ...line, index } : null);
    setNewLineData(line || { label: "", data: [{ label: "Point 1", value: 0 }], color: "#FF5733", smooth: false, stack: false, area: false });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedLines = [...lines];
    if (currentLine) {
      updatedLines[currentLine.index] = newLineData;
    } else {
      updatedLines.push(newLineData);
    }
    setLines(updatedLines);
    onUpdate(updatedLines);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedLines = lines.filter((_, i) => i !== index);
    setLines(updatedLines);
    onUpdate(updatedLines);
  };

  const addDataPoint = (lineIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex].data.push({ label: `Point ${updatedLines[lineIndex].data.length + 1}`, value: 0 });
    setLines(updatedLines);
    onUpdate(updatedLines);
  };

  const removeDataPoint = (lineIndex, dataIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex].data = updatedLines[lineIndex].data.filter((_, i) => i !== dataIndex);
    setLines(updatedLines);
    onUpdate(updatedLines);
  };

  return (
    <div className="p-4 bg-transparent rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Line Chart Builder</h2>

      {/* Scrollable Line Pills */}
      <div className="h-60 overflow-y-auto flex flex-wrap gap-3 p-2 bg-transparent rounded-lg">
        {lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="flex items-center gap-2 px-3 h-10 py-2 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-700"
            onClick={() => openModal(line, lineIndex)}
            style={{ backgroundColor: line.color }} // Show the selected color
          >
            <span className="font-medium">{line.label}</span>
          </div>
        ))}
      </div>

      {/* Fixed Add Line Button */}
      <div className="mt-4">
        <button
          onClick={() => openModal()}
          className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          + Add Line
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
          <h3 className="text-lg font-medium">{currentLine ? "Edit Line" : "Add Line"}</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={newLineData.label}
              onChange={(e) => setNewLineData({ ...newLineData, label: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Data Points</label>
            {newLineData.data.map((point, dataIndex) => (
              <div key={dataIndex} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={point.label}
                  onChange={(e) =>
                    setNewLineData({
                      ...newLineData,
                      data: newLineData.data.map((data, idx) =>
                        idx === dataIndex ? { ...data, label: e.target.value } : data
                      ),
                    })
                  }
                  className="w-1/2 px-3 py-2 border rounded-md"
                />
                <input
                  type="number"
                  value={point.value}
                  onChange={(e) =>
                    setNewLineData({
                      ...newLineData,
                      data: newLineData.data.map((data, idx) =>
                        idx === dataIndex ? { ...data, value: parseInt(e.target.value, 10) } : data
                      ),
                    })
                  }
                  className="w-1/2 px-3 py-2 border rounded-md"
                />
                <button
                  onClick={() => {
                    const updatedData = newLineData.data.filter((_, idx) => idx !== dataIndex);
                    setNewLineData({ ...newLineData, data: updatedData });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Point
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const updatedData = [...newLineData.data, { label: `Point ${newLineData.data.length + 1}`, value: 0 }];
                setNewLineData({ ...newLineData, data: updatedData });
              }}
              className="px-3 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Add Data Point
            </button>
          </div>

          {/* Customization Options */}
          <div>
            <label className="block text-sm font-medium mb-1">Line Smoothness</label>
            <input
              type="checkbox"
              checked={newLineData.smooth}
              onChange={(e) => setNewLineData({ ...newLineData, smooth: e.target.checked })}
              className="ml-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stacked Area Chart</label>
            <input
              type="checkbox"
              checked={newLineData.stack}
              onChange={(e) => setNewLineData({ ...newLineData, stack: e.target.checked, area: e.target.checked })}
              className="ml-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Area Chart</label>
            <input
              type="checkbox"
              checked={newLineData.area}
              onChange={(e) => setNewLineData({ ...newLineData, area: e.target.checked })}
              className="ml-2"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">Line Color</label>
            <input
              type="color"
              value={newLineData.color}
              onChange={(e) => setNewLineData({ ...newLineData, color: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            {currentLine && (
              <button
                onClick={() => handleDelete(currentLine.index)}
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
      </Modal>
    </div>
  );
};

export default LineChartBuilder;
