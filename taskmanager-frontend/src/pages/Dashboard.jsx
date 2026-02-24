import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [summary, setSummary] = useState({
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0
});
  const [dailyData, setDailyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const summaryRes = await API.get("/analytics/dashboard");
      const dailyRes = await API.get("/analytics/daily");
      const categoryRes = await API.get("/analytics/category");

      setSummary(summaryRes.data);
      setDailyData(dailyRes.data);
      setCategoryData(categoryRes.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(summary);
  return (
     <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
<div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <p className="text-gray-500">Total Tasks</p>
          <p className="text-2xl font-bold">{summary.totalTasks}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <p className="text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {summary.completedTasks}
          </p>
        </div>

       <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <p className="text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {summary.pendingTasks}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Daily Productivity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="count"
                nameKey="category"
                outerRadius={90}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}