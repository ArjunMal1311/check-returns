import React from 'react'
import { Bubble } from 'react-chartjs-2'

const BubbleChart = ({ data, options }: any) => {
    return (
        <div>
            <Bubble data={data} options={options} />
        </div>
    )
}

export default BubbleChart