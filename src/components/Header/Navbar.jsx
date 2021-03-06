import React from 'react'
import "./Nav.css"
import Chicode from '../assets/chicodelogo.png'

export default function Navbar() {
    return (

        <header className="navbar navbar-light bg-light sticky-top flex-md-nowrap p-0 shadow">
            <div className="navbar-brand" href="#">
                <img className="logo" src={Chicode} alt="Chicode" />
            </div>

            <div className="d-flex">
                <ul className="navbar-nav px-3 ml-auto mt-2">
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="fa fa-bell" />
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav px-3 ml-auto">
                    <li className="nav-item dropdown">
                        <button className="btn dropdown-toggle ronded-circle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={Chicode} className="rounded-circle mr-5" alt="img" />
                        </button>
                    </li>
                </ul>


            </div>

        </header>

    )
}
