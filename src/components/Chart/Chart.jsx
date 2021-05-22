import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getDailySummary } from "../../services/index"
export default function Chart({ data }) {
    const [daily, setDaily] = useState([])


    const confirm = () => {
        getDailySummary().then(res => {
            const data = res.data

            const modify = data.map((item) => ({
                confirmed: item.confirmed.total,
                deaths: item.deaths.total,
                date: item.reportDate
            }))
            setDaily(modify)
        })
    }



    useEffect(() => {
        confirm()
    }, [])// eslint-disable-next-line


    const options = {
        title: {
            display: true,
            text: "",
        },

        chart: {
            type: "spline",
            height: "570px"
        },

        yAxis: {
            title: {
                text: "",
            },
        },

        xAxis: {
            categories: data.map(({ date }) => date)
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                },
            },
        },

        series: [
            {
                name: "Confirmed",
                data: data.map(({ confirmed }) => confirmed),
            },
            {
                name: "Deaths",
                data: data.map(({ deaths }) => deaths),
                color: '#ff0000',
            },
        ],
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
