import React from "react";
import "./Vertical-nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHome, faUser, faCalendar, faClipboardList, faShoppingCart, faTasks, faUsers, faBed, faMoneyBill, faChartPie } from '@fortawesome/free-solid-svg-icons'; 

const VerticalNav = () => {
    return (
        <div className="nav">
            <img src="/images/tr.png" alt="logo"/>
            <div className="search-container">
                <form className="search-form">
                    <input type="text" placeholder="Search..." name="search" />
                    <FontAwesomeIcon className="fa-search" icon={faMagnifyingGlass} />
                </form>
            </div>

            <p>Operations</p>
            <ul>
                <li><FontAwesomeIcon icon={faHome} /> Dashboard</li>
                <li><FontAwesomeIcon icon={faUser} /> Front Desk</li>
                <li><FontAwesomeIcon icon={faCalendar} /> Reservations</li>
                <li><FontAwesomeIcon icon={faClipboardList} /> Ballrooms</li>
                <li><FontAwesomeIcon icon={faShoppingCart} /> Orders</li>
                <li><FontAwesomeIcon icon={faTasks} /> Tasks</li>
                <li><FontAwesomeIcon icon={faUsers} /> Guests</li>
                <li><FontAwesomeIcon icon={faBed} /> Housekeeping</li>
            </ul>

            <hr />

            <p>Management</p>
            <ul>
                <li><FontAwesomeIcon icon={faBed} /> Rooms</li>
                <li><FontAwesomeIcon icon={faMoneyBill} /> Room Rates</li>
                <li><FontAwesomeIcon icon={faUsers} /> Accountant</li>
                <li><FontAwesomeIcon icon={faChartPie} /> Statistics</li>
            </ul>
        </div>
    );
};

export default VerticalNav;
