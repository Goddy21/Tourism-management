import React from 'react';
import './Horizontal-nav.css';
import {Link} from "react-router-dom";

const HorizontalNav = () => {
    return(
        <div className='horizontal-nav'>
            <ul>
                <h3>Welcome,</h3>
                <h3>User</h3>
                <Link className="button" to='/sign_in'>
                Sign In
                </Link>
            </ul>
        </div>
    )
}

export default HorizontalNav;