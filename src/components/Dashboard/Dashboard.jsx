import React, { useEffect, useState } from 'react'
import Navbar from '../Header/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Chart from '../Chart/Chart'
import CountUp from "react-countup"
import Footer from '../Footer/Footer'
import ChartSide from '../Chart/ChartSide'
import { getData, getConfirmed, getDailySummary, getRecovered } from '../../services/index'
import "./Dash.css"

export default function Dashboard() {

    const [confirm, setConfirm] = useState(0)
    const [recover, setRecover] = useState(0)
    const [death, setDeath] = useState(0)
    const [lastUpdated, setLastUpdated] = useState("")
    const [chartSide, setChartSide] = useState([])
    const [daily, setDaily] = useState([])
    const [highRecover, setHighRecover] = useState([])


    const sideBarData = () => {  //side stackedbar chart data highest confirm cases
        getConfirmed().then(res => {
            const val = res.data

            let datas = []
            let i = 0
            while (i < 20) {
                datas.push(val[i])
                i++
            }
            const modifyData = datas.map(item => ({
                confirmed: item.confirmed,
                deaths: item.deaths,
                countryRegion: item.countryRegion
            }))
            setChartSide(modifyData)
        })
    }

    const BottomBarData = () => {
        getRecovered().then(res => {
            const data = res.data

            let recover = []
            let i = 0
            while (i < 7) {
                recover.push(data[i])
                i++
            }

            const modify = recover.map(item => ({
                recovered: item.recovered,
                countryRegion: item.countryRegion
            }))
            setHighRecover(modify)
        })
    }

    const mainData = () => { // main card data global data
        getData().then(res => {
            const { confirmed, lastUpdate, recovered, deaths } = res.data;
            setConfirm(confirmed.value)
            setRecover(recovered.value)
            setDeath(deaths.value)
            setLastUpdated(lastUpdate)
        })
    }


    const lineChartData = () => {  //line Chart global data
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
        mainData()
        sideBarData()
        lineChartData()
        BottomBarData()
    }, [])// eslint-disable-next-line
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Covid - 19 Tracker</h1>
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="row testing">
                                        <div className="col-md-4">
                                            <div className="card confirm border-0">
                                                <div className="card-body">
                                                    <h5 className="card-title">Confirmed</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted fw-normal">all cases in the world</h6>
                                                    <p className="card-text text-primary">
                                                        <CountUp
                                                            start={0}
                                                            end={confirm}
                                                            duration={2.5}
                                                            separator=","
                                                        />
                                                    </p>
                                                    <h6 className="card-subtitle mb-2 text-muted fw-light">{new Date(lastUpdated).toDateString()}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card recover border-0">
                                                <div className="card-body">
                                                    <h5 className="card-title">Recovered</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted fw-normal">all cases in the world</h6>
                                                    <p className="card-text text-success">
                                                        <CountUp
                                                            start={0}
                                                            end={recover}
                                                            duration={2.5}
                                                            separator=","
                                                        />
                                                    </p>
                                                    <h6 className="card-subtitle mb-2 text-muted fw-light">{new Date(lastUpdated).toDateString()}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card death border-0">
                                                <div className="card-body">
                                                    <h5 className="card-title">Death</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted fw-normal">all cases in the world</h6>
                                                    <p className="card-text text-danger">
                                                        <CountUp
                                                            start={0}
                                                            end={death}
                                                            duration={2.5}
                                                            separator=","
                                                        />
                                                    </p>
                                                    <h6 className="card-subtitle mb-2 text-muted fw-light">{new Date(lastUpdated).toDateString()}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="col-md-12">
                                            <Chart
                                                data={daily}
                                                type="spline"
                                                name1="confirmed"
                                                name2="deaths"
                                                category={daily.map(({ date }) => date)}
                                            />
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn drop dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Last 7 days
                                                </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="card bg-primary text-white">
                                    <div className="row">
                                        <div className="col-md-9 p-4">
                                            <h6 className="card-title">Highest case today</h6>
                                            <h1>{chartSide[0]?.confirmed}</h1>
                                            <p>Countries with the highest positive confirmed cases</p>
                                        </div>
                                        <hr />
                                        <div className="col-md-12">
                                            <ChartSide data={chartSide} />
                                        </div>
                                        <br />
                                        <div className="col-md-12 p-4">
                                            <h3 className="fw-light">Highest Confirmed cases</h3>
                                            <hr />
                                            <div className="table-responsive tableScroll">
                                                <table className="table table-sm ">
                                                    <thead className="text-white">
                                                        <tr>
                                                            <th>COUNTRY</th>
                                                            <th className="text-end">TOTAL</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-white fs-6">
                                                        {chartSide.map((key, i) => (
                                                            <tr key={i} scope="row">
                                                                <td>{key.countryRegion}</td>
                                                                <td className="text-end">{key.confirmed}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="btn-group dropend float-end">
                                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                REAL-TIME REPORT
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>What course  do your visit</h4>
                                        <div className="card">
                                            <div className="table-responsive">
                                                <table className="table table-sm">
                                                    <thead className="table2 text-secondary">
                                                        <tr>
                                                            <th className="fw-normal">Header</th>
                                                            <th className="fw-normal">Header</th>
                                                            <th className="fw-normal">Header</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            <td className="text-success">data</td>
                                                            <td>placeholder</td>
                                                            <td>text</td>
                                                        </tr>
                                                        <tr>

                                                            <td className="text-success">irrelevant</td>
                                                            <td>visual</td>
                                                            <td>layout</td>
                                                        </tr>
                                                        <tr>

                                                            <td className="text-success">irrelevant</td>
                                                            <td>visual</td>
                                                            <td>layout</td>
                                                        </tr>
                                                        <tr>

                                                            <td className="text-success">irrelevant</td>
                                                            <td>visual</td>
                                                            <td>layout</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="dropdown">
                                                <div>

                                                    <button className="btn drop dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Last 7 days
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                    <div className="btn-group dropend float-end">
                                                        <button className="btn end dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Last Reports
                                                    </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                        </ul>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <h4>What course  do your visit</h4>
                                        <div className="card">
                                            <div className="table-responsive">
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Countries</th>
                                                            <th>Header</th>
                                                            <th>Header</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            <td className="text-success">data</td>
                                                            <td>placeholder</td>
                                                            <td>text</td>
                                                        </tr>
                                                        <tr>

                                                            <td className="text-success">irrelevant</td>
                                                            <td>visual</td>
                                                            <td>layout</td>
                                                        </tr>
                                                        <tr>

                                                            <td className="text-success">irrelevant</td>
                                                            <td>visual</td>
                                                            <td>layout</td>
                                                        </tr>
                                                        <tr>

                                                            <td className="text-success">irrelevant</td>
                                                            <td>visual</td>
                                                            <td>layout</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="dropdown">
                                                <div>

                                                    <button className="btn drop dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Last 7 days
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                    <div className="btn-group dropend float-end">
                                                        <button className="btn end dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Last Reports
                                                    </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                        </ul>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                        <br />


                        <div className="row">
                            <div className="col-md-12">
                                <h4>How's Your social activity?</h4>
                                <div className="card border-0">
                                    <div className="col-md-9 border-0">
                                        <div className="row">
                                            <div className="col-md-3">Recovered</div>
                                            <div className="col-md-3">Activity</div>
                                            <div className="col-md-3">Vacinated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <Chart data2={highRecover} type="column" />
                            </div>
                        </div>


                        <br />
                        <br />
                        <Footer />
                    </main>

                </div>
            </div>
        </div>
    )
}
