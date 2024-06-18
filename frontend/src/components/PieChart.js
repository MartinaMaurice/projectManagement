import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = React.memo(({ value }) => {
    const data = {
        labels: ['Available', 'Not Available'],
        datasets: [
            {
                data: [value, 100 - value], // Assuming a base value of 100 for demonstration
                backgroundColor: ['#0000FF', '#EEEEEE'], // Blue and light grey
                borderColor: ['#0000FF', '#EEEEEE'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    return <div style={{ width: '100%', height: '100%' }}><Pie data={data} options={options} /></div>;
});

export default PieChart;
