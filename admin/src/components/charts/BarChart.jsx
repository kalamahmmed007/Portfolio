import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BarChart = ({ data = [], dataKey = "value", nameKey = "name", color = "#000" }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill={color} />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
