import React, { useRef, useEffect, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March'];
const colors = ['red', 'orange', 'yellow'];

function generateRandomData() {
    return labels.map(() => Math.floor(Math.random() * 2000) - 1000);
}

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: generateRandomData(),
        },
        {
            label: 'Dataset 2',
            data: generateRandomData(),
        },
    ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = colors[Math.floor(Math.random() * colors.length)];
    const remainingColors = colors.filter(color => color !== colorStart);
    const colorMid = remainingColors[Math.floor(Math.random() * remainingColors.length)];
    const colorEnd = remainingColors.filter(color => color !== colorMid)[0];

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

const ChartAccurate = () => {
    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                borderColor: createGradient(chart.ctx, chart.chartArea),
            })),
        };

        setChartData(chartData);
    }, []);

    return <Chart ref={chartRef} type='line' data={chartData} />;
}

export default ChartAccurate;
