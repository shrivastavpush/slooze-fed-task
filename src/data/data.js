// Sample data for recent sales
export const recentSales = [
    { name: "Olivia Martin", email: "olivia@example.com", amount: "$1,999.00" },
    { name: "Jackson Lee", email: "jackson@example.com", amount: "$39.00" },
    { name: "Isabella Nguyen", email: "isabella@example.com", amount: "$299.00" },
    { name: "William Kim", email: "will@example.com", amount: "$99.00" },
    { name: "Sofia Davis", email: "sofia@example.com", amount: "$39.00" },
];

// Sample data for summary stats
export const summaryStats = [
    { label: "Total Revenue", value: "$45,231.89", trend: "+20.1% from last month", up: true },
    { label: "Subscriptions", value: "+2350", trend: "+180.1% from last month", up: true },
    { label: "Sales", value: "+12,234", trend: "+19% from last month", up: true },
    { label: "Active Now", value: "+573", trend: "+201 since last hour", up: true },
];

// Sample data for charts
export const monthlySales = {
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

export const revenueData = {
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

export const productDistribution = {
    data: [35, 25, 20, 15, 5],
    backgroundColor: [
        'rgba(79, 70, 229, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(167, 139, 250, 0.8)',
        'rgba(192, 132, 252, 0.8)',
    ],
};

export const productCategories = ['Electronics', 'Clothing', 'Books', 'Home', 'Other'];