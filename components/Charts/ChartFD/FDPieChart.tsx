import React from 'react'
import PieChart from '../../ChartComponents/PieChart'

interface FDComponents {
    investment: string;
    rateOfInterest: string;
    timePeriod: string;
}

const FDChart = ({ investment, rateOfInterest, timePeriod }: FDComponents) => {
    const principal = parseFloat(investment);
    const interestRate = parseFloat(rateOfInterest);
    const years = parseInt(timePeriod);

    const interest = (principal * interestRate * years)/100;
    const totalValue = principal + interest;

    const chartData = {
        labels: ['Total Investment', 'Interest'],
        datasets: [
            {
                data: [principal, interest],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div><PieChart data={chartData} /></div>
    )
}

export default FDChart