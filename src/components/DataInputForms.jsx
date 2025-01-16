import React, { useState } from 'react';

const DataInputForm = ({ onDataSubmit, onOptionsChange }) => {
    const [data, setData] = useState([
        { label: 'A', value: 30 },
        { label: 'B', value: 70 },
        { label: 'C', value: 50 },
    ]);

    const handleDataChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;
        setData(newData);
        onDataSubmit(newData);
    };

    const handleAddData = () => {
        setData([...data, { label: '', value: 0 }]);
    };

    const handleRemoveData = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
        onDataSubmit(newData);
    };

    const handleOptionsChange = (e) => {
        const { name, value } = e.target;
        onOptionsChange(name, value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Customize Data</h3>
            {data.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleDataChange(index, 'label', e.target.value)}
                        placeholder="Label"
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="number"
                        value={item.value}
                        onChange={(e) => handleDataChange(index, 'value', parseInt(e.target.value, 10))}
                        placeholder="Value"
                        style={{ marginRight: '10px' }}
                    />
                    <button onClick={() => handleRemoveData(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddData}>Add Data Point</button>

            <hr />

            <h3>Chart Options</h3>
            <div>
                <label>Chart Type</label>
                <select name="chartType" onChange={handleOptionsChange}>
                    <option value="pie">Pie</option>
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                </select>
            </div>
            <div>
                <label>Chart Title</label>
                <input
                    type="text"
                    name="chartTitle"
                    onChange={handleOptionsChange}
                    placeholder="Enter chart title"
                />
            </div>
        </div>
    );
};

export default DataInputForm;
