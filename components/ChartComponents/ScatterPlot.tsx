import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ScatterPlotData {
    label: string;
    data: { x: number; y: number }[];
    pointBackgroundColor: string;
}

interface ScatterPlotChartData {
    datasets: ScatterPlotData[] | any;
    options: {
        scales: {
            x: {
                type: string,
                position: string,
                title: {
                    display: boolean,
                    text: string
                }
            },
            y: {
                type: string,
                position: string,
                title: {
                    display: boolean,
                    text: string
                },
                beginAtZero: boolean
            }
        }
    } | any
}


const ScatterPlot = ({ datasets, options }: ScatterPlotChartData) => {
    return (
        <div className=''>
            <Scatter options={options} data={datasets} />
        </div>
    );
}

export default ScatterPlot