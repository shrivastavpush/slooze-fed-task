import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { CircleChevronUp, CircleChevronDown, TrendingUp, Users, DollarSign, Package } from "lucide-react";
import { summaryStats, recentSales } from "../data/data";
import { BarChart, LineChart, PieChart, generateBarData, generateLineData, generatePieData } from "@/components/ui/chart";

// Sample data for charts
const monthlySales = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: '2023',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgba(99, 102, 241, 1)',
    },
    {
      label: '2024',
      data: [28, 48, 40, 19, 86, 27, 90],
      backgroundColor: 'rgba(79, 70, 229, 0.6)',
      borderColor: 'rgba(79, 70, 229, 1)',
    },
  ],
};

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Revenue',
      data: [4500, 5200, 4800, 6100, 5800, 7000, 8200],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
  ],
};

const productDistribution = {
  data: [35, 25, 20, 15, 5],
  backgroundColor: [
    'rgba(79, 70, 229, 0.8)',
    'rgba(99, 102, 241, 0.8)',
    'rgba(129, 140, 248, 0.8)',
    'rgba(167, 139, 250, 0.8)',
    'rgba(192, 132, 252, 0.8)',
  ],
};

const productCategories = ['Electronics', 'Clothing', 'Books', 'Home', 'Other'];

export default function Dashboard() {
  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden bg-background">
      <div className="w-full mx-auto px-6 pt-10">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>Last 30 days</span>
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <Card className="p-4">
            <CardContent className="flex flex-col gap-1 p-0">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">$24,780</span>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <span className="text-muted-foreground text-sm">Total Revenue</span>
              <span className="text-green-600 text-xs flex items-center">
                <CircleChevronUp size={15} className="mr-1" />
                12.5% from last month
              </span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="flex flex-col gap-1 p-0">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">1,248</span>
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <span className="text-muted-foreground text-sm">Customers</span>
              <span className="text-green-600 text-xs flex items-center">
                <CircleChevronUp size={15} className="mr-1" />
                8.2% from last month
              </span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="flex flex-col gap-1 p-0">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">2,340</span>
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <span className="text-muted-foreground text-sm">Products Sold</span>
              <span className="text-green-600 text-xs flex items-center">
                <CircleChevronUp size={15} className="mr-1" />
                4.3% from last month
              </span>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="flex flex-col gap-1 p-0">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">96.8%</span>
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <span className="text-muted-foreground text-sm">Growth Rate</span>
              <span className="text-green-600 text-xs flex items-center">
                <CircleChevronUp size={15} className="mr-1" />
                2.1% from last month
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <BarChart
              title="Monthly Sales Comparison"
              data={generateBarData(monthlySales.labels, monthlySales.datasets)}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Monthly Sales Comparison',
                    color: 'inherit',
                  },
                },
              }}
            />
            <LineChart
              title="Revenue Overview"
              data={generateLineData(revenueData.labels, revenueData.datasets)}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Revenue Overview',
                    color: 'inherit',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: (value) => `$${value}`,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
              <div className="space-y-4">
                {recentSales.map((sale, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <span className="font-semibold">{sale.amount}</span>
                  </div>
                ))}
              </div>
            </Card>

            <PieChart
              title="Product Distribution"
              data={generatePieData(productCategories, productDistribution)}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {[/* Add your top selling products data here */].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <span className="font-semibold">{product.revenue}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[/* Add your recent activity data here */].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
