import PieChart from '@/components/ChartComponents/PieChart';
import React from 'react';

interface MFPieChartProps {
    categories: {
        name: string;
        TotalAmount: number;
    }[];
}

const MFPieChart = ({ categories }: MFPieChartProps) => {
    const colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
    ];

    const data = {
        labels: categories.map(category => category.name),
        datasets: [{
            data: categories.map(category => category.TotalAmount),
            backgroundColor: colors.slice(0, categories.length),
            borderColor: new Array(categories.length).fill('rgba(255, 255, 255, 0.7'),
            borderWidth: 1,
        }],
    };

    return (
        <div>
            <PieChart data={data} />
        </div>
    );
}

export default MFPieChart;
