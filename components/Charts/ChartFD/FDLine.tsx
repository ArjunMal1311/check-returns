import LineChart from '@/components/ChartComponents/LineChart';
import ScatterPlot from '@/components/ChartComponents/ScatterPlot';
import React from 'react'

interface FDComponents {
    investment: string;
    rateOfInterest: string;
    timePeriod: string;
}

const FDLine = ({ investment, rateOfInterest, timePeriod }: FDComponents) => {
    const principle = parseFloat(investment);
    const annualRate = parseFloat(rateOfInterest) / 100;
    const years = parseInt(timePeriod);

    const data = [];
    let currentTotal = principle;

    for (let year = 1; year <= years; year++) {
        currentTotal = currentTotal + currentTotal * annualRate;
        data.push(currentTotal.toFixed(2));
    }

    const chartData = {
        labels: Array.from({ length: years }, (_, i) => i + 1),
        datasets: [
            {
                label: "Investment",
                data: data,
                fill: true,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Years',
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Total Value',
                },
            },
        },
    };

    return (
        <div>
            <LineChart data={chartData} options={options}/>
        </div>
    )
}

export default FDLine