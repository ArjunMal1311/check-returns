"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartData {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
            borderColor: string[];
            borderWidth: number;
        }[];
    };
}


const PieChart = ({ data }: PieChartData) => {
    if (!data.datasets || !Array.isArray(data.datasets)) {
        return <div>Error: Invalid chart data</div>;
    }

    return <Doughnut data={data} />;
};

export default PieChart;
