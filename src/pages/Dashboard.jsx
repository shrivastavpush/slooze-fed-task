import React from "react";
import { ChartWidget } from "@/components/ChartWidget";
import { Card, CardContent } from "@/components/ui/card";
import { CircleChevronUp, CircleChevronDown } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

// Dummy data: Summary cards and recent sales
const summaryStats = [
  { label: "Total Earning", value: "$112,893.00", trend: "+10.5%", up: true },
  { label: "Views", value: "+112,893", trend: "+13.5%", up: true },
  { label: "Total Sales", value: "+112,893", trend: "+9.1%", up: true },
  { label: "Subscriptions", value: "+112,893", trend: "+11.1%", up: true }
];

const recentSales = Array.from({ length: 6 }).map((_, i) => ({
  name: "Indra Maulana",
  email: "Indramaulana@gmail.com",
  amount: "$1500.00"
}));

// Chart Example Data
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const barData = {
  labels: months,
  datasets: [{
    label: "Earnings",
    data: [21000, 33000, 40000, 47000, 43000, 38000, 44000, 34000, 38000, 46000, 32000, 39000],
    backgroundColor: "#33A1FD"
  }]
};
const barOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, ticks: { color: "#aaa" } }, x: { ticks: { color: "#aaa" } } }
};

const lineData = {
  labels: months,
  datasets: [
    {
      label: "Total Earning",
      data: [7000, 12900, 16000, 31200, 24000, 18500, 31500, 18500, 21800, 34400, 26500, 22100],
      fill: true,
      borderColor: "#10B981",
      backgroundColor: 'rgba(16,185,129, 0.08)',
      tension: 0.3,
      pointRadius: 2
    }
  ]
};
const lineOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, ticks: { color: "#aaa" } }, x: { ticks: { color: "#aaa" } } }
};

const greenBarData = {
  labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  datasets: [
    {
      label: "Subscriptions",
      data: [250, 410, 330, 450, 500, 380, 320],
      backgroundColor: "#22C55E"
    }
  ]
};

// Subscriptions Performers Example
const yellowBarData = {
  labels: Array.from({length: 11}, (_, i) => ""),
  datasets: [{
    label: "Performers",
    data: [100, 210, 180, 150, 260, 380, 320, 350, 400, 380, 420],
    backgroundColor: "#FFB800"
  }]
};

// Theme toggle at bottom-left styled for dashboard
function ThemeToggleFloating() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="fixed left-6 bottom-6 z-50">
      <Button
        variant="outline"
        onClick={toggleTheme}
        className="rounded-full shadow hover:bg-muted hover:text-primary"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <>
            <CircleChevronDown className="mr-2" size={20} />
            Dark Mode
          </>
        ) : (
          <>
            <CircleChevronUp className="mr-2" size={20} />
            Light Mode
          </>
        )}
      </Button>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-[#F4F7FB] min-h-screen pb-20 relative overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold mb-7">Dashboard</h1>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-7">
          {summaryStats.map((stat, i) => (
            <Card key={i} className="p-4">
              <CardContent className="flex flex-col gap-1 p-0">
                <span className="text-lg font-bold">{stat.value}</span>
                <span className="text-muted-foreground text-xs">{stat.label}</span>
                <span className={stat.up ? "text-green-600 text-xs flex items-center" : "text-red-600 text-xs flex items-center"}>
                  {stat.up ? <CircleChevronUp size={15} className="mr-1" /> : <CircleChevronDown size={15} className="mr-1" />}
                  {stat.trend}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Top Row: Bar Chart + Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartWidget type="bar" data={barData} options={barOptions} title="Overview" height={312} />
          </div>
          <div className="bg-card rounded-xl shadow-sm p-6 flex flex-col min-h-[312px]">
            <div className="mb-4 font-semibold">Recent Sales</div>
            <div className="flex-1">
              <ul className="divide-y">
                {recentSales.map((sale, idx) => (
                  <li className="py-3 flex items-center justify-between gap-2" key={idx}>
                    <div>
                      <div className="font-medium text-[15px]">{sale.name}</div>
                      <div className="text-xs text-muted-foreground">{sale.email}</div>
                    </div>
                    <div className="font-semibold">{sale.amount}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Stats + more charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <ChartWidget type="line" data={lineData} options={lineOptions} title="Total Earning" height={220} />
          <ChartWidget type="bar" data={greenBarData} options={barOptions} title="Subscriptions" height={220} />
          <ChartWidget type="bar" data={yellowBarData} options={barOptions} title="Subscriptions Performers" height={220} />
        </div>
        {/* Footer spacer - feel free to add more dashboard sections as in your Figma */}
      </div>
      {/* ThemeToggleFloating removed */}
    </div>
  );
}
