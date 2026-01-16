import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const LineChart = ({ data = [], dataKey = "value", nameKey = "name", color = "#000" }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
