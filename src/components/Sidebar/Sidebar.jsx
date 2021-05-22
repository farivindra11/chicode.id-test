import React from 'react'
import './Sidebar.css'

export default function Sidebar() {
    return (
        <div>
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-5 ps-3">
                        <ul className="nav flex-column">
                            <li className="side nav-header ms-3 text-secondary fs-5">MANAGE</li>
                            <li className="nav-item">
                                <a className="nav-link text-secondary fw-normal" href="#">
                                    <span className="pe-3"><i className="fa fa-tachometer" aria-hidden="true"></i></span>
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-secondary fw-normal" href="#">
                                    <span className="pe-3"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
                                    Confirmed
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-secondary fw-normal" href="#">
                                    <span className="pe-4"><i className="fa fa-thermometer-empty fa-lg" aria-hidden="true"></i></span>
                                    Recovered
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-secondary fw-normal" href="#">
                                    <span className="pe-3"><i className="fa fa-window-close" aria-hidden="true"></i></span>
                                    Deaths
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-secondary fw-normal" href="#">
                                    <span className="pe-3"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                    DailySummary
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}
