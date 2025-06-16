import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { CircleChevronUp, CircleChevronDown } from "lucide-react";
import { summaryStats, recentSales } from "../data/data";

export default function Dashboard() {
  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden bg-background">
      <div className="w-full mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold mb-7">Dashboard</h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6 flex flex-col min-h-[312px]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        </div>
      </div>
    </div>
  );
}
