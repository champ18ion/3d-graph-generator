const Sidebar = ({ onChartSelect }) => {
    return (
        <aside>
            <h2>Chart Options</h2>
            <button onClick={() => onChartSelect('pie')}>Pie Chart</button>
            <button onClick={() => onChartSelect('bar')}>Bar Chart</button>
            <button onClick={() => onChartSelect('line')}>Line Chart</button>
        </aside>
    );
};

export default Sidebar;
