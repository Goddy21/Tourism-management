import React, { useState } from "react";
import "./Vertical-nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faMagnifyingGlass, faHome, faUser, faCalendar, 
    faTasks, faUsers, faChartPie, faBus, faFileInvoiceDollar 
} from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';

const VerticalNav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const operations = [
        { icon: faHome, label: "Dashboard", path: "/dashboard" },
        { icon: faUser, label: "Front Desk", path: "/front-desk" },
        { icon: faCalendar, label: "Reservations", path: "/reservations" },
        { icon: faTasks, label: "Tasks", path: "/tasks" },
        { icon: faBus, label: "Transport", path: "/transport" },
    ];

    const management = [
        { icon: faUsers, label: "Accountant", path: "/accountant" },
        { icon: faChartPie, label: "Statistics", path: "/statistics" },
        { icon: faFileInvoiceDollar, label: "Quotation", path: "/quotation" },
    ];

    return (
        <div className={`nav ${isSidebarOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? 'Close' : 'Open'}
            </button>

            <img src="/images/tr.png" alt="Hotel Management System Logo" />

            <div className="search-container">
                <form className="search-form" aria-label="Search Form">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        name="search" 
                        aria-label="Search Input" 
                    />
                    <FontAwesomeIcon className="fa-search" icon={faMagnifyingGlass} />
                </form>
            </div>

            <p>Operations</p>
            <ul>
                {operations.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            <FontAwesomeIcon icon={item.icon} /> {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <hr />

            <p>Management</p>
            <ul>
                {management.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            <FontAwesomeIcon icon={item.icon} /> {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VerticalNav;
