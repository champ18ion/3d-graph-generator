import React, { useState } from 'react';
import Modal from 'react-modal';

// Set up react-modal's accessibility properties
Modal.setAppElement("#root");

const BarChartBuilder = ({ onUpdate, barChartType }) => {
  const [data, setData] = useState([
    { label: 'Category 1', value: 30, color: '#4CAF50', labelPosition: 'top' },
    { label: 'Category 2', value: 50, color: '#2196F3', labelPosition: 'bottom' },
    { label: 'Category 3', value: 70, color: '#FFC107', labelPosition: 'inside' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [newData, setNewData] = useState({ label: '', value: 0, color: '#000000', labelPosition: 'top' });

  const openModal = (dataItem, index) => {
    setCurrentData(index !== undefined ? { ...dataItem, index } : null);
    setNewData(dataItem || { label: '', value: 0, color: '#000000', labelPosition: 'top' });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedData = [...data];
    if (currentData) {
      updatedData[currentData.index] = newData;
    } else {
      updatedData.push(newData);
    }
    setData(updatedData);
    onUpdate(updatedData);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    onUpdate(updatedData);
  };

  const addData = () => {
    openModal();
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-2">Bar Chart Builder</h2>

      {/* Chart Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Chart Type: {barChartType}</label>
      </div>

      {/* Scrollable Pills for Data Points */}
      <div className="h-60 overflow-y-auto flex flex-wrap gap-3 p-2 bg-transparent rounded-lg">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 h-10 py-2 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-700"
            onClick={() => openModal(item, index)}
          >
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Add Data Button */}
      <div className="mt-4">
        <button
          onClick={addData}
          className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          + Add Data
        </button>
      </div>

      {/* Modal for Editing/Adding Data */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
          <h3 className="text-lg font-medium">{currentData ? "Edit Data" : "Add Data"}</h3>

          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={newData.label}
              onChange={(e) => setNewData({ ...newData, label: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              type="number"
              value={newData.value}
              onChange={(e) => setNewData({ ...newData, value: parseInt(e.target.value, 10) })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Color Customization */}
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={newData.color}
              onChange={(e) => setNewData({ ...newData, color: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Label Positioning */}
          <div>
            <label className="block text-sm font-medium mb-1">Label Position</label>
            <select
              value={newData.labelPosition}
              onChange={(e) => setNewData({ ...newData, labelPosition: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="inside">Inside</option>
            </select>
          </div>

          {/* Stacking Options */}
          {barChartType === 'stacked' && (
            <div>
              <label className="block text-sm font-medium mb-1">Stacked Value</label>
              <input
                type="number"
                value={newData.value}
                onChange={(e) => setNewData({ ...newData, value: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex justify-end gap-4 mt-4">
            {currentData && (
              <button
                onClick={() => handleDelete(currentData.index)}
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

export default BarChartBuilder;
