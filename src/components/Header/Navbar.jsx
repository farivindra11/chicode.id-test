import React from 'react'
import "./Nav.css"
import Chicode from '../assets/chicodelogo.png'

export default function Navbar() {
    return (

        <header className="navbar navbar-light bg-light sticky-top flex-md-nowrap p-0 shadow">
            <div className="navbar-brand" href="#">
                <img className="logo" src={Chicode} alt="Chicode" />
            </div>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav px-3 ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="fa fa-bell" />
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>

                </li>
            </ul>
        </header>

    )
}
