import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
export default function Chart({ data, data2, type, name1, name2, hight }) {


    const options = {
        title: {
            display: true,
            text: "",
        },

        chart: {
            type: `${type}`,
            height: hight ? `${hight}` : '70%%'
        },

        yAxis: {
            title: {
                text: "",
            },
        },

        xAxis: data ? {
            categories: data.map(({ date }) => date)
        } : {
                categories: data2.map(({ countryRegion }) => countryRegion)
            },

        plotOptions: {
            series: data ? {
                dataLabels: {
                    enabled: true,
                },
            } : {
                    stacking: 'normal',
                    borderWidth: 0,
                    pointPadding: 0.1,
                    groupPadding: 0
                }
        },

        legend: data2 ? {
            enabled: false
        } : {
                enabled: true
            },

        series:
            data ?
                [
                    {
                        name: `${name1}`,
                        data: data.map(({ confirmed }) => confirmed),
                    },
                    {
                        name: `${name2}`,
                        data: data.map(({ deaths }) => deaths),
                        color: '#ff0000',
                    },
                ] : [
                    {

                        data: data2.map(({ recovered }) => recovered),
                    },
                    {
                        data: data2.map(({ countryRegion }) => countryRegion),
                        color: '#ff0000',
                    },
                ]
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
