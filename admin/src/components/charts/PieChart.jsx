import { PieChart as RePieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const PieChart = ({ data = [], dataKey = "value", nameKey = "name", colors = ["#8884d8", "#82ca9d", "#ffc658"] }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RePieChart>
        <Pie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
