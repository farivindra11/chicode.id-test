import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
export default function Chart({ data }) {

    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#0d6efd',
            height: '300px',

        },
        title: {
            text: ''
        },
        yAxis: {
            visible: false
        },
        xAxis: {
            visible: false
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            },
            series: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0.1,
                groupPadding: 0
            }
        },
        series: [{
            name: 'Death',
            data: data.map(({ deaths }) => deaths),
            color: '#d7dadb'
        }, {
            name: 'Confirmed',
            data: data.map(({ confirmed }) => confirmed),
            color: '#688ffc'
        }],
        credits: {
            enabled: false
        }

    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

