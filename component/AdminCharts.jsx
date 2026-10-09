"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const fallbackData = [
  { _id: "السبت", count: 12 },
  { _id: "الأحد", count: 19 },
  { _id: "الإثنين", count: 15 },
  { _id: "الثلاثاء", count: 27 },
  { _id: "الأربعاء", count: 22 },
  { _id: "الخميس", count: 34 },
  { _id: "الجمعة", count: 28 },
];

export default function AdminChart({ data = [] }) {
  const chartData = Array.isArray(data) && data.length > 0 ? data : fallbackData;

  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#edf2f5" strokeDasharray="4 4" />
          <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: "#98a4b5", fontSize: 10 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#98a4b5", fontSize: 10 }} />
          <Tooltip
            cursor={{ stroke: "#b7f5e7", strokeWidth: 2 }}
            contentStyle={{ border: "1px solid #e5ebf3", borderRadius: 12, fontSize: 12 }}
            labelStyle={{ color: "#17243f", fontWeight: 700 }}
          />
          <Line type="monotone" dataKey="count" stroke="#11bda5" strokeWidth={3} dot={{ r: 4, fill: "#11bda5", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
