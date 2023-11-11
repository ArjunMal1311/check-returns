import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

function generateRandomBubbleData() {
    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            x: Math.floor(Math.random() * 200) - 100,
            y: Math.floor(Math.random() * 200) - 100,
            r: Math.floor(Math.random() * 1) + 5,
        });
    }
    return data;
}

export const data = {
    datasets: [
        {
            label: 'Red dataset',
            data: generateRandomBubbleData(),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Blue dataset',
            data: generateRandomBubbleData(),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};



const DynamicChart = () => {
    return <Bubble options={options} data={data} />;
}

export default DynamicChart