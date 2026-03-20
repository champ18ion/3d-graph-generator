import React from 'react';

const DataEditor = ({ dataset, setDataset }) => {
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...dataset];
    const newRow = [...newData[rowIndex]]; // Create shallow copy of the row

    // Convert to number if it's not the header row/col and is numeric
    if (rowIndex > 0 && colIndex > 0 && !isNaN(value) && value !== '') {
        newRow[colIndex] = Number(value);
    } else {
        newRow[colIndex] = value;
    }

    newData[rowIndex] = newRow; // Assign back the new row
    setDataset(newData);
  };

  const addRow = () => {
    const newRow = new Array(dataset[0].length).fill('');
    newRow[0] = `Row ${dataset.length}`;
    setDataset([...dataset, newRow]);
  };

  const addColumn = () => {
    const newData = dataset.map((row, index) => {
      if (index === 0) return [...row, `Series ${row.length}`];
      return [...row, 0];
    });
    setDataset(newData);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="overflow-auto border border-gray-200 rounded-lg shadow-inner">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <tbody className="bg-white divide-y divide-gray-200">
            {dataset.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-50 font-semibold" : ""}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-0 border-r border-gray-200 last:border-r-0">
                    <input
                      type={rowIndex === 0 || colIndex === 0 ? "text" : "number"}
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className={`w-full p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 bg-transparent
                        ${rowIndex === 0 ? 'text-gray-700 font-semibold text-center' : 'text-gray-600'}
                        ${colIndex > 0 ? 'text-right' : 'text-left font-medium text-gray-700'}
                      `}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={addRow}
          className="flex-1 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          + Add Row
        </button>
        <button
          onClick={addColumn}
          className="flex-1 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          + Add Column
        </button>
      </div>
    </div>
  );
};

export default DataEditor;