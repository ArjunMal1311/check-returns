import BubbleChart from '@/components/ChartComponents/BubbleChart';
import React from 'react'

interface BubbleChartProps {
    investment: string;
    rateOfInterest: string;
    timePeriod: string;
}

const FDBubble = ({ investment, rateOfInterest, timePeriod }: BubbleChartProps) => {
    const principle = parseFloat(investment);
    const interestRate = parseFloat(rateOfInterest) / 100;
    const years = parseInt(timePeriod);

    const data = [];
    for (let year = 0; year <= years; year++) {
        const totalValue = principle + (principle * interestRate * year);
        const radius = Math.sqrt(totalValue) / 100 + 10 * year;

        data.push({ x: year, y: totalValue, r: radius });
    }

    const chartData = {
        datasets: [
            {
                label: 'Investment',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
            <BubbleChart data={chartData} options={options} />
        </div>
    )
}

export default FDBubble